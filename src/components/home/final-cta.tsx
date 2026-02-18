"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="bg-slate-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Ready to see what AI can do for your business?
          </h2>
          <p className="mt-4 text-lg text-slate-200">
            30-minute discovery call. No pitch decks. No pressure.
            Just a straightforward conversation about what&apos;s possible.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-slate-400 text-white hover:bg-white hover:text-slate-navy" asChild>
              <Link href="/scorecard">Take the AI Scorecard</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
