"use client";

import { motion } from "framer-motion";

const results = [
  {
    metric: "90 days",
    label: "Average time to measurable ROI",
  },
  {
    metric: "100%",
    label: "Of deliverables are yours to keep",
  },
  {
    metric: "24 hr",
    label: "Response time on all engagements",
  },
  {
    metric: "$0",
    label: "Hidden fees. Transparent pricing always.",
  },
];

export function Results() {
  return (
    <section className="border-y border-border-subtle bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            Our Commitments
          </p>
          <h2 className="mt-6 font-serif text-3xl text-forge-navy sm:text-4xl">
            What you can count on
          </h2>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-0 divide-y divide-border-subtle border border-border-subtle sm:grid-cols-2 sm:divide-x lg:grid-cols-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {results.map((r) => (
            <div key={r.label} className="p-8 text-center">
              <span className="metric-display text-3xl text-molten-amber">
                {r.metric}
              </span>
              <p className="mt-2 text-xs uppercase tracking-[1.5px] text-text-muted">
                {r.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
