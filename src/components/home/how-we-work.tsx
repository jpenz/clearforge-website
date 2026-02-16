"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnose",
    description: "We audit your data, processes, and tech stack to identify the highest-impact opportunities. No guesswork — just evidence.",
    duration: "2 weeks",
  },
  {
    number: "02",
    title: "Build",
    description: "We design and deploy working AI solutions — not prototypes. Real systems integrated with your existing tools and workflows.",
    duration: "4–6 weeks",
  },
  {
    number: "03",
    title: "Optimize",
    description: "Our systems learn monthly. Models retrain on real data, intelligence compounds, and performance improves every cycle.",
    duration: "Ongoing",
  },
];

export function HowWeWork() {
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
          <span className="section-label">How We Work</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Diagnose. Build. Optimize.
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Every engagement follows a disciplined structure designed to deliver results fast and compound value over time.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="relative rounded-lg border border-gray-200 p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="metric-display text-3xl">{step.number}</span>
                <span className="text-xs font-medium text-slate-400 border border-gray-200 rounded-md px-2 py-1">{step.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
