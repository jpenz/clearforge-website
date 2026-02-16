"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="bg-forge-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-serif text-4xl text-warm-white sm:text-5xl lg:text-6xl">
            Ready to stop planning
            <br />
            and start performing?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-warm-white/60">
            30 minutes. No pitch decks. Just a straightforward conversation
            about your business and whether AI can help.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild>
              <Link href="/contact">
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-warm-white/20 text-warm-white hover:bg-warm-white hover:text-forge-navy"
              asChild
            >
              <Link href="/scorecard">Take AI Scorecard</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
