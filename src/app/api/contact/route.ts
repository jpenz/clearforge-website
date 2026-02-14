import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, revenue, message } = body;

    if (!name || !email || !company || !revenue || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // TODO: Connect to CRM (HubSpot, Supabase, etc.)
    // For now, log the submission
    console.log("Contact form submission:", {
      name,
      email,
      company,
      revenue,
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
