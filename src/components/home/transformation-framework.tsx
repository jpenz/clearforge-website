"use client";

import { motion } from "framer-motion";
import { Workflow, Users, ArrowRight, Gauge, Brain, Scale, BarChart3 } from "lucide-react";

const phases = [
  {
    label: "Prepare",
    workflow: {
      title: "Map and Prioritize",
      description: "Identify the processes that matter most to your growth, margin, and speed. Understand what's working, what's broken, and where AI creates real leverage.",
    },
    workforce: {
      title: "Define Scope and Governance",
      description: "Assess your team's readiness. Define who leads, who adopts, and how decisions get made as AI enters the workflow.",
    },
    icon: Brain,
  },
  {
    label: "Modernize",
    workflow: {
      title: "Standardize, Then Reimagine",
      description: "Clean up and simplify before automating. Then redesign processes from the ground up for AI — not bolting new tech onto broken workflows.",
    },
    workforce: {
      title: "Redesign Roles and Skills",
      description: "Define what your team needs to look like when AI handles the routine. Identify skill gaps and build development plans before technology arrives.",
    },
    icon: Workflow,
  },
  {
    label: "Build",
    workflow: {
      title: "Deploy Agents in Production",
      description: "Ship AI agents that handle real workflows from day one — processing data, making decisions, executing tasks alongside your team. Not sandboxes. Not demos.",
    },
    workforce: {
      title: "Build the Hybrid Team",
      description: "Your people learn to work with AI agents as teammates, not tools. Human judgment stays in the loop for complex decisions. Agents handle the volume.",
    },
    icon: Gauge,
  },
  {
    label: "Scale",
    workflow: {
      title: "Scale What Works",
      description: "Expand proven AI systems across the organization. Replicate wins from one department to the next. Compound the value.",
    },
    workforce: {
      title: "Measure the Hybrid Workforce",
      description: "Track productivity across your combined team — human and AI agent output measured together. Know what's working. Continuously improve both sides.",
    },
    icon: Scale,
  },
];

export function TransformationFramework() {
  return (
    <section className="relative overflow-hidden bg-slate-navy py-24 lg:py-32 grain-overlay">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/api/img?url=https://heyboss.heeyo.ai/replicate-flux-schnell-1771984857-4e80a244.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <svg
          className="absolute right-8 top-1/2 h-[520px] w-[520px] -translate-y-1/2 text-teal-light/40"
          viewBox="0 0 520 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g stroke="currentColor" strokeWidth="1.4">
            <polygon points="260,70 344,118 344,214 260,262 176,214 176,118" />
            <polygon points="260,262 344,310 344,406 260,454 176,406 176,310" />
            <polygon points="344,118 428,166 428,262 344,310 260,262 260,166" />
            <polygon points="176,118 260,166 260,262 176,310 92,262 92,166" />
          </g>
          <g stroke="currentColor" strokeWidth="1.1">
            <line x1="260" y1="70" x2="260" y2="454" />
            <line x1="92" y1="262" x2="428" y2="262" />
            <line x1="176" y1="118" x2="344" y2="406" />
            <line x1="344" y1="118" x2="176" y2="406" />
          </g>
          <g fill="currentColor">
            <circle cx="260" cy="70" r="4" />
            <circle cx="344" cy="118" r="4" />
            <circle cx="428" cy="166" r="4" />
            <circle cx="428" cy="262" r="4" />
            <circle cx="344" cy="406" r="4" />
            <circle cx="260" cy="454" r="4" />
            <circle cx="176" cy="406" r="4" />
            <circle cx="92" cy="262" r="4" />
            <circle cx="176" cy="118" r="4" />
            <circle cx="260" cy="262" r="4" />
            <circle cx="344" cy="310" r="4" />
            <circle cx="176" cy="310" r="4" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl"
        >
          <span className="section-label text-teal">The ClearForge Framework</span>
          <h2
            className="mt-4 text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Modernize the work and the workforce in tandem.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            AI agents are a new category of worker. Most companies deploy the technology without preparing
            the humans who work alongside it. We run two tracks simultaneously — redesigning your processes
            for AI agents while building your team's ability to operate with them. One without the other
            doesn't stick.
          </p>
        </motion.div>

        {/* Phase cards */}
        <div className="grid gap-6 lg:grid-cols-4">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="relative"
            >
              {/* Phase header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/20">
                  <phase.icon className="h-5 w-5 text-teal" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal">Phase {i + 1}</span>
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {phase.label}
                  </h3>
                </div>
              </div>

              {/* Workflow track */}
              <div className="mb-3 rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-teal-light" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-light">Process</span>
                </div>
                <h4 className="text-sm font-bold text-white">{phase.workflow.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{phase.workflow.description}</p>
              </div>

              {/* Workforce track */}
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-300" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Team</span>
                </div>
                <h4 className="text-sm font-bold text-white">{phase.workforce.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{phase.workforce.description}</p>
              </div>

              {/* Connecting arrow */}
              {i < 3 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-navy lg:flex">
                  <ArrowRight className="h-3 w-3 text-teal" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom bar — enablers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 rounded-xl border border-white/10 bg-white/[0.04] p-6"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-teal">
            What makes it stick
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Leadership alignment", desc: "Executives understand and champion the change — not just approve the budget." },
              { title: "Strategic workforce planning", desc: "Roles evolve with the technology. No one gets blindsided." },
              { title: "Learning and change management", desc: "Your team builds confidence through hands-on adoption, not training decks." },
              { title: "Performance measurement", desc: "Clear KPIs for both human and AI output — so you know what's actually working." },
            ].map((item) => (
              <div key={item.title}>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
