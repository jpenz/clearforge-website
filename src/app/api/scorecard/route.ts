import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, results } = body;

    if (!answers || !results) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Persist scorecard submissions when data storage is configured
    // const { data, error } = await supabase
    //   .from('scorecard_submissions')
    //   .insert({ answers, results, segment: results.segment })

    console.log("Scorecard submission:", {
      compositeScore: results.compositeScore,
      maturityLevel: results.maturityLevel,
      segment: results.segment,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, results, segment } = body;

    if (!email || !results) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Persist email + results in configured data storage
    // TODO: Send report through configured email provider
    // TODO: Push contact and segment to configured CRM

    console.log("Scorecard email capture:", {
      email,
      segment,
      compositeScore: results.compositeScore,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
