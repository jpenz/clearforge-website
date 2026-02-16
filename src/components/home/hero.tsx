"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setValue(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="metric-display text-4xl text-molten-amber lg:text-5xl">
      {prefix}{value}{suffix}
    </span>
  );
}

const metrics = [
  { end: 358, suffix: "", label: "Qualified Targets Identified" },
  { end: 60, suffix: "%+", label: "Prospecting Time Saved" },
  { end: 45, suffix: " min", label: "82-Page Study Delivered" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-white">
      <div className="absolute inset-0 crosshatch" />

      <div className="relative mx-auto max-w-7xl px-6 pb-0 pt-24 lg:px-8 lg:pt-36">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              AI Performance Consulting
            </motion.p>

            <motion.h1
              className="mt-8 font-serif text-5xl leading-[1.05] text-forge-navy sm:text-6xl md:text-7xl lg:text-[80px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Strategy that ships.
              <br />
              <span className="text-molten-amber">AI that performs.</span>
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary lg:text-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              We combine management consulting rigor with hands-on AI
              engineering to deliver measurable results&nbsp;&mdash; not decks
              that collect dust.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <Button size="xl" asChild>
                <Link href="/contact">
                  Book Discovery Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/scorecard">Take AI Scorecard</Link>
              </Button>
            </motion.div>
          </div>

          {/* Side credential */}
          <motion.div
            className="hidden border-l border-border-subtle pl-8 lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="text-xs uppercase tracking-[2px] text-text-muted">
              Trusted by
            </p>
            <p className="mt-2 font-serif text-lg text-forge-navy">
              Fortune 1000
            </p>
            <p className="text-sm text-text-secondary">
              industrial manufacturers,
              <br />
              PE portfolio companies,
              <br />
              &amp; growth-stage firms
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated metrics bar */}
      <motion.div
        className="relative mt-20 border-t border-border-subtle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="mx-auto flex max-w-7xl flex-col divide-y divide-border-subtle px-6 sm:flex-row sm:divide-x sm:divide-y-0 lg:px-8">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="flex-1 py-8 sm:px-8 first:sm:pl-0 last:sm:pr-0"
            >
              <AnimatedCounter end={m.end} suffix={m.suffix} />
              <p className="mt-2 text-xs uppercase tracking-[1.5px] text-text-muted">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
