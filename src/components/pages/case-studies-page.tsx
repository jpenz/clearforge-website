"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/case-studies";

export function CaseStudiesPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <span className="section-label">Case Studies</span>
            <h1 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl lg:text-6xl">
              Verified outcomes from real operating environments.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate">
              These engagements are anonymized but specific. Every metric shown maps to operational improvements
              clients use in leadership reporting.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-ivory py-24 lg:py-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-5">
            {caseStudies.map((study, i) => (
              <motion.article
                key={study.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid border border-fog bg-white md:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="p-7">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.11em] text-stone">
                    <span className="border border-fog bg-ivory px-2 py-1">{study.industry}</span>
                    <span>{study.service}</span>
                  </div>
                  <h2 className="text-3xl leading-tight text-midnight">{study.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate">{study.excerpt}</p>
                  <Button variant="link" className="mt-5 px-0" asChild>
                    <Link href={`/case-studies/${study.slug}`}>
                      Read Full Case Study <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="border-l border-fog bg-midnight p-7 text-center md:text-left">
                  <p className="metric-display text-4xl">{study.heroMetric}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">{study.heroMetricLabel}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midnight py-24 text-center lg:py-30">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-4xl text-white sm:text-5xl">Want similar performance outcomes?</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            We can map these patterns to your current operating constraints.
          </p>
          <Button className="mt-8" size="lg" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
