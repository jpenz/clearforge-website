/**
 * Lead capture and notifications, env-driven with graceful fallbacks:
 * - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY → inserts into the `leads` table via REST
 * - RESEND_API_KEY + RESEND_TO_EMAIL → sends a notification email
 * Without keys, submissions succeed and log to the server console.
 */

export interface LeadRecord {
  type: "contact" | "scorecard";
  name: string;
  email: string;
  company?: string;
  message?: string;
  payload?: Record<string, unknown>;
}

export async function saveLead(lead: LeadRecord): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.info("[lead]", JSON.stringify(lead));
    return;
  }
  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    throw new Error(`Lead capture failed with status ${res.status}`);
  }
}

export async function sendNotification(
  subject: string,
  text: string,
): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL;
  if (!key || !to) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ClearForge <notifications@clearforge.ai>",
        to: [to],
        subject,
        text,
      }),
    });
  } catch {
    // Notifications are best-effort; the lead is already stored.
  }
}
