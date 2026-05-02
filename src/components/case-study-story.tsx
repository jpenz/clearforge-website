'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { MetricCounter } from '@/components/home/metric-counter';
import { Button } from '@/components/ui/button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
 * Scroll-driven cinematic case study.
 *
 * 4 Acts:
 * 1. THE PROBLEM — pinned, text reveals line-by-line, cost counter climbs
 * 2. THE INTERVENTION — horizontal scroll timeline showing Forge Method phases
 * 3. THE RESULTS — staggered metric counters with before/after energy
 * 4. THE IMPACT — full-bleed client quote with line reveal
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
  const act1Ref = useRef<HTMLDivElement>(null);
  const act1TextRef = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const act4Ref = useRef<HTMLDivElement>(null);
  const quoteWordsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || window.innerWidth < 768) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ACT 1: Soft stagger reveal on page load (no pinning — pinning felt wrong
      // for B2B consulting, same reason we reverted the home hero in V8.18).
      // immediateRender: false so content stays visible if animation never fires.
      const act1Text = act1TextRef.current;
      if (act1Text && !prefersReduced) {
        const lines = act1Text.querySelectorAll('.reveal-line');
        gsap.fromTo(
          lines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            immediateRender: false,
          },
        );
      }

      // ACT 2: Horizontal scroll timeline
      const act2 = act2Ref.current;
      const track = timelineTrackRef.current;
      const line = timelineLineRef.current;
      if (act2 && track && line) {
        const totalWidth = track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: act2,
            start: 'top top',
            end: `+=${totalWidth}`,
            pin: true,
            scrub: 0.5,
          },
        });
        // Line fill
        gsap.to(line, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: act2,
            start: 'top top',
            end: `+=${totalWidth}`,
            scrub: 0.5,
          },
        });
      }

      // ACT 4: Quote word-by-word reveal.
      // immediateRender: false keeps words visible until ScrollTrigger fires.
      const act4 = act4Ref.current;
      const quoteEl = quoteWordsRef.current;
      if (act4 && quoteEl && !prefersReduced) {
        const words = quoteEl.querySelectorAll('.quote-word');
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.05,
            immediateRender: false,
            scrollTrigger: {
              trigger: act4,
              start: 'top 60%',
              end: 'center center',
              scrub: true,
            },
          },
        );
      }
    },
    { scope: act1Ref },
  );

  const challengeSentences = challenge.split('. ');
  const maxLeadVolume = proofDashboard?.leadVolume
    ? Math.max(...proofDashboard.leadVolume.map((point) => point.value))
    : 0;
  const maxPipelineStage = proofDashboard?.pipelineStages
    ? Math.max(...proofDashboard.pipelineStages.map((point) => point.value))
    : 0;

  let quoteOffset = 0;
  const quoteWords = quote.split(' ').map((word) => {
    const key = `${quoteOffset}-${word}`;
    quoteOffset += word.length + 1;
    return { key, word };
  });

  return (
    <>
      {/* ═══ ACT 1: THE PROBLEM ═══ */}
      <section
        ref={act1Ref}
        className="dark-section noise-texture relative min-h-screen overflow-hidden"
      >
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-20 sm:py-32 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            {/* Left: The challenge */}
            <div ref={act1TextRef} className="lg:col-span-7">
              <p className="overline reveal-line">{industry}</p>
              <h1 className="mt-6 text-display-xl text-bone reveal-line">{title}</h1>
              <div className="mt-8 space-y-4">
                {challengeSentences.map((sentence, i) => (
                  <p key={sentence} className="text-body-lg text-stone reveal-line">
                    {sentence}
                    {i < challengeSentences.length - 1 ? '.' : ''}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: The cost */}
            <div className="lg:col-span-5 mt-12 lg:mt-0 text-center lg:text-right">
              <MetricCounter value={challengeMetric} className="metric-xl text-error" />
              <p className="mt-3 text-body text-stone">{challengeMetricLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACT 2: THE INTERVENTION — Horizontal scroll (desktop) / Vertical stack (mobile) ═══ */}
      {/* Desktop: horizontal scroll with GSAP */}
      <section
        ref={act2Ref}
        className="bg-parchment overflow-hidden hidden md:block"
        style={{ height: '100vh' }}
      >
        <div className="h-full flex flex-col justify-center">
          {/* Section header */}
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mb-12">
            <p className="overline">The Forge Method™ Applied</p>
            <h2 className="mt-4 text-display">How we solved it</h2>
          </div>

          {/* Timeline line */}
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mb-8">
            <div className="h-0.5 bg-divider relative">
              <div
                ref={timelineLineRef}
                className="absolute inset-y-0 left-0 bg-brass origin-left"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>

          {/* Horizontal track */}
          <div ref={timelineTrackRef} className="flex gap-12 px-10 will-change-transform">
            {phases.map((phase, i) => (
              <div key={phase.title} className="shrink-0 w-[400px] lg:w-[500px]">
                <div className="border border-divider bg-surface p-8 h-full">
                  <span className="metric text-sm text-brass">
                    Phase {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-warm-gray ml-3 uppercase">{phase.duration}</span>
                  <h3 className="mt-4 text-h3">{phase.title}</h3>
                  <p className="mt-4 text-body text-warm-gray">{phase.description}</p>
                </div>
              </div>
            ))}

            {/* Final card: results preview */}
            <div className="shrink-0 w-[400px] lg:w-[500px]">
              <div className="border-2 border-brass bg-brass/5 p-8 h-full flex flex-col justify-center">
                <span className="metric text-sm text-brass">Results</span>
                <h3 className="mt-4 text-h3">Keep scrolling to see what happened.</h3>
                <p className="mt-2 text-body text-warm-gray">The numbers speak for themselves.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: vertical stack fallback */}
      <section className="bg-parchment py-16 md:hidden">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <p className="overline">The Forge Method™ Applied</p>
          <h2 className="mt-4 text-display">How we solved it</h2>

          <div className="mt-10 space-y-4">
            {phases.map((phase, i) => (
              <div key={phase.title} className="border border-divider bg-surface p-5">
                <span className="metric text-sm text-brass">
                  Phase {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs text-warm-gray ml-3 uppercase">{phase.duration}</span>
                <h3 className="mt-3 text-h3">{phase.title}</h3>
                <p className="mt-3 text-body text-warm-gray">{phase.description}</p>
              </div>
            ))}

            <div className="border-2 border-brass bg-brass/5 p-5">
              <span className="metric text-sm text-brass">Results</span>
              <h3 className="mt-3 text-h3">Keep scrolling to see what happened.</h3>
              <p className="mt-2 text-body text-warm-gray">The numbers speak for themselves.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACT 3: THE RESULTS ═══ */}
      <section className="dark-section py-16 sm:py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <p className="overline text-center">The Results</p>
          <h2 className="mt-4 text-display text-bone text-center">
            The numbers speak for themselves.
          </h2>

          <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4 lg:gap-12">
            {outcomes.map((outcome, i) => (
              <div
                key={outcome.description}
                className="text-center"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <MetricCounter
                  value={outcome.metric}
                  className="metric-xl text-brass-light"
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

      {/* ═══ ACT 4: THE IMPACT — Quote reveal ═══ */}
      <section ref={act4Ref} className="bg-parchment py-16 sm:py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 text-center">
          <span className="block text-[50px] sm:text-[80px] leading-none text-brass/20" aria-hidden>
            &ldquo;
          </span>

          <div ref={quoteWordsRef} className="mt-4">
            <p
              className="text-h1 text-anthracite leading-snug"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              {quoteWords.map(({ key, word }) => (
                <span key={key} className="quote-word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </p>
          </div>

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
      <section className="dark-section py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">Want results like these?</h2>
          <p className="mt-4 text-body-lg text-stone">
            Every engagement starts with understanding your business. Not a pitch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Generate My AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/case-studies">See More Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
