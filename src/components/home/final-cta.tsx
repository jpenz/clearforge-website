"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Calendar className="mx-auto h-10 w-10 text-blue" />
          <h2 className="mt-6 text-3xl font-bold text-text-primary sm:text-4xl">
            Ready to See What AI Can Do for You?
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Book a free 30-minute discovery call. We&apos;ll discuss your
            challenges, identify quick wins, and outline a path to measurable
            ROI.
          </p>
          <div className="mt-8">
            <Button size="xl" asChild>
              <Link href="/contact">
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-text-muted">
            No commitment &middot; 30 minutes &middot; Actionable insights
          </p>
        </motion.div>
      </div>
    </section>
  );
}
