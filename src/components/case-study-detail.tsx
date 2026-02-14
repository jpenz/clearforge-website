"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyDetail({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center text-sm text-text-muted transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            All Case Studies
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          className="mx-auto mt-8 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="bg-molten-amber/10 px-3 py-1 text-xs font-medium text-molten-amber">
              {caseStudy.service}
            </span>
            <span className="bg-bg-elevated px-3 py-1 text-xs text-text-muted">
              {caseStudy.industry}
            </span>
          </div>
          <h1 className="mt-6 text-3xl font-serif text-forge-navy sm:text-4xl lg:text-5xl">
            {caseStudy.title}
          </h1>

          <div className="mt-8 inline-flex flex-col items-center border border-border-subtle bg-canvas px-8 py-6">
            <p className="text-5xl font-serif text-forge-navy sm:text-6xl">
              {caseStudy.heroMetric}
            </p>
            <p className="mt-2 text-text-muted">{caseStudy.heroMetricLabel}</p>
          </div>
        </motion.div>

        {/* Challenge */}
        <motion.div
          className="mx-auto mt-20 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
            The Challenge
          </p>
          <h2 className="mt-2 text-2xl font-serif text-forge-navy">
            What They Were Facing
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            {caseStudy.challenge}
          </p>
        </motion.div>

        {/* Solution */}
        <motion.div
          className="mx-auto mt-16 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
            The Solution
          </p>
          <h2 className="mt-2 text-2xl font-serif text-forge-navy">
            What We Built
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            {caseStudy.solution}
          </p>
        </motion.div>

        {/* Outcomes */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
              The Outcomes
            </p>
            <h2 className="mt-2 text-2xl font-serif text-forge-navy">
              Measurable Results
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudy.outcomes.map((outcome, i) => (
              <motion.div
                key={outcome.metric}
                className="border border-border-subtle bg-canvas p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-3xl font-serif text-forge-navy">
                  {outcome.metric}
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scale */}
        <motion.div
          className="mx-auto mt-20 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
            The Scale
          </p>
          <h2 className="mt-2 text-2xl font-serif text-forge-navy">
            What Happened Next
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            {caseStudy.scale}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-24 border-t border-border-subtle pt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-serif text-forge-navy">
            Ready for Similar Results?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Every engagement starts with a conversation about your specific
            challenges and goals.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild>
              <Link href="/contact">
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="secondary" asChild>
              <Link href="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
