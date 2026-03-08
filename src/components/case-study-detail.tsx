"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type CaseStudy } from "@/data/case-studies";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  caseStudy: CaseStudy;
}

export function CaseStudyDetailClient({ caseStudy: cs }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-deep pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> All Case Studies
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                {cs.industry}
              </span>
              <span className="text-xs text-text-muted">·</span>
              <span className="text-xs text-text-muted">{cs.service}</span>
            </div>
            <h1
              className="text-3xl text-text-primary sm:text-4xl lg:text-5xl max-w-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {cs.title}
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-3xl leading-relaxed">
              {cs.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics strip — Light */}
      <section className="bg-bg-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px bg-border-light lg:grid-cols-4">
            {cs.outcomes.slice(0, 4).map((o) => (
              <div key={o.metric} className="bg-bg-light p-6 text-center lg:p-8">
                <p className="metric text-2xl font-bold text-accent-dark lg:text-3xl">{o.metric}</p>
                <p className="mt-1 text-sm text-text-on-light-muted">{o.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="bg-bg-deep py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="section-label">The Challenge</p>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            {cs.challenge}
          </p>
        </div>
      </section>

      {/* Solution — Light */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="section-label text-accent-dark">The Solution</p>
          <div className="mt-8 space-y-4">
            {cs.solution.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 * i }}
                className="flex items-start gap-4 border border-border-light p-6"
              >
                <span className="metric text-xs mt-1 shrink-0 text-accent-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed text-text-on-light-sub">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous model */}
      {cs.continuousModel && cs.continuousModel.length > 0 && (
        <section className="bg-bg-deep py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="section-label">Continuous Model</p>
            <ul className="mt-6 space-y-3">
              {cs.continuousModel.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-text-secondary">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Scale */}
      <section className="bg-bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="section-label">The Scale</p>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            {cs.scale}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-deep py-20 lg:py-28 hero-glow">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2
            className="text-3xl text-text-primary sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready for results like these?
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Every engagement starts with understanding your specific challenges.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Request a Proposal</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
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
