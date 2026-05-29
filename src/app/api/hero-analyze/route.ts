import { NextResponse } from 'next/server';

/**
 * POST /api/hero-analyze
 *
 * Fast, cheap hero teaser for the homepage. Fetches the visitor's homepage,
 * makes ONE Claude call, and returns a real (not faked) AI-readiness band plus
 * three value-chain opportunities specific to their site.
 *
 * Deliberately lightweight vs. the full /discover pipeline (which adds
 * Perplexity research + a full value chain + PDF). This is the teaser; the
 * deep run lives on /discover, reached via the hero CTA.
 *
 * Guardrails (public, unauthenticated surface): per-IP rate limit, domain
 * validation, 4s fetch timeout, capped input size, graceful fallback.
 */

interface HeroAnalysis {
  company: string;
  industry: string;
  readinessBand: string; // e.g. "Likely 55–70"
  teaser: string[]; // 3 short value-chain opportunities
}

// ── Per-IP in-memory rate limit (per server instance; fine for v1) ──────────
const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60_000; // per minute
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // opportunistic cleanup
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT;
}

function normalizeUrl(raw: string): { url: string; domain: string } | null {
  const trimmed = raw
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/+$/, '');
  // basic domain shape: label.tld, optional path
  const domain = trimmed.split('/')[0].toLowerCase();
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) return null;
  if (domain.length > 253) return null;
  return { url: `https://${domain}`, domain };
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

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests', fallback: true }, { status: 429 });
    }

    const { url } = await request.json();
    const normalized = typeof url === 'string' ? normalizeUrl(url) : null;
    if (!normalized) {
      return NextResponse.json(
        { error: 'Enter a valid company website.', invalid: true },
        { status: 400 },
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ fallback: true }, { status: 200 });
    }

    // Fetch the homepage (real signal), capped + timed out.
    let siteText = '';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(normalized.url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'ClearForge-Hero-Analyzer/1.0 (+https://clearforge.ai)' },
        redirect: 'follow',
      });
      clearTimeout(timeout);
      if (res.ok) {
        const html = await res.text();
        siteText = stripHtml(html);
      }
    } catch {
      // Unreachable site — Claude can still infer from the domain name.
    }

    const prompt = `You are a senior AI consultant at ClearForge (ex-Bain AI Automation practice). A visitor entered their company website on our homepage. Give a fast, credible, specific first read — this is a teaser that makes them want the full analysis.

Domain: ${normalized.domain}
${siteText ? `\nHomepage content (extracted):\n"""${siteText}"""` : '\n(Homepage could not be fetched — infer reasonably from the domain.)'}

Return STRICT JSON only (no markdown, no preamble):
{
  "company": "Best guess at the company name (short, from the content or domain)",
  "industry": "Specific industry (1-4 words)",
  "readinessBand": "An AI-readiness band as a range out of 100, formatted exactly like 'Likely 55–70'. Most mid-market firms land 45–70. Be realistic, not flattering.",
  "teaser": [
    "A specific, high-value AI/automation opportunity for THIS company (one sentence, name their actual business)",
    "A second, different opportunity (one sentence)",
    "A third, different opportunity (one sentence)"
  ]
}

Rules: be specific to their actual business, not generic. Sound like a sharp operator wrote it, not marketing. No hype. Each teaser item under 18 words.`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 700,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json({ fallback: true }, { status: 200 });
    }

    const data = await response.json();
    const content: string = data.content?.[0]?.text ?? '';
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) return NextResponse.json({ fallback: true }, { status: 200 });

    let parsed: HeroAnalysis;
    try {
      parsed = JSON.parse(match[0]);
    } catch {
      return NextResponse.json({ fallback: true }, { status: 200 });
    }

    // Shape guard
    if (!parsed.readinessBand || !Array.isArray(parsed.teaser) || parsed.teaser.length === 0) {
      return NextResponse.json({ fallback: true }, { status: 200 });
    }

    return NextResponse.json({
      company: String(parsed.company ?? normalized.domain).slice(0, 80),
      industry: String(parsed.industry ?? '').slice(0, 60),
      readinessBand: String(parsed.readinessBand).slice(0, 40),
      teaser: parsed.teaser.slice(0, 3).map((t) => String(t).slice(0, 160)),
      domain: normalized.domain,
    });
  } catch {
    return NextResponse.json({ fallback: true }, { status: 200 });
  }
}
