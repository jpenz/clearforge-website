'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Stat {
  value: string;
  label: string;
}

interface GSAPStatStripProps {
  stats: Stat[];
  className?: string;
}

export function GSAPStatStrip({ stats, className = '' }: GSAPStatStripProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className={`overflow-hidden border-y border-border-subtle py-10 lg:py-14 ${className}`}
    >
      <div ref={trackRef} className="flex items-center gap-0 whitespace-nowrap">
        {[...stats, ...stats].map((s, i) => (
          <div key={`${s.label}-${i}`} className="flex items-baseline gap-4 shrink-0 px-8 lg:px-14">
            <span className="metric text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none">
              {s.value}
            </span>
            <span className="text-sm text-text-muted uppercase tracking-widest font-medium max-w-[140px] whitespace-normal leading-tight">
              {s.label}
            </span>
            <span className="text-border-subtle text-3xl ml-4 select-none" aria-hidden>
              /
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
