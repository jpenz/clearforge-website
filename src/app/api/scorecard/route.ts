import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, answers, score, tier } = body;

    if (!email || !answers || score === undefined || !tier) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log the submission (will connect to Resend/Supabase later)
    console.log("=== SCORECARD SUBMISSION ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Company:", company);
    console.log("Score:", score);
    console.log("Tier:", tier);
    console.log("Answers:", JSON.stringify(answers));
    console.log("============================");

    // TODO: Store in Supabase when configured
    // const { data, error } = await supabase
    //   .from('scorecard_submissions')
    //   .insert({ name, email, company, answers, score, tier })

    // TODO: Send confirmation email via Resend
    // await resend.emails.send({ ... })

    // TODO: Push to HubSpot CRM with segment tag
    // await hubspot.contacts.create({ ... })

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Scorecard submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
