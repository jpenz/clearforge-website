"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "AI Readiness Audit",
    price: "$15K",
    timeline: "2 weeks",
    description:
      "Rapid diagnostic: stakeholder interviews, process mapping, data assessment, and an executive-ready roadmap with ROI projections.",
    href: "/pricing",
  },
  {
    name: "Performance Sprint",
    price: "$50–100K",
    timeline: "6–8 weeks",
    description:
      "Intensive engagement: diagnose your top opportunities, build working solutions, deploy to production with measurable KPIs from day one.",
    href: "/pricing",
    featured: true,
  },
  {
    name: "AI Agent Retainer",
    price: "$15K/mo",
    timeline: "Ongoing",
    description:
      "Continuous AI expertise embedded in your business. New agents monthly, ongoing optimization, weekly strategy sessions.",
    href: "/pricing",
  },
];

export function ServicesPreview() {
  return (
    <section className="bg-warm-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
              How We Engage
            </p>
            <h2 className="mt-6 font-serif text-3xl text-forge-navy sm:text-4xl">
              Three ways to work with us
            </h2>
            <p className="mt-4 text-text-secondary">
              Transparent pricing. Clear deliverables. No hourly billing.
            </p>
            <Link
              href="/pricing"
              className="amber-underline mt-6 inline-flex items-center gap-2 text-sm font-medium text-molten-amber"
            >
              View full pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Right: tiers */}
          <div className="divide-y divide-border-subtle border-t border-border-subtle">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className="grid gap-4 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="min-w-[140px]">
                  <h3 className="font-serif text-lg text-forge-navy">
                    {tier.name}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="metric-display text-2xl text-molten-amber">
                      {tier.price}
                    </span>
                    <span className="text-xs text-text-muted">
                      {tier.timeline}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  {tier.description}
                </p>
                <Link
                  href={tier.href}
                  className="amber-underline inline-flex items-center gap-1 text-sm text-molten-amber"
                >
                  Learn more
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
