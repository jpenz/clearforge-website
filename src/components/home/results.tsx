"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { value: 30, suffix: "%", label: "Pipeline Increase" },
  { value: 10, suffix: "%", label: "EBITDA Improvement" },
  { value: 90, suffix: "d", label: "Time to ROI" },
  { value: 240, prefix: "$", suffix: "K", label: "Average Savings" },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="metric-display text-6xl text-molten-amber sm:text-7xl lg:text-[120px]">
      {prefix}
      {count}
      <span className="text-4xl sm:text-5xl lg:text-6xl">{suffix}</span>
    </span>
  );
}

export function Results() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="border-t border-border-subtle py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
            Impact
          </p>
          <h2 className="mt-4 max-w-md font-serif text-3xl text-forge-navy sm:text-4xl">
            Results that speak.
          </h2>
        </motion.div>

        <div className="mt-20 grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                inView={inView}
              />
              <p className="mt-3 text-xs uppercase tracking-[1.5px] text-text-muted">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
