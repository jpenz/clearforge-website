"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileX, Bot, Battery, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const problems = [
  {
    number: "01",
    title: "Strategy Without Execution",
    description: "Traditional consultants deliver decks and disappear. You get recommendations nobody implements and a bill that doesn't tie to outcomes.",
    icon: FileX,
    escalation: "The starting point",
  },
  {
    number: "02",
    title: "AI Without Strategy",
    description: "Tech vendors push tools without understanding your business. You end up with shiny demos that never make it to production and pilots that die after 90 days.",
    icon: Bot,
    escalation: "The overcorrection",
  },
  {
    number: "03",
    title: "Static Systems That Decay",
    description: "One-time AI implementations depreciate on day one. Models trained on stale data make increasingly wrong decisions while the team that built them has moved on.",
    icon: Battery,
    escalation: "The compounding cost",
  },
];

export function Problem() {
  return (
    <section className="bg-slate-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Tighter header block — label + headline + bridge copy together */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <span className="section-label text-teal">The Problem</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Most AI initiatives fail. Not because the tech doesn&apos;t work.
          </h2>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Companies cycle through the same three traps. Each one feeds the next, and the cost compounds with every failed attempt.
          </p>
        </motion.div>

        {/* Cards with escalating visual weight */}
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
              {/* Escalation label */}
              <span className="text-xs font-medium uppercase tracking-wider text-teal font-[family-name:var(--font-space-grotesk)]">
                {problem.escalation}
              </span>

              {/* Icon + Number row */}
              <div className="flex items-center gap-3 mt-4 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <problem.icon className="h-5 w-5 text-slate-300" />
                </div>
                <span className="text-3xl font-bold text-white/20 font-[family-name:var(--font-space-grotesk)]">{problem.number}</span>
              </div>

              {/* Title — significantly larger than body */}
              <h3 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {problem.title}
              </h3>

              {/* Body — clear size separation from title */}
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                {problem.description}
              </p>

              {/* Connecting arrow on first two cards */}
              {i < 2 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-slate-navy border border-white/10">
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Directional CTA — leads to the solution */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
          <p className="text-base text-slate-400">There&apos;s a better way.</p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
