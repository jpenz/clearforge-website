"use client";

import { motion } from "framer-motion";
import { Briefcase, Hammer, LineChart, Users, Workflow } from "lucide-react";

const items = [
  {
    icon: Briefcase,
    title: "One Team, Strategy Through Operations",
    description: "The big firms split strategy and implementation across different partners. Value gets lost in the handoff. We keep it under one roof — from diagnosis to running systems.",
  },
  {
    icon: Users,
    title: "Senior Operators, Not Junior Leverage",
    description: "You work with senior practitioners who've led transformations at Fortune 500 companies. Not a rotating team of 25-year-old analysts.",
  },
  {
    icon: Hammer,
    title: "We Deploy AI Agents, Not Slide Decks",
    description: "We build AI agents that operate as part of your workforce — handling real workflows, making real decisions, in production. Not prototypes that die after the demo.",
  },
  {
    icon: LineChart,
    title: "Scaled for $5M to $5B",
    description: "The same Strategy-to-Operate model works for a family-owned manufacturer, a PE portfolio company, or a Fortune 1000 enterprise.",
  },
  {
    icon: Workflow,
    title: "Process and People, in Tandem",
    description: "We modernize your workflows and prepare your team to work alongside AI agents at the same time. Technology without workforce readiness doesn't stick.",
  },
];

export function Differentiators() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl"
        >
          <span className="section-label">Why ClearForge</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            The strategic caliber of top consulting firms, with engineering and operations that actually ship.
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="group"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
