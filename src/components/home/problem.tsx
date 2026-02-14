"use client";

import { motion } from "framer-motion";

export function Problem() {
  return (
    <section className="border-t border-border-subtle bg-canvas py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="grid gap-16 lg:grid-cols-[3fr_2fr]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          {/* Left: The problem */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
              The Problem
            </p>
            <h2 className="mt-4 font-serif text-3xl text-forge-navy sm:text-4xl lg:text-5xl">
              Strategy firms give you decks.
              <br />
              Tech shops give you tools.
            </h2>
            <p className="mt-2 font-serif text-3xl text-text-muted sm:text-4xl lg:text-5xl">
              Neither gives you results.
            </p>
          </div>

          {/* Right: ClearForge difference */}
          <div className="flex flex-col justify-center border-l border-border-subtle pl-8 lg:pl-12">
            <div className="space-y-8">
              <div className="border-b border-border-subtle pb-8">
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-text-muted">Strategy Firms</p>
                <p className="mt-2 text-text-secondary">
                  Beautiful roadmaps that collect dust. No implementation, no accountability.
                </p>
              </div>
              <div className="border-b border-border-subtle pb-8">
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-text-muted">Tech Shops</p>
                <p className="mt-2 text-text-secondary">
                  Tools without strategy. Custom builds that don&apos;t align with business goals.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-molten-amber">ClearForge</p>
                <p className="mt-2 text-text-primary font-medium">
                  Strategy + Engineering in one team. We build what we recommend and measure the results.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
