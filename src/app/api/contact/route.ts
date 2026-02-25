import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, company, revenue, message, website } = body;

    // Honeypot
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !company || !revenue || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (name.length > 200 || email.length > 200 || company.length > 200 || revenue.length > 100 || message.length > 5000) {
      return NextResponse.json(
        { error: "One or more fields exceed the maximum length." },
        { status: 400 }
      );
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeCompany = sanitize(company);
    const safeRevenue = sanitize(revenue);
    const safeMessage = sanitize(message);

    const emailHtml = `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #2D2D2D;">
        <div style="background: #0F1A2E; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #B8860B; font-size: 20px; margin: 0;">New ClearForge Inquiry</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 4px 0 0;">clearforge.ai contact form</p>
        </div>
        <div style="padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 100px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Company</td>
              <td style="padding: 8px 0;">${safeCompany}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Revenue</td>
              <td style="padding: 8px 0;">${safeRevenue}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #0F1A2E;">${safeEmail}</a></td>
            </tr>
          </table>
          <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; border-left: 3px solid #B8860B;">
            <p style="font-weight: 600; margin: 0 0 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6B7280;">Message</p>
            <p style="margin: 0; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="margin-top: 24px; font-size: 13px; color: #6B7280;">
            Reply directly to this email to respond to ${safeName}.
          </p>
        </div>
      </div>
    `;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY for contact form email delivery.");
      return NextResponse.json(
        { error: "Email delivery is not configured yet. Please email us directly." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "ClearForge <website@clearforge.ai>",
      to: ["james@clearforge.ai"],
      replyTo: email,
      subject: `ClearForge Inquiry: ${safeName} - ${safeCompany}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please email us directly." },
      { status: 500 }
    );
  }
}
