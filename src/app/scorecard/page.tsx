'use client';

import { ScorecardForm } from '@/components/scorecard/scorecard-form';

export default function ScorecardPage() {
  return (
    <>
      <section className="bg-parchment pt-32 pb-8 lg:pt-40 lg:pb-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="overline">AI Maturity Scorecard</p>
          <h1 className="mt-6 text-display text-anthracite">
            How ready is your business for AI?
          </h1>
          <p className="mt-4 text-body-lg text-warm-gray">
            20 questions across 5 pillars. Takes about 5 minutes. Get your AI maturity score,
            pillar breakdown, and a personalized roadmap.
          </p>
        </div>
      </section>

      <section className="bg-parchment pb-24 lg:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <ScorecardForm />
        </div>
      </section>
    </>
  );
}
