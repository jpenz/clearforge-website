'use client';

import { ArrowRight, Building2, CheckCircle, Mail, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { type Answers, calculateResults, type ScorecardResult } from '@/lib/scorecard';

/** Animated pillar progress bar — native CSS transition, no framer-motion. */
function PillarBar({ percentage, color }: { percentage: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setWidth(percentage);
      return;
    }
    const t = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(t);
  }, [percentage]);
  return (
    <div className="h-1 bg-divider overflow-hidden">
      <div
        className={`h-full transition-[width] duration-700 ease-out ${color}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

/** Branded report header bar */
function ReportHeader() {
  const [dateLabel, setDateLabel] = useState('');
  useEffect(() => {
    const d = new Date();
    setDateLabel(d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  }, []);
  return (
    <div className="w-full bg-[#111111] border-b border-[#2a2a2a] py-3 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brass">
          Clearforge
        </span>
        <span className="text-[#3a3a3a]">·</span>
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-stone">
          Research
        </span>
      </div>
      {dateLabel && (
        <span className="text-[10px] tracking-[0.15em] uppercase text-stone/60">{dateLabel}</span>
      )}
    </div>
  );
}

/** Branded report footer bar */
function ReportFooter() {
  return (
    <div className="w-full bg-[#111111] border-t border-[#2a2a2a] py-3 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
      <span className="text-[10px] tracking-[0.15em] uppercase text-stone/60">
        © Clearforge AI · Confidential
      </span>
      <span className="text-[10px] tracking-[0.15em] uppercase text-brass/70">
        clearforge.ai
      </span>
    </div>
  );
}

const ScoreRing = dynamic(
  () => import('@/components/scorecard/score-ring').then((m) => ({ default: m.ScoreRing })),
  { ssr: false }
);

export default function ScorecardResultsPage() {
  const [result, setResult] = useState<ScorecardResult | null>(null);
  const [gated, setGated] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const rawResults = sessionStorage.getItem('scorecardResults');
    const rawAnswers = sessionStorage.getItem('scorecard-answers');
    if (rawResults) {
      setResult(JSON.parse(rawResults));
    } else if (rawAnswers) {
      setResult(calculateResults(JSON.parse(rawAnswers)));
    }
  }, []);

  if (!result) {
    return (
      <section className="bg-parchment min-h-[60vh] flex items-center justify-center pt-32 pb-20">
        <div className="text-center px-6">
          <h1 className="text-display text-anthracite">No Results Found</h1>
          <p className="mt-4 text-body-lg text-warm-gray">Please complete the scorecard first.</p>
          <Button className="mt-8" asChild><Link href="/scorecard">Take the Scorecard</Link></Button>
        </div>
      </section>
    );
  }

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/scorecard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, score: result?.compositeScore, maturityLevel: result?.maturityLevel, pillarScores: result?.pillarScores }),
      });
    } catch { /* non-blocking */ }
    setSubmitted(true);
    setGated(false);
    setSubmitting(false);
  }

  const inputClasses = 'w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-base text-anthracite placeholder:text-warm-gray focus:border-brass focus:outline-none focus:ring-0 transition-colors';

  if (gated && !submitted) {
    return (
      <section className="bg-parchment min-h-[80vh] flex items-center pt-32 pb-20">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-10 w-full">
          <div className="animate-fade-in-up">
            <div className="text-center mb-10">
              <p className="overline">Assessment Complete</p>
              <h1 className="mt-6 text-display text-anthracite">Your results are ready.</h1>
            </div>
            <div className="flex justify-center mb-10">
              <ScoreRing score={result.compositeScore} />
            </div>
            <form onSubmit={handleGateSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute left-0 top-3.5 h-4 w-4 text-warm-gray" />
                <input type="text" required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={`${inputClasses} pl-6`} />
              </div>
              <div className="relative">
                <Mail className="absolute left-0 top-3.5 h-4 w-4 text-warm-gray" />
                <input type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClasses} pl-6`} />
              </div>
              <div className="relative">
                <Building2 className="absolute left-0 top-3.5 h-4 w-4 text-warm-gray" />
                <input type="text" required placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} className={`${inputClasses} pl-6`} />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? 'Loading...' : <>See Full Results <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── Clearforge Research branded header ── */}
      <ReportHeader />

      <section className="dark-section pt-24 sm:pt-32 pb-16 sm:pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 text-center">
          {submitted && (
            <div className="mb-6 inline-flex items-center gap-2 border border-brass/20 bg-brass/10 px-4 py-2 text-sm text-brass-light">
              <CheckCircle className="h-4 w-4" /> Results sent to {email}
            </div>
          )}
          <p className="overline">Clearforge Research · AI Maturity Report</p>
          {company && (
            <p className="mt-3 text-sm tracking-wide text-stone/70">
              Prepared exclusively for <span className="text-brass">{company}</span>
            </p>
          )}
          <div className="mt-8 flex justify-center">
            <ScoreRing score={result.compositeScore} size={180} strokeWidth={8} />
          </div>
          <p className="mt-6 text-h2 text-bone">{result.maturityLevel}</p>
          <p className="mt-4 text-body-lg text-stone max-w-xl mx-auto">{result.maturityDescription}</p>
        </div>
      </section>

      <section className="bg-parchment py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <p className="overline">Clearforge Research · Pillar Analysis</p>
          <h2 className="mt-6 text-display text-anthracite">How you scored.</h2>
          <div className="mt-10 space-y-4">
            {result.pillarScores.map((ps) => (
              <div key={ps.key} className={`border p-4 sm:p-6 ${ps.key === result.weakestPillar ? 'border-error/30 bg-error/5' : ps.key === result.strongestPillar ? 'border-success/30 bg-success/5' : 'border-divider bg-surface'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-anthracite">{ps.name}</h3>
                  <span className="metric text-lg text-brass">{Math.round(ps.percentage)}%</span>
                </div>
                <PillarBar
                  percentage={ps.percentage}
                  color={ps.key === result.weakestPillar ? 'bg-error' : 'bg-brass'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <p className="overline">Clearforge Research · Recommended Roadmap</p>
          <h2 className="mt-6 text-display text-bone">How we&apos;d close the gap.</h2>
          <div className="mt-10 space-y-4">
            {result.roadmap.map((step, i) => (
              <div key={step.phase} className="border border-divider-dark p-4 sm:p-6">
                <span className="metric text-xs text-brass">{String(i + 1).padStart(2, '0')}</span>
                <span className="overline ml-3">{step.phase} · {step.timeline}</span>
                <h3 className="mt-2 text-h4 text-bone">{step.title}</h3>
                <p className="mt-2 text-body-sm text-stone">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 text-center">
          <h2 className="text-display text-anthracite">Ready to close the gap?</h2>
          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            <Button size="lg" asChild><Link href="/contact">Book a 15-Min Diagnostic Call <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button variant="secondary" size="lg" asChild><Link href="/services">Explore Services</Link></Button>
          </div>
        </div>
      </section>

      {/* ── Clearforge Research branded footer ── */}
      <ReportFooter />
    </>
  );
}
