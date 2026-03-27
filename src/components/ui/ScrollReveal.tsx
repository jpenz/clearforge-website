'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import type { UseInViewOptions, Variants } from 'framer-motion';
import { fadeInUp } from '@/lib/animations/variants';

interface ScrollRevealProps {
  children: ReactNode;
  /** Framer Motion variants to use. Defaults to fadeInUp. */
  variants?: Variants;
  /** Tailwind / CSS class names applied to the wrapper element */
  className?: string;
  /** Root margin passed to IntersectionObserver (default "0px 0px -80px 0px") */
  rootMargin?: string;
  /** Trigger only once (default true) */
  once?: boolean;
  /** Fraction of element visible before triggering (default 0.15) */
  threshold?: number;
  /** HTML tag for the wrapper element (default "div") */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Wraps children in a Framer Motion element that fades/slides in when the
 * element enters the viewport.
 *
 * Automatically falls back to a simple opacity fade when the OS
 * `prefers-reduced-motion` media query is active.
 */
export function ScrollReveal({
  children,
  variants = fadeInUp,
  className,
  rootMargin = '0px 0px -80px 0px',
  once = true,
  threshold = 0.15,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: rootMargin as UseInViewOptions['margin'],
    amount: threshold,
  });

  const safeVariants: Variants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : variants;

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      variants={safeVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </MotionTag>
  );
}
