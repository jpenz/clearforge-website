import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  BRIEF_PROGRESS_STEPS,
  DETAILED_PROGRESS_STEPS,
  streamAnalysis,
  type AnalysisEvent,
} from "./analysis";

/** Drive the async generator to completion with fake timers. */
async function collect(
  generator: AsyncGenerator<AnalysisEvent>,
): Promise<AnalysisEvent[]> {
  const events: AnalysisEvent[] = [];
  for (;;) {
    const pending = generator.next();
    await vi.runAllTimersAsync();
    const result = await pending;
    if (result.done) break;
    events.push(result.value);
  }
  return events;
}

beforeEach(() => {
  vi.useFakeTimers();
  // Force the deterministic simulated analyst in tests.
  vi.stubEnv("OPENAI_API_KEY", "");
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

describe("streamAnalysis brief mode", () => {
  it("yields progress, then 4 fields, then done, with the approved build window", async () => {
    const events = await collect(
      streamAnalysis("an industrial manufacturer", "brief"),
    );

    const progress = events.filter((event) => event.type === "progress");
    expect(progress.map((event) => event.label)).toEqual(BRIEF_PROGRESS_STEPS);

    const fields = events.filter((event) => event.type === "field");
    expect(fields.map((event) => event.key)).toEqual([
      "workflow",
      "manualSteps",
      "candidate",
      "window",
    ]);
    // The only non-illustrative number is the approved fact.
    expect(fields.at(-1)?.value).toBe("10 to 14 weeks");

    expect(events.at(-1)).toEqual({ type: "done" });
  });

  it("is deterministic for the same target", async () => {
    const first = await collect(streamAnalysis("acme-widgets.com", "brief"));
    const second = await collect(streamAnalysis("acme-widgets.com", "brief"));
    expect(first).toEqual(second);
  });

  it("routes a services target to the services profile", async () => {
    const events = await collect(
      streamAnalysis("a commercial services firm", "brief"),
    );
    const workflow = events.find(
      (event) => event.type === "field" && event.key === "workflow",
    );
    expect(workflow && "value" in workflow ? workflow.value : "").toBe(
      "Lead intake to scheduled job",
    );
  });
});

describe("streamAnalysis detailed mode", () => {
  it("yields 4 progress steps, then 4 detailed fields, then done", async () => {
    const events = await collect(
      streamAnalysis("a commercial services firm", "detailed"),
    );

    const progress = events.filter((event) => event.type === "progress");
    expect(progress.map((event) => event.label)).toEqual(
      DETAILED_PROGRESS_STEPS,
    );

    const fields = events.filter((event) => event.type === "field");
    expect(fields.map((event) => event.key)).toEqual([
      "workflow",
      "handoffs",
      "fits",
      "measure",
    ]);

    expect(events.at(-1)).toEqual({ type: "done" });
  });
});
