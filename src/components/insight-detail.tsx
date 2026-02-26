"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Insight, formatDate } from "@/data/insights";

interface Props {
  insight: Insight;
  related: Insight[];
}

export function InsightDetailClient({ insight, related }: Props) {
  return (
    <>
      <section className="bg-white py-20 lg:py-28 border-b border-fog">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-slate hover:text-midnight">
              <ArrowLeft className="h-4 w-4" /> Back to Insights
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.11em] text-stone">
              <span className="border border-fog bg-ivory px-2 py-1">{insight.category}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {insight.readingTime} min
              </span>
            </div>
            <h1 className="mt-5 text-4xl leading-tight text-midnight sm:text-5xl">{insight.title}</h1>
            <p className="mt-4 text-sm text-stone">
              {insight.author.name} • {formatDate(insight.date)}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose-content">
            {insight.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i}>{block.replace("## ", "")}</h2>;
              }
              return (
                <p
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: block
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em>$1</em>"),
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ivory py-24 lg:py-30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-4xl text-midnight sm:text-5xl">Related Insights</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/insights/${item.slug}`} className="border border-fog bg-white p-6 transition-colors hover:border-brass">
                  <p className="text-xs uppercase tracking-[0.11em] text-stone">{item.category}</p>
                  <h3 className="mt-3 text-2xl leading-tight text-midnight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate line-clamp-2">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-midnight py-24 text-center lg:py-30">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-4xl text-white sm:text-5xl">Need help applying this to your business?</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            We can map these ideas to your current revenue and operations priorities.
          </p>
          <Button className="mt-8" size="lg" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
