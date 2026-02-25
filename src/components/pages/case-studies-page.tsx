"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/case-studies";
import { ArrowRight } from "lucide-react";

export function CaseStudiesPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="section-label">Case Studies</span>
            <h1 className="mt-4 text-4xl font-bold text-text sm:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
              How ClearForge turns strategy into operating results.
            </h1>
            <p className="mt-6 text-lg text-text-secondary">
              A selection of anonymized engagements across growth and operations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-8">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="rounded-lg border border-border bg-white overflow-hidden"
              >
                <div className="grid md:grid-cols-3">
                  <div className="p-8 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium text-teal border border-teal/20 bg-teal/5 rounded-md px-2 py-1">{cs.industry}</span>
                      <span className="text-base text-text-tertiary">{cs.service}</span>
                    </div>
                    <h2 className="text-xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                      {cs.title}
                    </h2>
                    <p className="mt-3 text-lg text-text-secondary leading-relaxed">{cs.excerpt}</p>
                    <Button variant="link" className="mt-4 px-0" asChild>
                      <Link href={`/case-studies/${cs.slug}`}>
                        Read Full Case Study <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-navy p-8 flex flex-col justify-center items-center text-center">
                    <div className="metric-display text-4xl">{cs.heroMetric}</div>
                    <p className="mt-2 text-base text-white/80">{cs.heroMetricLabel}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Want outcomes like these in your business?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            We start every engagement with your operating priorities and growth targets.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
