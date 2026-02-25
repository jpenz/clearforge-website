"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ScorecardResult } from "@/lib/scorecard";

const RadarChartComponent = dynamic(() => import("./radar-chart"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber border-t-transparent" />
    </div>
  ),
});

function ScoreGauge({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <motion.div className="flex flex-col items-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />
          <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${(animatedScore / 100) * 440} 440`} strokeLinecap="round" className="text-amber transition-all duration-1000" />
        </svg>
        <span className="metric-display text-5xl text-amber">{animatedScore}</span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-widest text-text-secondary">out of 100</p>
    </motion.div>
  );
}

function PillarBar({ name, percentage, delay }: { name: string; percentage: number; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay }}>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-text-secondary">{name}</span>
        <span className="metric-display font-medium text-text">{Math.round(percentage)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden bg-border">
        <motion.div className="h-full bg-amber" initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.8, delay: delay + 0.2 }} />
      </div>
    </motion.div>
  );
}

export function ResultsDisplay() {
  const router = useRouter();
  const [results, setResults] = useState<ScorecardResult | null>(null);
  const [email, setEmail] = useState("");
  const [isGated, setIsGated] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("scorecardResults");
    if (stored) { setResults(JSON.parse(stored)); } else { router.push("/scorecard"); }
  }, [router]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !results) return;
    setIsSubmitting(true);
    try { await fetch("/api/scorecard", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, results, segment: results.segment }) }); } catch {}
    setIsGated(false);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (!results) {
    return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-amber" /></div>;
  }

  return (
    <div className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div className="mx-auto max-w-3xl text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="section-label">Your Results</p>
          <h1 className="mt-4 text-3xl tracking-tight sm:text-4xl">AI Readiness Report</h1>
        </motion.div>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-0 overflow-hidden border border-border md:grid-cols-2">
            <motion.div className="flex flex-col items-center border-b border-border bg-bg p-8 md:border-b-0 md:border-r" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <ScoreGauge score={results.compositeScore} />
              <div className="mt-6 text-center">
                <p className="text-xs uppercase tracking-widest text-text-secondary">Maturity Level</p>
                <p className="mt-1 text-2xl" style={{ fontFamily: "var(--font-bodoni)" }}>{results.maturityLevel}</p>
              </div>
            </motion.div>

            <motion.div className="flex flex-col bg-bg p-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <h3 className="text-lg" style={{ fontFamily: "var(--font-bodoni)" }}>What This Means</h3>
              <p className="mt-3 flex-1 text-sm text-text-secondary leading-relaxed">{results.maturityDescription}</p>
              <div className="mt-4 border-l-2 border-amber bg-amber/5 p-4 pl-5">
                <p className="section-label">Our Recommendation</p>
                <p className="mt-1 text-sm text-text-secondary">{results.recommendation}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="mx-auto mt-12 max-w-4xl border border-border bg-bg p-6 sm:p-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <h3 className="text-lg" style={{ fontFamily: "var(--font-bodoni)" }}>Pillar Breakdown</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex items-center justify-center"><RadarChartComponent pillarScores={results.pillarScores} /></div>
            <div className="flex flex-col justify-center space-y-4">
              {results.pillarScores.map((pillar, i) => (
                <PillarBar key={pillar.key} name={pillar.name} percentage={pillar.percentage} delay={0.4 + i * 0.08} />
              ))}
            </div>
          </div>
        </motion.div>

        {isGated && (
          <motion.div className="mx-auto mt-12 max-w-4xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
            <div className="border border-amber/20 bg-amber/5 p-8 text-center">
              <Lock className="mx-auto h-8 w-8 text-amber" />
              <h3 className="mt-4 text-xl" style={{ fontFamily: "var(--font-bodoni)" }}>Get Your Full Report</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">Enter your email to receive a detailed breakdown with personalized recommendations.</p>
              <form onSubmit={handleEmailSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
                <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1 border-border bg-white text-text placeholder:text-text-secondary/50" />
                <Button type="submit" disabled={isSubmitting} className="gap-2">{isSubmitting ? "Sending..." : "Get Full Report"}<Download className="h-4 w-4" /></Button>
              </form>
            </div>
          </motion.div>
        )}

        {submitted && !isGated && (
          <motion.div className="mx-auto mt-12 max-w-4xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="border border-teal/30 bg-teal/5 p-6">
              <p className="text-sm font-medium text-teal">Report sent to {email}</p>
              <p className="mt-1 text-sm text-text-secondary">Check your inbox for your personalized AI readiness report.</p>
            </div>
          </motion.div>
        )}

        <motion.div className="mt-24 text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.4 }}>
          <h2 className="text-3xl tracking-tight">Ready to improve your score?</h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">Our recommended next step: <span className="font-semibold text-text">{results.recommendedService}</span></p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild><Link href="/contact">Book Discovery Call<ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
            <Button size="xl" variant="outline" asChild><Link href="/pricing">View Pricing</Link></Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
