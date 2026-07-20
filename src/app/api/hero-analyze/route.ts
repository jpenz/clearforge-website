import { NextResponse } from 'next/server';
import { buildHeroPrompt, snapshotFields } from '@/lib/hero-agent';
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
 * SSRF-safe URL normalization (blocks private/metadata hosts), fetched site
 * text treated as UNTRUSTED (prompt-injection guard lives in
 * buildHeroPrompt), 4s site-fetch timeout, capped input size, 25s model
 * timeout, graceful fallback.
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

const clip = (v: unknown, n: number) => String(v ?? '').slice(0, n);

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
            messages: [{ role: 'user', content: buildHeroPrompt(domain, siteText) }],
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
          const snap = snapshotFields(buf);
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
