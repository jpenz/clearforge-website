import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Log the lead capture (in production, send to CRM/email/Supabase)
    console.log("[scorecard-lead]", JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company,
      score: data.score,
      maturityLevel: data.maturityLevel,
      segment: data.segment,
      recommendedService: data.recommendedService,
      pillarScores: data.pillarScores,
      capturedAt: new Date().toISOString(),
    }));

    // TODO: Send to Supabase, Smartlead, or email notification
    // For now, we capture to server logs

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
  }
}
