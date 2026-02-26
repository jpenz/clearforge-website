import { NextResponse } from "next/server";

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const answers = body.answers;
    const results = body.results;
    const source = normalize(body.source);
    const name = normalize(body.name);
    const email = normalize(body.email);
    const company = normalize(body.company);

    if (!isRecord(answers) || !isRecord(results)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const compositeScore = results.compositeScore;
    const maturityLevel = results.maturityLevel;
    const segment = results.segment;

    if (typeof compositeScore !== "number" || typeof maturityLevel !== "string") {
      return NextResponse.json({ error: "Invalid scorecard result payload." }, { status: 400 });
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }

    console.log("=== SCORECARD SUBMISSION ===");
    console.log("Source:", source || "scorecard-form");
    console.log("Name:", name || "(not provided)");
    console.log("Email:", email || "(not provided)");
    console.log("Company:", company || "(not provided)");
    console.log("Score:", compositeScore);
    console.log("Maturity:", maturityLevel);
    console.log("Segment:", typeof segment === "string" ? segment : "(not provided)");
    console.log("Answers:", JSON.stringify(answers));
    console.log("============================");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Scorecard submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const email = normalize(body.email);
    const company = normalize(body.company);
    const companyUrl = normalize(body.companyUrl);
    const painPoint = normalize(body.painPoint);
    const scorecard = isRecord(body.scorecard) ? body.scorecard : undefined;

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "A valid work email is required." }, { status: 400 });
    }

    // Backward-compatible mode for the old results gate implementation.
    if (!painPoint && isRecord(body.results)) {
      console.log("=== SCORECARD LEGACY LEAD ===");
      console.log("Email:", email);
      console.log("Segment:", normalize(body.segment));
      console.log("Results:", JSON.stringify(body.results));
      console.log("============================");
      return NextResponse.json({ success: true });
    }

    if (painPoint.length < 20) {
      return NextResponse.json({ error: "Please share at least 20 characters for the pain point." }, { status: 400 });
    }

    if (companyUrl && !isHttpUrl(companyUrl)) {
      return NextResponse.json({ error: "Company website must start with http:// or https://." }, { status: 400 });
    }

    console.log("=== SCORECARD QUALIFIED LEAD ===");
    console.log("Email:", email);
    console.log("Company:", company || "(not provided)");
    console.log("Company URL:", companyUrl || "(not provided)");
    console.log("Pain Point:", painPoint);
    console.log("Scorecard:", scorecard ? JSON.stringify(scorecard) : "(not provided)");
    console.log("================================");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Scorecard lead capture error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
