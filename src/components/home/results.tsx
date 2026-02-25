"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, DollarSign, Clock } from "lucide-react";

const results = [
  { metric: "1,060", label: "Qualified opportunities identified", context: "Fortune 1000 manufacturer", icon: Target },
  { metric: "10%", label: "Average EBITDA improvement", context: "PE portfolio companies", icon: TrendingUp },
  { metric: "$240K", label: "Annual cost savings", context: "Process automation", icon: DollarSign },
  { metric: "90 days", label: "Time to measurable impact", context: "All engagements", icon: Clock },
];

export function Results() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="section-label">Results</span>
          <h2 className="mt-4 text-3xl font-bold text-text sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            Numbers, not narratives.
          </h2>
        </motion.div>

        <div className="grid gap-0 grid-cols-2 lg:grid-cols-4 border border-border rounded-lg overflow-hidden">
          {results.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className={`p-6 lg:p-8 text-center ${i < results.length - 1 ? "border-r border-border" : ""} ${i < 2 ? "border-b border-border lg:border-b-0" : ""}`}
            >
              <div className="flex justify-center mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                  <item.icon className="h-5 w-5 text-teal" />
                </div>
              </div>
              <div className="metric-display text-3xl lg:text-4xl">{item.metric}</div>
              <p className="mt-2 text-base font-medium text-text-secondary">{item.label}</p>
              <p className="mt-1 text-base text-text-tertiary">{item.context}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
