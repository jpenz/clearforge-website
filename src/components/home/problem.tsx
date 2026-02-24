"use client";

import { motion } from "framer-motion";
import { AlertTriangle, BarChart3, Workflow, ArrowRight } from "lucide-react";

const problems = [
  {
    number: "01",
    title: "AI Pilots That Never Scale",
    description:
      "Most companies run proofs of concept that never become production systems. Meanwhile, competitors are deploying AI agents that operate as part of their workforce every day.",
    icon: AlertTriangle,
    escalation: "The Pilot Trap",
  },
  {
    number: "02",
    title: "Strategy and Delivery Are Split",
    description:
      "The big firms charge for strategy. A different vendor attempts implementation. Value gets lost between handoffs. The companies pulling ahead have one team from diagnosis through operations.",
    icon: Workflow,
    escalation: "The Handoff Problem",
  },
  {
    number: "03",
    title: "Technology Changes, People Don't",
    description:
      "New systems get deployed but the team isn't prepared to work alongside them. Adoption stalls, confidence drops, and the investment sits unused. AI without workforce readiness doesn't stick.",
    icon: BarChart3,
    escalation: "The Adoption Gap",
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
          <span className="section-label text-teal">The Widening AI Value Gap</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Companies that capture value from AI are pulling away. The rest are falling further behind.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            The gap between AI leaders and everyone else is widening — not closing. Leaders compound their advantage
            every quarter while most companies are still stuck between pilot projects and real business impact.
            ClearForge closes that gap with one team that diagnoses, builds, and operates.
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
