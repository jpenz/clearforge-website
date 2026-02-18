"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type CaseStudy } from "@/data/case-studies";
import { ArrowLeft, ArrowRight, CheckCircle2, Target, TrendingUp, DollarSign, Clock } from "lucide-react";

const outcomeIcons = [Target, TrendingUp, DollarSign, Clock];

interface Props {
  caseStudy: CaseStudy;
}

export function CaseStudyDetailClient({ caseStudy: cs }: Props) {
  return (
    <>
      <section className="bg-slate-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/case-studies" className="inline-flex items-center gap-1 text-base text-slate-200 hover:text-teal mb-8">
              <ArrowLeft className="h-4 w-4" /> All Case Studies
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-teal border border-teal/30 rounded-md px-2.5 py-1">{cs.industry}</span>
              <span className="text-base text-slate-200">{cs.service}</span>
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl max-w-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {cs.title}
            </h1>
            <p className="mt-6 text-xl text-slate-200 max-w-3xl leading-relaxed">{cs.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {cs.outcomes.slice(0, 4).map((o, i) => {
              const Icon = outcomeIcons[i % outcomeIcons.length];
              return (
                <div key={o.metric} className={`p-6 text-center ${i < 3 ? "border-r border-gray-200" : ""}`}>
                  <div className="flex justify-center mb-2">
                    <Icon className="h-5 w-5 text-teal" />
                  </div>
                  <div className="metric-display text-2xl lg:text-3xl">{o.metric}</div>
                  <p className="mt-1 text-base text-slate-600">{o.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <span className="section-label">The Challenge</span>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{cs.challenge}</p>
        </div>
      </section>

      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <span className="section-label">The Solution</span>
          <div className="mt-8 space-y-5">
            {cs.solution.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.08 * i }}
                className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10">
                  <CheckCircle2 className="h-5 w-5 text-teal" />
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <span className="section-label">The Scale</span>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{cs.scale}</p>
        </div>
      </section>

      <section className="bg-slate-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>Ready for results like these?</h2>
          <p className="mt-4 text-lg text-slate-200 max-w-xl mx-auto">
            Every engagement starts with understanding your specific challenges.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-slate-400 text-white hover:bg-white hover:text-slate-navy" asChild>
              <Link href="/case-studies">More Case Studies <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
