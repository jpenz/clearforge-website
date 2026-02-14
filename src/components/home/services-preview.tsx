"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "AI Revenue Operations",
    description:
      "Sales automation, intent signals, and pipeline analytics that turn data into deals.",
    metric: "30%",
    metricLabel: "pipeline increase",
    href: "/services/ai-revenue-operations",
  },
  {
    number: "02",
    title: "Performance Improvement",
    description:
      "Process mining, operational diagnostics, and custom automation to cut waste.",
    metric: "23%",
    metricLabel: "cost reduction",
    href: "/services/performance-improvement",
  },
  {
    number: "03",
    title: "PE Value Creation",
    description:
      "90-day sprints and portfolio-wide AI playbooks that drive EBITDA improvement.",
    metric: "10%",
    metricLabel: "EBITDA lift",
    href: "/services/pe-value-creation",
  },
  {
    number: "04",
    title: "Custom AI Agents",
    description:
      "Bespoke agents for sales, ops, and finance — built for your workflows.",
    metric: "90d",
    metricLabel: "to production",
    href: "/services/custom-ai-agents",
  },
];

export function ServicesPreview() {
  return (
    <section className="border-t border-border-subtle bg-canvas py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
            What We Build
          </p>
          <h2 className="mt-4 max-w-md font-serif text-3xl text-forge-navy sm:text-4xl">
            Four practice areas, one goal.
          </h2>
        </motion.div>

        <div className="mt-16 divide-y divide-border-subtle">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={service.href}
                className="group grid items-center gap-6 py-8 lg:grid-cols-[auto_1fr_auto_auto]"
              >
                <span className="metric-display text-sm text-text-muted">
                  {service.number}
                </span>
                <div className="lg:grid lg:grid-cols-[2fr_3fr] lg:gap-8">
                  <h3 className="font-serif text-xl text-forge-navy group-hover:text-molten-amber transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-text-secondary lg:mt-0">
                    {service.description}
                  </p>
                </div>
                <div className="hidden lg:block">
                  <span className="metric-display text-2xl text-molten-amber">
                    {service.metric}
                  </span>
                  <p className="text-xs uppercase tracking-[1px] text-text-muted">
                    {service.metricLabel}
                  </p>
                </div>
                <ArrowRight className="hidden h-5 w-5 text-text-muted transition-all group-hover:translate-x-1 group-hover:text-molten-amber lg:block" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
