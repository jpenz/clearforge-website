"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-8 lg:pt-28 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="section-label">AI Performance Consulting</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-navy sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            <span className="gradient-text">Strategy that ships.</span>
            <br />
            AI that performs.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-2xl">
            We combine strategy consulting rigor with hands-on AI engineering to deliver
            measurable results for mid-market companies and PE portfolio companies.
            No decks. No demos. Working systems that drive revenue.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/scorecard">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Take the AI Readiness Scorecard
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Trust Bar — Anonymized client proof */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            <span className="text-sm text-slate-400 uppercase tracking-wider font-medium">Trusted by</span>
            {[
              "Fortune 1000 Industrial Manufacturer",
              "Mid-Market PE Portfolio",
              "$50M Specialty Manufacturer",
              "$2B+ Multi-Division Corporation",
            ].map((client) => (
              <span key={client} className="text-sm text-slate-500 font-medium">
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
