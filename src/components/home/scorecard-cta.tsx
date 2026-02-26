"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScorecardCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-blue/20 bg-gradient-to-br from-blue/10 via-bg-card to-emerald/10 p-8 sm:p-12 lg:p-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue/10 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald/10 blur-[80px]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue/10">
              <BarChart3 className="h-8 w-8 text-blue" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-text-primary sm:text-4xl">
              How AI-Ready Is Your Business?
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Take our free 5-minute assessment and get a personalized AI
              readiness score with actionable recommendations.
            </p>
            <div className="mt-8">
              <Button size="xl" asChild>
                <Link href="/scorecard">
                  Take the Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-text-muted">
              18 questions &middot; 5 minutes &middot; Instant results
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
