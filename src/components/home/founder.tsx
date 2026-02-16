"use client";

import { motion } from "framer-motion";

export function Founder() {
  return (
    <section className="bg-warm-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            Our Philosophy
          </p>
          <blockquote className="mt-8 font-serif text-2xl leading-relaxed text-forge-navy sm:text-3xl">
            &ldquo;The best AI strategy is one you can actually execute.
            We&apos;re not a PowerPoint factory — we&apos;re operators who build
            systems that compound in value every month.&rdquo;
          </blockquote>
          <div className="mt-8 border-t border-border-subtle pt-6">
            <p className="text-sm font-medium text-forge-navy">
              ClearForge Leadership
            </p>
            <p className="text-sm text-text-muted">
              Ex-management consulting &times; AI engineering
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
