"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type Insight, formatDate } from "@/data/insights";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

interface Props {
  insight: Insight;
  related: Insight[];
}

export function InsightDetailClient({ insight, related }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 lg:py-28 border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/insights" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-teal mb-8">
              <ArrowLeft className="h-4 w-4" /> All Insights
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-teal border border-teal/20 bg-teal/5 rounded-md px-2 py-1">{insight.category}</span>
              <span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="h-3 w-3" /> {insight.readingTime} min read</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-navy sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {insight.title}
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm text-slate-500">{insight.author.name}</span>
              <span className="text-sm text-slate-400">{formatDate(insight.date)}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose-content">
            {insight.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i}>{block.replace("## ", "")}</h2>;
              }
              return <p key={i} dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>") }} />;
            })}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-gray-100 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-navy mb-8" style={{ fontFamily: "var(--font-space-grotesk)" }}>Related Insights</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/insights/${r.slug}`} className="rounded-lg border border-gray-200 bg-white p-6 hover:border-teal transition-colors group">
                  <span className="text-xs font-medium text-teal">{r.category}</span>
                  <h3 className="mt-2 text-lg font-bold text-slate-navy group-hover:text-teal transition-colors" style={{ fontFamily: "var(--font-space-grotesk)" }}>{r.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-slate-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Ready to put these ideas to work?
          </h2>
          <p className="mt-4 text-base text-slate-400">Book a discovery call and let&apos;s discuss your specific challenges.</p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
