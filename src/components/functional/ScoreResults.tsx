"use client";

import { useActionState } from "react";
import { unlockScoreReport, type FormState } from "@/app/actions";
import { PILLARS, type ScoreResult } from "@/data/scorecard";

const INITIAL: FormState = { status: "idle" };

const labelClass =
  "text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase";
const inputClass =
  "border border-ink bg-white px-3 py-2.5 text-[14px] text-ink placeholder:text-ink/45";

interface ScoreResultsProps {
  result: ScoreResult;
  onRetake?: () => void;
}

/**
 * The results readout: overall score, per-pillar bars, and the
 * name/email/company unlock form.
 */
export function ScoreResults({ result, onRetake }: ScoreResultsProps) {
  const [state, formAction, pending] = useActionState(
    unlockScoreReport,
    INITIAL,
  );

  return (
    <div className="border border-ink bg-white">
      {/* Slot label band */}
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3.5 md:px-6">
        <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
          ScoreResults · Your readout
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block size-[7px] bg-cobalt"
          />
          <span className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            Readout complete
          </span>
        </span>
      </div>

      {/* Two-column results */}
      <div className="grid lg:grid-cols-[480px_1fr]">
        <div className="flex flex-col border-b border-hairline lg:border-r lg:border-b-0">
          <div className="border-b border-hairline px-4 py-3 md:px-8">
            <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
              Overall readiness · Your score
            </span>
          </div>
          <div className="flex grow flex-col px-4 pt-8 pb-8 md:px-8 md:pt-10">
            <p className="tnum leading-none">
              <span className="text-[104px] font-light tracking-tight text-ink md:text-[168px]">
                {result.overall}
              </span>
              <span className="text-[32px] font-light text-ink/60 md:text-[40px]">
                /100
              </span>
            </p>
            <p className="mt-auto max-w-[36ch] border-t border-hairline pt-6 text-[16px] leading-relaxed text-ink/80">
              {result.readout}
            </p>
            {onRetake && (
              <button
                type="button"
                onClick={onRetake}
                className="mt-4 cursor-pointer self-start text-[13px] font-semibold text-cobalt underline underline-offset-4"
              >
                Retake the scorecard
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3 md:px-8">
            <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
              Per pillar
            </span>
            <span className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase">
              0 to 100
            </span>
          </div>
          <div className="flex grow flex-col divide-y divide-hairline">
            {PILLARS.map((pillar, index) => (
              <div
                key={pillar.name}
                className="flex grow items-center gap-3 px-4 py-4 md:gap-6 md:px-8"
              >
                <span className="tnum w-6 shrink-0 text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                  0{index + 1}
                </span>
                <span className="w-[130px] shrink-0 text-[13px] font-medium md:w-[180px] md:text-[14px]">
                  {pillar.name}
                </span>
                <span
                  aria-hidden="true"
                  className="relative h-px grow bg-hairline"
                >
                  <span
                    className="cf-pillar-bar absolute top-1/2 left-0 block h-[3px] -translate-y-1/2 bg-cobalt"
                    style={{ "--w": `${result.pillarScores[index]}%` } as React.CSSProperties}
                  />
                </span>
                <span className="tnum w-9 shrink-0 text-right text-[16px] font-semibold">
                  {result.pillarScores[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unlock form band */}
      <div className="border-t border-ink">
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3.5 md:px-6">
          <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
            Get the full readout
          </span>
          <span className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            3 fields · No newsletter
          </span>
        </div>
        <div className="px-4 py-6 md:px-8 md:py-8">
          {state.status === "success" ? (
            <p className="flex items-center gap-3 text-[15px] font-medium">
              <span
                aria-hidden="true"
                className="inline-block size-[7px] bg-cobalt"
              />
              Request received. The full readout comes from the founder.
            </p>
          ) : (
            <>
              <p className="text-[16px] leading-relaxed text-ink/80">
                The detailed readout explains each pillar score. Unlock it with
                your work details.
              </p>
              <form
                action={formAction}
                className="mt-6 grid items-end gap-4 md:grid-cols-[1fr_1fr_1fr_auto]"
              >
                <input type="hidden" name="score" value={result.overall} />
                <input
                  type="hidden"
                  name="pillars"
                  value={PILLARS.map(
                    (pillar, index) =>
                      `${pillar.name}: ${result.pillarScores[index]}`,
                  ).join(", ")}
                />
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass} htmlFor="unlock-name">
                    Name
                  </label>
                  <input
                    id="unlock-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass} htmlFor="unlock-email">
                    Work email
                  </label>
                  <input
                    id="unlock-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@yourcompany.com"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass} htmlFor="unlock-company">
                    Company
                  </label>
                  <input
                    id="unlock-company"
                    name="company"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="Yourcompany Inc"
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={pending}
                  className="cursor-pointer bg-cobalt px-6 py-[11px] text-[14px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-cobalt-press disabled:opacity-40"
                >
                  {pending ? "Unlocking…" : "Unlock full readout"}
                </button>
              </form>
              {state.status === "error" && (
                <p
                  role="alert"
                  className="mt-4 border-l-2 border-ink pl-3 text-[13px] text-ink/80"
                >
                  {state.message}
                </p>
              )}
              <p className="mt-4 text-[13px] text-ink/60">
                No newsletter. Replies come from the founder.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
