"use client";

import { motion } from "framer-motion";
import { AlertTriangle, BarChart3, Workflow, ArrowRight } from "lucide-react";

const problems = [
  {
    number: "01",
    title: "High AI Interest, Low Business Impact",
    description:
      "Leaders know AI matters, but most teams still cannot tie AI activity to measurable growth, margin, or speed.",
    icon: AlertTriangle,
    escalation: "Potential",
  },
  {
    number: "02",
    title: "Strategy and Delivery Are Split",
    description:
      "One partner delivers recommendations. Another vendor attempts implementation. Value gets lost between handoffs.",
    icon: Workflow,
    escalation: "Execution",
  },
  {
    number: "03",
    title: "Systems Stall After Launch",
    description:
      "Even good builds degrade without ongoing operation and optimization. Performance plateaus and teams lose confidence.",
    icon: BarChart3,
    escalation: "Sustained Value",
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
          <span className="section-label text-teal">The AI Value Gap</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            The gap is not AI potential. The gap is turning potential into operating value.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Most companies are stuck between ideas and outcomes. ClearForge closes that gap with one team that diagnoses,
            builds, and operates.
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
                  ? "border border-white/10 bg-white/[0.04]"
                  : i === 1
                    ? "border border-white/15 bg-white/[0.07]"
                    : "border border-white/20 bg-white/[0.10] ring-1 ring-teal/20"
              }`}
            >
              <span className="font-[family-name:var(--font-space-grotesk)] text-xs font-medium uppercase tracking-wider text-teal">
                {problem.escalation}
              </span>

              <div className="mb-5 mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <problem.icon className="h-5 w-5 text-slate-300" />
                </div>
                <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white/20">
                  {problem.number}
                </span>
              </div>

              <h3 className="text-2xl font-bold leading-tight text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {problem.title}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-slate-300">{problem.description}</p>

              {i < 2 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-navy md:flex">
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
