import type { Variants } from 'framer-motion';

/** Fade in + slide up — primary entrance animation */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Simple opacity fade */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/** Slide in from the left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Slide in from the right */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Scale up from slightly smaller */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Stagger container — wraps children with staggered entrance */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/** Stagger container with slower cadence */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/** Card hover micro-interaction */
export const cardHover = {
  rest: { scale: 1, boxShadow: '0 0 0 rgba(0, 229, 195, 0)' },
  hover: {
    scale: 1.02,
    boxShadow: '0 8px 40px rgba(0, 229, 195, 0.12)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

/** Button press micro-interaction */
export const buttonPress = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2, ease: 'easeOut' } },
  tap: { scale: 0.97, transition: { duration: 0.1 } },
};

/** Reduced-motion safe variants (no transforms, only opacity) */
export const reducedFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/** No-op variants for when motion should be skipped entirely */
export const noMotion: Variants = {
  hidden: {},
  visible: {},
};
