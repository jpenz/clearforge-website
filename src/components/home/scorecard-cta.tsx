"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScorecardCTA() {
  return (
    <section className="bg-warm-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="border border-border-subtle bg-canvas p-10 sm:p-16 lg:p-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
                Free Assessment
              </p>
              <h2 className="mt-6 font-serif text-3xl text-forge-navy sm:text-4xl">
                How AI-ready is your business?
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                18 questions. 5 pillars. 5 minutes. Get your personalized AI
                readiness score with actionable recommendations — no sales pitch
                attached.
              </p>
              <Button size="xl" className="mt-8" asChild>
                <Link href="/scorecard">
                  Take the Scorecard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="space-y-6 border-t border-border-subtle pt-6 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              {[
                { icon: Clock, text: "5 minutes to complete" },
                { icon: BarChart3, text: "Instant personalized results" },
                { icon: Shield, text: "No spam, no sales calls" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <Icon className="h-5 w-5 shrink-0 text-molten-amber" strokeWidth={1.5} />
                  <span className="text-text-secondary">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
