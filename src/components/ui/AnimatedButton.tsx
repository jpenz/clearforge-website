'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart'> {
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Render as a different element (e.g., via asChild pattern) */
  className?: string;
}

const variantStyles: Record<NonNullable<AnimatedButtonProps['variant']>, string> = {
  primary: [
    'bg-accent text-bg-deep font-semibold',
    'hover:bg-accent-hover',
    'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep',
  ].join(' '),
  secondary: [
    'bg-bg-surface text-text-primary border border-border-default',
    'hover:border-accent hover:text-accent',
    'focus-visible:ring-2 focus-visible:ring-accent',
  ].join(' '),
  outline: [
    'bg-transparent text-accent border border-accent',
    'hover:bg-accent hover:text-bg-deep',
    'focus-visible:ring-2 focus-visible:ring-accent',
  ].join(' '),
  ghost: [
    'bg-transparent text-text-secondary',
    'hover:text-text-primary hover:bg-bg-surface',
    'focus-visible:ring-2 focus-visible:ring-accent',
  ].join(' '),
};

const sizeStyles: Record<NonNullable<AnimatedButtonProps['size']>, string> = {
  sm: 'h-9 px-4 text-sm rounded-md min-w-[44px]',
  md: 'h-11 px-6 text-sm rounded-lg min-w-[44px]',
  lg: 'h-12 px-8 text-base rounded-lg min-w-[44px]',
};

/**
 * Button with hover/tap micro-interactions.
 * Respects `prefers-reduced-motion` — animations are disabled when active.
 */
export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  type = 'button',
  ...props
}: AnimatedButtonProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'transition-colors duration-200',
        'outline-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      whileHover={prefersReduced || disabled ? undefined : { scale: 1.03 }}
      whileTap={prefersReduced || disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
