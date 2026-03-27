'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fadeInUp, noMotion, reducedFadeIn } from './variants';

/**
 * Returns true when the user has requested reduced motion via OS preference.
 * Falls back to false when the preference cannot be determined (SSR).
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}

/**
 * Returns appropriate animation variants respecting prefers-reduced-motion.
 * Pass your preferred variants; if motion is reduced, a safe opacity-only
 * variant is returned instead.
 */
export function useMotionVariants(
  preferred: Variants = fadeInUp,
  reducedPreferred: Variants = reducedFadeIn,
): Variants {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? reducedPreferred : preferred;
}

/**
 * Returns `noMotion` variants when reduced motion is preferred, otherwise
 * the provided variants unchanged. Useful when you want to completely skip
 * an animation for accessibility.
 */
export function useOptionalVariants(preferred: Variants): Variants {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? noMotion : preferred;
}
