"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { value: 30, suffix: "%", label: "Pipeline Increase" },
  { value: 10, suffix: "%", label: "EBITDA Improvement" },
  { value: 90, suffix: "-Day", label: "Time to ROI" },
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
    <span className="text-5xl font-bold text-text-primary sm:text-6xl">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function Results() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            Results That Speak
          </h2>
          <p className="mt-4 text-text-secondary">
            Across engagements, our clients see measurable impact.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                inView={inView}
              />
              <p className="mt-2 text-text-secondary">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
