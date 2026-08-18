import { streamAnalysis, type AnalysisMode } from "@/lib/analysis";

/**
 * NDJSON streaming endpoint behind the HeroAgent card and /discover.
 * Emits progress lines, then analysis fields one at a time, then done.
 */
export async function POST(request: Request) {
  let target = "yourcompany.com";
  let mode: AnalysisMode = "brief";
  try {
    const body = (await request.json()) as { target?: unknown; mode?: unknown };
    if (typeof body.target === "string" && body.target.trim()) {
      target = body.target.trim().slice(0, 200);
    }
    if (body.mode === "detailed") mode = "detailed";
  } catch {
    // keep defaults
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of streamAnalysis(target, mode)) {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        }
      } catch {
        controller.enqueue(
          encoder.encode(`${JSON.stringify({ type: "error" })}\n`),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
