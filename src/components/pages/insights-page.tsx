"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { insights, formatDate } from "@/data/insights";

export function InsightsPage() {
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
            <span className="section-label">Insights</span>
            <h1 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl lg:text-6xl">
              Field notes from shipping AI in real organizations.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate">
              Briefs for operators, not trend spectators. We publish what works, what fails, and what executives
              need to run high-confidence programs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-ivory py-24 lg:py-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight, i) => (
              <motion.article
                key={insight.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: i * 0.06 }}
                className="group border border-fog bg-white p-6"
              >
                <div className="mb-3 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.1em] text-stone">
                  <span className="border border-fog bg-ivory px-2 py-1">{insight.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {insight.readingTime} min
                  </span>
                </div>

                <Link href={`/insights/${insight.slug}`}>
                  <h2 className="text-2xl leading-tight text-midnight transition-colors group-hover:text-brass">
                    {insight.title}
                  </h2>
                </Link>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate">{insight.excerpt}</p>

                <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.08em]">
                  <span className="text-stone">{formatDate(insight.date)}</span>
                  <Link href={`/insights/${insight.slug}`} className="inline-flex items-center gap-1 font-semibold text-midnight">
                    Read <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
