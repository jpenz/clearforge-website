#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const PROJECT_ROOT = process.cwd();
const DEFAULT_PROMPT_FILE = 'scripts/video-prompts/clearforge-hero.json';
const DEFAULT_STATE_FILE = 'artifacts/generated-video/hero-video-tasks.json';
const RAW_DIR = 'artifacts/generated-video/raw';
const KIE_BASE_URL = 'https://api.kie.ai';

const providerHandlers = {
  veo: {
    generateUrl: `${KIE_BASE_URL}/api/v1/veo/generate`,
    statusUrl: (taskId) =>
      `${KIE_BASE_URL}/api/v1/veo/record-info?taskId=${encodeURIComponent(taskId)}`,
    buildBody: (variant, manifest, args) => {
      const overrides = variant.providerOverrides?.veo ?? {};
      return pruneEmpty({
        prompt: variant.prompt,
        model: args.model ?? overrides.model ?? manifest.defaults?.veoModel ?? 'veo3',
        aspect_ratio: args.aspectRatio ?? manifest.defaults?.aspectRatio ?? '16:9',
        watermark: args.watermark ?? manifest.defaults?.watermark ?? '',
        callBackUrl: args.callback,
        generationType: overrides.generationType ?? 'TEXT_2_VIDEO',
        enableFallback: coerceBoolean(args.enableFallback),
        enableTranslation: coerceBoolean(args.enableTranslation ?? overrides.enableTranslation),
        seeds: args.seed ? Number(args.seed) : overrides.seeds,
      });
    },
    readStatus: (payload) => {
      const data = payload.data ?? {};
      const successFlag = Number(data.successFlag);
      const response = data.response ?? {};
      const urls = extractUrls(response.resultUrls ?? response.fullResultUrls ?? data.resultUrls);

      if (successFlag === 1) {
        return { state: 'success', urls, raw: data };
      }

      if (successFlag === 2 || successFlag === 3) {
        return {
          state: 'failed',
          urls,
          error: data.errorMessage || payload.msg || 'Veo generation failed',
          raw: data,
        };
      }

      return { state: 'generating', urls, raw: data };
    },
  },
  runway: {
    generateUrl: `${KIE_BASE_URL}/api/v1/runway/generate`,
    statusUrl: (taskId) =>
      `${KIE_BASE_URL}/api/v1/runway/record-detail?taskId=${encodeURIComponent(taskId)}`,
    buildBody: (variant, manifest, args) => {
      const overrides = variant.providerOverrides?.runway ?? {};
      return pruneEmpty({
        prompt: variant.prompt,
        model: args.model ?? overrides.model ?? manifest.defaults?.runwayModel,
        duration: Number(args.duration ?? overrides.duration ?? manifest.defaults?.duration ?? 5),
        quality: args.quality ?? overrides.quality ?? manifest.defaults?.quality ?? '720p',
        aspectRatio: args.aspectRatio ?? manifest.defaults?.aspectRatio ?? '16:9',
        waterMark: args.watermark ?? manifest.defaults?.watermark ?? '',
        callBackUrl: args.callback,
      });
    },
    readStatus: (payload) => {
      const data = payload.data ?? {};
      const state = String(data.state ?? '').toLowerCase();
      const urls = extractUrls([data.videoInfo?.videoUrl, data.videoUrl]);

      if (state === 'success') {
        return { state: 'success', urls, raw: data };
      }

      if (state === 'fail' || state === 'failed') {
        return {
          state: 'failed',
          urls,
          error: data.failMsg || payload.msg || 'Runway generation failed',
          raw: data,
        };
      }

      return { state: state || 'generating', urls, raw: data };
    },
  },
};

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] ?? 'help';

  if (command === 'help' || args.help) {
    printHelp();
    return;
  }

  await loadEnvFiles([args.env, process.env.KIE_ENV_FILE, '.env.local', '.env']);

  if (command === 'generate') {
    await generateTasks(args);
    return;
  }

  if (command === 'status') {
    await refreshTaskStatus(args);
    return;
  }

  if (command === 'download') {
    await downloadCompletedTasks(args);
    return;
  }

  if (command === 'optimize') {
    await optimizeHeroVideo(args);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

async function generateTasks(args) {
  const provider = getProvider(args.provider ?? 'veo');
  const manifest = await readJson(resolvePath(args.prompts ?? DEFAULT_PROMPT_FILE));
  const selectedVariants = selectVariants(manifest, args);

  if (selectedVariants.length === 0) {
    throw new Error('No prompt variants matched the selection.');
  }

  const state = await readState(args.state);

  for (const variant of selectedVariants) {
    const body = providerHandlers[provider].buildBody(variant, manifest, args);

    if (args.dryRun) {
      console.log(`[dry-run] ${provider}:${variant.id}`);
      console.log(JSON.stringify(body, null, 2));
      continue;
    }

    const response = await kieRequest({
      url: providerHandlers[provider].generateUrl,
      method: 'POST',
      body,
    });
    const taskId = response.data?.taskId;

    if (!taskId) {
      throw new Error(`KIE did not return a taskId for ${variant.id}`);
    }

    state.tasks.push({
      taskId,
      provider,
      variantId: variant.id,
      title: variant.title,
      request: body,
      createdAt: new Date().toISOString(),
      state: 'submitted',
      urls: [],
    });

    console.log(`Submitted ${provider}:${variant.id} -> ${taskId}`);
  }

  if (!args.dryRun) {
    await writeState(args.state, state);
  }
}

async function refreshTaskStatus(args) {
  const state = await readState(args.state);

  for (const task of state.tasks) {
    if (args.only && task.taskId !== args.only && task.variantId !== args.only) {
      continue;
    }

    const handler = providerHandlers[task.provider];
    if (!handler) {
      console.warn(`Skipping ${task.taskId}: unsupported provider ${task.provider}`);
      continue;
    }

    const response = await kieRequest({
      url: handler.statusUrl(task.taskId),
      method: 'GET',
    });
    const status = handler.readStatus(response);

    task.state = status.state;
    task.urls = status.urls;
    task.error = status.error;
    task.lastCheckedAt = new Date().toISOString();
    task.rawStatus = status.raw;

    const suffix = status.urls.length > 0 ? ` (${status.urls.length} url)` : '';
    console.log(`${task.variantId} ${task.taskId}: ${status.state}${suffix}`);
  }

  await writeState(args.state, state);
}

async function downloadCompletedTasks(args) {
  if (!args.noStatus) {
    await refreshTaskStatus(args);
  }

  const state = await readState(args.state);
  const rawDir = resolvePath(args.rawDir ?? RAW_DIR);
  await fs.mkdir(rawDir, { recursive: true });

  for (const task of state.tasks) {
    if (args.only && task.taskId !== args.only && task.variantId !== args.only) {
      continue;
    }

    if (task.state !== 'success' || task.urls.length === 0) {
      console.log(`Skipping ${task.variantId}: ${task.state}`);
      continue;
    }

    const url = task.urls[0];
    const output = path.join(rawDir, `${task.provider}-${task.variantId}-${task.taskId}.mp4`);
    await downloadFile(url, output);
    task.downloadedPath = path.relative(PROJECT_ROOT, output);
    task.downloadedAt = new Date().toISOString();
    console.log(`Downloaded ${task.variantId} -> ${task.downloadedPath}`);
  }

  await writeState(args.state, state);
}

async function optimizeHeroVideo(args) {
  const input = resolvePath(args.input ?? (await findLatestDownloadedVideo(args.state)));
  const mp4Output = resolvePath(args.mp4 ?? 'public/videos/hero.mp4');
  const webmOutput = resolvePath(args.webm ?? 'public/videos/hero.webm');
  const posterOutput = resolvePath(args.poster ?? 'public/images/hero-bg.webp');
  const duration = String(args.duration ?? 10);
  const scale = String(args.scale ?? '1280:-2');
  const mp4Crf = String(args.mp4Crf ?? 34);
  const webmCrf = String(args.webmCrf ?? 52);
  const posterTime = String(args.posterTime ?? 1);

  await fs.mkdir(path.dirname(mp4Output), { recursive: true });
  await fs.mkdir(path.dirname(webmOutput), { recursive: true });
  await fs.mkdir(path.dirname(posterOutput), { recursive: true });

  await runCommand('ffmpeg', [
    '-y',
    '-i',
    input,
    '-an',
    '-t',
    duration,
    '-vf',
    `scale=${scale}:flags=lanczos,fps=24,format=yuv420p`,
    '-movflags',
    '+faststart',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    mp4Crf,
    mp4Output,
  ]);

  await runCommand('ffmpeg', [
    '-y',
    '-i',
    input,
    '-an',
    '-t',
    duration,
    '-vf',
    `scale=${scale}:flags=lanczos,fps=24`,
    '-c:v',
    'libvpx-vp9',
    '-b:v',
    '0',
    '-crf',
    webmCrf,
    '-row-mt',
    '1',
    webmOutput,
  ]);

  await writePosterFrame({ input, output: posterOutput, posterTime, scale });

  console.log(`Optimized hero video:
  MP4: ${path.relative(PROJECT_ROOT, mp4Output)}
  WebM: ${path.relative(PROJECT_ROOT, webmOutput)}
  Poster: ${path.relative(PROJECT_ROOT, posterOutput)}`);
}

async function kieRequest({ url, method, body }) {
  const apiKey = getKieApiKey();
  const response = await fetch(url, {
    method,
    headers: pruneEmpty({
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': body ? 'application/json' : undefined,
    }),
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.code !== 200) {
    throw new Error(`KIE request failed (${response.status}): ${payload.msg ?? 'Unknown error'}`);
  }

  return payload;
}

function getKieApiKey() {
  const apiKey =
    process.env.KIE_API_KEY ??
    process.env.KIE_AI_API_KEY ??
    process.env.KIEAI_API_KEY ??
    process.env.KIE_TOKEN;

  if (!apiKey) {
    throw new Error('Missing KIE_API_KEY. Set it in .env.local, .env, or pass --env=/path/to/.env');
  }

  return apiKey;
}

async function findLatestDownloadedVideo(statePath) {
  const state = await readState(statePath);
  const downloaded = state.tasks
    .map((task) => task.downloadedPath)
    .filter(Boolean)
    .map((filePath) => resolvePath(filePath));

  if (downloaded.length > 0) {
    downloaded.sort();
    return downloaded.at(-1);
  }

  const rawDir = resolvePath(RAW_DIR);
  const files = existsSync(rawDir) ? await fs.readdir(rawDir) : [];
  const mp4Files = files
    .filter((file) => file.endsWith('.mp4'))
    .map((file) => path.join(rawDir, file))
    .sort();

  if (mp4Files.length === 0) {
    throw new Error('No input video found. Run download first or pass --input=/path/to/video.mp4');
  }

  return mp4Files.at(-1);
}

async function downloadFile(url, output) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed (${response.status}) for ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(output, buffer);
}

async function writePosterFrame({ input, output, posterTime, scale }) {
  const tempJpg = path.join(
    path.dirname(output),
    `.poster-${Date.now()}-${Math.random().toString(16).slice(2)}.jpg`,
  );

  await runCommand('ffmpeg', [
    '-y',
    '-ss',
    posterTime,
    '-i',
    input,
    '-vframes',
    '1',
    '-vf',
    `scale=${scale}:flags=lanczos`,
    '-q:v',
    '4',
    '-update',
    '1',
    tempJpg,
  ]);

  if (output.endsWith('.webp')) {
    try {
      const sharp = await import('sharp');
      await sharp.default(tempJpg).webp({ quality: 58 }).toFile(output);
    } finally {
      await fs.rm(tempJpg, { force: true });
    }
    return;
  }

  await fs.rename(tempJpg, output);
}

async function readState(statePath = DEFAULT_STATE_FILE) {
  const resolved = resolvePath(statePath);

  if (!existsSync(resolved)) {
    return { schema: 1, tasks: [], updatedAt: new Date().toISOString() };
  }

  return readJson(resolved);
}

async function writeState(statePath = DEFAULT_STATE_FILE, state) {
  state.updatedAt = new Date().toISOString();
  const resolved = resolvePath(statePath);
  await fs.mkdir(path.dirname(resolved), { recursive: true });
  await fs.writeFile(resolved, `${JSON.stringify(state, null, 2)}\n`);
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

function selectVariants(manifest, args) {
  const variants = manifest.variants ?? [];
  const requested = String(args.variants ?? args.variant ?? 'all')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (requested.includes('all')) {
    return variants.slice(0, Number(args.count ?? variants.length));
  }

  const selected = variants.filter((variant) => requested.includes(variant.id));
  return selected.slice(0, Number(args.count ?? selected.length));
}

function getProvider(provider) {
  if (!providerHandlers[provider]) {
    throw new Error(`Unsupported provider: ${provider}. Use ${Object.keys(providerHandlers).join(', ')}`);
  }

  return provider;
}

function extractUrls(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return extractUrls(parsed);
    } catch {
      return value.startsWith('http') ? [value] : [];
    }
  }

  return [];
}

function pruneEmpty(input) {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  );
}

function coerceBoolean(value) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return String(value).toLowerCase() === 'true';
}

function resolvePath(filePath = '') {
  return path.isAbsolute(filePath) ? filePath : path.join(PROJECT_ROOT, filePath);
}

function parseArgs(argv) {
  const parsed = { _: [] };

  for (const arg of argv) {
    if (!arg.startsWith('--')) {
      parsed._.push(arg);
      continue;
    }

    const [rawKey, rawValue] = arg.slice(2).split(/=(.*)/s);
    parsed[toCamelCase(rawKey)] = rawValue === undefined || rawValue === '' ? true : rawValue;
  }

  return parsed;
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

async function loadEnvFiles(filePaths) {
  for (const filePath of filePaths.filter(Boolean)) {
    const resolved = resolvePath(filePath);

    if (!existsSync(resolved)) {
      continue;
    }

    const content = await fs.readFile(resolved, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
      if (!match) {
        continue;
      }

      const [, key, rawValue] = match;
      if (process.env[key] !== undefined) {
        continue;
      }

      process.env[key] = stripEnvQuotes(rawValue.trim());
    }
  }
}

function stripEnvQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

async function runCommand(command, args) {
  console.log(`${command} ${args.map(shellQuote).join(' ')}`);

  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}

function shellQuote(value) {
  return String(value).includes(' ') ? JSON.stringify(value) : String(value);
}

function printHelp() {
  console.log(`ClearForge hero video workflow

Commands:
  generate   Submit KIE generation tasks from scripts/video-prompts/clearforge-hero.json
  status     Poll submitted tasks and update artifacts/generated-video/hero-video-tasks.json
  download   Download completed task videos into artifacts/generated-video/raw
  optimize   Compress a selected video into public hero assets

Examples:
  npm run video:hero -- generate --provider=veo --variants=all
  npm run video:hero -- generate --provider=veo --variant=value-chain-scan --model=veo3_fast
  npm run video:hero -- status
  npm run video:hero -- download
  npm run video:hero -- optimize --input=artifacts/generated-video/raw/example.mp4

Environment:
  KIE_API_KEY can live in .env.local, .env, or a file passed with --env=/path/to/.env.
`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
