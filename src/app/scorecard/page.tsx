'use client';

import dynamic from 'next/dynamic';

const ScorecardForm = dynamic(
  () => import('@/components/scorecard/scorecard-form').then((m) => ({ default: m.ScorecardForm })),
  { ssr: false },
);

export default function ScorecardPage() {
  return (
    <>
      <section className="bg-parchment pt-24 sm:pt-32 pb-6 sm:pb-8 lg:pt-40 lg:pb-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <p className="overline">AI Maturity Scorecard</p>
          <h1 className="mt-6 text-display text-anthracite">How ready is your business for AI?</h1>
          <p className="mt-4 text-body-lg text-warm-gray">
            20 questions across 5 pillars. Takes about 5 minutes. Get your AI maturity score, pillar
            breakdown, and a personalized roadmap.
          </p>
        </div>
      </section>

      <section className="bg-parchment pb-16 sm:pb-24 lg:pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <ScorecardForm />
        </div>
      </section>
    </>
  );
}
