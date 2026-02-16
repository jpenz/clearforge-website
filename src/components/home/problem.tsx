"use client";

import { motion } from "framer-motion";

const problems = [
  {
    number: "01",
    title: "Strategy without execution",
    description:
      "Traditional consultants hand you a roadmap and walk away. You're left with a beautiful deck and no one to build it.",
  },
  {
    number: "02",
    title: "AI that stops learning",
    description:
      "Most AI implementations are one-time projects. The model goes stale in months, and the value evaporates.",
  },
  {
    number: "03",
    title: "Hidden pricing, scope creep",
    description:
      "Vague SOWs, hourly billing, and change orders turn a $50K project into a $200K disappointment.",
  },
];

export function Problem() {
  return (
    <section className="bg-forge-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            The Problem
          </p>
          <h2 className="mt-6 font-serif text-3xl text-warm-white sm:text-4xl lg:text-5xl">
            Most AI consulting is broken
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-0 divide-y divide-deep-steel border-t border-deep-steel lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {problems.map((p, i) => (
            <motion.div
              key={p.number}
              className="py-10 lg:px-10 first:lg:pl-0 last:lg:pr-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className="metric-display text-sm text-molten-amber">
                {p.number}
              </span>
              <h3 className="mt-4 font-serif text-xl text-warm-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-white/60">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
