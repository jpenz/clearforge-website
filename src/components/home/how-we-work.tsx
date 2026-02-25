"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Hammer, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We study your market, analyze your competitive landscape, and map where AI creates the most value. Strategy starts with intelligence, not assumptions.",
    duration: "Week 1-2",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description: "We redesign your processes for AI from the top down. Not automating what exists, but architecting what should exist. Every system ties to a business outcome.",
    duration: "Week 3-4",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Build & Deploy",
    description: "We deploy AI agents that integrate with your existing tools and workflows - including legacy systems. Real agents doing real work from day one, operating alongside your team.",
    duration: "Week 5-8",
    icon: Hammer,
  },
  {
    number: "04",
    title: "Operate & Scale",
    description: "We run your AI operations continuously. Agents get smarter every cycle. Performance compounds. When something works, we scale it across the organization.",
    duration: "Ongoing",
    icon: TrendingUp,
  },
];

export function HowWeWork() {
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
          <span className="section-label">Our Methodology</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Discover. Design. Build. Optimize.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We don't automate your existing processes. We redesign them for AI, prepare your team to work alongside it, and keep both improving.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="relative rounded-lg border border-gray-200 p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                    <step.icon className="h-5 w-5 text-teal" />
                  </div>
                  <span className="metric-display text-3xl">{step.number}</span>
                </div>
                <span className="text-sm font-medium text-slate-400 border border-gray-200 rounded-md px-2.5 py-1">{step.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {step.description}
              </p>

              {/* Connecting line between cards */}
              {i < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-px bg-gray-300" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
