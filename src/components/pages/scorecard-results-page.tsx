"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { calculateResults, type Answers, type ScorecardResult } from "@/lib/scorecard";
import { ArrowRight, Mail, User, Building2, CheckCircle } from "lucide-react";

export function ScorecardResultsPage() {
  const [result, setResult] = useState<ScorecardResult | null>(null);
  const [gated, setGated] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          <h1 className="text-3xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>No Results Found</h1>
          <p className="mt-4 text-lg text-text-secondary">Please complete the scorecard first.</p>
          <Button className="mt-8" asChild>
            <Link href="/scorecard">Take the Scorecard</Link>
          </Button>
        </div>
      </section>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          score: result?.compositeScore,
          maturityLevel: result?.maturityLevel,
          segment: result?.segment,
          pillarScores: result?.pillarScores,
          recommendedService: result?.recommendedService,
          answers: JSON.parse(sessionStorage.getItem("scorecard-answers") || "{}"),
        }),
      });
    } catch {
      // Non-blocking - show results even if capture fails
    }

    setSubmitted(true);
    setGated(false);
    setSubmitting(false);
  }

  const scoreColor = result.compositeScore >= 70 ? "text-teal" : result.compositeScore >= 50 ? "text-teal-light" : "text-text-tertiary";

  // Lead capture gate
  if (gated && !submitted) {
    return (
      <section className="bg-navy min-h-[80vh] flex items-center py-20">
        <div className="mx-auto max-w-lg px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-8">
              <span className="section-label text-teal">Assessment Complete</span>
              <h1 className="mt-4 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Your results are ready.
              </h1>
              <p className="mt-3 text-lg text-white/70">
                Enter your details to see your AI maturity score, pillar breakdown, and a personalized roadmap.
              </p>
            </div>

            {/* Score preview (teaser) */}
            <div className="text-center mb-8">
              <div className={`metric-display text-6xl ${scoreColor}`}>
                {result.compositeScore}
              </div>
              <p className="mt-1 text-sm text-text-tertiary">Your AI Maturity Score</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-text-tertiary" />
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-text-tertiary focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-text-tertiary" />
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-text-tertiary focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>
              <div className="relative">
                <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-text-tertiary" />
                <input
                  type="text"
                  required
                  placeholder="Company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-text-tertiary focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Loading..." : "See My Full Results & Roadmap"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-text-tertiary">
                We'll send your detailed assessment to this email. No spam, ever.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Score Hero */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {submitted && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-2 text-sm text-teal">
                <CheckCircle className="h-4 w-4" />
                Results sent to {email}
              </div>
            )}
            <span className="section-label text-teal">Your AI Maturity Score</span>
            <div className={`mt-6 metric-display text-7xl lg:text-8xl ${scoreColor}`}>
              {result.compositeScore}
            </div>
            <p className="mt-2 text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{result.maturityLevel}</p>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">{result.maturityDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Pillar Breakdown */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-text mb-2" style={{ fontFamily: "var(--font-heading)" }}>Pillar Breakdown</h2>
            <p className="text-text-secondary mb-8">How you scored across each dimension of AI readiness.</p>
            <div className="space-y-6">
              {result.pillarScores.map((ps, i) => {
                const isWeakest = ps.key === result.weakestPillar;
                const isStrongest = ps.key === result.strongestPillar;
                return (
                  <motion.div
                    key={ps.key}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.08 * i }}
                    className={`rounded-lg border p-6 ${
                      isWeakest ? "border-red-200 bg-red-50/50" : isStrongest ? "border-teal/20 bg-teal/5" : "border-border bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>{ps.name}</h3>
                        {isWeakest && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">Priority Area</span>}
                        {isStrongest && <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full font-medium">Strongest</span>}
                      </div>
                      <span className="metric-display text-lg">{Math.round(ps.percentage)}%</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${ps.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + 0.08 * i }}
                        className={`h-full rounded-full ${isWeakest ? "bg-red-400" : "bg-teal"}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personalized Roadmap */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-label text-teal">Your Personalized Roadmap</span>
            <h2 className="mt-4 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Here's how we'd close the gap for your business.
            </h2>
            <p className="mt-3 text-white/70">
              Based on your scores, this is the phased approach we'd recommend. Every engagement starts with understanding where you are, then we build from there.
            </p>
          </motion.div>

          <div className="mt-10 space-y-6">
            {result.roadmap.map((step, i) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="relative rounded-xl border border-white/10 bg-white/[0.04] p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/20 text-xs font-bold text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal">{step.phase} · {step.timeline}</span>
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{step.title}</h3>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">{step.description}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-tertiary">
                    Service: {step.service}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-label">Next Step</span>
            <h2 className="mt-4 text-2xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to close the gap?
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
              Book a 30-minute discovery call. We'll walk through your results, answer questions, and discuss whether ClearForge is the right fit.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Book a Discovery Call <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
