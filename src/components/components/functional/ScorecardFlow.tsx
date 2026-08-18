"use client";

import { useMemo, useState } from "react";
import {
  PILLARS,
  QUESTIONS,
  scoreAnswers,
} from "@/data/scorecard";
import { ScoreResults } from "@/components/functional/ScoreResults";

/**
 * The 10-question scorecard: 1 to 5 scale across 5 pillars with progress,
 * then the scored results readout in place.
 */
export function ScorecardFlow() {
  const [answers, setAnswers] = useState<Array<number | null>>(
    Array(QUESTIONS.length).fill(null),
  );
  const [current, setCurrent] = useState(0);
  const [complete, setComplete] = useState(false);

  const question = QUESTIONS[current];
  const pillar = PILLARS[question.pillarIndex];
  const answered = answers[current] != null;
  const isLast = current === QUESTIONS.length - 1;

  const result = useMemo(() => {
    if (!complete) return null;
    return scoreAnswers(answers.map((answer) => answer ?? 1));
  }, [complete, answers]);

  const restart = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrent(0);
    setComplete(false);
  };

  if (complete && result) {
    return <ScoreResults result={result} onRetake={restart} />;
  }

  const pillarState = (pillarIndex: number) => {
    if (pillarIndex === question.pillarIndex) return "current";
    const questionIndexes = QUESTIONS.map((q, i) =>
      q.pillarIndex === pillarIndex ? i : null,
    ).filter((i): i is number => i != null);
    return questionIndexes.every((i) => answers[i] != null)
      ? "done"
      : "upcoming";
  };

  return (
    <div className="border border-ink bg-white">
      {/* Slot header strip */}
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-6">
        <span className="tnum text-[11px] font-medium tracking-[0.14em] text-ink/70 uppercase">
          ScorecardFlow · Question {current + 1} of {QUESTIONS.length}
        </span>
        <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
          Free · No account
        </span>
      </div>

      {/* Progress */}
      <div className="border-b border-hairline px-4 py-5 md:px-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="tnum text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase">
            Question {current + 1} of {QUESTIONS.length}
          </span>
          <span className="tnum text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase">
            Pillar {question.pillarIndex + 1} · {pillar.name}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label={`Question ${current + 1} of ${QUESTIONS.length}`}
          aria-valuemin={1}
          aria-valuemax={QUESTIONS.length}
          aria-valuenow={current + 1}
          className="h-[2px] bg-hairline"
        >
          <div
            className="h-full bg-cobalt transition-[width] duration-200 motion-reduce:transition-none"
            style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Pillar rail + question */}
      <div className="grid lg:grid-cols-[300px_1fr]">
        <aside className="border-b border-hairline lg:border-r lg:border-b-0">
          <div className="border-b border-hairline px-4 py-3 md:px-6">
            <span className="tnum text-[11px] tracking-[0.18em] text-ink/60 uppercase">
              5 pillars
            </span>
          </div>
          <ol className="flex flex-col gap-4 px-4 py-5 md:gap-5 md:px-6 md:py-7">
            {PILLARS.map((item, index) => {
              const state = pillarState(index);
              return (
                <li key={item.name} className="flex items-center gap-3">
                  <span className="tnum w-5 text-[11px] text-ink/60">
                    0{index + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`inline-block size-[9px] shrink-0 ${
                      state === "done"
                        ? "bg-cobalt"
                        : state === "current"
                          ? "border-2 border-cobalt"
                          : "border border-hairline-strong"
                    }`}
                  />
                  <span
                    aria-current={state === "current" ? "step" : undefined}
                    className={`text-[14px] ${
                      state === "current"
                        ? "font-semibold text-ink"
                        : state === "done"
                          ? "text-ink/70"
                          : "text-ink/60"
                    }`}
                  >
                    {item.name}
                  </span>
                </li>
              );
            })}
          </ol>
        </aside>

        <div className="flex flex-col">
          <div className="grow px-4 pt-8 pb-8 md:px-10 md:pt-12 md:pb-12">
            <h2 className="font-display max-w-[26ch] text-[28px] leading-[1.25] font-medium md:text-[34px]">
              {question.text}
            </h2>
            <div
              role="group"
              aria-label="Rate from 1 to 5"
              className="mt-8 flex flex-wrap gap-3 md:mt-11 md:gap-4"
            >
              {[1, 2, 3, 4, 5].map((value) => {
                const selected = answers[current] === value;
                const button = (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setAnswers((prev) => {
                        const next = [...prev];
                        next[current] = value;
                        return next;
                      })
                    }
                    className={`tnum size-14 cursor-pointer text-[18px] transition-colors ${
                      selected
                        ? "bg-cobalt font-semibold text-white hover:bg-cobalt-press"
                        : "border border-hairline-strong font-medium hover:border-ink"
                    }`}
                  >
                    {value}
                  </button>
                );
                if (value === 1 || value === 5) {
                  return (
                    <div key={value} className="flex flex-col gap-2">
                      {button}
                      <span className="max-w-[104px] text-[13px] leading-snug text-ink/70">
                        {value === 1 ? question.lowLabel : question.highLabel}
                      </span>
                    </div>
                  );
                }
                return button;
              })}
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 border-t border-hairline px-4 py-5 md:gap-6 md:px-10">
            <button
              type="button"
              onClick={() => setCurrent((index) => Math.max(0, index - 1))}
              disabled={current === 0}
              className="cursor-pointer px-3 py-2.5 text-[14px] font-semibold text-ink/70 transition-colors hover:text-ink disabled:cursor-default disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!answered}
              onClick={() => {
                if (isLast) {
                  setComplete(true);
                } else {
                  setCurrent((index) => index + 1);
                }
              }}
              className="cursor-pointer bg-cobalt px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-cobalt-press disabled:opacity-40"
            >
              {isLast ? "See results" : "Next question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
