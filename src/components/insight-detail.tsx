"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, type Insight } from "@/data/insights";

export function InsightDetail({ insight }: { insight: Insight }) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-forge-navy py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-warm-white/50 hover:text-warm-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All Insights
            </Link>
            <div className="mt-8 flex items-center gap-4">
              <span className="bg-warm-white/10 px-3 py-1 text-xs uppercase tracking-[1.5px] text-warm-white/70">
                {insight.category}
              </span>
              <span className="text-xs text-warm-white/50">
                {formatDate(insight.date)} &middot; {insight.readingTime} min read
              </span>
            </div>
            <h1 className="mt-8 font-serif text-3xl text-warm-white sm:text-4xl lg:text-5xl">
              {insight.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            className="prose-forge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {insight.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mb-4 mt-12 font-serif text-2xl text-forge-navy first:mt-0"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return (
                  <p key={i} className="mt-4 font-medium text-forge-navy">
                    {block.replace(/\*\*/g, "")}
                  </p>
                );
              }
              // Handle inline bold
              const parts = block.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p key={i} className="mt-4 text-text-secondary leading-relaxed">
                  {parts.map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j} className="font-medium text-forge-navy">
                        {part.replace(/\*\*/g, "")}
                      </strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </p>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-16 border-t border-border-subtle pt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-serif text-2xl text-forge-navy">
              Ready to put this into practice?
            </h3>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Book Discovery Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/scorecard">Take AI Scorecard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
