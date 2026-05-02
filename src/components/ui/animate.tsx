'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP-backed scroll reveal helpers (replaces Framer Motion as of V8.8).
 *
 * Same exports as before so existing page code doesn't need to change,
 * but now uses GSAP ScrollTrigger which shares the Lenis scroll loop with
 * the homepage's SectionReveal components. One animation runtime, one
 * scroll observer per element, measurably smoother than running both
 * Framer Motion's IntersectionObservers and GSAP in parallel.
 */

const EASE = 'power3.out';
const TRIGGER_START = 'top 88%';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/*  FadeIn — single element reveal                                    */
/* ------------------------------------------------------------------ */

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Whether to include a y-axis translate (default true) */
  translate?: boolean;
  /** Element tag (default 'div') */
  as?: 'div' | 'section' | 'p' | 'span';
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  translate = true,
  as = 'div',
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: translate ? 20 : 0 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: EASE,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: TRIGGER_START,
            toggleActions: 'play none none none',
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  const Component = as as 'div';
  return (
    <Component ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/*  Stagger — container that staggers its <StaggerItem> children      */
/* ------------------------------------------------------------------ */

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Delay between each child (default 0.1) */
  stagger?: number;
  /** Duration of each child's animation */
  duration?: number;
  /** Delay before the whole stagger begins */
  delay?: number;
}

export function Stagger({
  children,
  className,
  stagger = 0.1,
  duration = 0.6,
  delay = 0,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll(':scope > [data-stagger-item]');
      if (!items.length) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: EASE,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: TRIGGER_START,
            toggleActions: 'play none none none',
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  StaggerItem — marker for Stagger children                         */
/* ------------------------------------------------------------------ */

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility; parent Stagger controls timing */
  duration?: number;
  translate?: boolean;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <div data-stagger-item className={className}>
      {children}
    </div>
  );
}
