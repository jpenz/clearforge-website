/**
 * Lead capture and notifications, wired to production infrastructure:
 * - Supabase `assessment_leads` via the existing admin client in lib/supabase
 *   (env: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY, unchanged
 *   from the V11 deployment, so production needs no new env vars)
 * - Resend notification to james@clearforge.ai (env: RESEND_API_KEY)
 * Without keys, submissions still succeed and log to the server console so
 * previews and local dev degrade gracefully.
 *
 * The exported interface is consumed by src/app/actions.ts; keep it stable.
 */

import { saveAssessmentLead, saveContactLead } from "@/lib/supabase";

export interface LeadRecord {
  type: "contact" | "scorecard";
  name: string;
  email: string;
  company?: string;
  message?: string;
  payload?: Record<string, unknown>;
}

export async function saveLead(lead: LeadRecord): Promise<void> {
  let storedId: string | null = null;

  if (lead.type === "contact") {
    storedId = await saveContactLead({
      name: lead.name,
      email: lead.email,
      company: lead.company ?? "",
      message: lead.message ?? "",
      source: "v12_contact",
    });
  } else {
    const payload = lead.payload ?? {};
    const score = Number(payload.score ?? 0);
    storedId = await saveAssessmentLead({
      name: lead.name,
      email: lead.email,
      company: lead.company ?? "",
      role: "",
      industry: "",
      challenge: "",
      composite_score: Number.isFinite(score) ? score : 0,
      maturity_level: String(payload.maturityLevel ?? ""),
      pillar_scores: (payload.pillarScores as Record<string, number>) ?? {},
      suggested_solutions: [],
      suggested_engagement: "",
      closer_report: "",
      company_research: "",
      industry_best_in_class: "",
      source: "v12_scorecard",
    });
  }

  if (!storedId) {
    // No Supabase env (preview/local) or insert failure: keep the graceful
    // contract and leave an operator trail either way.
    console.info("[lead:unstored]", JSON.stringify(lead));
  }
}

export async function sendNotification(
  subject: string,
  text: string,
): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const to = process.env.RESEND_TO_EMAIL ?? "james@clearforge.ai";
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ClearForge <website@clearforge.ai>",
        to: [to],
        subject,
        text,
      }),
    });
  } catch {
    // Notifications are best-effort; the lead is already stored.
  }
}
