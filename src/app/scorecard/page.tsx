'use client';

import dynamic from 'next/dynamic';

const ScorecardForm = dynamic(
  () => import('@/components/scorecard/scorecard-form').then((m) => ({ default: m.ScorecardForm })),
  { ssr: false },
);

export default function ScorecardPage() {
  return (
    <>
      <section className="dark-section pt-24 pb-10 sm:pt-32 sm:pb-14 lg:pt-40 lg:pb-20">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:px-10">
          <div>
            <p className="overline">ClearForge Diagnostic</p>
            <h1 className="mt-6 text-display text-bone">
              Is your first AI workflow ready to build?
            </h1>
            <p className="mt-4 text-body-lg text-stone">
              Ten questions across value case, workflow, data path, controls, and adoption cadence.
              The readout shows where a build would stall and what ClearForge would inspect first.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-divider-dark bg-divider-dark sm:grid-cols-3 lg:grid-cols-1">
            {[
              ['01', 'Select one workflow'],
              ['02', 'Expose the weakest pillar'],
              ['03', 'Map the first build path'],
            ].map(([step, label]) => (
              <div key={step} className="bg-forge-black/70 p-4">
                <p className="metric text-xs text-brass">{step}</p>
                <p className="mt-1 text-sm font-semibold text-bone">{label}</p>
              </div>
            ))}
          </div>
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
