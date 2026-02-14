"use client";

import { motion } from "framer-motion";
import { Layers, Users, TrendingUp } from "lucide-react";

const items = [
  {
    icon: Layers,
    title: "Bridge the Gap",
    description:
      "We sit at the intersection of strategy and engineering. Your AI initiatives get both executive alignment and working code.",
  },
  {
    icon: Users,
    title: "Senior-Led Delivery",
    description:
      "No bait-and-switch. The senior consultants who scope the work are the ones who build it.",
  },
  {
    icon: TrendingUp,
    title: "Results, Not Decks",
    description:
      "Every engagement has measurable outcomes tied to revenue, margin, or efficiency. We don't ship PowerPoints.",
  },
];

export function Differentiators() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            How We&apos;re Different
          </h2>
          <p className="mt-4 text-text-secondary">
            Built for operators who need AI that actually works.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="group rounded-xl border border-border-subtle bg-bg-card p-8 transition-colors hover:border-border-medium"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue/10">
                <item.icon className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">
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
