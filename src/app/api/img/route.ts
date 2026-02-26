import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get("src");
  if (!src) return NextResponse.json({ error: "Missing src" }, { status: 400 });

  // Only allow proxying from heyboss CDN
  if (!src.startsWith("https://heyboss.heeyo.ai/")) {
    return NextResponse.json({ error: "Invalid source" }, { status: 403 });
  }

  try {
    const res = await fetch(src, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const contentType = res.headers.get("content-type") || "image/webp";
    const buffer = await res.arrayBuffer();
    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 });
  }
}
