"use client";

import { motion } from "framer-motion";

const differentiators = [
  {
    title: "Senior Team, End to End",
    detail:
      "The people in discovery are the people in delivery. No handoff to junior execution layers.",
  },
  {
    title: "KPI-Backed Scope",
    detail:
      "Every workstream maps to a measured business outcome before build begins.",
  },
  {
    title: "Boardroom Clarity",
    detail:
      "Transparent pricing, explicit milestones, and plain-language reporting at every stage.",
  },
  {
    title: "Continuous Performance Model",
    detail:
      "We optimize monthly so model quality and workflow fit improve over time.",
  },
];

const engagementModels = [
  {
    heading: "Build & Transfer",
    description: "You own the codebase, documentation, and operating playbook.",
  },
  {
    heading: "Managed Services",
    description: "We build and operate the system with SLA-backed performance and optimization.",
  },
];

export function Differentiators() {
  return (
    <section className="bg-ivory py-24 lg:py-30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="section-label">Why Operators Choose ClearForge</span>
          <h2 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl">
            Consulting discipline with engineering accountability.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {differentiators.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="border border-fog bg-white p-7"
            >
              <h3 className="text-2xl leading-tight text-midnight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{item.detail}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 border-t border-fog pt-8 md:grid-cols-2">
          {engagementModels.map((model) => (
            <div key={model.heading} className="border border-fog bg-white p-6">
              <p className="section-label">Engagement Model</p>
              <h3 className="mt-3 text-2xl text-midnight">{model.heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{model.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
