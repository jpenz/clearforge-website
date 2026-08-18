"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  /** Rendered after the number, e.g. "x" or "+". */
  suffix?: string;
  /** Use en-US thousands separators. Defaults to true. */
  format?: boolean;
  className?: string;
}

/**
 * CSS-budget count-up: server-renders the final value (no CLS, works
 * without JS), then animates from zero on first view. Frozen under
 * prefers-reduced-motion.
 */
export function CountUp({
  value,
  suffix = "",
  format = true,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const render = (n: number) =>
    `${format ? n.toLocaleString("en-US") : String(n)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          const start = performance.now();
          const duration = 1300;
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = render(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, suffix, format]);

  return (
    <span ref={ref} className={className}>
      {render(value)}
    </span>
  );
}
