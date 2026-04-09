'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type ReactNode } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
  children: ReactNode;
  /** Parallax speed factor. 0.3 = element moves at 30% of scroll speed. */
  speed?: number;
  className?: string;
}

/**
 * Wraps children in a GSAP-powered parallax container.
 * Element translates on Y axis relative to scroll position.
 */
export function Parallax({ children, speed = 0.3, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const el = ref.current;
      if (!el) return;

      // Skip parallax on mobile for performance
      if (window.innerWidth < 768) return;

      gsap.to(el, {
        y: () => -speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    },
    { scope: ref, dependencies: [speed] },
  );

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
