"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ScoreResult } from "@/lib/scorecard-new";

function getStoredResult(): ScoreResult | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem("scorecard-result");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ScoreResult;
  } catch {
    return null;
  }
}

export function ScorecardResultsPage() {
  const result = useMemo(() => getStoredResult(), []);

  if (!result) {
    return (
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h1 className="text-4xl text-midnight">No Results Found</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate">
            Please complete the scorecard first so we can generate your readiness profile.
          </p>
          <Button className="mt-8" asChild>
            <Link href="/scorecard">Take the Scorecard</Link>
          </Button>
        </div>
      </section>
    );
  }

  const tierLabels: Record<ScoreResult["tier"], string> = {
    leader: "AI Leader",
    ready: "AI Ready",
    curious: "AI Curious",
    behind: "AI Behind",
  };

  const tierColors: Record<ScoreResult["tier"], string> = {
    leader: "text-brass",
    ready: "text-brass",
    curious: "text-brass",
    behind: "text-stone",
  };

  return (
    <>
      <section className="bg-midnight py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="section-label">Your AI Readiness Score</span>

            <div className="mt-8 inline-flex items-center justify-center border border-white/16 bg-white/[0.04] p-6">
              <div className="relative h-44 w-44">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#243246" strokeWidth="7" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#b8860b"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${result.percentage * 2.83} 283`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`metric-display text-5xl ${tierColors[result.tier]}`}>{result.percentage}</span>
                  <span className="text-xs uppercase tracking-[0.12em] text-slate-300">out of 100</span>
                </div>
              </div>
            </div>

            <h2 className="mt-6 text-4xl text-white">{tierLabels[result.tier]}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-200">{result.tierDescription}</p>

            {result.gapFromLeader > 0 && (
              <div className="mt-6 inline-flex items-center gap-2 border border-brass/35 bg-brass/10 px-4 py-2 text-sm text-brass">
                <TrendingUp className="h-4 w-4" />
                <span>{result.gapFromLeader} points behind industry leaders</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h3 className="text-3xl text-midnight">Recommended Next Steps</h3>
          <div className="mt-6 space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="flex items-start gap-4 border border-fog bg-ivory p-4"
              >
                <div className="flex h-7 w-7 items-center justify-center bg-midnight text-xs font-semibold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-slate">{recommendation}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midnight py-20 text-center lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h3 className="text-4xl text-white">Ready to close the gap?</h3>
          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            We&apos;ll translate your score into a practical 90-day execution plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/contact">
                {result.ctaText} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-midnight" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
