"use client";

import { motion } from "framer-motion";

const model = [
  {
    step: "01",
    title: "Diagnose",
    timing: "Weeks 1-2",
    detail:
      "Executive interviews, workflow mapping, and data readiness review to isolate where AI can move core business KPIs.",
  },
  {
    step: "02",
    title: "Architect",
    timing: "Weeks 2-4",
    detail:
      "Target-state operating model, technical design, and ownership model. We define exactly who runs what after launch.",
  },
  {
    step: "03",
    title: "Deploy",
    timing: "Weeks 5-8",
    detail:
      "Production implementation with workflow integration, instrumentation, and change enablement for team adoption.",
  },
  {
    step: "04",
    title: "Compound",
    timing: "Monthly",
    detail:
      "Retraining, prompt refinement, and market signal updates to keep systems improving rather than drifting.",
  },
];

export function HowWeWork() {
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
          <span className="section-label">Operating Method</span>
          <h2 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl">
            One team. One plan. One measurable result path.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            Our model is intentionally simple: diagnose the value pool, architect for adoption, deploy for
            performance, then run continuous optimization.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {model.map((phase, index) => (
            <motion.article
              key={phase.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="border border-fog bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4 border-b border-fog pb-4">
                <p className="metric-display text-2xl">{phase.step}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-stone">{phase.timing}</p>
              </div>
              <h3 className="mt-4 text-2xl leading-tight text-midnight">{phase.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{phase.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
