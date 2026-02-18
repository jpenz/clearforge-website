"use client";

import { motion } from "framer-motion";

export function Founder() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="section-label">Our Approach</span>
          <blockquote className="mt-6 text-2xl font-bold text-slate-navy leading-relaxed sm:text-3xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            &ldquo;We don&apos;t sell AI. We sell measurable business outcomes —
            and we build the AI to get there.&rdquo;
          </blockquote>
          <p className="mt-6 text-lg text-slate-600">
            ClearForge was founded on a simple premise: the gap between AI strategy and
            AI execution is where most companies lose. We close that gap by combining
            consulting rigor with engineering discipline.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
