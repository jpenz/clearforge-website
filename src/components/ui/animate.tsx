'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  Shared easing & variants                                          */
/* ------------------------------------------------------------------ */

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/* ------------------------------------------------------------------ */
/*  FadeIn — single element fade-in (optionally with y translate)     */
/* ------------------------------------------------------------------ */

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Duration in seconds (default 0.5) */
  duration?: number;
  /** Whether to include a y-axis translate (default true) */
  translate?: boolean;
  /** Element tag rendered by motion (default 'div') */
  as?: 'div' | 'section' | 'p' | 'span';
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  translate = true,
  as = 'div',
}: FadeInProps) {
  const Tag = motion[as];
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={translate ? fadeUp : fadeIn}
      transition={{ duration, delay, ease: [...ease] }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Stagger — container that staggers its children                     */
/* ------------------------------------------------------------------ */

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Delay between each child (default 0.1) */
  stagger?: number;
  /** Duration of each child animation (default 0.5) */
  duration?: number;
  /** Delay before the stagger begins (default 0) */
  delay?: number;
}

export function Stagger({
  children,
  className,
  stagger = 0.1,
  duration = 0.5,
  delay = 0,
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  StaggerItem — child inside a <Stagger>                            */
/* ------------------------------------------------------------------ */

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Duration of this item's animation (default 0.5) */
  duration?: number;
  /** Whether to include a y-axis translate (default true) */
  translate?: boolean;
}

export function StaggerItem({
  children,
  className,
  duration = 0.5,
  translate = true,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={translate ? fadeUp : fadeIn}
      transition={{ duration, ease: [...ease] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
