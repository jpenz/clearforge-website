import { NextResponse } from 'next/server';
import { isRateLimited } from '@/lib/rate-limit';
import { getCompanyDomain, normalizePublicCompanyUrl } from '@/lib/url-safety';

/**
 * POST /api/hero-analyze
 *
 * Fast, cheap hero teaser for the homepage. Fetches the visitor's homepage,
 * makes ONE Claude call, and returns a real (not faked) AI-readiness band plus
 * a flagship diagnostic thesis specific to their site.
 *
 * Deliberately lightweight vs. the full /discover pipeline (which adds
 * Perplexity research + a full value chain + PDF). This is the teaser; the
 * deep run lives on /discover, reached via the hero CTA.
 *
 * Guardrails (public, unauthenticated surface): shared per-IP rate limit,
 * SSRF-safe URL normalization (blocks private/metadata hosts via
 * normalizePublicCompanyUrl), 4s fetch timeout, capped input size, graceful
 * fallback.
 */

interface HeroPriority {
  title: string; // the flagship opportunity, 2-5 words
  painpoint: string; // the gap costing them today
  intervention: string; // what ClearForge would build
  futureState: string; // the ambition / future operating state
  benefit: string; // expected, quantified benefit
  evidence: string; // honest directional benchmark (NOT a fabricated citation)
}

interface HeroAnalysis {
  company: string;
  industry: string;
  readinessBand: string; // e.g. "Likely 55–70"
  priority: HeroPriority; // one flagship thesis
  more: string[]; // 2 additional opportunity headlines
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
    if (isRateLimited(request.headers, 'hero-analyze', 5, 60_000)) {
      return NextResponse.json({ error: 'Too many requests', fallback: true }, { status: 429 });
    }

    const { url } = await request.json();
    const safeUrl = normalizePublicCompanyUrl(url); // SSRF-safe: blocks private/metadata hosts
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

    // Fetch the homepage (real signal), capped + timed out.
    let siteText = '';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(safeUrl.href, {
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

    const prompt = `You are a senior AI consultant at ClearForge (ex-Bain AI Automation practice). A visitor entered their company website on our homepage. Produce a fast, credible diagnostic snapshot — one flagship "thesis" that proves we understand their business, plus two more opportunities as headlines. This is the teaser; the full cited report comes later.

Domain: ${domain}
${siteText ? `\nHomepage content (extracted):\n"""${siteText}"""` : '\n(Homepage could not be fetched — infer reasonably from the domain.)'}

Return STRICT JSON only (no markdown, no preamble):
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
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
        max_tokens: 1100,
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
    const p = parsed.priority;
    if (!parsed.readinessBand || !p || !p.painpoint || !p.intervention) {
      return NextResponse.json({ fallback: true }, { status: 200 });
    }

    const clip = (v: unknown, n: number) => String(v ?? '').slice(0, n);
    return NextResponse.json({
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
      more: Array.isArray(parsed.more) ? parsed.more.slice(0, 2).map((m) => clip(m, 160)) : [],
      domain,
    });
  } catch {
    return NextResponse.json({ fallback: true }, { status: 200 });
  }
}
