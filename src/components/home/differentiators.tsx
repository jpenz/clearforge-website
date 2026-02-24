"use client";

import { motion } from "framer-motion";
import { Activity, Clock3, LineChart, Shield } from "lucide-react";

const items = [
  {
    icon: Activity,
    title: "Execution Lives with Strategy",
    description: "The same senior team sets the plan and ships the systems. No strategy handoff to a junior delivery bench.",
  },
  {
    icon: Clock3,
    title: "Always-On Operating Rhythm",
    description: "Campaigns and workflows run continuously, with weekly optimization instead of monthly status updates.",
  },
  {
    icon: LineChart,
    title: "Real-Time Performance Visibility",
    description: "Leadership sees what is working now, not what happened weeks ago in a static report.",
  },
  {
    icon: Shield,
    title: "Commercially Aligned Terms",
    description: "No long lock-ins. Month-to-month after the first 90-day ramp, with clear scope and accountability.",
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
            Built for operators who need progress they can prove.
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
