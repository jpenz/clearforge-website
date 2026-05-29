#!/usr/bin/env node

import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const ROOT = process.cwd();
const W = 1280;
const H = 720;
const FPS = 24;
const DURATION = 8;
const FRAMES = FPS * DURATION;
const FRAME_DIR = path.join(ROOT, 'artifacts/generated-video/synth-hero-frames');
const MP4_OUT = path.join(ROOT, 'public/videos/hero.mp4');
const WEBM_OUT = path.join(ROOT, 'public/videos/hero.webm');
const POSTER_OUT = path.join(ROOT, 'public/images/hero-bg.webp');

const C = {
  bg0: '#070c16',
  bg1: '#0a101d',
  ink: '#eaeaf2',
  muted: '#9090a8',
  emerald: '#34d399',
  emeraldDeep: '#047857',
  brass: '#c7a66a',
  blue: '#8ab7ff',
};

const paths = [
  {
    opacity: 0.5,
    width: 2.3,
    points: [
      [480, 454],
      [600, 390],
      [745, 364],
      [862, 308],
      [1018, 330],
      [1176, 244],
      [1350, 292],
    ],
  },
  {
    opacity: 0.42,
    width: 1.9,
    points: [
      [514, 262],
      [664, 252],
      [814, 186],
      [970, 202],
      [1134, 158],
      [1328, 196],
    ],
  },
  {
    opacity: 0.46,
    width: 2.1,
    points: [
      [430, 602],
      [578, 528],
      [746, 548],
      [878, 474],
      [1040, 492],
      [1220, 408],
      [1424, 446],
    ],
  },
  {
    opacity: 0.38,
    width: 1.7,
    points: [
      [640, 676],
      [754, 600],
      [902, 610],
      [1016, 552],
      [1152, 570],
      [1310, 514],
    ],
  },
];

const nodes = [
  [604, 390, 7],
  [744, 364, 6],
  [862, 308, 8],
  [1018, 330, 6],
  [660, 252, 6],
  [814, 186, 7],
  [970, 202, 6],
  [578, 528, 6],
  [878, 474, 7],
  [1040, 492, 6],
  [1220, 408, 8],
];

const panels = [
  [610, 150, 420, 130],
  [735, 318, 456, 168],
  [870, 528, 360, 118],
  [1035, 210, 276, 132],
];

function esc(value) {
  return String(value).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
}

function poly(points) {
  return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
}

function distance(a, b) {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

function pointAt(points, t) {
  const lengths = [];
  let total = 0;

  for (let i = 0; i < points.length - 1; i += 1) {
    const length = distance(points[i], points[i + 1]);
    lengths.push(length);
    total += length;
  }

  let target = ((t % 1) + 1) % 1;
  target *= total;

  for (let i = 0; i < lengths.length; i += 1) {
    if (target <= lengths[i]) {
      const p = points[i];
      const n = points[i + 1];
      const local = target / lengths[i];
      return [p[0] + (n[0] - p[0]) * local, p[1] + (n[1] - p[1]) * local];
    }

    target -= lengths[i];
  }

  return points.at(-1);
}

function arc(cx, cy, r, start, end) {
  const startPoint = [cx + r * Math.cos(start), cy + r * Math.sin(start)];
  const endPoint = [cx + r * Math.cos(end), cy + r * Math.sin(end)];
  const large = Math.abs(end - start) > Math.PI ? 1 : 0;
  return `M ${startPoint[0].toFixed(2)} ${startPoint[1].toFixed(2)} A ${r} ${r} 0 ${large} 1 ${endPoint[0].toFixed(2)} ${endPoint[1].toFixed(2)}`;
}

function glowCircle(x, y, r, color, opacity = 1) {
  return `
    <circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(r * 4.2).toFixed(2)}" fill="${color}" opacity="${(opacity * 0.12).toFixed(3)}"/>
    <circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(r * 1.9).toFixed(2)}" fill="${color}" opacity="${(opacity * 0.2).toFixed(3)}"/>
    <circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r}" fill="#f7fbff" opacity="${(opacity * 0.9).toFixed(3)}"/>
  `;
}

function frameSvg(frame) {
  const t = frame / FRAMES;
  const angle = t * Math.PI * 2;

  const activeSignals = paths
    .map((lane, laneIndex) => {
      let out = '';
      for (let i = 0; i < 4; i += 1) {
        const local = t * (0.18 + laneIndex * 0.025) + i * 0.245 + laneIndex * 0.11;
        const [x, y] = pointAt(lane.points, local);
        const alpha = 0.98 - i * 0.18;
        out += glowCircle(x, y, 4.4 - i * 0.45, i % 2 === 0 ? C.emerald : C.brass, alpha);
      }
      return out;
    })
    .join('');

  const baseLines = paths
    .map(
      (lane, i) => `
        <path d="${poly(lane.points)}" fill="none" stroke="${i % 2 === 0 ? C.emerald : C.brass}" stroke-width="${lane.width}" stroke-linecap="round" stroke-linejoin="round" opacity="${lane.opacity * 0.32}"/>
      `,
    )
    .join('');

  const panelShapes = panels
    .map(([x, y, w, h], i) => {
      const shift = Math.sin(angle + i * 1.1) * 5;
      return `
        <g opacity="${0.08 + i * 0.018}" transform="translate(${shift.toFixed(2)} 0)">
          <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="none" stroke="${i % 2 ? C.brass : C.ink}" stroke-width="1"/>
          <rect x="${x + 24}" y="${y + 28}" width="${w * 0.28}" height="8" rx="4" fill="${i % 2 ? C.brass : C.emerald}" opacity="0.45"/>
          <rect x="${x + 24}" y="${y + 54}" width="${w * 0.64}" height="5" rx="2.5" fill="${C.ink}" opacity="0.28"/>
          <rect x="${x + 24}" y="${y + 76}" width="${w * 0.5}" height="5" rx="2.5" fill="${C.ink}" opacity="0.2"/>
        </g>
      `;
    })
    .join('');

  const flywheel = [0, 1, 2]
    .map((i) => {
      const r = 92 + i * 42;
      const start = angle * (0.18 + i * 0.045) + i * 1.55;
      return `
        <circle cx="920" cy="366" r="${r}" fill="none" stroke="${C.ink}" stroke-width="1" opacity="${0.045 + i * 0.025}"/>
        <path d="${arc(920, 366, r, start, start + Math.PI * 0.9)}" fill="none" stroke="${i === 1 ? C.brass : C.emerald}" stroke-width="${2.8 - i * 0.35}" stroke-linecap="round" opacity="${0.58 - i * 0.09}"/>
      `;
    })
    .join('');

  const nodeShapes = nodes
    .map(([x, y, r], i) => {
      const pulse = 0.6 + Math.sin(angle * 1.4 + i * 0.82) * 0.28;
      return glowCircle(x, y, r, i % 3 === 0 ? C.brass : C.emerald, pulse);
    })
    .join('');

  const opportunityField = Array.from({ length: 44 }, (_, i) => {
    const x = 525 + ((i * 91) % 880);
    const y = 96 + ((i * 137) % 560);
    const alpha = 0.06 + 0.08 * (0.5 + Math.sin(angle * 0.9 + i * 0.71) * 0.5);
    return `<circle cx="${x}" cy="${y}" r="${1.2 + (i % 4) * 0.4}" fill="${i % 5 === 0 ? C.brass : C.ink}" opacity="${alpha.toFixed(3)}"/>`;
  }).join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${C.bg0}"/>
          <stop offset="0.48" stop-color="${C.bg1}"/>
          <stop offset="1" stop-color="#11141a"/>
        </linearGradient>
        <radialGradient id="rightGlow" cx="78%" cy="35%" r="62%">
          <stop offset="0" stop-color="${C.emerald}" stop-opacity="0.17"/>
          <stop offset="0.54" stop-color="${C.brass}" stop-opacity="0.075"/>
          <stop offset="1" stop-color="${C.bg0}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="leftShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#050912" stop-opacity="0.96"/>
          <stop offset="0.48" stop-color="#050912" stop-opacity="0.82"/>
          <stop offset="0.74" stop-color="#050912" stop-opacity="0.24"/>
          <stop offset="1" stop-color="#050912" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      <rect width="${W}" height="${H}" fill="url(#rightGlow)"/>
      <g opacity="0.12">
        ${Array.from({ length: 11 }, (_, i) => `<line x1="${510 + i * 78}" y1="80" x2="${460 + i * 82}" y2="690" stroke="${C.ink}" stroke-width="1"/>`).join('')}
        ${Array.from({ length: 7 }, (_, i) => `<line x1="500" y1="${126 + i * 84}" x2="1380" y2="${86 + i * 72}" stroke="${C.ink}" stroke-width="1"/>`).join('')}
      </g>
      ${opportunityField}
      ${panelShapes}
      ${baseLines}
      ${flywheel}
      ${nodeShapes}
      ${activeSignals}
      <rect width="${W}" height="${H}" fill="url(#leftShade)"/>
      <rect width="${W}" height="${H}" fill="#050912" opacity="0.08"/>
    </svg>
  `;
}

async function main() {
  await fs.rm(FRAME_DIR, { recursive: true, force: true });
  await fs.mkdir(FRAME_DIR, { recursive: true });

  for (let frame = 0; frame < FRAMES; frame += 1) {
    const file = path.join(FRAME_DIR, `${String(frame).padStart(4, '0')}.png`);
    await sharp(Buffer.from(frameSvg(frame))).png().toFile(file);

    if (frame % FPS === 0) {
      console.log(`Rendered ${Math.round((frame / FRAMES) * 100)}%`);
    }
  }

  await run('ffmpeg', [
    '-y',
    '-framerate',
    String(FPS),
    '-i',
    path.join(FRAME_DIR, '%04d.png'),
    '-an',
    '-vf',
    'fps=24,format=yuv420p',
    '-movflags',
    '+faststart',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '29',
    MP4_OUT,
  ]);

  await run('ffmpeg', [
    '-y',
    '-framerate',
    String(FPS),
    '-i',
    path.join(FRAME_DIR, '%04d.png'),
    '-an',
    '-vf',
    'fps=24,format=yuv420p',
    '-c:v',
    'libvpx-vp9',
    '-b:v',
    '0',
    '-crf',
    '44',
    '-row-mt',
    '1',
    WEBM_OUT,
  ]);

  await sharp(Buffer.from(frameSvg(FPS))).webp({ quality: 72 }).toFile(POSTER_OUT);

  console.log(`Clean hero loop generated:
  ${path.relative(ROOT, MP4_OUT)}
  ${path.relative(ROOT, WEBM_OUT)}
  ${path.relative(ROOT, POSTER_OUT)}
  Source frames: ${path.relative(ROOT, FRAME_DIR)}`);
}

async function run(command, args) {
  console.log(`${command} ${args.map((arg) => (String(arg).includes(' ') ? JSON.stringify(arg) : arg)).join(' ')}`);
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
