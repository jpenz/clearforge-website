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
      <div className="h-8 w-8 animate-spin border-2 border-molten-amber border-t-transparent" />
    </div>
  ),
});

function ScoreGauge({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  // Heat gradient color based on score
  const getColor = (s: number) => {
    if (s <= 40) return "text-signal-blue";
    if (s <= 55) return "text-deep-steel";
    if (s <= 70) return "text-molten-amber";
    if (s <= 85) return "text-molten-amber";
    return "text-forge-navy";
  };

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-bg-elevated"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${(animatedScore / 100) * 440} 440`}
            strokeLinecap="butt"
            className={`${getColor(score)} transition-all duration-1000`}
          />
        </svg>
        <span className={`metric-display text-5xl ${getColor(score)}`}>
          {animatedScore}
        </span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-[1.5px] text-text-muted">out of 100</p>
    </motion.div>
  );
}

function PillarBar({
  name,
  percentage,
  delay,
}: {
  name: string;
  percentage: number;
  delay: number;
}) {
  // Heat color for individual bars
  const getBarColor = (pct: number) => {
    if (pct <= 40) return "bg-signal-blue";
    if (pct <= 70) return "bg-molten-amber";
    return "bg-forge-navy";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-text-secondary">{name}</span>
        <span className="metric-display font-medium text-forge-navy">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden bg-bg-elevated">
        <motion.div
          className={`h-full ${getBarColor(percentage)}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        />
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
    if (stored) {
      setResults(JSON.parse(stored));
    } else {
      router.push("/scorecard");
    }
  }, [router]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !results) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/scorecard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          results,
          segment: results.segment,
        }),
      });
    } catch {
      // Non-blocking
    }
    setIsGated(false);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (!results) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin border-2 border-molten-amber border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
            Your Results
          </p>
          <h1 className="mt-4 font-serif text-3xl text-forge-navy sm:text-4xl">
            Forge Report Card
          </h1>
        </motion.div>

        {/* Score + Maturity Level */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-0 border border-border-subtle md:grid-cols-2">
            <motion.div
              className="flex flex-col items-center border-b border-border-subtle p-8 md:border-b-0 md:border-r"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ScoreGauge score={results.compositeScore} />
              <div className="mt-6 text-center">
                <p className="text-xs uppercase tracking-[1.5px] text-text-muted">Maturity Level</p>
                <p className="mt-1 font-serif text-2xl text-forge-navy">
                  {results.maturityLevel}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="font-serif text-lg text-forge-navy">
                What This Means
              </h3>
              <p className="mt-3 flex-1 text-sm text-text-secondary leading-relaxed">
                {results.maturityDescription}
              </p>
              <div className="mt-4 border-l-2 border-molten-amber bg-molten-amber/5 p-4 pl-5">
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-molten-amber">
                  Our Recommendation
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {results.recommendation}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Radar Chart */}
        <motion.div
          className="mx-auto mt-12 max-w-4xl border border-border-subtle p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3 className="font-serif text-lg text-forge-navy">
            Pillar Breakdown
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <RadarChartComponent pillarScores={results.pillarScores} />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              {results.pillarScores.map((pillar, i) => (
                <PillarBar
                  key={pillar.key}
                  name={pillar.name}
                  percentage={pillar.percentage}
                  delay={0.4 + i * 0.08}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gated Section */}
        {isGated && (
          <motion.div
            className="mx-auto mt-12 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="border border-border-accent bg-molten-amber/5 p-8 text-center">
              <Lock className="mx-auto h-8 w-8 text-molten-amber" />
              <h3 className="mt-4 font-serif text-xl text-forge-navy">
                Get Your Full Report
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
                Enter your email to receive a detailed breakdown with
                personalized recommendations and an action plan.
              </p>
              <form
                onSubmit={handleEmailSubmit}
                className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? "Sending..." : "Get Full Report"}
                  <Download className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Unlocked Recommendations */}
        {submitted && !isGated && (
          <motion.div
            className="mx-auto mt-12 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="border border-forge-navy/20 bg-forge-navy/5 p-6">
              <p className="text-sm font-medium text-forge-navy">
                Report sent to {email}
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                Check your inbox for your personalized AI readiness report with
                detailed recommendations.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-serif text-3xl text-forge-navy">
            Ready to Improve Your Score?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Our recommended next step:{" "}
            <span className="font-medium text-forge-navy">
              {results.recommendedService}
            </span>
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild>
              <Link href="/contact">
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="secondary" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
