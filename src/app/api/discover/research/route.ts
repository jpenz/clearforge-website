import { NextResponse } from 'next/server';
import { escapeHtml, getLeadRecipients, getResendClient, isValidEmail } from '@/lib/email';
import { isRateLimited } from '@/lib/rate-limit';
import { logServerError } from '@/lib/server-logger';
import { saveDiscoverLead } from '@/lib/supabase';
import { normalizePublicCompanyUrl } from '@/lib/url-safety';

const PERPLEXITY_TIMEOUT_MS = 16_000;

function normalizeString(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function titleFromDomain(domain: string): string {
  return domain
    .replace(/^www\./, '')
    .split('.')[0]
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function extractSection(raw: string, heading: string, nextHeading?: string): string {
  const start = raw.search(new RegExp(`${heading}\\s*:`, 'i'));
  if (start === -1) return '';

  const afterHeading = raw.slice(start).replace(new RegExp(`^${heading}\\s*:`, 'i'), '');
  if (!nextHeading) return afterHeading.trim();

  const next = afterHeading.search(new RegExp(`\\n\\s*${nextHeading}\\s*:`, 'i'));
  return (next === -1 ? afterHeading : afterHeading.slice(0, next)).trim();
}

function splitCompanyResearch(raw: string, domain: string) {
  const company = extractSection(raw, 'COMPANY_OVERVIEW', 'HIRING_AND_WORKFLOW_SIGNALS');
  const jobs = extractSection(raw, 'HIRING_AND_WORKFLOW_SIGNALS', 'AI_USE_CASES');
  const useCases = extractSection(raw, 'AI_USE_CASES', 'INDUSTRY_GROWTH_SIGNALS');
  const growthSignals = extractSection(raw, 'INDUSTRY_GROWTH_SIGNALS', 'SOURCE_NOTES');
  const sourceNotes = extractSection(raw, 'SOURCE_NOTES');

  return {
    domain,
    company:
      company ||
      `${titleFromDomain(domain)} appears to need a live operating-model review before AI opportunities are ranked.`,
    jobs:
      jobs ||
      'Hiring and workflow signals were not available in the quick scan. Confirm current roles, handoffs, and repetitive work in discovery.',
    useCases:
      useCases ||
      'Start with revenue operations, service quality, knowledge work, and back-office throughput. Baseline metrics before estimating value.',
    growthSignals:
      growthSignals ||
      'Public growth signals were limited in the quick scan. Validate demand sources, customer segments, service expectations, margin pressure, and competitive motion in discovery.',
    sourceNotes:
      sourceNotes ||
      'Source coverage unavailable in the quick scan. Use the company website, public market reports, job postings, and customer-facing pages during follow-up.',
    sources: [] as { url: string; publisher?: string }[],
    researchedAt: new Date().toISOString(),
  };
}

function sourceFromUrl(url: string): { url: string; publisher?: string } | null {
  try {
    const parsed = new URL(url);
    return {
      url,
      publisher: parsed.hostname.replace(/^www\./, ''),
    };
  } catch {
    return null;
  }
}

async function captureDiscoverLead(params: {
  name?: string;
  email: string;
  company: string;
  companyUrl: string;
  domain: string;
}) {
  const safeName = escapeHtml(params.name || 'Not provided');
  const safeEmail = escapeHtml(params.email);
  const safeCompany = escapeHtml(params.company);
  const safeUrl = escapeHtml(params.companyUrl);
  const safeDomain = escapeHtml(params.domain);

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;color:#0f172a;">
      <p style="margin:0;color:#0f766e;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">ClearForge AI Value Map</p>
      <h1 style="margin:8px 0 12px;font-size:22px;line-height:1.25;">New website assessment started</h1>
      <table style="width:100%;border-collapse:collapse;margin-top:18px;">
        <tr><td style="padding:7px 0;font-weight:700;width:120px;">Company</td><td style="padding:7px 0;">${safeCompany}</td></tr>
        <tr><td style="padding:7px 0;font-weight:700;">Website</td><td style="padding:7px 0;"><a href="${safeUrl}" style="color:#0f766e;">${safeDomain}</a></td></tr>
        <tr><td style="padding:7px 0;font-weight:700;">Email</td><td style="padding:7px 0;"><a href="mailto:${safeEmail}" style="color:#0f766e;">${safeEmail}</a></td></tr>
        <tr><td style="padding:7px 0;font-weight:700;">Name</td><td style="padding:7px 0;">${safeName}</td></tr>
      </table>
      <p style="margin-top:20px;color:#475569;line-height:1.6;">The visitor entered a company website. ClearForge should follow up even if they leave before generating the final report.</p>
    </div>
  `;

  const resend = getResendClient();
  const emailPromise = resend
    ? resend.emails.send({
        from: 'ClearForge <website@clearforge.ai>',
        to: getLeadRecipients(),
        replyTo: params.email,
        subject: `AI Value Map Started: ${params.company}`,
        html,
      })
    : Promise.resolve(null);

  const savePromise = saveDiscoverLead({
    name: params.name,
    email: params.email,
    company: params.company,
    company_url: params.companyUrl,
    domain: params.domain,
    source: 'discover_website_started',
  });

  const results = await Promise.allSettled([emailPromise, savePromise]);
  for (const result of results) {
    if (result.status === 'rejected') {
      logServerError('Discover lead capture failed', result.reason);
    }
  }
}

/**
 * POST /api/discover/research
 *
 * Takes a company website URL and lead details, captures the lead, then uses
 * one concise Perplexity call to research:
 * 1. What the company does (value chain analysis)
 * 2. Industry-specific AI use cases
 * 3. Job postings (automation opportunities)
 * 4. Company size, revenue signals, tech stack hints
 *
 * Returns structured intelligence for the Forge Intelligence agent.
 */
export async function POST(request: Request) {
  try {
    if (isRateLimited(request.headers, 'discover-research', 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many research requests. Please try again later.' },
        { status: 429 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const submittedUrl = normalizeString(body.url, 300);
    const company = normalizeString(body.company, 160);
    const email = normalizeString(body.email, 200).toLowerCase();
    const name = normalizeString(body.name, 160);

    const companyUrl = normalizePublicCompanyUrl(submittedUrl);
    if (!companyUrl) {
      return NextResponse.json(
        { error: 'Please enter a valid public company website.' },
        { status: 400 },
      );
    }

    if (!company) {
      return NextResponse.json({ error: 'Company name is required.' }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid work email is required.' }, { status: 400 });
    }

    const domain = companyUrl.hostname.replace(/^www\./, '');
    const leadCapture = captureDiscoverLead({
      name: name || undefined,
      email,
      company,
      companyUrl: companyUrl.toString(),
      domain,
    });

    const perplexityKey = process.env.PERPLEXITY_API_KEY;
    if (!perplexityKey) {
      await leadCapture;
      return NextResponse.json({ ...splitCompanyResearch('', domain), fallback: true });
    }

    const companyResearch = await perplexityCompanyResearch(perplexityKey, domain, company);
    await leadCapture;

    return NextResponse.json(companyResearch);
  } catch (error) {
    logServerError('Research API error:', error);
    return NextResponse.json(
      {
        error: 'Research failed',
        fallback: true,
      },
      { status: 200 },
    );
  }
}

async function perplexityCompanyResearch(apiKey: string, domain: string, company: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PERPLEXITY_TIMEOUT_MS);

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content:
              'You are a concise business analyst. Use public evidence, avoid hype, and do not invent ROI or unsupported numbers.',
          },
          {
            role: 'user',
            content: `Research ${company} at ${domain} for an AI value-map pre-assessment.

Return exactly these three labeled sections:

COMPANY_OVERVIEW:
- What the company sells, who buys it, apparent operating model, value chain, scale signals, and notable constraints.

HIRING_AND_WORKFLOW_SIGNALS:
- Current hiring, roles, handoffs, service, sales, operations, finance, support, or repetitive knowledge-work signals. If hiring data is limited, state that and infer only common workflow areas for this type of company.

AI_USE_CASES:
- The most practical AI/automation use cases for this company. For each, name workflow owner, baseline metric, adoption requirement, control needed, and evidence required before estimating value.

INDUSTRY_GROWTH_SIGNALS:
- Where growth or margin improvement appears to be coming from in this company's industry right now. Mention demand shifts, buyer behavior, channel mix, pricing, service expectations, regulation, technology adoption, consolidation, or scale economics only when supported by public evidence.

SOURCE_NOTES:
- List 3-5 public sources or source types used for the growth signals. Prefer URLs when available.

Keep the full answer under 900 words. Be specific, but write for a CEO/COO scanning quickly.`,
          },
        ],
        max_tokens: 1800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logServerError('Perplexity error:', errorText);
      return splitCompanyResearch('', domain);
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || '';
    const citations = Array.isArray(data.citations)
      ? data.citations
          .filter((url: unknown): url is string => typeof url === 'string')
          .map(sourceFromUrl)
          .filter(
            (
              source: { url: string; publisher?: string } | null,
            ): source is {
              url: string;
              publisher?: string;
            } => Boolean(source),
          )
      : [];

    return {
      ...splitCompanyResearch(raw, domain),
      sources: citations.slice(0, 8),
    };
  } catch (error) {
    logServerError('Perplexity search error:', error);
    return splitCompanyResearch('', domain);
  } finally {
    clearTimeout(timeout);
  }
}
