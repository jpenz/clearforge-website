'use client';

import {
  ArrowRight,
  Building2,
  CheckCircle,
  ClipboardCheck,
  Mail,
  Target,
  User,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { calculateResults, type PillarKey, type ScorecardResult } from '@/lib/scorecard';

const pillarNextMoves: Record<PillarKey, { focus: string; evidence: string; buildRisk: string }> = {
  strategy: {
    focus: 'Confirm the workflow owner and business threshold before scope expands.',
    evidence: 'Bring the KPI, decision owner, and the reason this workflow matters now.',
    buildRisk: 'AI gets funded as activity instead of operating change.',
  },
  process: {
    focus: 'Map handoffs, exceptions, approvals, and rework before engineering starts.',
    evidence: 'Bring the current process, pain points, volume, and examples of stuck work.',
    buildRisk: 'Automation gets added to a workflow nobody has truly redesigned.',
  },
  data: {
    focus: 'Identify source systems, document flows, data owners, and trust gaps.',
    evidence: 'Bring system names, reports, exports, documents, and known data issues.',
    buildRisk: 'The build stalls because the data path is unclear or unreliable.',
  },
  tech: {
    focus: 'Define integrations, human review, escalation, audit trail, and failure modes.',
    evidence: 'Bring the systems involved and where users need to approve or override AI.',
    buildRisk: 'The demo works, but production controls are not safe enough to launch.',
  },
  workforce: {
    focus: 'Design the adoption rhythm for users, managers, and the operating owner.',
    evidence: 'Bring the team roles, review meetings, training constraints, and adoption risks.',
    buildRisk: 'The tool ships, but daily behavior does not change.',
  },
};

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
        <span className="text-[10px] uppercase font-semibold text-brass">ClearForge</span>
        <span className="text-[#3a3a3a]">·</span>
        <span className="text-[10px] uppercase font-medium text-stone">Research</span>
      </div>
      {dateLabel && <span className="text-[10px] uppercase text-stone/60">{dateLabel}</span>}
    </div>
  );
}

/** Branded report footer bar */
function ReportFooter() {
  return (
    <div className="w-full bg-[#111111] border-t border-[#2a2a2a] py-3 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
      <span className="text-[10px] uppercase text-stone/60">© ClearForge AI · Confidential</span>
      <span className="text-[10px] uppercase text-brass/70">clearforge.ai</span>
    </div>
  );
}

const ScoreRing = dynamic(
  () => import('@/components/scorecard/score-ring').then((m) => ({ default: m.ScoreRing })),
  { ssr: false },
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
          <h1 className="text-display text-anthracite">No diagnostic found.</h1>
          <p className="mt-4 text-body-lg text-warm-gray">
            Run the ClearForge Diagnostic first so the readout can be built from your answers.
          </p>
          <Button className="mt-8" asChild>
            <Link href="/scorecard">Run Diagnostic</Link>
          </Button>
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
        body: JSON.stringify({
          name,
          email,
          company,
          score: result?.compositeScore,
          maturityLevel: result?.maturityLevel,
          pillarScores: result?.pillarScores,
        }),
      });
    } catch {
      /* non-blocking */
    }
    setSubmitted(true);
    setGated(false);
    setSubmitting(false);
  }

  const inputClasses =
    'w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-base text-anthracite placeholder:text-warm-gray focus:border-brass focus:outline-none focus:ring-0 transition-colors';
  const weakestMove = pillarNextMoves[result.weakestPillar];
  const strongestPillar = result.pillarScores.find((ps) => ps.key === result.strongestPillar);
  const weakestPillar = result.pillarScores.find((ps) => ps.key === result.weakestPillar);

  if (gated && !submitted) {
    return (
      <section className="bg-parchment min-h-[80vh] flex items-center pt-32 pb-20">
        <div className="mx-auto grid w-full max-w-[1050px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="animate-fade-in-up">
            <div>
              <p className="overline">Diagnostic Complete</p>
              <h1 className="mt-6 text-display text-anthracite">
                Your AI build-readiness readout is ready.
              </h1>
              <p className="mt-5 text-body text-warm-gray">
                The full readout shows your maturity level, weakest pillar, first build risk, and
                the evidence to bring into a ClearForge diagnostic call.
              </p>
            </div>
            <div className="mt-8 flex justify-center lg:justify-start">
              <ScoreRing score={result.compositeScore} />
            </div>
          </div>

          <div className="border border-divider bg-warm-white p-6 sm:p-8">
            <form
              onSubmit={handleGateSubmit}
              data-analytics="scorecard_results_gate_submit"
              className="space-y-6"
            >
              <div className="relative">
                <User className="absolute left-0 top-3.5 h-4 w-4 text-warm-gray" />
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${inputClasses} pl-6`}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-0 top-3.5 h-4 w-4 text-warm-gray" />
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClasses} pl-6`}
                />
              </div>
              <div className="relative">
                <Building2 className="absolute left-0 top-3.5 h-4 w-4 text-warm-gray" />
                <input
                  type="text"
                  required
                  placeholder="Company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`${inputClasses} pl-6`}
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? (
                  'Loading...'
                ) : (
                  <>
                    See Full Results <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            <p className="mt-4 text-xs leading-relaxed text-warm-gray">
              This routes the diagnostic context to James so the follow-up starts with your
              workflow, not a generic intake.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── ClearForge Research branded header ── */}
      <ReportHeader />

      <section className="dark-section pt-24 sm:pt-32 pb-16 sm:pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 text-center">
          {submitted && (
            <div className="mb-6 inline-flex items-center gap-2 border border-brass/20 bg-brass/10 px-4 py-2 text-sm text-brass-light">
              <CheckCircle className="h-4 w-4" /> Results sent to {email}
            </div>
          )}
          <p className="overline">ClearForge Research · AI Build-Readiness Report</p>
          {company && (
            <p className="mt-3 text-sm text-stone/70">
              Prepared exclusively for <span className="text-brass">{company}</span>
            </p>
          )}
          <div className="mt-8 flex justify-center">
            <ScoreRing score={result.compositeScore} size={180} strokeWidth={8} />
          </div>
          <p className="mt-6 text-h2 text-bone">{result.maturityLevel}</p>
          <p className="mt-4 text-body-lg text-stone max-w-xl mx-auto">
            {result.maturityDescription}
          </p>
          <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
            {[
              { label: 'Strongest pillar', value: strongestPillar?.name ?? 'Not available' },
              { label: 'Weakest pillar', value: weakestPillar?.name ?? 'Not available' },
              { label: 'Recommended path', value: result.recommendedService },
            ].map((item) => (
              <div key={item.label} className="border border-bone/10 bg-bone/[0.04] p-4">
                <p className="overline text-[10px] text-stone">{item.label}</p>
                <p className="mt-2 text-sm font-semibold text-bone">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <p className="overline">ClearForge Research · Pillar Analysis</p>
          <h2 className="mt-6 text-display text-anthracite">How you scored.</h2>
          <div className="mt-10 space-y-4">
            {result.pillarScores.map((ps) => (
              <div
                key={ps.key}
                className={`border p-4 sm:p-6 ${ps.key === result.weakestPillar ? 'border-error/30 bg-error/5' : ps.key === result.strongestPillar ? 'border-success/30 bg-success/5' : 'border-divider bg-surface'}`}
              >
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

      <section className="border-t border-divider bg-warm-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
          <p className="overline">First Diagnostic Focus</p>
          <h2 className="mt-6 max-w-3xl text-display text-anthracite">
            What we would inspect before recommending a build.
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden border border-divider bg-divider lg:grid-cols-3">
            {[
              { icon: Target, label: 'Focus', detail: weakestMove.focus },
              { icon: ClipboardCheck, label: 'Evidence to bring', detail: weakestMove.evidence },
              { icon: CheckCircle, label: 'Build risk', detail: weakestMove.buildRisk },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-warm-white p-6">
                  <Icon className="h-5 w-5 text-brass" />
                  <h3 className="mt-5 text-h4">{item.label}</h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">{item.detail}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-body text-warm-gray">{result.recommendation}</p>
        </div>
      </section>

      <section className="dark-section py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <p className="overline">ClearForge Research · Recommended Roadmap</p>
          <h2 className="mt-6 text-display text-bone">How we&apos;d close the gap.</h2>
          <div className="mt-10 space-y-4">
            {result.roadmap.map((step, i) => (
              <div key={step.phase} className="border border-divider-dark p-4 sm:p-6">
                <span className="metric text-xs text-brass">{String(i + 1).padStart(2, '0')}</span>
                <span className="overline ml-3">
                  {step.phase} · {step.timeline}
                </span>
                <h3 className="mt-2 text-h4 text-bone">{step.title}</h3>
                <p className="mt-2 text-body-sm text-stone">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 text-center">
          <h2 className="text-display text-anthracite">Turn this into a build decision.</h2>
          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Book a 15-Min Diagnostic Call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/discover">Generate AI Value Map</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── ClearForge Research branded footer ── */}
      <ReportFooter />
    </>
  );
}
