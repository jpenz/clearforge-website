"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

function AnimatedMetric({
  end,
  suffix = "",
  label,
}: {
  end: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - startTime) / 1800, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <span className="metric-display text-3xl text-molten-amber lg:text-4xl">
        {value}{suffix}
      </span>
      <p className="mt-1 text-xs uppercase tracking-[1.5px] text-warm-white/50">
        {label}
      </p>
    </div>
  );
}

export function CaseStudyPreview() {
  return (
    <section className="bg-forge-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: story */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
              Featured Case Study
            </p>
            <h2 className="mt-6 font-serif text-3xl text-warm-white sm:text-4xl">
              Fortune 1000 Industrial Manufacturer
            </h2>
            <p className="mt-6 text-warm-white/70 leading-relaxed">
              A $2B+ manufacturer with 70+ facilities and 16 business divisions
              needed to transform how they identify growth opportunities. Sales
              teams were working in silos, targeting prospects based on intuition
              instead of intelligence.
            </p>
            <p className="mt-4 text-warm-white/70 leading-relaxed">
              We deployed AI-powered sales intelligence agents that now run
              continuous market sweeps across all divisions — discovering new
              segments, enriching contacts, and delivering McKinsey-caliber
              market reports in under 45 minutes.
            </p>
            <Button size="lg" variant="outline" className="mt-8 border-warm-white/20 text-warm-white hover:bg-warm-white hover:text-forge-navy" asChild>
              <Link href="/case-studies/industrial-manufacturer">
                Read Full Case Study
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right: metrics */}
          <motion.div
            className="grid grid-cols-2 gap-px bg-deep-steel"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {[
              { end: 358, suffix: "", label: "Qualified Targets" },
              { end: 10, suffix: "", label: "Verticals Analyzed" },
              { end: 5, suffix: "", label: "New Growth Segments" },
              { end: 60, suffix: "%+", label: "Time Saved" },
            ].map((m) => (
              <div key={m.label} className="bg-forge-navy p-8 lg:p-10">
                <AnimatedMetric end={m.end} suffix={m.suffix} label={m.label} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
