"use client";

import { motion } from "framer-motion";

const traps = [
  {
    number: "01",
    title: "Advisory Without Delivery",
    body: "Leadership receives a strategy deck, but no production system. Momentum fades and teams return to manual work.",
    cost: "Cost: six figures spent, no operating delta.",
  },
  {
    number: "02",
    title: "Tool Adoption Without Business Design",
    body: "Teams buy AI tools quickly, but workflows, governance, and ownership are never redesigned to support them.",
    cost: "Cost: fragmented pilots and low adoption.",
  },
  {
    number: "03",
    title: "One-Time Deployment",
    body: "Even successful launches degrade when data, prompts, and decision rules are not continuously tuned.",
    cost: "Cost: performance decay within quarters.",
  },
];

export function Problem() {
  return (
    <section className="bg-midnight py-24 lg:py-30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="section-label">Why Programs Stall</span>
          <h2 className="mt-4 text-4xl leading-tight text-white sm:text-5xl">
            Most AI efforts fail in the operating model, not the model weights.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-200">
            We repeatedly see the same failure sequence. Each stage compounds cost, delays value capture,
            and erodes confidence across the leadership team.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {traps.map((trap, index) => (
            <motion.article
              key={trap.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="border border-white/16 bg-white/[0.04] p-7"
            >
              <p className="metric-display text-3xl">{trap.number}</p>
              <h3 className="mt-4 text-2xl leading-tight text-white">{trap.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-200">{trap.body}</p>
              <p className="mt-5 border-t border-white/12 pt-3 text-sm font-medium text-brass">{trap.cost}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
