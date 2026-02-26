"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCaseStudy } from "@/data/case-studies";

export function IndustrialManufacturerPage() {
  const study = getCaseStudy("industrial-manufacturer")!;

  return (
    <>
      <section className="bg-midnight py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to Case Studies
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.11em] text-slate-200">
              <span className="border border-white/20 px-2 py-1">{study.industry}</span>
              <span>{study.service}</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">{study.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">{study.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-fog bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 lg:grid-cols-3 lg:px-8 xl:grid-cols-6">
          {study.outcomes.map((outcome) => (
            <div key={outcome.metric} className="border-r border-fog p-5 last:border-r-0">
              <p className="metric-display text-3xl">{outcome.metric}</p>
              <p className="mt-1 text-sm text-slate">{outcome.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="section-label">The Challenge</p>
          <p className="mt-4 text-lg leading-relaxed text-slate">{study.challenge}</p>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="section-label">The Solution</p>
          <div className="mt-6 space-y-3">
            {study.solution.map((item, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="border border-fog bg-white p-5"
              >
                <p className="text-sm leading-relaxed text-slate">{item}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {study.continuousModel && (
        <section className="bg-midnight py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="section-label">Continuous Intelligence</p>
            <h2 className="mt-4 text-4xl leading-tight text-white sm:text-5xl">How performance compounds monthly</h2>
            <div className="mt-6 space-y-3">
              {study.continuousModel.map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="border border-white/12 bg-white/[0.04] p-5"
                >
                  <p className="text-sm leading-relaxed text-slate-200">{item}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="section-label">Scale and Impact</p>
          <p className="mt-4 text-lg leading-relaxed text-slate">{study.scale}</p>
        </div>
      </section>

      <section className="bg-midnight py-24 text-center lg:py-30">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-4xl text-white sm:text-5xl">Ready for outcomes like these?</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            We&apos;ll assess whether this approach fits your structure and strategic goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-midnight" asChild>
              <Link href="/case-studies">
                More Case Studies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
