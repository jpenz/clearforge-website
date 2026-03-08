"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ScrollMarquee({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);

  return (
    <div ref={ref} className={`overflow-hidden py-6 lg:py-10 ${className}`}>
      <motion.p
        style={{ x }}
        className="whitespace-nowrap text-[10vw] lg:text-[8vw] font-bold uppercase tracking-tight leading-none text-border-subtle select-none"
        aria-hidden
      >
        {text}
        <span className="text-accent/20 mx-8">/</span>
        {text}
        <span className="text-accent/20 mx-8">/</span>
        {text}
      </motion.p>
    </div>
  );
}
