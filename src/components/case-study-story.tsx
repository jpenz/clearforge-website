import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MetricCounter } from '@/components/home/metric-counter';
import { Button } from '@/components/ui/button';

interface CaseStudyStoryProps {
  industry: string;
  title: string;
  challenge: string;
  challengeMetric: string;
  challengeMetricLabel: string;
  phases: { title: string; duration: string; description: string }[];
  outcomes: { metric: string; description: string }[];
  systemLayers?: { name: string; role: string; evidence: string }[];
  proofDashboard?: {
    title: string;
    summary: string;
    metrics: { label: string; value: string; context: string }[];
    leadVolume?: { label: string; value: number }[];
    teamPerformance?: {
      name: string;
      opportunities: number;
      playbooks: number;
      quality: string;
    }[];
    pipelineStages?: { label: string; value: number }[];
  };
  evidenceNotes?: string[];
  quote: string;
  quoteAttribution: string;
  compoundResult?: string;
}

/**
 * Case study in four acts: problem → intervention → results → impact.
 * Server-rendered, instant content (the V11 doctrine): the old GSAP pinned
 * horizontal timeline caused page overflow, a clipped final card, and a
 * ~970px pin-spacer dead band in any static render — replaced with a plain
 * responsive grid. Counters (motion-as-moments) are the only client bits.
 */
export function CaseStudyStory({
  industry,
  title,
  challenge,
  challengeMetric,
  challengeMetricLabel,
  phases,
  outcomes,
  systemLayers,
  proofDashboard,
  evidenceNotes,
  quote,
  quoteAttribution,
  compoundResult,
}: CaseStudyStoryProps) {
  const challengeSentences = challenge.split('. ');
  const maxLeadVolume = proofDashboard?.leadVolume
    ? Math.max(...proofDashboard.leadVolume.map((point) => point.value))
    : 0;
  const maxPipelineStage = proofDashboard?.pipelineStages
    ? Math.max(...proofDashboard.pipelineStages.map((point) => point.value))
    : 0;

  return (
    <>
      {/* ═══ ACT 1: THE PROBLEM ═══ */}
      <section className="dark-section noise-texture relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-32 lg:flex lg:min-h-[88svh] lg:items-center lg:px-10 lg:py-0">
          <div className="items-center lg:grid lg:grid-cols-12 lg:gap-16">
            {/* Left: The challenge */}
            <div className="lg:col-span-7">
              <p className="overline">{industry}</p>
              <h1 className="mt-6 text-display-xl text-bone">{title}</h1>
              <div className="mt-8 space-y-4">
                {challengeSentences.map((sentence, i) => (
                  <p key={sentence} className="text-body-lg text-stone">
                    {sentence}
                    {i < challengeSentences.length - 1 ? '.' : ''}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: The cost */}
            <div className="mt-12 text-center lg:col-span-5 lg:mt-0 lg:text-right">
              <MetricCounter value={challengeMetric} className="metric-xl text-brass-light" />
              <p className="mt-3 text-body text-stone">{challengeMetricLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACT 2: THE INTERVENTION ═══ */}
      <section className="bg-parchment py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <p className="overline">The Forge Method™ Applied</p>
          <h2 className="mt-4 text-display max-w-2xl">From constraint to operating cadence.</h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {phases.map((phase, i) => (
              <div key={phase.title} className="border border-divider bg-surface p-6 sm:p-8">
                <span className="metric text-sm text-brass">
                  Phase {String(i + 1).padStart(2, '0')}
                </span>
                <span className="ml-3 text-xs uppercase text-warm-gray">{phase.duration}</span>
                <h3 className="mt-4 text-h3">{phase.title}</h3>
                <p className="mt-4 text-body text-warm-gray">{phase.description}</p>
              </div>
            ))}

            <div className="flex flex-col justify-center border-2 border-brass bg-brass/5 p-6 sm:p-8">
              <span className="metric text-sm text-brass">Results</span>
              <h3 className="mt-4 text-h3">What happened next.</h3>
              <p className="mt-2 text-body text-warm-gray">The measured outcomes follow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACT 3: THE RESULTS ═══ */}
      <section className="dark-section py-16 sm:py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <p className="overline text-center">The Results</p>
          <h2 className="mt-4 text-display text-bone text-center">Measured outcomes.</h2>

          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-16 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-12">
            {outcomes.map((outcome) => (
              <div key={outcome.description} className="min-w-0 text-center">
                <MetricCounter
                  value={outcome.metric}
                  className={`${
                    outcome.metric.length > 7 ? 'metric-lg' : 'metric-xl'
                  } block break-words text-brass-light [text-wrap:balance]`}
                  duration={2.5}
                />
                <p className="mt-4 text-body-sm text-stone">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ACT 3.5: THE OPERATING SYSTEM ═══ */}
      {(systemLayers?.length || proofDashboard || evidenceNotes?.length) && (
        <section className="border-t border-divider bg-warm-white py-16 sm:py-24 lg:py-40">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="overline">What We Built</p>
                <h2 className="mt-4 text-display">The operating system behind the result.</h2>
                <p className="mt-5 text-body-lg text-warm-gray">
                  ClearForge builds the AI layer, workflow, dashboard, controls, and adoption rhythm
                  together. The output is not a tool demo. It is a measurable way of running the
                  work.
                </p>
              </div>

              <div className="mt-12 space-y-12 lg:col-span-8 lg:mt-0">
                {systemLayers?.length ? (
                  <div className="border-t border-divider">
                    {systemLayers.map((layer, index) => (
                      <div
                        key={layer.name}
                        className="grid gap-4 border-b border-divider py-6 lg:grid-cols-[4rem_1fr_1.15fr]"
                      >
                        <span className="metric text-sm text-brass">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="text-h4">{layer.name}</h3>
                          <p className="mt-2 text-body-sm text-warm-gray">{layer.role}</p>
                        </div>
                        <p className="text-body-sm font-medium leading-relaxed text-anthracite">
                          {layer.evidence}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {proofDashboard ? (
                  <div className="dark-section border border-divider-dark p-5 sm:p-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-2xl">
                        <p className="overline text-brass-light">Executive Dashboard</p>
                        <h3 className="mt-3 text-h2 text-bone">{proofDashboard.title}</h3>
                        <p className="mt-3 text-body text-stone">{proofDashboard.summary}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {proofDashboard.metrics.map((metric) => (
                        <div key={metric.label} className="border-t border-divider-dark pt-4">
                          <p className="metric text-2xl text-brass-light">{metric.value}</p>
                          <p className="mt-2 text-xs font-semibold uppercase text-bone/80">
                            {metric.label}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-stone">
                            {metric.context}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 grid gap-8 lg:grid-cols-2">
                      {proofDashboard.leadVolume?.length ? (
                        <div>
                          <p className="text-sm font-semibold text-bone">
                            Qualified leads found month over month
                          </p>
                          <div className="mt-5 flex h-56 items-end gap-3 border-b border-l border-divider-dark px-3 pb-3">
                            {proofDashboard.leadVolume.map((point) => (
                              <div
                                key={point.label}
                                className="flex h-full flex-1 flex-col justify-end gap-2"
                              >
                                <span className="text-center text-[10px] text-stone">
                                  {point.value}
                                </span>
                                <div
                                  className="min-h-2 bg-brass-light"
                                  style={{
                                    height: `${Math.max(8, (point.value / maxLeadVolume) * 100)}%`,
                                  }}
                                />
                                <span className="text-center text-[10px] text-stone">
                                  {point.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {proofDashboard.teamPerformance?.length ? (
                        <div>
                          <p className="text-sm font-semibold text-bone">
                            Sales team execution analytics
                          </p>
                          <div className="mt-5 border-t border-divider-dark">
                            {proofDashboard.teamPerformance.map((row) => (
                              <div
                                key={row.name}
                                className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] gap-3 border-b border-divider-dark py-3 text-xs"
                              >
                                <span className="font-medium text-bone">{row.name}</span>
                                <span className="text-stone">{row.opportunities} opps</span>
                                <span className="text-stone">{row.playbooks} plays</span>
                                <span className="text-brass-light">{row.quality}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {proofDashboard.pipelineStages?.length ? (
                        <div className={proofDashboard.leadVolume ? 'lg:col-span-2' : ''}>
                          <p className="text-sm font-semibold text-bone">
                            Operating funnel from signal to action
                          </p>
                          <div className="mt-5 space-y-3">
                            {proofDashboard.pipelineStages.map((stage) => (
                              <div key={stage.label}>
                                <div className="mb-1 flex items-center justify-between gap-4 text-xs">
                                  <span className="text-stone">{stage.label}</span>
                                  <span className="metric text-brass-light">{stage.value}</span>
                                </div>
                                <div className="h-2 bg-divider-dark">
                                  <div
                                    className="h-full bg-brass-light"
                                    style={{
                                      width: `${Math.max(8, (stage.value / maxPipelineStage) * 100)}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {evidenceNotes?.length ? (
                  <div className="border-l-2 border-brass pl-5">
                    <p className="overline">Why This Mattered</p>
                    <div className="mt-3 space-y-2">
                      {evidenceNotes.map((note) => (
                        <p key={note} className="text-body text-warm-gray">
                          {note}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ ACT 4: THE IMPACT ═══ */}
      <section className="bg-parchment py-16 sm:py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-10">
          <span className="block text-[50px] leading-none text-brass/20 sm:text-[80px]" aria-hidden>
            &ldquo;
          </span>

          <p className="mt-4 text-h1 leading-snug text-anthracite">{quote}</p>

          <p className="mt-8 text-body text-warm-gray">{quoteAttribution}</p>

          {compoundResult && (
            <div className="mt-12 border-t border-divider pt-8">
              <p className="overline">What happened next</p>
              <p className="mt-3 text-body-lg text-anthracite">{compoundResult}</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-divider bg-recessed py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-10">
          <h2 className="text-display">Want results like these?</h2>
          <p className="mt-4 text-body-lg text-warm-gray">
            Every engagement starts with understanding your business. Not a pitch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Map the Workflow <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/case-studies">See More Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
