"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, LineChart, Rocket, Cog } from "lucide-react";

const services = [
  {
    icon: LineChart,
    title: "AI Revenue Operations",
    description:
      "Sales automation, intent signals, and pipeline analytics that turn data into deals.",
    href: "/services/ai-revenue-operations",
  },
  {
    icon: Cog,
    title: "Performance Improvement",
    description:
      "Process mining, operational diagnostics, and custom automation to cut waste.",
    href: "/services/performance-improvement",
  },
  {
    icon: Rocket,
    title: "PE Value Creation",
    description:
      "90-day sprints and portfolio-wide AI playbooks that drive EBITDA improvement.",
    href: "/services/pe-value-creation",
  },
  {
    icon: Bot,
    title: "Custom AI Agents",
    description:
      "Bespoke agents for sales, ops, and finance — built for your workflows.",
    href: "/services/custom-ai-agents",
  },
];

export function ServicesPreview() {
  return (
    <section className="border-t border-border-subtle py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            What We Build
          </h2>
          <p className="mt-4 text-text-secondary">
            Four practice areas, one goal: measurable business impact.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-xl border border-border-subtle bg-bg-card p-8 transition-all hover:border-blue/30 hover:bg-bg-elevated"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue/10">
                  <service.icon className="h-6 w-6 text-blue" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-text-primary">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-text-secondary leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-blue">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
