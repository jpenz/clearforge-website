'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedGradientBackground } from './AnimatedGradientBackground';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

/**
 * HeroSection — dark-industrial gradient background, bold headline,
 * sub-headline, and primary CTA button.
 *
 * Responsive: sm (≥ 375 px), md (≥ 768 px), lg (≥ 1024 px).
 * Respects prefers-reduced-motion.
 */
export function HeroSection() {
  const prefersReduced = useReducedMotion();

  const containerVariants = prefersReduced
    ? { hidden: {}, visible: {} }
    : staggerContainer;

  const itemVariants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : fadeInUp;

  return (
    <section
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-bg-deep"
      aria-labelledby="hero-headline"
    >
      {/* Animated gradient mesh */}
      <AnimatedGradientBackground />

      {/* Extra gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/60 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-36 lg:px-8 lg:pb-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Label */}
        <motion.p variants={itemVariants} className="section-label">
          AI Strategy &amp; Execution
        </motion.p>

        {/* Headline — ≥ 32 px on sm, ≥ 48 px on lg */}
        <motion.h1
          id="hero-headline"
          variants={itemVariants}
          className="mt-6 max-w-4xl text-[clamp(2rem,8vw,6.5rem)] leading-[0.92] tracking-tighter text-text-primary"
        >
          From AI Strategy{' '}
          <em className="accent-gradient-text not-italic">to AI Results.</em>
        </motion.h1>

        {/* Sub-headline */}
        <motion.div variants={itemVariants} className="mt-8 max-w-lg">
          <p className="text-lg leading-relaxed text-text-secondary sm:text-xl">
            We diagnose where AI should drive growth, build the systems that get you there,
            and ensure your people actually use them — one partner, no handoffs.
          </p>
        </motion.div>

        {/* Trust proof line */}
        <motion.p variants={itemVariants} className="mt-4 text-sm text-text-muted">
          Trusted by mid-market operators across manufacturing, finance, and healthcare.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
        >
          {/* Primary CTA */}
          <Link
            href="/assessment"
            className={[
              'inline-flex items-center justify-center gap-2',
              'h-12 w-full rounded-lg px-8 text-base font-semibold sm:w-auto',
              'bg-accent text-bg-deep',
              'hover:bg-accent-hover transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep',
              'min-w-[44px] min-h-[44px]',
            ].join(' ')}
          >
            Get Your Free AI Readiness Assessment
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/contact"
            className={[
              'inline-flex items-center justify-center gap-2',
              'h-12 w-full rounded-lg px-8 text-base font-medium sm:w-auto',
              'border border-border-default text-text-primary bg-transparent',
              'hover:border-accent hover:text-accent transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep',
              'min-w-[44px] min-h-[44px]',
            ].join(' ')}
          >
            Request a Proposal
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-20 hidden lg:flex items-center gap-3 text-text-muted text-xs"
          aria-hidden="true"
        >
          <motion.div
            className="h-8 w-px bg-accent/30"
            animate={prefersReduced ? {} : { scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
