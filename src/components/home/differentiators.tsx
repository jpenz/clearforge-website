"use client";

import { motion } from "framer-motion";
import { Zap, RefreshCw, DollarSign, Code2, Users } from "lucide-react";

const diffs = [
  {
    icon: Code2,
    title: "Strategy + Engineering",
    description:
      "One team that does both. No handoff to another firm. The people who design your AI strategy are the same ones who build and deploy it.",
  },
  {
    icon: RefreshCw,
    title: "AI That Keeps Learning",
    description:
      "Our agents are retrained monthly on your data. They get sharper, not stale. Month six is exponentially better than month one.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "Three productized packages with clear deliverables. No hourly billing, no scope creep, no surprises.",
  },
  {
    icon: Zap,
    title: "Results, Not Roadmaps",
    description:
      "Working solutions in 6–8 weeks. Measurable KPIs from day one. You see ROI before the first invoice.",
  },
  {
    icon: Users,
    title: "Senior Operators Only",
    description:
      "No bait-and-switch with junior analysts. Every engagement is led by experienced professionals who've done this before.",
  },
];

export function Differentiators() {
  return (
    <section className="bg-warm-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            Why ClearForge
          </p>
          <h2 className="mt-6 font-serif text-3xl text-forge-navy sm:text-4xl lg:text-5xl">
            Built different, on purpose
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-px bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {diffs.map((d, i) => (
            <motion.div
              key={d.title}
              className="bg-warm-white p-8 lg:p-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <d.icon className="h-5 w-5 text-molten-amber" strokeWidth={1.5} />
              <h3 className="mt-4 font-serif text-lg text-forge-navy">
                {d.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {d.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
