"use client";

import { useState } from "react";
import { useAnalysisStream } from "@/hooks/useAnalysisStream";
import { BookCallButton } from "@/components/functional/BookCallButton";

const FIELD_ROWS: Array<{
  key: string;
  label: string;
  illustrative: boolean;
  numeric: boolean;
}> = [
  { key: "workflow", label: "Workflow", illustrative: true, numeric: false },
  {
    key: "manualSteps",
    label: "Manual steps found",
    illustrative: true,
    numeric: true,
  },
  {
    key: "candidate",
    label: "Candidate AI system",
    illustrative: true,
    numeric: false,
  },
  {
    key: "window",
    label: "Estimated build window",
    illustrative: false,
    numeric: true,
  },
];

const SAMPLES = ["industrial distributor", "services firm", "PE portfolio co"];

/** The idle-state sample readout. Labeled illustrative as a whole. */
const SAMPLE_READOUT: Array<{
  label: string;
  value: string;
  numeric?: boolean;
}> = [
  { label: "Workflow", value: "Inbound quote to order" },
  { label: "Manual steps found", value: "14", numeric: true },
  { label: "Candidate AI system", value: "Quote desk agent" },
  { label: "Estimated build window", value: "10 to 14 weeks", numeric: true },
];

/**
 * The live streaming analysis card on the homepage. Drives idle, running,
 * streaming, done, and error states from the /api/hero-analyze stream.
 */
export function HeroAgent() {
  const { status, target, progress, fields, live, run } = useAnalysisStream("brief");
  const [input, setInput] = useState("");

  return (
    <div className="border border-ink bg-white">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <span className="text-[12px] font-semibold tracking-[0.14em] uppercase">
          Forge Intelligence preview
        </span>
        <span
          className={`tnum text-[11px] tracking-[0.14em] uppercase ${
            status === "error" ? "text-ink" : "text-cobalt"
          }`}
          aria-live="polite"
        >
          {status}
        </span>
      </div>

      <div className="relative min-h-[318px]" aria-live="polite">
        {status === "idle" && (
          <form
            className="px-5 py-6"
            onSubmit={(event) => {
              event.preventDefault();
              void run(input);
            }}
          >
            <label
              className="mb-2 block text-[11px] tracking-[0.14em] text-ink/60 uppercase"
              htmlFor="hero-agent-url"
            >
              Company URL
            </label>
            <div className="flex border border-ink">
              <input
                id="hero-agent-url"
                type="text"
                autoComplete="url"
                placeholder="yourcompany.com"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 grow bg-white px-3 py-2.5 text-[14px] outline-hidden placeholder:text-ink/40"
              />
              <button
                type="submit"
                className="cursor-pointer bg-cobalt px-4 text-[13px] font-semibold text-white transition-colors hover:bg-cobalt-press"
              >
                Analyze
              </button>
            </div>
            <p className="mt-6 mb-2 text-[11px] tracking-[0.14em] text-ink/60 uppercase">
              Or try a sample
            </p>
            <div className="flex flex-wrap gap-2">
              {SAMPLES.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => void run(sample)}
                  className="cursor-pointer border border-hairline-strong px-3 py-1.5 text-[12px] transition-colors hover:border-ink"
                >
                  {sample}
                </button>
              ))}
            </div>
            <div className="mt-7">
              <div className="mb-2 flex items-baseline justify-between text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                <span>Sample readout</span>
                <span>Illustrative</span>
              </div>
              <dl className="border-t border-hairline text-[13px]">
                {SAMPLE_READOUT.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline py-2"
                  >
                    <dt className="shrink-0 text-[10px] tracking-[0.14em] text-ink/60 uppercase">
                      {row.label}
                    </dt>
                    <dd
                      className={`text-right font-medium ${row.numeric ? "tnum" : ""}`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[12px] leading-relaxed text-ink/60">
                Maps one revenue workflow, finds the manual steps, and names a
                candidate AI system. Free. Runs in under a minute.
              </p>
            </div>
          </form>
        )}

        {status === "running" && (
          <div className="px-5 py-6">
            <div className="relative mb-6 h-px bg-hairline">
              <div className="cf-progress-bar absolute top-0 left-0 h-[2px] bg-cobalt" />
            </div>
            <p className="tnum mb-4 text-[11px] tracking-[0.14em] text-ink/60 uppercase">
              Analyzing {target}
            </p>
            <ul className="space-y-3 text-[14px]">
              {progress.map((step) => (
                <li key={step} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-block size-[7px] bg-cobalt"
                  />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(status === "streaming" || status === "done") && (
          <div className="px-5 py-6">
            <p className="mb-4 text-[11px] tracking-[0.14em] text-ink/60 uppercase">
              {status === "done" ? "Analysis complete" : "Analysis streaming"}
            </p>
            <dl className="text-[14px]">
              {FIELD_ROWS.map((row, index) => {
                const value = fields[row.key];
                if (!value) return null;
                return (
                  <div
                    key={row.key}
                    className={`flex items-baseline justify-between gap-4 py-2.5 ${
                      index < FIELD_ROWS.length - 1 || status === "done"
                        ? "border-b border-hairline"
                        : ""
                    }`}
                  >
                    <dt className="shrink-0 text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                      {row.label}
                    </dt>
                    <dd
                      className={`text-right font-medium ${row.numeric ? "tnum" : ""}`}
                    >
                      {value}
                      {row.illustrative && !live && (
                        <span className="ml-1 text-[10px] font-normal tracking-[0.1em] text-ink/60 uppercase">
                          illustrative
                        </span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
            {status === "done" && <BookCallButton size="md" className="mt-5" />}
          </div>
        )}

        {status === "error" && (
          <div className="px-5 py-6">
            <div className="mt-2 border-l-2 border-ink pl-4">
              <p className="max-w-[38ch] text-[15px] leading-relaxed font-medium">
                The analysis did not complete.
              </p>
              <p className="mt-2 max-w-[40ch] text-[14px] leading-relaxed text-ink/70">
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
      </div>
    </div>
  );
}
