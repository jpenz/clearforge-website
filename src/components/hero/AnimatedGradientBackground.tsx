'use client';

import { type Easing, motion, useReducedMotion } from 'framer-motion';

/**
 * Dark-industrial animated gradient mesh background.
 *
 * Renders three layered radial gradients that slowly drift using Framer Motion.
 * Automatically removes animations when the OS `prefers-reduced-motion` is set.
 */
export function AnimatedGradientBackground() {
  const prefersReduced = useReducedMotion();

  const orb1Animation = prefersReduced
    ? {}
    : {
        animate: {
          x: [0, 60, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.15, 0.95, 1],
        },
        transition: {
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut' as Easing,
        },
      };

  const orb2Animation = prefersReduced
    ? {}
    : {
        animate: {
          x: [0, -80, 40, 0],
          y: [0, 60, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        },
        transition: {
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut' as Easing,
          delay: 3,
        },
      };

  const orb3Animation = prefersReduced
    ? {}
    : {
        animate: {
          x: [0, 50, -60, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.85, 1],
        },
        transition: {
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut' as Easing,
          delay: 6,
        },
      };

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base dark industrial gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-deep via-bg-primary to-bg-deep" />

      {/* Animated teal orb — top right */}
      <motion.div
        className="absolute -top-1/4 right-0 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(0,229,195,0.08) 0%, rgba(0,229,195,0.03) 40%, transparent 70%)',
        }}
        {...orb1Animation}
      />

      {/* Animated blue-teal orb — bottom left */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(5,158,135,0.07) 0%, rgba(5,158,135,0.02) 50%, transparent 70%)',
        }}
        {...orb2Animation}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,229,195,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,195,0.4) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Deep ambient orb — center */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(0,229,195,0.04) 0%, transparent 60%)',
        }}
        {...orb3Animation}
      />

      {/* Vignette overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-deep/60" />
    </div>
  );
}
