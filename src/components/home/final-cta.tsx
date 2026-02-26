"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="bg-white py-24 lg:py-30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-fog bg-ivory px-8 py-10 text-center lg:px-14 lg:py-14"
        >
          <p className="section-label">Next Step</p>
          <h2 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl">
            If AI is on the agenda, let&apos;s make it operational.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate">
            30-minute discovery call for CEOs, PE operating partners, and owner-led companies. We&apos;ll evaluate
            where value exists, what can ship fast, and what supports a clean transition if ownership change is on
            the horizon.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/scorecard">Take the AI Scorecard</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
