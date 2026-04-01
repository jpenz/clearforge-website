'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEMS = [
  'PE-BACKED MANUFACTURERS',
  'SERIES B SAAS',
  '$200M HEALTHCARE GROUPS',
  'INDUSTRIAL SERVICES',
  'PORTFOLIO COMPANIES',
  'MID-MARKET LEADERS',
];

export function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      gsap.fromTo(track, { xPercent: 5 }, {
        xPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  const content = ITEMS.join(' \u25C6 ');

  return (
    <div ref={sectionRef} className="border-y border-divider bg-parchment py-5 overflow-hidden">
      <p
        ref={trackRef}
        className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-warm-gray select-none"
        aria-hidden
      >
        {content}
        <span className="text-brass/40 mx-6">{'\u25C6'}</span>
        {content}
        <span className="text-brass/40 mx-6">{'\u25C6'}</span>
        {content}
      </p>
    </div>
  );
}
