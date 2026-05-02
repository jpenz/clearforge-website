import { NextResponse } from 'next/server';
import { isRateLimited } from '@/lib/rate-limit';
import { saveAssessmentLead } from '@/lib/supabase';
import { normalizePublicCompanyUrl } from '@/lib/url-safety';

function normalize(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function normalizePillarScores(value: unknown): Record<string, number> {
  if (Array.isArray(value)) {
    return Object.fromEntries(
      value
        .map((pillar) => {
          const key = normalize((pillar as { key?: unknown }).key);
          const percentage = (pillar as { percentage?: unknown }).percentage;
          return key && typeof percentage === 'number' ? [key, Math.round(percentage)] : undefined;
        })
        .filter((entry): entry is [string, number] => !!entry),
    );
  }

  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).filter((entry): entry is [string, number] => {
        const [, score] = entry;
        return typeof score === 'number' && Number.isFinite(score);
      }),
    );
  }

  return {};
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request.headers, 'scorecard-submit', 20, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const answers = body.answers;
    const results = body.results;
    const source = normalize(body.source);
    const name = normalize(body.name);
    const email = normalize(body.email);
    const company = normalize(body.company);

    if (!isRecord(answers) || !isRecord(results)) {
      const score = body.score;
      const maturity = normalize(body.maturityLevel);

      if (!name || !email || !company || typeof score !== 'number' || !maturity) {
        return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
      }

      if (!validateEmail(email)) {
        return NextResponse.json({ error: 'Please provide a valid email.' }, { status: 400 });
      }

      const leadId = await saveAssessmentLead({
        name,
        email,
        company,
        role: '',
        industry: '',
        challenge: 'Scorecard results request',
        composite_score: Math.round(score),
        maturity_level: maturity,
        pillar_scores: normalizePillarScores(body.pillarScores),
        suggested_solutions: [],
        suggested_engagement: '',
        closer_report: '',
        company_research: '',
        industry_best_in_class: '',
        source: 'scorecard-results-gate',
      });

      return NextResponse.json({ success: true, leadSaved: !!leadId });
    }

    const compositeScore = results.compositeScore;
    const maturityLevel = results.maturityLevel;
    const segment = results.segment;

    if (typeof compositeScore !== 'number' || typeof maturityLevel !== 'string') {
      return NextResponse.json({ error: 'Invalid scorecard result payload.' }, { status: 400 });
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      source: source || 'scorecard-form',
      score: compositeScore,
      maturityLevel,
      segment: typeof segment === 'string' ? segment : undefined,
    });
  } catch (error) {
    console.error('Scorecard submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (isRateLimited(request.headers, 'scorecard-lead', 10, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;

    const email = normalize(body.email);
    const company = normalize(body.company);
    const companyUrl = normalize(body.companyUrl);
    const painPoint = normalize(body.painPoint);
    const scorecard = isRecord(body.scorecard) ? body.scorecard : undefined;

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'A valid work email is required.' }, { status: 400 });
    }

    // Backward-compatible mode for the old results gate implementation.
    if (!painPoint && isRecord(body.results)) {
      return NextResponse.json({ success: true });
    }

    if (painPoint.length < 20) {
      return NextResponse.json(
        { error: 'Please share at least 20 characters for the pain point.' },
        { status: 400 },
      );
    }

    const publicCompanyUrl = companyUrl ? normalizePublicCompanyUrl(companyUrl) : null;
    if (companyUrl && !publicCompanyUrl) {
      return NextResponse.json(
        { error: 'Please provide a valid public company website.' },
        { status: 400 },
      );
    }

    const leadId = await saveAssessmentLead({
      name: email,
      email,
      company,
      role: '',
      industry: '',
      challenge: painPoint,
      company_url: publicCompanyUrl?.toString(),
      composite_score: typeof scorecard?.compositeScore === 'number' ? scorecard.compositeScore : 0,
      maturity_level: normalize(scorecard?.maturityLevel),
      pillar_scores: normalizePillarScores(scorecard?.pillarScores),
      suggested_solutions: [],
      suggested_engagement: '',
      closer_report: '',
      company_research: '',
      industry_best_in_class: '',
      source: 'scorecard-qualified-lead',
    });

    return NextResponse.json({ success: true, leadSaved: !!leadId });
  } catch (error) {
    console.error('Scorecard lead capture error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
