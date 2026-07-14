import type { ReactNode } from 'react';

/**
 * Server-rendered passthroughs. These were GSAP ScrollTrigger reveals until
 * V11's perceived-performance pass: interior pages now render content
 * instantly with native scroll. The APIs are preserved so page code and
 * future re-animation don't churn call sites.
 */

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility */
  delay?: number;
  duration?: number;
  translate?: boolean;
  as?: 'div' | 'section' | 'p' | 'span';
}

export function FadeIn({ children, className, as = 'div' }: FadeInProps) {
  const Component = as;
  return <Component className={className}>{children}</Component>;
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility */
  stagger?: number;
  duration?: number;
  delay?: number;
}

export function Stagger({ children, className }: StaggerProps) {
  return <div className={className}>{children}</div>;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility */
  duration?: number;
  translate?: boolean;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return <div className={className}>{children}</div>;
}
