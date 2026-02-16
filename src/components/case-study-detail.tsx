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
      <section className="bg-slate-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/case-studies" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-teal mb-8">
              <ArrowLeft className="h-4 w-4" /> All Case Studies
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-teal border border-teal/30 rounded-md px-2 py-1">{cs.industry}</span>
              <span className="text-xs text-slate-400">{cs.service}</span>
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl max-w-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {cs.title}
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl">{cs.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {cs.outcomes.slice(0, 4).map((o, i) => (
              <div key={o.metric} className={`p-6 text-center ${i < 3 ? "border-r border-gray-200" : ""}`}>
                <div className="metric-display text-2xl lg:text-3xl">{o.metric}</div>
                <p className="mt-1 text-xs text-slate-500">{o.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <span className="section-label">The Challenge</span>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">{cs.challenge}</p>
        </div>
      </section>

      <section className="bg-gray-100 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <span className="section-label">The Solution</span>
          <ul className="mt-8 space-y-4">
            {cs.solution.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="metric-display text-sm mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <span className="section-label">The Scale</span>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">{cs.scale}</p>
        </div>
      </section>

      <section className="bg-slate-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>Ready for results like these?</h2>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
