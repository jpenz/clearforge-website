import { NextResponse } from 'next/server';
import { isRateLimited } from '@/lib/rate-limit';
import { getCompanyDomain, normalizePublicCompanyUrl } from '@/lib/url-safety';

/**
 * POST /api/hero-analyze — STREAMING (NDJSON).
 *
 * Fast hero teaser for the homepage. Fetches the visitor's homepage, makes
 * ONE Claude call, and streams the result as it is produced:
 *   {t:'p', label}  — real progress events (no fake timers anywhere)
 *   {t:'f', data}   — partial analysis snapshot as fields complete
 *   {t:'d', data}   — final validated analysis
 *   {t:'e', fallback:true} — graceful mid-stream failure
 * Pre-stream failures (rate limit / invalid URL / no key) stay plain JSON so
 * the client's existing error paths keep working.
 *
 * Guardrails (public, unauthenticated surface): shared per-IP rate limit,
 * SSRF-safe URL normalization (blocks private/metadata hosts), 4s site-fetch
 * timeout, capped input size, 25s model timeout, graceful fallback.
 */

interface HeroPriority {
  title: string;
  painpoint: string;
  intervention: string;
  futureState: string;
  benefit: string;
  evidence: string;
}

interface HeroAnalysis {
  company: string;
  industry: string;
  readinessBand: string;
  priority: HeroPriority;
  more: string[];
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 3000);
}

/** Extract a completed string field from a partially-streamed JSON document. */
function grabField(buf: string, key: string): string | undefined {
  const m = buf.match(new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  if (!m) return undefined;
  try {
    return JSON.parse(`"${m[1]}"`) as string;
  } catch {
    return undefined;
  }
}

const clip = (v: unknown, n: number) => String(v ?? '').slice(0, n);

function buildPrompt(domain: string, siteText: string): string {
  return `You are a senior AI consultant at ClearForge (ex-Bain AI Automation practice). A visitor entered their company website on our homepage. Produce a fast, credible diagnostic snapshot — one flagship "thesis" that proves we understand their business, plus two more opportunities as headlines. This is the teaser; the full cited report comes later.

Domain: ${domain}
${siteText ? `\nHomepage content (extracted):\n"""${siteText}"""` : '\n(Homepage could not be fetched — infer reasonably from the domain.)'}

Return STRICT JSON only (no markdown, no preamble). Emit the keys in exactly this order — company, industry, readinessBand, then priority — so the reader sees the headline first:
{
  "company": "Company name (short, from the content or domain)",
  "industry": "Specific industry (1-4 words)",
  "readinessBand": "AI-readiness band out of 100, formatted exactly like 'Likely 55–70'. Most mid-market firms land 45–70; legacy/manual operators lower. Be realistic, not flattering.",
  "priority": {
    "title": "The single highest-value AI opportunity for THIS company (2-5 words)",
    "painpoint": "The specific gap costing them today — name their actual workflow/business. One crisp sentence, max 28 words.",
    "intervention": "Exactly what ClearForge would build (an AI agent, model, or automation). One crisp sentence, max 28 words.",
    "futureState": "The future operating state once it's live — the ambition. One crisp sentence, max 28 words.",
    "benefit": "Expected quantified benefit with a number or range (e.g. '15–30% less spoilage', '20+ hrs/week back per rep'). One short phrase.",
    "evidence": "An HONEST, directional benchmark that backs the benefit — typical for this industry/scale. Do NOT cite a specific study, author, or statistic you cannot verify. Frame as 'Operators at this scale typically…'. One sentence."
  },
  "more": [
    "A second distinct opportunity (one sentence, under 16 words, name their business)",
    "A third distinct opportunity (one sentence, under 16 words)"
  ]
}

Rules: be specific to their actual business, not generic. Sound like a sharp Bain-trained operator, not marketing. No hype, no fabricated citations. Realistic numbers only.`;
}

const FIELD_KEYS = [
  'company',
  'industry',
  'readinessBand',
  'title',
  'painpoint',
  'intervention',
  'futureState',
  'benefit',
  'evidence',
] as const;

function snapshot(buf: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of FIELD_KEYS) {
    const v = grabField(buf, key);
    if (v !== undefined) out[key] = v;
  }
  return out;
}

export async function POST(request: Request) {
  if (isRateLimited(request.headers, 'hero-analyze', 5, 60_000)) {
    return NextResponse.json({ error: 'Too many requests', fallback: true }, { status: 429 });
  }

  let url = '';
  try {
    ({ url } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Bad request', invalid: true }, { status: 400 });
  }
  const safeUrl = normalizePublicCompanyUrl(url);
  const domain = getCompanyDomain(url);
  if (!safeUrl || !domain) {
    return NextResponse.json(
      { error: 'Enter a valid company website.', invalid: true },
      { status: 400 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ fallback: true }, { status: 200 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`));
      };

      try {
        send({ t: 'p', label: `Fetching ${domain}…` });

        let siteText = '';
        try {
          const fetchController = new AbortController();
          const timeout = setTimeout(() => fetchController.abort(), 4000);
          const res = await fetch(safeUrl.href, {
            signal: fetchController.signal,
            headers: { 'User-Agent': 'ClearForge-Hero-Analyzer/1.0 (+https://clearforge.ai)' },
            redirect: 'follow',
          });
          clearTimeout(timeout);
          if (res.ok) {
            siteText = stripHtml(await res.text());
          }
        } catch {
          /* unreachable site — Claude infers from the domain */
        }

        send({
          t: 'p',
          label: siteText
            ? `Read ${domain} · ${siteText.split(' ').length.toLocaleString()} words of signal`
            : `${domain} unreachable — working from the domain`,
        });
        send({ t: 'p', label: 'Drafting your diagnostic…' });

        const modelController = new AbortController();
        const modelTimeout = setTimeout(() => modelController.abort(), 25_000);
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          signal: modelController.signal,
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 1100,
            stream: true,
            messages: [{ role: 'user', content: buildPrompt(domain, siteText) }],
          }),
        });

        if (!response.ok || !response.body) {
          clearTimeout(modelTimeout);
          send({ t: 'e', fallback: true });
          controller.close();
          return;
        }

        let buf = '';
        let sentKeys = 0;
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let sse = '';
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          sse += decoder.decode(value, { stream: true });
          const lines = sse.split('\n');
          sse = lines.pop() ?? '';
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const payload = line.slice(5).trim();
            if (!payload || payload === '[DONE]') continue;
            try {
              const evt = JSON.parse(payload);
              const delta: string | undefined = evt?.delta?.text;
              if (delta) buf += delta;
            } catch {
              /* keepalive / non-JSON line */
            }
          }
          const snap = snapshot(buf);
          const keyCount = Object.keys(snap).length;
          if (keyCount > sentKeys) {
            sentKeys = keyCount;
            send({ t: 'f', data: snap });
          }
        }
        clearTimeout(modelTimeout);

        const match = buf.match(/\{[\s\S]*\}/);
        if (!match) {
          send({ t: 'e', fallback: true });
          controller.close();
          return;
        }
        let parsed: HeroAnalysis;
        try {
          parsed = JSON.parse(match[0]);
        } catch {
          send({ t: 'e', fallback: true });
          controller.close();
          return;
        }
        const p = parsed.priority;
        if (!parsed.readinessBand || !p || !p.painpoint || !p.intervention) {
          send({ t: 'e', fallback: true });
          controller.close();
          return;
        }

        send({
          t: 'd',
          data: {
            company: clip(parsed.company || domain, 80),
            industry: clip(parsed.industry, 60),
            readinessBand: clip(parsed.readinessBand, 40),
            priority: {
              title: clip(p.title, 60),
              painpoint: clip(p.painpoint, 300),
              intervention: clip(p.intervention, 300),
              futureState: clip(p.futureState, 300),
              benefit: clip(p.benefit, 120),
              evidence: clip(p.evidence, 300),
            },
            more: Array.isArray(parsed.more)
              ? parsed.more.slice(0, 2).map((m) => clip(m, 160))
              : [],
            domain,
          },
        });
        controller.close();
      } catch {
        try {
          send({ t: 'e', fallback: true });
          controller.close();
        } catch {
          /* controller already closed */
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
    },
  });
}
