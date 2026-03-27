'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Search, Wrench, Activity } from 'lucide-react';
import { ServiceTierCard } from './ServiceTierCard';
import type { ServiceTier } from './ServiceTierCard';
import { fadeInUp } from '@/lib/animations/variants';

const serviceTiers: ServiceTier[] = [
  {
    name: 'Discovery & Strategy',
    tagline: 'Find the growth. Name the real bottleneck.',
    description:
      'We map your value chain, quantify where value is leaking, and deliver a prioritized AI roadmap tied to measurable business outcomes — not slide decks.',
    outcomes: [
      'End-to-end revenue and operations workflow map',
      'AI opportunity prioritization tied to your KPIs',
      'Readiness assessment across data, tech, and people',
      'Actionable 90-day plan with owners and timelines',
    ],
    price: 'From $12,000',
    priceNote: '4–6 week engagement',
    ctaHref: '/contact?service=strategy',
    ctaLabel: 'Start with Strategy',
    iconLabel: 'Discovery and strategy icon',
    icon: <Search className="h-6 w-6" aria-hidden="true" />,
  },
  {
    name: 'Implementation',
    tagline: 'Build AI systems that actually ship to production.',
    description:
      'We redesign workflows before layering AI on top, deploy agents with human-in-the-loop controls, and establish KPI baselines from day one.',
    outcomes: [
      'Production AI agents with human oversight built in',
      'Workflow redesign before automation',
      'Live dashboards your team uses daily',
      'KPI baselines and feedback loops from launch',
    ],
    price: 'From $35,000',
    priceNote: '8–16 week build cycle',
    ctaHref: '/contact?service=implementation',
    ctaLabel: 'Build With Us',
    featured: true,
    iconLabel: 'Implementation icon',
    icon: <Wrench className="h-6 w-6" aria-hidden="true" />,
  },
  {
    name: 'Optimization & Retainer',
    tagline: 'Compound your AI advantage every month.',
    description:
      'We run continuous optimization, train your team on human-plus-agent workflows, and expand proven systems to new divisions. Compounding gains, not one-off projects.',
    outcomes: [
      'Monthly optimization and performance reviews',
      'Role-based AI training for leadership and frontline',
      'System expansion to new departments and use cases',
      'Governance rhythm that keeps adoption sticky',
    ],
    price: 'From $8,000/mo',
    priceNote: 'Ongoing managed operations',
    ctaHref: '/contact?service=retainer',
    ctaLabel: 'Explore Retainer',
    iconLabel: 'Optimization retainer icon',
    icon: <Activity className="h-6 w-6" aria-hidden="true" />,
  },
];

/**
 * ServicesSection — three-tier service cards with scroll-triggered entrance.
 *
 * Grid layout:
 * - 1 column on sm (< 768 px)
 * - 2 columns on md (768–1023 px)
 * - 3 columns on lg (≥ 1024 px)
 */
export function ServicesSection() {
  const prefersReduced = useReducedMotion();

  const headerVariants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : fadeInUp;

  return (
    <section
      className="bg-bg-light py-20 lg:py-32"
      aria-labelledby="services-heading"
      id="services"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          className="max-w-2xl"
        >
          <p className="section-label text-accent-dark">Services</p>
          <h2
            id="services-heading"
            className="mt-4 text-[clamp(2rem,5vw,3.5rem)] text-text-on-light"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Choose your point on the journey.
          </h2>
          <p className="mt-4 text-lg text-text-on-light-sub font-medium">
            Whether you need clarity on where to focus, production AI systems, or ongoing
            operations — we meet you where you are.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {serviceTiers.map((tier, i) => (
            <ServiceTierCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="mt-10 text-center text-sm text-text-on-light-muted"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          All engagements include a free 30-minute discovery call.{' '}
          <a
            href="/contact"
            className="text-accent-dark underline underline-offset-2 hover:text-accent transition-colors"
          >
            Book yours
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
