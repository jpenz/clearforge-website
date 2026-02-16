"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";

export function CaseStudiesPageClient() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            Case Studies
          </p>
          <h1 className="mt-6 font-serif text-4xl text-forge-navy sm:text-5xl lg:text-6xl">
            Real results. Real businesses.
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            See how we&apos;ve helped companies transform operations, accelerate
            growth, and build AI systems that compound in value.
          </p>
        </motion.div>

        {/* Featured */}
        {caseStudies
          .filter((cs) => cs.featured)
          .map((cs) => (
            <motion.div
              key={cs.slug}
              className="mt-16 border border-border-accent bg-canvas"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid lg:grid-cols-[2fr_1fr]">
                <div className="p-10 sm:p-14">
                  <span className="inline-block bg-molten-amber/10 px-3 py-1 text-xs font-semibold uppercase tracking-[1.5px] text-molten-amber">
                    Featured
                  </span>
                  <h2 className="mt-6 font-serif text-3xl text-forge-navy">
                    {cs.title}
                  </h2>
                  <p className="mt-4 text-text-secondary leading-relaxed">
                    {cs.excerpt}
                  </p>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="amber-underline mt-6 inline-flex items-center gap-2 text-sm font-medium text-molten-amber"
                  >
                    Read full case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-px bg-border-subtle">
                  {cs.outcomes.slice(0, 4).map((o) => (
                    <div key={o.metric} className="bg-canvas p-6">
                      <span className="metric-display text-2xl text-molten-amber">
                        {o.metric}
                      </span>
                      <p className="mt-1 text-xs text-text-muted">
                        {o.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

        {/* Other case studies */}
        <div className="mt-16 divide-y divide-border-subtle border-y border-border-subtle">
          {caseStudies
            .filter((cs) => !cs.featured)
            .map((cs, i) => (
              <motion.div
                key={cs.slug}
                className="grid gap-6 py-10 sm:grid-cols-[2fr_1fr_auto] sm:items-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div>
                  <p className="text-xs uppercase tracking-[1.5px] text-text-muted">
                    {cs.industry} &middot; {cs.service}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-forge-navy">
                    {cs.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    {cs.excerpt}
                  </p>
                </div>
                <div className="text-center">
                  <span className="metric-display text-3xl text-molten-amber">
                    {cs.heroMetric}
                  </span>
                  <p className="text-xs text-text-muted">{cs.heroMetricLabel}</p>
                </div>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="amber-underline inline-flex items-center gap-1 text-sm text-molten-amber"
                >
                  Read more
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
