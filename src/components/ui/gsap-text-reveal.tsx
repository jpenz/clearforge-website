'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapTextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Stagger delay between words (0.03–0.08 recommended) */
  stagger?: number;
  /** If true, animation tied to scroll position (Apple word-by-word opacity) */
  scrub?: boolean;
  /** Extra style for the wrapper (e.g. fontFamily) */
  style?: React.CSSProperties;
}

/**
 * Scroll-triggered text reveal. Splits text into words and animates them in.
 *
 * - scrub=false (default): words translate-up and fade in with stagger, fires once
 * - scrub=true: each word goes from opacity 0.15 → 1.0 tied to scroll position
 */
export function GsapTextReveal({
  text,
  className = '',
  tag: Tag = 'h2',
  stagger = 0.05,
  scrub = false,
  style,
}: GsapTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const container = containerRef.current;
      if (!container) return;

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Simple fade-in on mobile — no word splitting
        gsap.from(container, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
        return;
      }

      const words = container.querySelectorAll<HTMLElement>('.gsap-word-inner');
      if (!words.length) return;

      if (scrub) {
        // Apple-style: each word fades from 0.15 → 1.0 as user scrolls
        gsap.set(words, { opacity: 0.15 });
        gsap.to(words, {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.5,
          },
        });
      } else {
        // Translate-up reveal with stagger, fires once
        gsap.set(words, { y: '100%', opacity: 0 });
        gsap.to(words, {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    },
    { scope: containerRef, dependencies: [text, scrub, stagger] },
  );

  const words = text.split(' ');

  return (
    <Tag ref={containerRef as React.Ref<never>} className={className} style={style}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <span className="gsap-word-inner inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
