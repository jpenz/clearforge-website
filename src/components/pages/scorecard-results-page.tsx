"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ScorecardResult } from "@/lib/scorecard";
import { SCORECARD_LEAD_CONTEXT_KEY, type ScorecardLeadContext } from "@/lib/scorecard-lead-context";

function getStoredResult(): ScorecardResult | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem("scorecardResults");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ScorecardResult;
  } catch {
    return null;
  }
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function ScorecardResultsPage() {
  const result = useMemo(() => getStoredResult(), []);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const painPointLength = painPoint.trim().length;
  const painPointValid = painPointLength >= 20;
  const emailValid = validateEmail(email.trim());
  const companyUrlTrimmed = companyUrl.trim();
  const companyUrlValid = !companyUrlTrimmed || isHttpUrl(companyUrlTrimmed);

  async function submitLeadCapture(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result || !painPointValid || !emailValid || !companyUrlValid) {
      return;
    }

    const payload = {
      email: email.trim(),
      company: company.trim() || undefined,
      companyUrl: companyUrlTrimmed || undefined,
      painPoint: painPoint.trim(),
      scorecard: {
        compositeScore: result.compositeScore,
        maturityLevel: result.maturityLevel,
        segment: result.segment,
        recommendedService: result.recommendedService,
      },
    };

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/scorecard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to save your request right now.");
        return;
      }

      const context: ScorecardLeadContext = {
        email: payload.email,
        company: payload.company,
        companyUrl: payload.companyUrl,
        challenge: payload.painPoint,
        source: "scorecard-results",
      };

      window.sessionStorage.setItem(SCORECARD_LEAD_CONTEXT_KEY, JSON.stringify(context));
      setSubmitted(true);
    } catch {
      setError("Unable to save your request right now.");
    } finally {
      setSubmitting(false);
    }
  }

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

  return (
    <>
      <section className="bg-navy py-16 lg:py-24">
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
                    stroke="#0d9488"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${result.compositeScore * 2.83} 283`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="metric-display text-5xl text-teal">{result.compositeScore}</span>
                  <span className="text-xs uppercase tracking-[0.12em] text-slate-300">out of 100</span>
                </div>
              </div>
            </div>

            <h2 className="mt-6 text-4xl text-white">{result.maturityLevel}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-200">{result.maturityDescription}</p>

            {result.compositeScore < 85 && (
              <div className="mt-6 inline-flex items-center gap-2 border border-teal/35 bg-teal/10 px-4 py-2 text-sm text-teal-light">
                <TrendingUp className="h-4 w-4" />
                <span>{85 - result.compositeScore} points from top-tier AI maturity</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h3 className="text-3xl text-text">Recommended Next Step</h3>
          <p className="mt-4 text-base text-text-secondary">{result.recommendation}</p>

          <div className="mt-6 rounded-xl border border-border bg-surface p-5">
            <p className="text-sm text-text-secondary">
              Suggested engagement: <span className="font-semibold text-text">{result.recommendedService}</span>
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {result.pillarScores.map((pillar) => (
              <article key={pillar.key} className="rounded-lg border border-border bg-white p-4">
                <p className="text-sm font-medium text-text">{pillar.name}</p>
                <p className="mt-2 metric-display text-2xl">{Math.round(pillar.percentage)}</p>
                <p className="text-xs text-text-tertiary">pillar score</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h3 className="text-3xl text-text">Get your tailored 90-day AI plan</h3>
          <p className="mt-4 text-base text-text-secondary">
            Share your biggest pain point and website. We&apos;ll prefill the AI Advisor so you can get a customized recommendation faster.
          </p>

          {!submitted ? (
            <form onSubmit={submitLeadCapture} className="mt-8 space-y-4 rounded-xl border border-border bg-white p-6">
              <div>
                <label htmlFor="scorecard-email" className="text-sm font-medium text-text-secondary">
                  Work email *
                </label>
                <Input
                  id="scorecard-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="mt-2"
                  required
                />
                {!!email.trim() && !emailValid && <p className="mt-2 text-sm text-red-600">Enter a valid email address.</p>}
              </div>

              <div>
                <label htmlFor="scorecard-company" className="text-sm font-medium text-text-secondary">
                  Company name (optional)
                </label>
                <Input
                  id="scorecard-company"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Acme Inc."
                  className="mt-2"
                />
              </div>

              <div>
                <label htmlFor="scorecard-company-url" className="text-sm font-medium text-text-secondary">
                  Company website (recommended)
                </label>
                <Input
                  id="scorecard-company-url"
                  value={companyUrl}
                  onChange={(event) => setCompanyUrl(event.target.value)}
                  placeholder="https://yourcompany.com"
                  className="mt-2"
                />
                {!companyUrlValid && (
                  <p className="mt-2 text-sm text-red-600">Use a full URL starting with http:// or https://.</p>
                )}
              </div>

              <div>
                <label htmlFor="scorecard-pain-point" className="text-sm font-medium text-text-secondary">
                  Biggest pain point AI should solve *
                </label>
                <Textarea
                  id="scorecard-pain-point"
                  value={painPoint}
                  onChange={(event) => setPainPoint(event.target.value)}
                  placeholder="Example: Our sales team spends too much time on manual prospect research and CRM updates."
                  className="mt-2 min-h-[130px]"
                  required
                />
                <p className={`mt-2 text-sm ${painPointValid ? "text-text-tertiary" : "text-amber-700"}`}>
                  {painPointLength}/20 minimum characters
                </p>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex flex-wrap gap-3">
                <Button type="submit" size="lg" disabled={submitting || !emailValid || !painPointValid || !companyUrlValid}>
                  {submitting ? "Saving..." : "Continue to AI Advisor"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Book Discovery Call Instead</Link>
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-8 rounded-xl border border-teal/30 bg-teal/5 p-6">
              <h4 className="text-xl font-semibold text-text">Great, your context is saved.</h4>
              <p className="mt-2 text-text-secondary">Continue to the AI Advisor and we&apos;ll prefill what you shared from this scorecard.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/advisor?from=scorecard">
                    Open AI Advisor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Book Discovery Call</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
