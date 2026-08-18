"use server";

import { saveLead, sendNotification } from "@/lib/leads";

export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Fallback message form on /contact. */
export async function sendContactMessage(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Name, work email, and message are required.",
    };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "That email does not look right." };
  }

  try {
    await saveLead({ type: "contact", name, email, company, message });
    await sendNotification(
      "New contact message",
      `From: ${name} <${email}>\nCompany: ${company || "n/a"}\n\n${message}`,
    );
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "The message did not send. Retry, or book a call instead.",
    };
  }
}

/** Name/email/company unlock form on the scorecard results readout. */
export async function unlockScoreReport(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const score = String(formData.get("score") ?? "").trim();
  const pillars = String(formData.get("pillars") ?? "").trim();

  if (!name || !email || !company) {
    return {
      status: "error",
      message: "Name, work email, and company are required.",
    };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "That email does not look right." };
  }

  try {
    await saveLead({
      type: "scorecard",
      name,
      email,
      company,
      payload: { score, pillars },
    });
    await sendNotification(
      "New scorecard unlock",
      `From: ${name} <${email}>\nCompany: ${company}\nScore: ${score}\nPillars: ${pillars}`,
    );
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "The report did not unlock. Retry in a moment.",
    };
  }
}
