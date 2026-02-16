"use client";

import { motion } from "framer-motion";

const steps = [
  {
    phase: "01",
    title: "Discover",
    description:
      "Stakeholder interviews, process mapping, data audit. We understand your business before we touch any technology.",
  },
  {
    phase: "02",
    title: "Design",
    description:
      "Prioritize opportunities by ROI, architect solutions, define success metrics. You approve the plan before we build.",
  },
  {
    phase: "03",
    title: "Deploy",
    description:
      "Build working solutions, integrate with your stack, train your team. In production within 6–8 weeks.",
  },
  {
    phase: "04",
    title: "Optimize",
    description:
      "Monthly retraining, performance monitoring, new capabilities. Your AI gets smarter every cycle.",
  },
];

export function HowWeWork() {
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
            Our Process
          </p>
          <h2 className="mt-6 font-serif text-3xl text-forge-navy sm:text-4xl lg:text-5xl">
            Discover. Design. Deploy. Optimize.
          </h2>
          <p className="mt-4 text-text-secondary">
            A proven methodology refined across dozens of engagements.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.phase}
              className="relative border-t border-border-subtle p-8 lg:border-l lg:border-t-0 first:lg:border-l-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="metric-display text-4xl text-bg-elevated lg:text-5xl">
                {step.phase}
              </span>
              <h3 className="mt-4 font-serif text-xl text-forge-navy">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
