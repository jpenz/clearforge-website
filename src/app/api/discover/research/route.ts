import { NextResponse } from 'next/server';
import { isRateLimited } from '@/lib/rate-limit';
import { logServerError } from '@/lib/server-logger';
import { getCompanyDomain } from '@/lib/url-safety';

/**
 * POST /api/discover/research
 *
 * Takes a company website URL, uses Perplexity API to research:
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

    const { url } = await request.json();

    const domain = getCompanyDomain(url);
    if (!domain) {
      return NextResponse.json(
        { error: 'Please enter a valid public company website.' },
        { status: 400 },
      );
    }

    const perplexityKey = process.env.PERPLEXITY_API_KEY;
    if (!perplexityKey) {
      return NextResponse.json(
        {
          error: 'Research unavailable',
          fallback: true,
        },
        { status: 200 },
      );
    }

    // Run 3 Perplexity searches in parallel for speed
    const [companyResearch, jobsResearch, industryResearch] = await Promise.all([
      // 1. Company overview + value chain
      perplexitySearch(
        perplexityKey,
        `What does ${domain} do? Analyze their business model, value chain, key products/services, target market, approximate company size/revenue, and technology stack. Be specific about their operations and workflows.`,
      ),

      // 2. Job postings = automation opportunities
      perplexitySearch(
        perplexityKey,
        `Find current job postings or careers at ${domain}. List the roles they are hiring for, especially operations, data entry, customer service, sales, marketing, and any repetitive/manual roles. If no job postings found, describe typical roles at this type of company.`,
      ),

      // 3. Industry-specific AI use cases
      perplexitySearch(
        perplexityKey,
        `What are the most practical AI and automation use cases for a company like ${domain}? Consider their specific industry, business model, and operations. Focus on revenue operations, cost control, process automation, AI agents, and predictive analytics. For each use case, identify the workflow owner, baseline metric to measure, adoption requirement, controls, and evidence needed before estimating value. Do not estimate ROI unless sourced evidence supports it.`,
      ),
    ]);

    // Structure the intelligence
    const intelligence = {
      domain,
      company: companyResearch,
      jobs: jobsResearch,
      useCases: industryResearch,
      researchedAt: new Date().toISOString(),
    };

    return NextResponse.json(intelligence);
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

async function perplexitySearch(apiKey: string, query: string): Promise<string> {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content:
              'You are a business analyst. Provide specific, factual analysis. Include numbers, specifics, and actionable insights. Be concise but thorough.',
          },
          {
            role: 'user',
            content: query,
          },
        ],
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logServerError('Perplexity error:', errorText);
      return 'Research unavailable for this query.';
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No results found.';
  } catch (error) {
    logServerError('Perplexity search error:', error);
    return 'Research unavailable.';
  }
}
