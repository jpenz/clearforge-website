"use client";

import { motion } from "framer-motion";

const items = [
  {
    number: "01",
    title: "Bridge the Gap",
    description:
      "We sit at the intersection of strategy and engineering. Your AI initiatives get both executive alignment and working code.",
  },
  {
    number: "02",
    title: "Senior-Led Delivery",
    description:
      "No bait-and-switch. The senior consultants who scope the work are the ones who build it.",
  },
  {
    number: "03",
    title: "Results, Not Decks",
    description:
      "Every engagement has measurable outcomes tied to revenue, margin, or efficiency. We don't ship PowerPoints.",
  },
];

export function Differentiators() {
  return (
    <section className="border-t border-border-subtle py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
            How We&apos;re Different
          </p>
          <h2 className="mt-4 max-w-lg font-serif text-3xl text-forge-navy sm:text-4xl">
            Built for operators who need AI that actually works.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-0 divide-y divide-border-subtle lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="py-8 lg:px-10 lg:py-0 first:lg:pl-0 last:lg:pr-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className="metric-display text-sm text-molten-amber">
                {item.number}
              </span>
              <h3 className="mt-3 font-serif text-xl text-forge-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
