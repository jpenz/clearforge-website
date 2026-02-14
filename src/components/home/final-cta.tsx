"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative border-t border-border-subtle py-24">
      <div className="absolute inset-0 crosshatch" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
            Get Started
          </p>
          <h2 className="mt-4 font-serif text-3xl text-forge-navy sm:text-4xl lg:text-5xl">
            Ready to See What AI Can Do for You?
          </h2>
          <p className="mt-6 text-lg text-text-secondary">
            Book a free 30-minute discovery call. We&apos;ll discuss your
            challenges, identify quick wins, and outline a path to measurable
            ROI.
          </p>
          <div className="mt-10">
            <Button size="xl" asChild>
              <Link href="/contact">
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="metric-display mt-6 text-xs text-text-muted">
            No commitment &middot; 30 minutes &middot; Actionable insights
          </p>
        </motion.div>
      </div>
    </section>
  );
}
