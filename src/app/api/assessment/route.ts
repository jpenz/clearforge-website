import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { calculateResults, questions, type Answers, type ScorecardResult } from "@/lib/scorecard";

interface AssessmentInput {
  answers?: Record<string, unknown>;
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

function normalizeAnswers(value: unknown): Answers | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const answers: Answers = {};

  for (const question of questions) {
    const candidate = raw[String(question.id)];
    if (typeof candidate !== "number" || !Number.isFinite(candidate)) {
      return null;
    }

    const normalizedValue = Math.round(candidate);
    if (normalizedValue < 1 || normalizedValue > 5) {
      return null;
    }

    answers[question.id] = normalizedValue;
  }

  return answers;
}

function suggestSolutions(challenge: string, industry: string, scorecard: ScorecardResult): string[] {
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

  if (scorecard.compositeScore <= 55) {
    picks.add("AI Strategy & Growth Diagnosis");
  }

  if (picks.size < 2) {
    picks.add("AI Agent Design & Build");
  }

  return Array.from(picks).slice(0, 4);
}

function suggestEngagement(challenge: string, role: string, suggestedSolutions: string[], scorecard: ScorecardResult): string {
  const lowerChallenge = challenge.toLowerCase();
  const lowerRole = role.toLowerCase();

  if (scorecard.compositeScore <= 55) {
    return "AI Strategy & Growth Diagnosis with a 90-day readiness roadmap (4 to 6 weeks)";
  }

  if (suggestedSolutions.includes("Legacy System Modernization") || /(legacy|outdated|integration)/.test(lowerChallenge)) {
    return "Legacy modernization roadmap and AI pilot program (10 to 14 weeks)";
  }

  if (suggestedSolutions.includes("AI Marketing & Revenue Operations") || /(revenue|pipeline|lead|growth)/.test(lowerChallenge)) {
    return "Revenue operations acceleration engagement with AI strategy and execution (8 to 12 weeks)";
  }

  if (lowerRole.includes("ceo") || lowerRole.includes("owner") || lowerRole.includes("coo")) {
    return "Executive AI strategy sprint followed by phased implementation planning (6 to 8 weeks)";
  }

  return "AI readiness and opportunity program with one production workflow launch (8 to 10 weeks)";
}

async function queryPerplexity(prompt: string): Promise<string> {
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
          content:
            "You are a precise business analyst. Be concise, concrete, and avoid hype. Use plain language for operators.",
        },
        {
          role: "user",
          content: prompt,
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

async function fetchCompanyResearch(companyUrl: string, industry: string, challenge: string): Promise<string> {
  const prompt = `Research ${companyUrl}. In 280 words or less, summarize:
1) What the company appears to sell (services, products, buyers)
2) Their likely industry positioning and business model
3) Operational realities relevant to this challenge: "${challenge}"
4) 2 practical risks if they pursue AI poorly
5) 2 strategic advantages if they execute AI well

Write for an executive audience in plain language. Industry context: ${industry}.`;

  return queryPerplexity(prompt);
}

async function fetchIndustryBestInClass(industry: string, challenge: string): Promise<string> {
  const prompt = `For the ${industry} industry, define what best-in-class AI-enabled operations look like for this core pain point: "${challenge}".

Provide:
1) A 12-month target operating model snapshot
2) 5 capabilities that separate leaders from followers
3) 5 KPI ranges leaders monitor
4) Common execution mistakes to avoid
5) A practical maturity path (Now, Next, Scale)

Keep it under 320 words, practical and specific.`;

  return queryPerplexity(prompt);
}

function buildPillarSummary(scorecard: ScorecardResult): string {
  return scorecard.pillarScores
    .map((pillar) => `${pillar.name}: ${Math.round(pillar.percentage)}%`)
    .join(" | ");
}

function buildPastAttemptInference(scorecard: ScorecardResult): string {
  const ordered = [...scorecard.pillarScores].sort((a, b) => a.percentage - b.percentage);
  const weak = ordered.slice(0, 2).map((item) => item.name);
  const strong = [...ordered].reverse().slice(0, 1).map((item) => item.name);
  return `Likely friction areas: ${weak.join(" and ")}. Existing strength to build on: ${strong.join(", ")}.`;
}

function buildFallbackCloser(params: {
  challenge: string;
  company: string;
  industry: string;
  suggestedEngagement: string;
  scorecard: ScorecardResult;
  companyResearch: string;
  industryBestInClass: string;
}): string {
  const hasResearch = params.companyResearch !== "No company URL provided.";
  const researchSentence = hasResearch
    ? `${params.company} appears to operate with real pressure to move faster while staying reliable in ${params.industry}.`
    : `This guidance is based on your assessment responses and common ${params.industry} patterns because no website research was provided.`;

  return `## Why This Matters Now
You are here because "${params.challenge}" is now blocking growth and execution quality. ${researchSentence} Your score (${params.scorecard.compositeScore}/100) shows this is solvable, but it needs an operating plan, not another pilot.

## The Core Problem
The core issue is not access to AI tools. The issue is a strategy-to-execution gap where process design, team habits, and system readiness are misaligned. The result is effort without compounding business value.

## What You've Already Tried
Most teams in this position have tested disconnected tools, generated local wins, and then hit adoption stalls. This pattern often happens when ownership is split and workflow redesign is treated as an afterthought. Your readiness profile points to this same risk if the next move is not integrated.

## What Best-in-Class Looks Like
Best-in-class in ${params.industry} looks like disciplined execution with AI embedded in daily workflows, not novelty use cases. In 12 months, this means faster cycle times, clearer decision ownership, and measurable KPI lift with less operational drag. ${params.industryBestInClass}

## Concerns and How to Handle Them
Concern: "Will this become a long consulting project?" Micro-story: A portfolio operations team started with one workflow, measured weekly, and expanded only after metrics proved lift. Concern: "Will our team adopt this?" Micro-story: A services firm paired workflow redesign with role-level training and adoption exceeded prior software rollouts in one quarter.

## Recommended Next Decision
You have enough signal to act with confidence and without overcommitting. The right next step is a ${params.suggestedEngagement}. This gives you a focused 90-day execution path with clear owners, metrics, and checkpoints.`;
}

async function generateCloserReport(params: {
  name: string;
  company: string;
  industry: string;
  role: string;
  challenge: string;
  scorecard: ScorecardResult;
  companyResearch: string;
  industryBestInClass: string;
  suggestedEngagement: string;
}): Promise<string> {
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const systemPrompt = `You are a senior ClearForge advisor writing a sales-driven AI readiness plan.
Write in six sections with these exact headings:
## Why This Matters Now
## The Core Problem
## What You've Already Tried
## What Best-in-Class Looks Like
## Concerns and How to Handle Them
## Recommended Next Decision

Style rules:
- Use the prospect's own pain-point wording verbatim at least twice
- Emotional truth first, rational evidence second
- Calm confidence, no pressure language
- Use short micro-stories in the "Explain Away Concerns" section (2 concise examples)
- Mention where "pause and reflection" matter for decision quality
- Keep each section 2 to 4 sentences
- No em dashes
- No buzzwords like leverage, synergy, paradigm, holistic
- Write for a CEO/COO audience in plain language`;

  const userPrompt = `Client name: ${params.name}
Client company: ${params.company}
Role: ${params.role}
Industry: ${params.industry}
Core pain point in their words: "${params.challenge}"
Assessment score: ${params.scorecard.compositeScore}/100
Maturity level: ${params.scorecard.maturityLevel}
Pillar summary: ${buildPillarSummary(params.scorecard)}
Past-attempt inference: ${buildPastAttemptInference(params.scorecard)}
Company research: ${params.companyResearch}
Industry best-in-class benchmark: ${params.industryBestInClass}
Recommended engagement: ${params.suggestedEngagement}

Write the full strategy report in markdown with the exact headings above.`;

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
        temperature: 0.35,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error(`Groq assessment request failed for model ${model}`, details);
      continue;
    }

    const result = await response.json();
    const report = result.choices?.[0]?.message?.content?.trim();
    if (report) {
      return report.replace(/\u2014/g, "-");
    }
  }

  throw new Error("Groq failed to produce an assessment report");
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function markdownToSimpleHtml(markdown: string): string {
  const safe = escapeHtml(markdown);
  const blocks = safe
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      if (block.startsWith("## ")) {
        return `<h2 style="font-size:18px;line-height:1.3;margin:24px 0 10px;color:#0f172a;">${block.slice(3)}</h2>`;
      }

      if (block.startsWith("- ")) {
        const items = block
          .split("\n")
          .filter((line) => line.startsWith("- "))
          .map((line) => `<li style="margin:4px 0;">${line.slice(2)}</li>`)
          .join("");
        return `<ul style="padding-left:20px;color:#334155;line-height:1.65;">${items}</ul>`;
      }

      return `<p style="margin:10px 0;color:#334155;line-height:1.75;">${block.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");
}

async function sendAssessmentEmails(params: {
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  challenge: string;
  companyUrl?: string;
  scorecard: ScorecardResult;
  closerReport: string;
  suggestedEngagement: string;
  suggestedSolutions: string[];
}): Promise<boolean> {
  const resend = getResendClient();
  if (!resend) {
    console.error("RESEND_API_KEY is missing; skipping assessment email send.");
    return false;
  }

  const reportHtml = markdownToSimpleHtml(params.closerReport);
  const safeChallenge = escapeHtml(params.challenge);
  const safeIndustry = escapeHtml(params.industry);
  const safeCompany = escapeHtml(params.company);
  const safeName = escapeHtml(params.name);
  const safeRole = escapeHtml(params.role);
  const safeEngagement = escapeHtml(params.suggestedEngagement);
  const safeCompanyUrl = escapeHtml(params.companyUrl ?? "");

  const commonFooter = `
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;" />
    <p style="margin:0;color:#64748b;font-size:12px;line-height:1.6;">
      ClearForge.ai · Strategy that ships. AI that performs.<br/>
      Contact: james@clearforge.ai · https://clearforge.ai/contact
    </p>
  `;

  const userEmailHtml = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:760px;margin:0 auto;padding:24px;color:#0f172a;">
      <div style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        <div style="background:#0f172a;padding:20px 24px;">
          <p style="margin:0;color:#5eead4;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">ClearForge.ai</p>
          <h1 style="margin:8px 0 0;color:#fff;font-size:24px;line-height:1.25;">AI Readiness & Opportunity Report</h1>
        </div>
        <div style="padding:24px;">
          <p style="margin:0 0 10px;color:#334155;">Prepared for ${safeName} at ${safeCompany}.</p>
          <p style="margin:0;color:#334155;">Score: <strong>${params.scorecard.compositeScore}/100</strong> · Maturity: <strong>${escapeHtml(params.scorecard.maturityLevel)}</strong></p>
          <p style="margin:10px 0 0;color:#334155;">Industry: ${safeIndustry} · Role: ${safeRole}</p>
          <p style="margin:10px 0 0;color:#334155;">Pain point: "${safeChallenge}"</p>
          ${safeCompanyUrl ? `<p style="margin:10px 0 0;color:#334155;">Website: ${safeCompanyUrl}</p>` : ""}
          <div style="margin-top:22px;">${reportHtml}</div>
          <div style="margin-top:18px;padding:14px;border:1px solid #cbd5e1;border-radius:10px;background:#f8fafc;">
            <p style="margin:0;color:#334155;"><strong>Recommended engagement:</strong> ${safeEngagement}</p>
            <p style="margin:8px 0 0;color:#334155;"><strong>Suggested solutions:</strong> ${escapeHtml(params.suggestedSolutions.join(", "))}</p>
          </div>
          ${commonFooter}
        </div>
      </div>
    </div>
  `;

  const internalEmailHtml = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:760px;margin:0 auto;padding:24px;color:#0f172a;">
      <h1 style="margin:0 0 10px;font-size:22px;">New Assessment Lead</h1>
      <p style="margin:0;color:#334155;">${safeName} (${escapeHtml(params.email)}) · ${safeCompany}</p>
      <p style="margin:8px 0 0;color:#334155;">${safeRole} · ${safeIndustry}</p>
      <p style="margin:8px 0 0;color:#334155;">Pain point: "${safeChallenge}"</p>
      <p style="margin:8px 0 0;color:#334155;">Score: ${params.scorecard.compositeScore}/100 (${escapeHtml(params.scorecard.maturityLevel)})</p>
      <p style="margin:8px 0 0;color:#334155;">Suggested engagement: ${safeEngagement}</p>
      <div style="margin-top:18px;">${reportHtml}</div>
      ${commonFooter}
    </div>
  `;

  try {
    await resend.emails.send({
      from: "ClearForge <website@clearforge.ai>",
      to: [params.email],
      replyTo: "james@clearforge.ai",
      subject: "Your ClearForge AI Readiness & Opportunity Report",
      html: userEmailHtml,
    });

    await resend.emails.send({
      from: "ClearForge <website@clearforge.ai>",
      to: ["james@clearforge.ai"],
      replyTo: params.email,
      subject: `New Assessment Lead: ${params.name} — ${params.company}`,
      html: internalEmailHtml,
    });

    return true;
  } catch (error) {
    console.error("Assessment email send failed", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AssessmentInput;
    const answers = normalizeAnswers(body.answers);
    const industry = normalize(body.industry);
    const challenge = normalize(body.challenge);
    const companyUrl = normalize(body.companyUrl);
    const role = normalize(body.role);
    const name = normalize(body.name);
    const email = normalize(body.email);
    const company = normalize(body.company);
    const phone = normalize(body.phone);

    if (!answers) {
      return NextResponse.json({ error: "Please complete all assessment questions." }, { status: 400 });
    }

    if (!industry || !challenge || !role || !name || !email || !company) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (challenge.length < 20) {
      return NextResponse.json({ error: "Please share at least 20 characters about your pain point." }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid work email." }, { status: 400 });
    }

    if (companyUrl && !isHttpUrl(companyUrl)) {
      return NextResponse.json({ error: "Company website must start with http:// or https://." }, { status: 400 });
    }

    const scorecard = calculateResults(answers);
    const suggestedSolutions = suggestSolutions(challenge, industry, scorecard);
    const suggestedEngagement = suggestEngagement(challenge, role, suggestedSolutions, scorecard);

    let companyResearch = "No company URL provided.";
    if (companyUrl) {
      try {
        companyResearch = await fetchCompanyResearch(companyUrl, industry, challenge);
      } catch (error) {
        console.error("Assessment company research failed", error);
        companyResearch = `We could not retrieve live research for ${companyUrl}. Recommendations are based on your assessment responses and industry context.`;
      }
    }

    let industryBestInClass = "Industry benchmark unavailable right now. We will provide benchmark detail during the discovery call.";
    try {
      industryBestInClass = await fetchIndustryBestInClass(industry, challenge);
    } catch (error) {
      console.error("Assessment industry benchmark research failed", error);
    }

    let closerReport: string;
    try {
      closerReport = await generateCloserReport({
        name,
        company,
        industry,
        role,
        challenge,
        scorecard,
        companyResearch,
        industryBestInClass,
        suggestedEngagement,
      });
    } catch (error) {
      console.error("Assessment report generation failed", error);
      closerReport = buildFallbackCloser({
        challenge,
        company,
        industry,
        suggestedEngagement,
        scorecard,
        companyResearch,
        industryBestInClass,
      });
    }

    const emailSent = await sendAssessmentEmails({
      name,
      email,
      company,
      role,
      industry,
      challenge,
      companyUrl: companyUrl || undefined,
      scorecard,
      closerReport,
      suggestedEngagement,
      suggestedSolutions,
    });

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      scorecard,
      closerReport,
      companyResearch,
      industryBestInClass,
      suggestedSolutions,
      suggestedEngagement,
      emailSent,
      lead: {
        name,
        email,
        company,
        role,
        industry,
        challenge,
        companyUrl: companyUrl || undefined,
        phone: phone || undefined,
      },
    });
  } catch (error) {
    console.error("Assessment API error", error);
    return NextResponse.json({ error: "Failed to process assessment request." }, { status: 500 });
  }
}
