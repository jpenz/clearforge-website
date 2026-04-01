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

  useGSAP(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    // ACT 1: Pin and reveal text lines
    const act1 = act1Ref.current;
    const act1Text = act1TextRef.current;
    if (act1 && act1Text) {
      const lines = act1Text.querySelectorAll('.reveal-line');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: act1,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.5,
        },
      });
      lines.forEach((line, i) => {
        tl.fromTo(line, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, i * 0.15);
      });
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

    // ACT 4: Quote word-by-word reveal
    const act4 = act4Ref.current;
    const quoteEl = quoteWordsRef.current;
    if (act4 && quoteEl) {
      const words = quoteEl.querySelectorAll('.quote-word');
      gsap.fromTo(words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: act4,
            start: 'top 60%',
            end: 'center center',
            scrub: true,
          },
        },
      );
    }
  }, { scope: act1Ref });

  // Split quote into words for animation
  const quoteWords = quote.split(' ');

  return (
    <>
      {/* ═══ ACT 1: THE PROBLEM ═══ */}
      <section ref={act1Ref} className="dark-section noise-texture relative min-h-screen overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 py-32 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            {/* Left: The challenge */}
            <div ref={act1TextRef} className="lg:col-span-7">
              <p className="overline reveal-line">{industry}</p>
              <h1 className="mt-6 text-display-xl text-bone reveal-line">{title}</h1>
              <div className="mt-8 space-y-4">
                {challenge.split('. ').map((sentence, i) => (
                  <p key={i} className="text-body-lg text-stone reveal-line">
                    {sentence}{i < challenge.split('. ').length - 1 ? '.' : ''}
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

      {/* ═══ ACT 2: THE INTERVENTION — Horizontal scroll timeline ═══ */}
      <section ref={act2Ref} className="bg-parchment overflow-hidden" style={{ height: '100vh' }}>
        <div className="h-full flex flex-col justify-center">
          {/* Section header */}
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mb-12">
            <p className="overline">The Forge Method™ Applied</p>
            <h2 className="mt-4 text-display">How we solved it</h2>
          </div>

          {/* Timeline line */}
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mb-8">
            <div className="h-0.5 bg-divider relative">
              <div ref={timelineLineRef} className="absolute inset-y-0 left-0 bg-brass origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>

          {/* Horizontal track */}
          <div ref={timelineTrackRef} className="flex gap-12 px-10 will-change-transform">
            {phases.map((phase, i) => (
              <div key={phase.title} className="shrink-0 w-[400px] lg:w-[500px]">
                <div className="border border-divider bg-surface p-8 h-full">
                  <span className="metric text-sm text-brass">Phase {String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs text-warm-gray ml-3 uppercase tracking-wider">{phase.duration}</span>
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

      {/* ═══ ACT 3: THE RESULTS ═══ */}
      <section className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline text-center">The Results</p>
          <h2 className="mt-4 text-display text-bone text-center">
            The numbers speak for themselves.
          </h2>

          <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
            {outcomes.map((outcome, i) => (
              <div key={outcome.description} className="text-center"
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

      {/* ═══ ACT 4: THE IMPACT — Quote reveal ═══ */}
      <section ref={act4Ref} className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <span className="block text-[80px] leading-none text-brass/20" aria-hidden>&ldquo;</span>

          <div ref={quoteWordsRef} className="mt-4">
            <p className="text-h1 text-anthracite leading-snug" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
              {quoteWords.map((word, i) => (
                <span key={i} className="quote-word inline-block mr-[0.3em]">
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
      <section className="dark-section py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">Want results like these?</h2>
          <p className="mt-4 text-body-lg text-stone">
            Every engagement starts with understanding your business. Not a pitch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">Get My Free AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
