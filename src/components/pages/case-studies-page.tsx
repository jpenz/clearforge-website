"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/case-studies";
import { ArrowRight } from "lucide-react";

export function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-deep pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="section-label">Case Studies</p>
            <h1
              className="mt-4 text-4xl text-text-primary sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Strategy into operating results.
            </h1>
            <p className="mt-6 text-lg text-text-secondary">
              Anonymized engagements showing how we turn AI ambition into
              measurable business outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case study list — Light */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-px bg-border-light">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
              >
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group grid bg-bg-light transition-colors hover:bg-bg-light-alt md:grid-cols-4"
                >
                  <div className="p-8 md:col-span-3 lg:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold uppercase tracking-widest text-accent-dark">
                        {cs.industry}
                      </span>
                      <span className="text-xs text-text-on-light-muted">·</span>
                      <span className="text-xs text-text-on-light-muted">{cs.service}</span>
                    </div>
                    <h2
                      className="text-2xl text-text-on-light group-hover:text-accent transition-colors sm:text-3xl"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {cs.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-text-on-light-sub max-w-2xl">
                      {cs.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-text-on-light-muted group-hover:text-accent transition-colors">
                      Read Case Study <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center border-l border-border-light p-8">
                    <span className="metric text-3xl font-bold sm:text-4xl text-accent-dark">
                      {cs.heroMetric}
                    </span>
                    <p className="mt-2 text-center text-sm text-text-on-light-muted">
                      {cs.heroMetricLabel}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Dark */}
      <section className="bg-bg-deep py-20 lg:py-28 hero-glow">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2
            className="text-3xl text-text-primary sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Want outcomes like these?
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            We start every engagement with your operating priorities and growth
            targets.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">
                Request a Proposal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
