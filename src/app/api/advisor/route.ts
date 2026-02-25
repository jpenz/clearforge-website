import { NextRequest, NextResponse } from "next/server";
import { solutions } from "@/data/solutions";
import { caseStudies } from "@/data/case-studies";

interface AdvisorInput {
  industry: string;
  challenge: string;
  companySize: string;
  role: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
}

const keywordSolutionMap: Record<string, string[]> = {
  start: ["AI Strategy & Growth Diagnosis"],
  pilot: ["AI Strategy & Growth Diagnosis", "AI Agent Design & Build"],
  outdated: ["Legacy System Modernization", "AI Agent Design & Build"],
  revenue: ["AI Marketing & Revenue Operations", "Managed AI Operations"],
  qualified: ["AI Agent Design & Build", "Managed AI Operations"],
  workforce: ["AI Agent Design & Build", "Managed AI Operations"],
};

function mapSolutions(challenge: string): string[] {
  const lower = challenge.toLowerCase();
  const matched = new Set<string>();

  Object.entries(keywordSolutionMap).forEach(([keyword, mapped]) => {
    if (lower.includes(keyword)) {
      mapped.forEach((item) => matched.add(item));
    }
  });

  if (matched.size === 0) {
    matched.add("AI Strategy & Growth Diagnosis");
    matched.add("Managed AI Operations");
  }

  return Array.from(matched).slice(0, 3);
}

function mapEngagement(timeline: string): string {
  if (timeline === "ASAP") return "AI Strategy Sprint followed by focused AI Implementation";
  if (timeline === "3-6 months") return "Transformation Design followed by AI Implementation";
  if (timeline === "6-12 months") return "Transformation Design with staged Managed AI Advisory";
  return "AI Strategy Sprint";
}

function pickCaseStudy(industry: string): string {
  if (industry === "Manufacturing") {
    return caseStudies.find((item) => item.slug === "industrial-manufacturer")?.title ?? "Fortune 1000 Industrial Manufacturer";
  }
  return caseStudies.find((item) => item.slug === "metro-detroit-services-company")?.title ?? "Metro Detroit Services Company";
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AdvisorInput;
    const required = [
      body.industry,
      body.challenge,
      body.companySize,
      body.role,
      body.timeline,
      body.name,
      body.email,
      body.company,
    ];

    if (required.some((item) => !item || !item.trim())) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json({ error: "Please provide a valid work email." }, { status: 400 });
    }

    const suggestedSolutions = mapSolutions(body.challenge);
    const suggestedEngagement = mapEngagement(body.timeline);
    const caseStudyRef = pickCaseStudy(body.industry);

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({
        recommendation:
          `Thanks ${body.name}. Based on your inputs, the fastest path is to start with ${suggestedSolutions[0]} to clarify where value can be unlocked in ${body.company}. From there, we would layer ${suggestedSolutions[1] ?? "AI Agent Design & Build"} to move from planning into production execution on a priority workflow with clear KPI ownership.\n\nGiven your role as ${body.role} and target timeline of ${body.timeline}, the most practical engagement is ${suggestedEngagement}. This keeps the work tightly scoped while still creating a bridge to durable operating improvements.\n\nFor context, this is similar to how we approached ${caseStudyRef}, where we combined strategic prioritization with execution discipline and measurable outcomes. We recommend a discovery call to review your current systems, key constraints, and where your first 90-day gains are most likely.`,
        suggestedSolutions,
        suggestedEngagement,
      });
    }

    const solutionContext = solutions
      .filter((solution) => suggestedSolutions.includes(solution.title))
      .map((solution) => `${solution.title}: ${solution.tagline}`)
      .join("\n");

    const prompt = `You are a senior AI transformation consultant at ClearForge.ai.
Write a personalized recommendation in exactly 3-4 paragraphs.
Tone: warm, specific, authoritative. No buzzwords.

Client profile:
- Name: ${body.name}
- Company: ${body.company}
- Industry: ${body.industry}
- Role: ${body.role}
- Company size: ${body.companySize}
- Timeline: ${body.timeline}
- Primary challenge: ${body.challenge}

Recommended ClearForge solutions:
${suggestedSolutions.join("\n")}

Solution context:
${solutionContext}

Relevant case study reference:
${caseStudyRef}

Suggested engagement type:
${suggestedEngagement}

Requirements:
1) Paragraph 1: Diagnose the likely root issue in their context.
2) Paragraph 2: Recommend 2-3 specific ClearForge solutions and why they fit.
3) Paragraph 3: Paint the outcome picture and expected sequencing.
4) Optional paragraph 4: Reference case study relevance and close with CTA to book a discovery call.
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.45,
        messages: [
          { role: "system", content: "You are a senior ClearForge consulting advisor." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Groq advisor request failed", details);
      return NextResponse.json({ error: "Unable to generate recommendation right now." }, { status: 502 });
    }

    const result = await response.json();
    const recommendation = result.choices?.[0]?.message?.content?.trim();

    if (!recommendation) {
      return NextResponse.json({ error: "Advisor response was empty." }, { status: 502 });
    }

    return NextResponse.json({
      recommendation,
      suggestedSolutions,
      suggestedEngagement,
    });
  } catch (error) {
    console.error("Advisor API error", error);
    return NextResponse.json({ error: "Failed to process advisor request." }, { status: 500 });
  }
}
