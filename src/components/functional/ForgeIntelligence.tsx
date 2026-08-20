"use client";

import { useState } from "react";
import { useAnalysisStream } from "@/hooks/useAnalysisStream";
import { DETAILED_PROGRESS_STEPS } from "@/lib/analysis";
import { BookCallButton } from "@/components/functional/BookCallButton";

const FIELD_ROWS: Array<{ key: string; label: string }> = [
  { key: "workflow", label: "Workflow identified" },
  { key: "handoffs", label: "Manual handoffs" },
  { key: "fits", label: "Where an AI system fits" },
  { key: "measure", label: "What we would measure" },
];

const SAMPLES = [
  "Industrial manufacturer",
  "Commercial services firm",
  "PE portfolio company",
];

/**
 * The full-page free workflow-mapping instrument on /discover.
 * Streams a detailed analysis from /api/hero-analyze.
 */
export function ForgeIntelligence() {
  const { status, target, progress, fields, run, live } =
    useAnalysisStream("detailed");
  const [input, setInput] = useState("");

  const running = status === "running" || status === "streaming";
  const statusTag =
    status === "idle"
      ? "Ready"
      : status === "done"
        ? "Complete"
        : status === "error"
          ? "Stopped"
          : "Running";

  return (
    <div className="border border-ink bg-white">
      {/* Instrument header strip */}
      <div className="flex items-center justify-between border-b border-ink px-4 py-3.5 md:px-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-block size-[7px] bg-cobalt"
          />
          <span className="text-[11px] font-medium tracking-[0.18em] text-ink/60 uppercase">
            ForgeIntelligence · Streaming analysis
          </span>
        </div>
        <span className="text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase">
          {live ? "Live analysis" : "Illustrative"}
        </span>
      </div>

      {/* Input row */}
      <div className="border-b border-hairline px-4 py-6 md:px-6">
        <form
          className="flex flex-col gap-4 md:flex-row md:items-end"
          onSubmit={(event) => {
            event.preventDefault();
            void run(input);
          }}
        >
          <div className="grow">
            <label
              className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase"
              htmlFor="company-url"
            >
              Company URL
            </label>
            <input
              id="company-url"
              name="url"
              type="text"
              autoComplete="url"
              placeholder="yourcompany.com"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="w-full border border-ink bg-white px-3.5 py-2.5 text-[14px] text-ink placeholder:text-ink/45"
            />
          </div>
          <button
            type="submit"
            disabled={running}
            className="cursor-pointer bg-cobalt px-6 py-[11px] text-[14px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-cobalt-press disabled:opacity-40"
          >
            Map the workflow
          </button>
        </form>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase">
            Or try
          </span>
          {SAMPLES.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => void run(sample)}
              className="cursor-pointer border border-hairline-strong px-3 py-1.5 text-[13px] text-ink transition-colors hover:border-ink"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Streaming readout */}
      <div className="grid lg:grid-cols-[380px_1fr]" aria-live="polite">
        {/* Progress column */}
        <div className="border-b border-hairline lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3 md:px-6">
            <span className="text-[11px] font-medium tracking-[0.18em] text-ink/60 uppercase">
              Progress
            </span>
            <span
              className={`text-[11px] font-medium tracking-[0.14em] uppercase ${
                status === "error" ? "text-ink" : "text-cobalt"
              }`}
            >
              {statusTag}
            </span>
          </div>
          <div className="flex flex-col gap-5 px-4 py-6 md:px-6">
            <div className="relative mb-1 h-[2px] bg-hairline">
              {running && (
                <span className="cf-progress-bar absolute inset-y-0 left-0 bg-cobalt" />
              )}
              {status === "done" && (
                <span className="absolute inset-y-0 left-0 w-full bg-cobalt" />
              )}
            </div>
            {DETAILED_PROGRESS_STEPS.map((step, index) => {
              const arrived = index < progress.length;
              const isActive =
                arrived && index === progress.length - 1 && running;
              if (!arrived && status === "idle") {
                return (
                  <div key={step} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-block size-[7px] shrink-0 bg-hairline-strong"
                    />
                    <span className="text-[14px] text-ink/60">{step}</span>
                  </div>
                );
              }
              if (!arrived) return null;
              return (
                <div key={step} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-block size-[7px] shrink-0 bg-cobalt"
                  />
                  <span
                    className={`text-[14px] ${
                      isActive ? "font-semibold text-ink" : "text-ink/80"
                    }`}
                  >
                    {step}
                  </span>
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="inline-block h-[16px] w-[9px] bg-cobalt motion-safe:animate-pulse"
                    />
                  ) : (
                    <span className="ml-auto text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                      Done
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Analysis fields */}
        <div className="flex min-h-[280px] flex-col divide-y divide-hairline">
          {status === "idle" && (
            <div className="flex grow items-center px-4 py-8 md:px-8">
              <p className="max-w-[46ch] text-[14px] leading-relaxed text-ink/60">
                The map renders here. Paste your company URL or pick a sample,
                and the agent will name the workflow, the manual handoffs, and
                where an AI system fits.
              </p>
            </div>
          )}
          {status === "error" && (
            <div className="flex grow flex-col justify-center px-4 py-8 md:px-8">
              <div className="border-l-2 border-ink pl-4">
                <p className="text-[15px] leading-relaxed font-medium">
                  The analysis did not complete.
                </p>
                <p className="mt-2 max-w-[44ch] text-[14px] leading-relaxed text-ink/70">
                  Retry, or book a call and we will run it live.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => void run(target)}
                  className="cursor-pointer text-[13px] font-semibold text-cobalt underline underline-offset-4"
                >
                  Retry
                </button>
                <BookCallButton variant="quiet" />
              </div>
            </div>
          )}
          {(status === "running" ||
            status === "streaming" ||
            status === "done") &&
            FIELD_ROWS.map((row) => {
              const value = fields[row.key];
              if (!value) return null;
              return (
                <div key={row.key} className="px-4 py-5 md:px-8">
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase">
                      {row.label}
                    </span>
                    {!live && (
                      <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                        Illustrative
                      </span>
                    )}
                  </div>
                  <p className="tnum text-[14px] leading-relaxed text-ink/80">
                    {value}
                  </p>
                </div>
              );
            })}
          {status === "running" && progress.length > 0 && (
            <div className="flex grow items-center px-4 py-5 md:px-8">
              <p className="tnum text-[13px] text-ink/60">
                Analyzing {target}…
              </p>
            </div>
          )}
          {status === "done" && (
            <div className="flex items-center justify-between gap-6 px-4 py-5 md:px-8">
              <p className="text-[13px] text-ink/70">
                Map complete. The fixed-fee Diagnostic prices the next step.
              </p>
              <BookCallButton size="md" className="shrink-0" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
