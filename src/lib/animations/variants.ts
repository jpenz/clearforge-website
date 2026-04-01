import type { Variants } from 'framer-motion';

const smooth = [0.16, 1, 0.3, 1] as const;

/** Fade in + slide up — primary entrance */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [...smooth] } },
};

/** Simple opacity fade */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

/** Slide from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [...smooth] } },
};

/** Slide from right */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [...smooth] } },
};

/** Scale up */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [...smooth] } },
};

/** Stagger container */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Card hover — subtle lift with brass border */
export const cardHover = {
  rest: { y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  hover: { y: -4, transition: { duration: 0.25, ease: 'easeOut' } },
};

/** Button press */
export const buttonPress = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.15 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

/** Reduced motion fallback */
export const reducedFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/** No-op */
export const noMotion: Variants = {
  hidden: {},
  visible: {},
};
