"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { calculateResults, type Answers, type ScorecardResult } from "@/lib/scorecard";
import { ArrowRight } from "lucide-react";

export function ScorecardResultsPage() {
  const [result, setResult] = useState<ScorecardResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("scorecard-answers");
    if (raw) {
      const answers: Answers = JSON.parse(raw);
      setResult(calculateResults(answers));
    }
  }, []);

  if (!result) {
    return (
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>No Results Found</h1>
          <p className="mt-4 text-lg text-slate-600">Please complete the scorecard first.</p>
          <Button className="mt-8" asChild>
            <Link href="/scorecard">Take the Scorecard</Link>
          </Button>
        </div>
      </section>
    );
  }

  const scoreColor = result.compositeScore >= 70 ? "text-teal" : result.compositeScore >= 50 ? "text-cyan" : "text-slate-500";

  return (
    <>
      {/* Score Hero */}
      <section className="bg-slate-navy py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="section-label text-teal">Your AI Readiness Score</span>
            <div className={`mt-6 metric-display text-7xl lg:text-8xl ${scoreColor}`}>
              {result.compositeScore}
            </div>
            <p className="mt-2 text-xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>{result.maturityLevel}</p>
            <p className="mt-4 text-lg text-slate-200 max-w-xl mx-auto">{result.maturityDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Pillar Breakdown */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-slate-navy mb-8" style={{ fontFamily: "var(--font-space-grotesk)" }}>Pillar Breakdown</h2>
            <div className="space-y-6">
              {result.pillarScores.map((ps) => (
                <div key={ps.key} className="rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>{ps.name}</h3>
                    <span className="metric-display text-lg">{Math.round(ps.percentage)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ps.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-teal rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommendation */}
      <section className="bg-gray-100 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-label">Our Recommendation</span>
            <h2 className="mt-4 text-2xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>{result.recommendedService}</h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">{result.recommendation}</p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <Button size="lg" asChild>
                <Link href="/contact">Book a Discovery Call <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
