"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export function Founder() {
  return (
    <section className="border-t border-border-subtle py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Photo placeholder */}
            <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-bg-card">
              <User className="h-16 w-16 text-text-muted" />
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-blue">
                From the Founder
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
                Built by an Operator, for Operators
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
