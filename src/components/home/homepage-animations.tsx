'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Premium animation wrappers for the homepage.
 * Per frontend-design + video-to-website skills:
 * - 4+ animation types, never consecutive repeats
 * - Staggered reveals: label → heading → body → CTA
 * - At least 1 pinned section
 * - Direction variety
 */

type AnimType = 'fade-up' | 'slide-left' | 'slide-right' | 'scale-up' | 'clip-reveal';

interface SectionRevealProps {
  children: ReactNode;
  animation: AnimType;
  className?: string;
}

/** Scroll-triggered section with varied entrance animations */
export function SectionReveal({ children, animation, className }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    const configs: Record<AnimType, { from: gsap.TweenVars }> = {
      'fade-up': { from: { opacity: 0, y: 50 } },
      'slide-left': { from: { opacity: 0, x: -80 } },
      'slide-right': { from: { opacity: 0, x: 80 } },
      'scale-up': { from: { opacity: 0, scale: 0.9 } },
      'clip-reveal': { from: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' } },
    };

    const config = configs[animation];

    gsap.fromTo(el, config.from, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: ref });

  return <div ref={ref} className={className}>{children}</div>;
}

/** Staggered reveal: children animate in sequence with delay */
export function StaggerReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(':scope > *');
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: ref });

  return <div ref={ref} className={className}>{children}</div>;
}

/** Pinned section: pins in place while children animate internally */
export function PinnedSection({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    const section = ref.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const items = content.querySelectorAll('.pin-item');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    });

    // Stagger reveal each pin-item
    items.forEach((item, i) => {
      tl.fromTo(item,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' },
        i * 0.2
      );
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

/** Horizontal scrub marquee — text moves with scroll, not time */
export function ScrubMarquee({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const track = trackRef.current;
    const container = ref.current;
    if (!track || !container) return;

    gsap.fromTo(track,
      { xPercent: 0 },
      {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={`overflow-hidden ${className || ''}`}>
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        <span className="text-[10vw] sm:text-[8vw] lg:text-[6vw] font-bold uppercase tracking-tight text-bone/[0.05] shrink-0 mr-[4vw]" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
          {text}
        </span>
        <span className="text-[10vw] sm:text-[8vw] lg:text-[6vw] font-bold uppercase tracking-tight text-bone/[0.05] shrink-0 mr-[4vw]" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
          {text}
        </span>
        <span className="text-[10vw] sm:text-[8vw] lg:text-[6vw] font-bold uppercase tracking-tight text-bone/[0.05] shrink-0 mr-[4vw]" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
          {text}
        </span>
      </div>
    </div>
  );
}
