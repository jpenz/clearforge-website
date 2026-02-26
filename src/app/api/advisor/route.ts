import { NextRequest, NextResponse } from "next/server";

interface AdvisorInput {
  industry?: string;
  challenge?: string;
  companyUrl?: string;
  role?: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
}

function normalize(value?: string): string {
  return value?.trim() ?? "";
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function suggestSolutions(challenge: string, industry: string): string[] {
  const lowerChallenge = challenge.toLowerCase();
  const lowerIndustry = industry.toLowerCase();
  const picks = new Set<string>(["AI Strategy & Growth Diagnosis"]);

  if (/(sales|pipeline|lead|marketing|revenue|growth)/.test(lowerChallenge)) {
    picks.add("AI Marketing & Revenue Operations");
  }

  if (/(manual|workflow|operations|service|support|crm|data|prospect|throughput|planning)/.test(lowerChallenge)) {
    picks.add("AI Agent Design & Build");
  }

  if (/(legacy|outdated|erp|migration|spreadsheet|fragmented|integration)/.test(lowerChallenge)) {
    picks.add("Legacy System Modernization");
  }

  if (/(governance|scale|security|compliance|maintenance|monitoring|adoption)/.test(lowerChallenge)) {
    picks.add("Managed AI Operations");
  }

  if (lowerIndustry.includes("manufacturing") || lowerIndustry.includes("distribution")) {
    picks.add("AI Agent Design & Build");
    picks.add("Legacy System Modernization");
  }

  if (lowerIndustry.includes("financial") || lowerIndustry.includes("healthcare")) {
    picks.add("Managed AI Operations");
  }

  if (picks.size < 2) {
    picks.add("AI Agent Design & Build");
  }

  return Array.from(picks).slice(0, 3);
}

function suggestEngagement(challenge: string, role: string, suggestedSolutions: string[]): string {
  const lowerChallenge = challenge.toLowerCase();
  const lowerRole = role.toLowerCase();

  if (suggestedSolutions.includes("Legacy System Modernization") || /(legacy|outdated|integration)/.test(lowerChallenge)) {
    return "Legacy modernization roadmap and AI pilot program (10 to 14 weeks)";
  }

  if (suggestedSolutions.includes("AI Marketing & Revenue Operations") || /(revenue|pipeline|lead|growth)/.test(lowerChallenge)) {
    return "Revenue operations acceleration engagement with AI strategy and execution (8 to 12 weeks)";
  }

  if (lowerRole.includes("ceo") || lowerRole.includes("owner") || lowerRole.includes("coo")) {
    return "Executive AI strategy sprint followed by phased implementation planning (6 to 8 weeks)";
  }

  return "AI Strategy & Growth Diagnosis with one production AI workflow launch (8 to 10 weeks)";
}

function buildFallbackRecommendation(params: {
  company: string;
  industry: string;
  suggestedEngagement: string;
  hasResearch: boolean;
}): string {
  const researchLine = params.hasResearch
    ? `${params.company} appears to be navigating a complex ${params.industry.toLowerCase()} landscape with pressure to modernize execution speed.`
    : `Without live company research, this recommendation is based on your description and common ${params.industry.toLowerCase()} operating patterns.`;

  return `## The Real Problem
Your stated challenge points to a strategy-to-execution gap, not just a tooling gap. ${researchLine} Teams often know where pain exists, but decision rights, process design, and data readiness are not aligned enough to implement AI with confidence.

## What This Is Costing You
Every quarter this remains unresolved, leadership attention is consumed by avoidable operational friction instead of growth priorities. Competitors that automate earlier improve cycle time, capture cleaner data, and reinvest savings into customer experience. That compounds into stronger margins and faster strategic moves.

## How We Would Approach This
We would start with an AI Strategy & Growth Diagnosis to establish the value case, operating constraints, and KPI baseline for ${params.company}. Next, we would deploy targeted AI Agent Design & Build work on one high-value workflow and connect it to current systems so adoption is practical from day one. Finally, we would stabilize outcomes through Managed AI Operations and, where needed, Legacy System Modernization so gains hold as volume increases.

## Where This Puts You in 12 Months
In twelve months, your team has clearer ownership, faster cycle times, and measurable productivity gains in the workflow that matters most to your economics. Leaders have a repeatable operating model for selecting and scaling AI use cases instead of one-off experiments. You are positioned as a faster, more reliable operator in your segment, with execution discipline competitors can feel.

## Recommended Next Step
The best next move is a ${params.suggestedEngagement}. We should align on scope, baseline metrics, and a 90-day delivery plan in a discovery call with your core leadership and operations stakeholders. That gives you a decision-ready roadmap and a practical path to value.`;
}

async function fetchCompanyResearch(companyUrl: string): Promise<string> {
  const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
  if (!perplexityApiKey) {
    throw new Error("PERPLEXITY_API_KEY is not configured");
  }

  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${perplexityApiKey}`,
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        {
          role: "system",
          content: "You are a business research analyst. Provide concise, factual research.",
        },
        {
          role: "user",
          content: `Research ${companyUrl}. In 300 words or less, summarize: 1) What the company does 2) Their industry and competitive position 3) Key challenges companies like them typically face with AI adoption 4) Recent news or developments if available 5) Market trends affecting their industry`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Perplexity request failed: ${details}`);
  }

  const result = await response.json();
  const content = result.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("Perplexity returned an empty response");
  }

  return content;
}

async function generateGroqRecommendation(params: {
  name: string;
  company: string;
  industry: string;
  role: string;
  challenge: string;
  companyResearch: string;
}): Promise<string> {
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const systemPrompt = `You are a senior AI strategy consultant at ClearForge.ai writing a personalized strategic recommendation for a prospective client. Write in the CLOSER framework structure but never name the framework explicitly.

Your recommendation must follow this exact structure with these section headers:

## The Real Problem
Diagnose the root issue behind their stated challenge. Use company research to make it specific. Show you understand their world. (CLARIFY + LABEL)

## What This Is Costing You
Quantify or illustrate the cost of inaction. How does leaving this unsolved affect their competitive position? Use industry-specific examples. (LABEL continued)

## How We Would Approach This
Outline a 3-phase approach ClearForge would take. Be specific to their situation, not generic. Reference relevant ClearForge solutions:
- AI Strategy & Growth Diagnosis
- AI Agent Design & Build
- Managed AI Operations
- Legacy System Modernization
- AI Marketing & Revenue Operations
(OVERVIEW)

## Where This Puts You in 12 Months
Paint the outcome picture. How does solving this position them to win in their industry? What does their operation look like after transformation? Be concrete and aspirational but realistic. (SELL THE VACATION)

## Recommended Next Step
Suggest a specific ClearForge engagement type and timeline. Close with an invitation to a discovery call. (EXPLAIN + REINFORCE)

Rules:
- Never use em dashes
- No consulting jargon (leverage, synergy, paradigm, holistic)
- Write like a senior partner explaining strategy over coffee
- Be specific to their company and industry, not generic
- If company research is provided, reference specific facts about them
- If no company research is provided, explicitly state this recommendation is based on their description
- Do not mention external tools, platforms, or vendors
- Each section should be 2-4 sentences
- Total length: 400-600 words`;

  const userPrompt = `Client: ${params.name} at ${params.company}
Industry: ${params.industry}
Role: ${params.role}
Challenge: ${params.challenge}

Company research:
${params.companyResearch}

Write the strategic recommendation following the structure in your instructions.`;

  const models = ["llama-3.3-70b-versatile", "llama-3.1-70b-versatile"];

  for (const model of models) {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error(`Groq advisor request failed for model ${model}`, details);
      continue;
    }

    const result = await response.json();
    const recommendation = result.choices?.[0]?.message?.content?.trim();

    if (recommendation) {
      return recommendation.replace(/\u2014/g, "-");
    }

    console.error(`Groq advisor response was empty for model ${model}`);
  }

  throw new Error("Groq failed to produce a recommendation");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AdvisorInput;

    const industry = normalize(body.industry);
    const challenge = normalize(body.challenge);
    const companyUrl = normalize(body.companyUrl);
    const role = normalize(body.role);
    const name = normalize(body.name);
    const email = normalize(body.email);
    const company = normalize(body.company);

    if (!industry || !challenge || !role || !name || !email || !company) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (challenge.length < 20) {
      return NextResponse.json({ error: "Please share at least 20 characters about your challenge." }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid work email." }, { status: 400 });
    }

    if (companyUrl && !isHttpUrl(companyUrl)) {
      return NextResponse.json({ error: "Company website must start with http:// or https://." }, { status: 400 });
    }

    const suggestedSolutions = suggestSolutions(challenge, industry);
    const suggestedEngagement = suggestEngagement(challenge, role, suggestedSolutions);

    let companyResearch = "No company URL provided.";
    let hasResearch = false;

    if (companyUrl) {
      try {
        companyResearch = await fetchCompanyResearch(companyUrl);
        hasResearch = true;
      } catch (error) {
        console.error("Perplexity company research failed", error);
        companyResearch = `We could not retrieve live research for ${companyUrl}. This recommendation is based on your description and industry context.`;
      }
    }

    let recommendation: string;

    try {
      recommendation = await generateGroqRecommendation({
        name,
        company,
        industry,
        role,
        challenge,
        companyResearch,
      });
    } catch (error) {
      console.error("Groq recommendation generation failed", error);
      recommendation = buildFallbackRecommendation({
        company,
        industry,
        suggestedEngagement,
        hasResearch,
      });
    }

    return NextResponse.json({
      recommendation,
      companyResearch,
      suggestedSolutions,
      suggestedEngagement,
    });
  } catch (error) {
    console.error("Advisor API error", error);
    return NextResponse.json({ error: "Failed to process advisor request." }, { status: 500 });
  }
}
