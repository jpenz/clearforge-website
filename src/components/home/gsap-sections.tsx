'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type ReactNode } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ────────────────────────────────────────────────────────
   MetricWall — scales metrics in with back.out easing
   ──────────────────────────────────────────────────────── */

interface MetricWallProps {
  children: ReactNode;
  className?: string;
}

export function MetricWall({ children, className = '' }: MetricWallProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const el = ref.current;
      if (!el) return;

      const items = el.querySelectorAll<HTMLElement>('.metric-item');
      if (!items.length) return;

      gsap.from(items, {
        scale: 0.7,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.5)',
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   ForgeMethodCards — stagger from bottom with rotateX
   ──────────────────────────────────────────────────────── */

interface ForgeMethodCardsProps {
  children: ReactNode;
  className?: string;
}

export function ForgeMethodCards({ children, className = '' }: ForgeMethodCardsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const el = ref.current;
      if (!el) return;

      const cards = el.querySelectorAll<HTMLElement>('.forge-card');
      if (!cards.length) return;

      gsap.from(cards, {
        y: 40,
        rotateX: 5,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ perspective: '1000px' }}>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   ScrollReveal — generic scroll-triggered fade up
   ──────────────────────────────────────────────────────── */

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds */
  delay?: number;
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const el = ref.current;
      if (!el) return;

      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
