'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fadeInUp, noMotion, reducedFadeIn } from './variants';

/** Returns true when user prefers reduced motion */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}

/** Returns appropriate variants respecting prefers-reduced-motion */
export function useMotionVariants(
  preferred: Variants = fadeInUp,
  reduced: Variants = reducedFadeIn,
): Variants {
  return useReducedMotion() ? reduced : preferred;
}

/** Returns noMotion when reduced motion preferred */
export function useOptionalVariants(preferred: Variants): Variants {
  return useReducedMotion() ? noMotion : preferred;
}
