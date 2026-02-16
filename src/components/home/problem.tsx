"use client";

import { motion } from "framer-motion";

const problems = [
  {
    number: "01",
    title: "Strategy Without Execution",
    description: "Traditional consultants deliver decks and disappear. You're left with recommendations nobody implements and a bill that doesn't tie to outcomes.",
  },
  {
    number: "02",
    title: "AI Without Strategy",
    description: "Tech vendors push tools without understanding your business. You end up with shiny demos that never make it to production — and pilots that die after 90 days.",
  },
  {
    number: "03",
    title: "Static Systems That Decay",
    description: "One-time AI implementations start depreciating on day one. Models trained on stale data make increasingly wrong decisions while the team that built them has moved on.",
  },
];

export function Problem() {
  return (
    <section className="bg-slate-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="section-label text-teal">The Problem</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Most AI initiatives fail.<br />Not because the tech doesn't work.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="rounded-lg border border-charcoal bg-charcoal p-8"
            >
              <span className="metric-display text-2xl">{problem.number}</span>
              <h3 className="mt-4 text-xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {problem.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
