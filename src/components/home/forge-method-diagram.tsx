'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The Forge Method™ — native editorial diagram.
 *
 * Replaces the V8.3 Excalidraw PNG. Hand-coded typographic layout:
 * - Three phases rendered as vertical columns separated by thin rules
 * - Giant Instrument Serif numbers (01/02/03) as the visual hero
 * - Brass-accented horizontal rules above/below
 * - Duration + pricing in JetBrains Mono
 * - Deliverables as editorial bullet list with thin rule markers
 * - GSAP scroll reveal: rules draw in → numbers rise → content staggers
 * - Fully responsive: stacks on mobile, 3 columns on desktop
 */

type Phase = {
  num: string;
  name: string;
  sub: string;
  duration: string;
  pricing: string;
  deliverables: string[];
  featured?: boolean;
};

const PHASES: Phase[] = [
  {
    num: '01',
    name: 'Diagnostic',
    sub: 'Forge Diagnostic™',
    duration: '4 weeks',
    pricing: 'From $15K',
    deliverables: [
      'Value chain map across your operations',
      'AI readiness score, 5 pillars',
      'Prioritized roadmap with ROI projections',
      '3+ quick-win opportunities or full refund',
    ],
  },
  {
    num: '02',
    name: 'Sprint',
    sub: 'Forge Sprint™',
    duration: '10–14 weeks',
    pricing: '$75K – $200K',
    deliverables: [
      'Production AI systems, not pilots',
      'Human-in-the-loop control surfaces',
      'KPI baselines and instrumented success',
      'Full integration with existing systems',
    ],
    featured: true,
  },
  {
    num: '03',
    name: 'Scale',
    sub: 'Forge Scale™',
    duration: 'Ongoing',
    pricing: '$5K – $15K / mo',
    deliverables: [
      'Model retraining as data evolves',
      'New capability builds on demand',
      'Quarterly business-impact reviews',
      'Strategic AI advisory for leadership',
    ],
  },
];

export function ForgeMethodDiagram() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const el = ref.current;
      if (!el) return;

      const rules = el.querySelectorAll('.fm-rule');
      const dividers = el.querySelectorAll('.fm-divider');
      const nums = el.querySelectorAll('.fm-num');
      const content = el.querySelectorAll('.fm-content');
      const items = el.querySelectorAll('.fm-deliverable');

      // immediateRender: false so each step is only applied when the timeline
      // reaches it. Prevents stuck opacity:0 if ScrollTrigger never fires.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      tl.fromTo(
        rules,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1, ease: 'power3.out', immediateRender: false },
      )
        .fromTo(
          dividers,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, immediateRender: false },
          '-=0.7',
        )
        .fromTo(
          nums,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12, immediateRender: false },
          '-=0.5',
        )
        .fromTo(
          content,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, immediateRender: false },
          '-=0.4',
        )
        .fromTo(
          items,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out', stagger: 0.04, immediateRender: false },
          '-=0.3',
        );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mt-16 lg:mt-20">
      {/* Top rule — spans full width */}
      <div className="fm-rule h-px w-full bg-brass/50" />

      {/* Three phases */}
      <div className="relative grid gap-0 lg:grid-cols-3">
        {PHASES.map((phase, i) => (
          <div key={phase.num} className="relative">
            {/* Left divider — desktop only, between columns */}
            {i > 0 && (
              <div className="fm-divider hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-divider" />
            )}

            <div
              className={`fm-content relative py-12 lg:py-16 lg:px-10 ${
                phase.featured ? 'lg:bg-brass/[0.02]' : ''
              } ${i > 0 ? 'border-t border-divider lg:border-t-0' : ''}`}
            >
              {/* Big number — the visual hero */}
              <div
                className="fm-num text-brass/90"
                style={{
                  fontFamily: 'var(--font-instrument-serif)',
                  fontSize: 'clamp(5rem, 11vw, 9rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.82,
                  fontWeight: 400,
                }}
              >
                {phase.num}
              </div>

              {/* Phase name + featured badge */}
              <div className="mt-6 flex items-baseline justify-between gap-3 flex-wrap">
                <h3
                  className="text-anthracite"
                  style={{
                    fontFamily: 'var(--font-instrument-serif)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    letterSpacing: '-0.02em',
                    fontWeight: 400,
                  }}
                >
                  {phase.name}
                </h3>
                {phase.featured && (
                  <span className="overline text-[10px]">Most chosen</span>
                )}
              </div>

              <p className="mt-1 text-body-sm text-warm-gray">{phase.sub}</p>

              {/* Duration + pricing */}
              <div className="mt-5 flex items-baseline gap-3 text-body-sm">
                <span className="metric text-anthracite">{phase.duration}</span>
                <span className="text-divider">·</span>
                <span className="metric text-anthracite">{phase.pricing}</span>
              </div>

              {/* Deliverables */}
              <ul className="mt-8 space-y-3">
                {phase.deliverables.map((d) => (
                  <li
                    key={d}
                    className="fm-deliverable flex items-start gap-3 text-body-sm text-warm-gray"
                  >
                    <span className="mt-[0.7em] h-px w-3 bg-brass/70 shrink-0" />
                    <span className="flex-1 leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom rule */}
      <div className="fm-rule h-px w-full bg-brass/50" />
    </div>
  );
}
