/**
 * The analyst behind /api/hero-analyze, the HeroAgent card, and /discover.
 * Ships with a deterministic simulated profile (every value rendered with an
 * "illustrative" tag). If OPENAI_API_KEY is set, the brief profile comes from
 * a real model call behind the same stream contract; on any failure it falls
 * back to the simulation.
 */

export type AnalysisMode = "brief" | "detailed";

export type BriefFieldKey = "workflow" | "manualSteps" | "candidate" | "window";
export type DetailedFieldKey = "workflow" | "handoffs" | "fits" | "measure";
export type AnalysisFieldKey = BriefFieldKey;

export type AnalysisEvent =
  | { type: "progress"; label: string }
  | { type: "field"; key: string; value: string }
  | { type: "done" }
  | { type: "error" };

interface AnalysisProfile {
  workflow: string;
  manualSteps: string;
  candidate: string;
  detailed: Record<DetailedFieldKey, string>;
}

export const BRIEF_PROGRESS_STEPS = [
  "Reading site structure",
  "Mapping revenue workflow",
  "Locating manual handoffs",
];

export const DETAILED_PROGRESS_STEPS = [
  "Reading site structure",
  "Identifying core workflow",
  "Mapping handoffs",
  "Drafting system outline",
];

/** Approved fact: 10 to 14 weeks from kickoff to a live production system. */
const BUILD_WINDOW = "10 to 14 weeks";

const PROFILES: AnalysisProfile[] = [
  {
    workflow: "Inbound quote to order",
    manualSteps: "14",
    candidate: "Quote desk agent",
    detailed: {
      workflow:
        "Inbound quote requests. Specs arrive by email, get re-keyed into the ERP, then wait on an engineer for review.",
      handoffs:
        "Four. Email intake, spec re-entry, pricing lookup, and final engineering sign-off.",
      fits: "A quote desk agent drafts each quote from the inbound spec. Engineers review instead of re-keying.",
      measure:
        "Quote turnaround time and weekly-active use, against the 70 percent adoption bar by day 90.",
    },
  },
  {
    workflow: "Lead intake to scheduled job",
    manualSteps: "11",
    candidate: "Intake and scheduling agent",
    detailed: {
      workflow:
        "Lead intake. Requests arrive by phone and web form, then wait on manual triage before a crew is scheduled.",
      handoffs:
        "Three. Intake triage, quote assembly, and schedule confirmation.",
      fits: "An intake and scheduling agent drafts the quote and proposes crew slots. Dispatch reviews instead of triaging.",
      measure:
        "Time from inquiry to quote and weekly-active use, against the 70 percent adoption bar by day 90.",
    },
  },
  {
    workflow: "Portfolio reporting roll-up",
    manualSteps: "12",
    candidate: "Reporting roll-up agent",
    detailed: {
      workflow:
        "Portfolio reporting. Each company reports its own way, then an associate re-assembles the roll-up by hand.",
      handoffs:
        "Four. Data collection, normalization, narrative drafting, and final review.",
      fits: "A reporting roll-up agent assembles the draft from each company's submissions. The operating team reviews instead of re-keying.",
      measure:
        "Roll-up cycle time and weekly-active use, against the 70 percent adoption bar by day 90.",
    },
  },
];

function pickProfile(target: string): AnalysisProfile {
  const t = target.toLowerCase();
  if (t.includes("industrial") || t.includes("distribut") || t.includes("manufactur")) {
    return PROFILES[0];
  }
  if (t.includes("service")) return PROFILES[1];
  if (t.includes("portfolio") || t.includes("pe ")) return PROFILES[2];
  let hash = 0;
  for (const ch of t) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return PROFILES[Math.abs(hash) % PROFILES.length];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function llmBriefProfile(
  target: string,
): Promise<Pick<AnalysisProfile, "workflow" | "manualSteps" | "candidate"> | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You map one revenue workflow for a mid-market company and name a candidate AI system for it. Reply with strict JSON only.",
          },
          {
            role: "user",
            content: `Company: ${target}. Return JSON {"workflow": string (max 5 words, a revenue workflow), "manualSteps": string (an integer between 8 and 20, as a string), "candidate": string (max 5 words, a named AI agent)}`,
          },
        ],
      }),
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const parsed = JSON.parse(
      data.choices?.[0]?.message?.content ?? "",
    ) as Record<string, unknown>;
    if (
      typeof parsed.workflow === "string" &&
      typeof parsed.manualSteps === "string" &&
      typeof parsed.candidate === "string"
    ) {
      return {
        workflow: parsed.workflow,
        manualSteps: parsed.manualSteps,
        candidate: parsed.candidate,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function* streamAnalysis(
  target: string,
  mode: AnalysisMode = "brief",
): AsyncGenerator<AnalysisEvent> {
  const steps =
    mode === "detailed" ? DETAILED_PROGRESS_STEPS : BRIEF_PROGRESS_STEPS;
  for (const label of steps) {
    yield { type: "progress", label };
    await sleep(650);
  }

  const profile = pickProfile(target);

  if (mode === "detailed") {
    const fields: Array<{ key: DetailedFieldKey; value: string }> = [
      { key: "workflow", value: profile.detailed.workflow },
      { key: "handoffs", value: profile.detailed.handoffs },
      { key: "fits", value: profile.detailed.fits },
      { key: "measure", value: profile.detailed.measure },
    ];
    for (const field of fields) {
      yield { type: "field", key: field.key, value: field.value };
      await sleep(700);
    }
    yield { type: "done" };
    return;
  }

  const brief = (await llmBriefProfile(target)) ?? profile;
  const fields: Array<{ key: BriefFieldKey; value: string }> = [
    { key: "workflow", value: brief.workflow },
    { key: "manualSteps", value: brief.manualSteps },
    { key: "candidate", value: brief.candidate },
    { key: "window", value: BUILD_WINDOW },
  ];
  for (const field of fields) {
    yield { type: "field", key: field.key, value: field.value };
    await sleep(500);
  }

  yield { type: "done" };
}
