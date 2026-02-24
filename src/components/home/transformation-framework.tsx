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
      title: "Build and Test in Production",
      description: "Ship real AI systems your team uses on day one. Test with live data, real users, and actual business conditions — not sandboxes.",
    },
    workforce: {
      title: "Assess Gaps and Develop Talent",
      description: "Your people learn alongside the technology. We train teams to work with AI agents, not around them. Human judgment stays in the loop.",
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
      title: "Measure Human and Agent Performance",
      description: "Track productivity across your hybrid workforce — people and AI working together. Continuously improve both sides of the equation.",
    },
    icon: Scale,
  },
];

export function TransformationFramework() {
  return (
    <section className="bg-slate-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            Most AI projects fail because they change the technology without changing how people work.
            We run two tracks simultaneously — redesigning your processes for AI while preparing your
            team to operate alongside it. One without the other doesn't stick.
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
