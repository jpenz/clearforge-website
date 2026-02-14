"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export function Founder() {
  return (
    <section className="border-t border-border-subtle py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="grid gap-12 lg:grid-cols-[2fr_3fr]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          {/* Photo placeholder — editorial, NOT circular */}
          <div className="flex aspect-[4/5] max-h-[480px] items-center justify-center border border-border-subtle bg-canvas">
            <User className="h-16 w-16 text-text-muted" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
              From the Founder
            </p>
            <h2 className="mt-4 font-serif text-3xl text-forge-navy sm:text-4xl">
              Built by an Operator, for Operators
            </h2>
            <p className="mt-6 text-text-secondary leading-relaxed">
              After years at the intersection of management consulting and AI
              engineering, I saw the same problem everywhere: strategy teams
              that couldn&apos;t build, and engineering teams that couldn&apos;t
              think strategically.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              ClearForge was built to bridge that gap. We bring both the
              business acumen to identify high-impact opportunities and the
              technical depth to deliver working solutions — not just
              recommendations.
            </p>
            <div className="mt-8 border-l-2 border-molten-amber pl-6">
              <p className="font-serif text-lg text-forge-navy italic">
                &ldquo;We don&apos;t ship decks. We ship results.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
