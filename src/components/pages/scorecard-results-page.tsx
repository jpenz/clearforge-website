'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { type Answers, calculateResults, type ScorecardResult } from '@/lib/scorecard';

export function ScorecardResultsPage() {
  const [result, setResult] = useState<ScorecardResult | null>(null);
  const [gated, setGated] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('scorecard-answers');
    if (raw) {
      const answers: Answers = JSON.parse(raw);
      setResult(calculateResults(answers));
    }
  }, []);

  if (!result) {
    return (
      <section className="bg-bg-deep pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="text-3xl text-text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
            No Results Found
          </h1>
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
      await fetch('/api/scorecard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          score: result?.compositeScore,
          maturityLevel: result?.maturityLevel,
          segment: result?.segment,
          pillarScores: result?.pillarScores,
          recommendedService: result?.recommendedService,
          answers: JSON.parse(sessionStorage.getItem('scorecard-answers') || '{}'),
        }),
      });
    } catch {
      // Non-blocking
    }

    setSubmitted(true);
    setGated(false);
    setSubmitting(false);
  }

  const scoreColor =
    result.compositeScore >= 70
      ? 'text-accent'
      : result.compositeScore >= 50
        ? 'text-accent-hover'
        : 'text-text-muted';

  const inputClasses =
    'w-full border-0 border-b border-border-default bg-transparent px-0 py-3 text-base text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-0 transition-colors';

  // Lead capture gate
  if (gated && !submitted) {
    return (
      <section className="bg-bg-deep min-h-[80vh] flex items-center pt-32 pb-20">
        <div className="mx-auto max-w-lg px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <span className="section-label">Assessment Complete</span>
              <h1
                className="mt-4 text-3xl text-text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Your results are ready.
              </h1>
              <p className="mt-3 text-lg text-text-secondary">
                Enter your details to see your AI maturity score, pillar breakdown, and personalized
                roadmap.
              </p>
            </div>

            <div className="text-center mb-8">
              <div className={`metric text-6xl ${scoreColor}`}>{result.compositeScore}</div>
              <p className="mt-1 text-sm text-text-muted">Your AI Maturity Score</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
                  Name *
                </label>
                <div className="relative">
                  <User className="absolute left-0 top-3.5 h-4 w-4 text-text-muted" />
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${inputClasses} pl-6`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-0 top-3.5 h-4 w-4 text-text-muted" />
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${inputClasses} pl-6`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
                  Company *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-0 top-3.5 h-4 w-4 text-text-muted" />
                  <input
                    type="text"
                    required
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`${inputClasses} pl-6`}
                  />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? (
                  'Loading...'
                ) : (
                  <>
                    See My Full Results & Roadmap <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-text-muted">
                We&apos;ll send your detailed assessment to this email. No spam, ever.
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
      <section className="bg-bg-deep pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {submitted && (
              <div className="mb-6 inline-flex items-center gap-2 border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent">
                <CheckCircle className="h-4 w-4" />
                Results sent to {email}
              </div>
            )}
            <span className="section-label">Your AI Maturity Score</span>
            <div className={`mt-6 metric text-7xl lg:text-8xl ${scoreColor}`}>
              {result.compositeScore}
            </div>
            <p
              className="mt-2 text-xl text-text-primary"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {result.maturityLevel}
            </p>
            <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
              {result.maturityDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillar Breakdown — Light */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label text-accent-dark">Pillar Breakdown</p>
            <h2
              className="mt-4 text-2xl text-text-on-light"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              How you scored across each dimension.
            </h2>
            <div className="mt-8 space-y-6">
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
                    className={`border p-6 ${
                      isWeakest
                        ? 'border-red-400/30 bg-red-50/50'
                        : isStrongest
                          ? 'border-accent/30 bg-accent/5'
                          : 'border-border-light bg-bg-light'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3
                          className="text-sm font-bold text-text-on-light"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {ps.name}
                        </h3>
                        {isWeakest && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 font-medium">
                            Priority Area
                          </span>
                        )}
                        {isStrongest && (
                          <span className="text-xs bg-accent/10 text-accent-dark px-2 py-0.5 font-medium">
                            Strongest
                          </span>
                        )}
                      </div>
                      <span className="metric text-lg text-accent-dark">
                        {Math.round(ps.percentage)}%
                      </span>
                    </div>
                    <div className="h-1 bg-border-light overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${ps.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + 0.08 * i }}
                        className={`h-full ${isWeakest ? 'bg-red-400' : 'bg-accent'}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap — Dark */}
      <section className="bg-bg-deep py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Your Personalized Roadmap</span>
            <h2
              className="mt-4 text-2xl text-text-primary"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Here&apos;s how we&apos;d close the gap.
            </h2>
            <p className="mt-3 text-text-secondary">
              Based on your scores, this is the phased approach we&apos;d recommend.
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
                className="border border-border-subtle bg-bg-primary p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="metric text-xs shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {step.phase} · {step.timeline}
                    </span>
                    <h3
                      className="text-lg text-text-primary"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center gap-1 border border-border-subtle bg-bg-surface px-3 py-1 text-xs text-text-muted">
                    Service: {step.service}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Light */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl text-text-on-light sm:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Ready to close the gap?
            </h2>
            <p className="mt-4 text-lg text-text-on-light-sub max-w-xl mx-auto">
              Book a 30-minute discovery call. We&apos;ll walk through your results and discuss
              whether ClearForge is the right fit.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Request a Proposal <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border-light text-text-on-light hover:bg-bg-light-alt"
                asChild
              >
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
