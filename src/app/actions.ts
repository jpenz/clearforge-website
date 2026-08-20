"use server";

import { headers } from "next/headers";
import { saveLead, sendNotification } from "@/lib/leads";
import { isRateLimited } from "@/lib/rate-limit";
import { saveRfpFile } from "@/lib/supabase";
import { validateUpload } from "@/lib/uploads";

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

  // Honeypot: bots fill the hidden field; humans never see it.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "success" };
  }
  if (isRateLimited(await headers(), "contact", 5, 60_000)) {
    return { status: "error", message: "Too many messages. Try again shortly." };
  }

  let rfpPath: string | null = null;
  let rfpName = "";
  const rfp = formData.get("rfp");
  if (rfp instanceof File && rfp.size > 0) {
    const checked = await validateUpload(rfp);
    if (!checked.ok) return { status: "error", message: checked.reason };
    rfpPath = await saveRfpFile(
      checked.originalName,
      checked.contentType,
      checked.data,
    );
    rfpName = checked.originalName;
  }

  try {
    await saveLead({
      type: "contact",
      name,
      email,
      company,
      message,
      payload: rfpPath ? { rfpPath } : undefined,
    });
    await sendNotification(
      rfpPath ? "New contact message + RFP attached" : "New contact message",
      `From: ${name} <${email}>\nCompany: ${company || "n/a"}${rfpPath ? `\nRFP "${rfpName}" in storage: rfps/${rfpPath}` : ""}\n\n${message}`,
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

/** Three-step project-brief intake at /start. */
export async function startProject(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "success" };
  }
  if (isRateLimited(await headers(), "start-project", 5, 60_000)) {
    return { status: "error", message: "Too many submissions. Try again shortly." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const companyUrl = String(formData.get("companyUrl") ?? "").trim();
  const needs = formData.getAll("needs").map(String).filter(Boolean);
  const timeline = String(formData.get("timeline") ?? "").trim();
  const success = String(formData.get("success") ?? "").trim();

  if (!name || !email || !company) {
    return {
      status: "error",
      message: "Name, work email, and company are required.",
    };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "That email does not look right." };
  }

  let rfpPath: string | null = null;
  let rfpName = "";
  const rfp = formData.get("rfp");
  if (rfp instanceof File && rfp.size > 0) {
    const checked = await validateUpload(rfp);
    if (!checked.ok) return { status: "error", message: checked.reason };
    rfpPath = await saveRfpFile(
      checked.originalName,
      checked.contentType,
      checked.data,
    );
    rfpName = checked.originalName;
  }

  const brief = [
    `Needs: ${needs.join(", ") || "not specified"}`,
    `Timeline: ${timeline || "not specified"}`,
    companyUrl ? `Company URL: ${companyUrl}` : "",
    role ? `Role: ${role}` : "",
    "",
    `What success looks like: ${success || "not specified"}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await saveLead({
      type: "contact",
      name,
      email,
      company,
      message: brief,
      payload: rfpPath ? { rfpPath } : undefined,
    });
    await sendNotification(
      rfpPath ? "New project brief + file attached" : "New project brief",
      `From: ${name} <${email}>\nCompany: ${company}${rfpPath ? `\nFile "${rfpName}" in storage: rfps/${rfpPath}` : ""}\n\n${brief}`,
    );
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "The brief did not send. Retry, or book a call instead.",
    };
  }
}
