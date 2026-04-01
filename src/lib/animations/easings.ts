/** GSAP easing presets for the Forge design system */

/** Default entrance — smooth deceleration */
export const EASE_SMOOTH = 'power2.out';

/** Snappy interactions — buttons, hovers */
export const EASE_PRECISE = 'power3.out';

/** Cinematic transitions — slow, editorial */
export const EASE_EDITORIAL = 'power2.inOut';

/** Metric counters — fast start, slow settle */
export const EASE_METRIC = 'power4.out';

/** Exit animations */
export const EASE_EXIT = 'power2.in';

/** Duration presets (seconds) */
export const DURATION = {
  micro: 0.15,
  short: 0.3,
  medium: 0.6,
  long: 1.0,
  counter: 2.0,
  stagger: 0.08,
} as const;
