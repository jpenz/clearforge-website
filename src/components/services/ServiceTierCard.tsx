'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ServiceTier {
  /** Short tier name shown in the card header */
  name: string;
  /** One-line tagline below the name */
  tagline: string;
  /** Outcome-focused description (no raw feature lists) */
  description: string;
  /** Bullet-point outcomes */
  outcomes: string[];
  /** Starting price or price range (e.g. "From $12,000") */
  price: string;
  /** Pricing footnote */
  priceNote?: string;
  /** href for the CTA link */
  ctaHref: string;
  /** CTA label */
  ctaLabel: string;
  /** Whether this card should be visually highlighted */
  featured?: boolean;
  /** Accessible label for the animated icon */
  iconLabel: string;
  /** Icon slot — render your SVG or Lucide icon here */
  icon: React.ReactNode;
}

interface ServiceTierCardProps {
  tier: ServiceTier;
  /** Stagger delay index for entrance animation */
  index?: number;
}

/**
 * ServiceTierCard — displays a single service tier with:
 * - Animated SVG icon
 * - Outcome-focused description
 * - Price anchor
 * - Hover micro-interaction (scale + shadow)
 * - CTA link
 *
 * Layout: 1-col on sm, 2-col on md, 3-col on lg (grid handled by ServicesSection).
 */
export function ServiceTierCard({ tier, index = 0 }: ServiceTierCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      className={cn(
        'relative flex flex-col rounded-2xl p-8 transition-colors duration-300',
        'border',
        tier.featured
          ? 'bg-bg-surface border-accent/30 teal-glow'
          : 'bg-bg-surface border-border-subtle hover:border-accent/20',
      )}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{
        duration: prefersReduced ? 0.3 : 0.6,
        delay: prefersReduced ? 0 : index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={
        prefersReduced
          ? undefined
          : {
              scale: 1.02,
              boxShadow: '0 12px 48px rgba(0, 229, 195, 0.12)',
              transition: { duration: 0.25, ease: 'easeOut' },
            }
      }
      aria-label={`${tier.name} — ${tier.tagline}`}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-8">
          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-bg-deep">
            Most Popular
          </span>
        </div>
      )}

      {/* Animated icon */}
      <motion.div
        className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent"
        aria-label={tier.iconLabel}
        animate={
          prefersReduced
            ? undefined
            : {
                boxShadow: [
                  '0 0 0px rgba(0,229,195,0)',
                  '0 0 20px rgba(0,229,195,0.2)',
                  '0 0 0px rgba(0,229,195,0)',
                ],
              }
        }
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.8 }}
      >
        {tier.icon}
      </motion.div>

      {/* Tier name + tagline */}
      <p className="section-label mb-1">{tier.name}</p>
      <h3
        className="text-xl font-bold text-text-primary leading-snug"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {tier.tagline}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{tier.description}</p>

      {/* Outcome bullets */}
      <ul className="mt-5 space-y-2 flex-1" aria-label={`${tier.name} outcomes`}>
        {tier.outcomes.map((outcome) => (
          <li key={outcome} className="flex items-start gap-2 text-sm text-text-secondary">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-accent"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
            </svg>
            {outcome}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="mt-8 border-t border-border-subtle pt-6">
        <p className="metric text-2xl font-bold">{tier.price}</p>
        {tier.priceNote && (
          <p className="mt-1 text-xs text-text-muted">{tier.priceNote}</p>
        )}
      </div>

      {/* CTA */}
      <Link
        href={tier.ctaHref}
        className={cn(
          'mt-5 inline-flex items-center justify-center gap-2',
          'h-11 w-full rounded-lg px-6 text-sm font-semibold',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface',
          tier.featured
            ? 'bg-accent text-bg-deep hover:bg-accent-hover'
            : 'border border-border-default text-text-primary hover:border-accent hover:text-accent',
        )}
      >
        {tier.ctaLabel}
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </Link>
    </motion.article>
  );
}
