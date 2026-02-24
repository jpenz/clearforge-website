"use client";

import { motion } from "framer-motion";
import { FileX, Bot, Battery, ArrowRight } from "lucide-react";

const problems = [
  {
    number: "01",
    title: "Expensive Plans, Weak Follow-Through",
    description: "Teams buy strategy, but execution stalls. The board gets updates. The business gets little change.",
    icon: FileX,
    escalation: "Looks strategic",
  },
  {
    number: "02",
    title: "Fragmented Marketing and Operations",
    description: "Different vendors run disconnected channels and tools. Pipeline data is noisy, and no one owns full-funnel results.",
    icon: Bot,
    escalation: "Feels busy",
  },
  {
    number: "03",
    title: "Systems Decay After Launch",
    description: "One-time implementations drift. Performance drops, teams lose trust, and prior investment stops compounding.",
    icon: Battery,
    escalation: "Gets expensive",
  },
];

export function Problem() {
  return (
    <section className="bg-slate-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <span className="section-label text-teal">The Problem</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Most teams do not need another AI pilot. They need an operating system that delivers.
          </h2>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            We see the same pattern repeatedly across PE portfolios and mid-market companies.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className={`relative rounded-xl p-8 transition-all ${
                i === 0
                  ? "bg-white/[0.04] border border-white/10"
                  : i === 1
                  ? "bg-white/[0.07] border border-white/15"
                  : "bg-white/[0.10] border border-white/20 ring-1 ring-teal/20"
              }`}
            >
              <span className="text-xs font-medium uppercase tracking-wider text-teal font-[family-name:var(--font-space-grotesk)]">
                {problem.escalation}
              </span>

              <div className="flex items-center gap-3 mt-4 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <problem.icon className="h-5 w-5 text-slate-300" />
                </div>
                <span className="text-3xl font-bold text-white/20 font-[family-name:var(--font-space-grotesk)]">{problem.number}</span>
              </div>

              <h3 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {problem.title}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-slate-300">
                {problem.description}
              </p>

              {i < 2 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-slate-navy border border-white/10">
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
