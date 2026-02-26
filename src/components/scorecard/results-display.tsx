"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ScorecardResult } from "@/lib/scorecard";

function readStoredResults(): ScorecardResult | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem("scorecardResults");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ScorecardResult;
  } catch {
    return null;
  }
}

export function ResultsDisplay() {
  const results = useMemo(() => readStoredResults(), []);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!results || !email) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/scorecard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, results, segment: results.segment }),
      });
    } catch {
      // Non-blocking in preview/dev environments.
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (!results) {
    return (
      <div className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h1 className="text-3xl text-midnight">No scorecard results found</h1>
          <p className="mt-3 text-sm text-slate">Run the scorecard first to generate your report.</p>
          <Button className="mt-6" asChild>
            <Link href="/scorecard">Take the Scorecard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="section-label">Your Results</p>
          <h1 className="mt-3 text-4xl text-midnight">AI Readiness Report</h1>

          <div className="mt-6 border border-fog bg-ivory p-6">
            <p className="text-sm text-stone">Composite score</p>
            <p className="metric-display mt-2 text-5xl">{results.compositeScore}</p>
            <p className="mt-2 text-sm text-slate">{results.maturityDescription}</p>
          </div>

          <div className="mt-8 border border-brass/25 bg-brass/5 p-6">
            <div className="flex items-center gap-2 text-brass">
              <Lock className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.12em]">Receive your full report</p>
            </div>

            {submitted ? (
              <p className="mt-3 text-sm text-slate">Report sent to {email}</p>
            ) : (
              <form onSubmit={handleEmailSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Get Full Report"}
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">
                Book Discovery Call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
