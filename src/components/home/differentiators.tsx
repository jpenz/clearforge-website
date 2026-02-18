"use client";

import { motion } from "framer-motion";
import { Code, TrendingUp, RefreshCw, Shield } from "lucide-react";

const items = [
  {
    icon: Code,
    title: "We Build, Not Just Advise",
    description: "The people who scope your engagement are the same people who deliver it. Strategy and engineering in the same team, not handed off to juniors.",
  },
  {
    icon: TrendingUp,
    title: "Tied to Business Outcomes",
    description: "Every engagement maps to a KPI you care about. If we can't draw a line from the solution to a financial metric, we don't build it.",
  },
  {
    icon: RefreshCw,
    title: "Continuous, Not Static",
    description: "Our AI systems learn and improve monthly. Models retrained on real data compound in value. The gap between you and your competitors widens every cycle.",
  },
  {
    icon: Shield,
    title: "Your Choice of Engagement",
    description: "Build & Transfer: you own the code. Managed Services: we run it. Either way, you get full transparency, documentation, and zero vendor lock-in.",
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
          className="mb-16 max-w-2xl"
        >
          <span className="section-label">Why ClearForge</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Strategy consulting meets AI engineering.
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
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
