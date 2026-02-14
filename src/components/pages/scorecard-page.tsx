"use client";

import { motion } from "framer-motion";
import { BarChart3, Clock, Shield } from "lucide-react";
import { ScorecardForm } from "@/components/scorecard/scorecard-form";

export function ScorecardPageClient() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
            AI Readiness Scorecard
          </p>
          <h1 className="mt-4 text-3xl font-serif text-forge-navy sm:text-4xl">
            How AI-Ready Is Your Business?
          </h1>
          <p className="mt-4 text-text-secondary">
            Answer 18 questions across 5 key pillars to get your personalized AI
            readiness score with actionable recommendations.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-text-muted sm:flex-row sm:gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />5 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" />
              Instant results
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4" />
              No spam, ever
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <div className="mt-12">
          <ScorecardForm />
        </div>
      </div>
    </div>
  );
}
