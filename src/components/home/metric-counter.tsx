'use client';

import { useEffect, useRef } from 'react';

interface MetricCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Scroll-triggered count-up. Handles: "1,250" "98%" "$4.2M" "12x" "500+"
 * "3.5T" "<90" "79% → 11%". IntersectionObserver + rAF — replaced the GSAP
 * implementation, which was the only thing pulling the whole GSAP engine
 * (~116KB) into the sitewide bundle.
 */
export function MetricCounter({
  value,
  className = 'metric-lg',
  duration = 2,
}: MetricCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const match = value.match(/^([<>$]?)([\d,.]+)(.*)/);
    el.textContent = value;
    if (!match) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const prefix = match[1] || '';
    const numStr = match[2];
    const suffix = match[3] || '';
    const cleanNum = numStr.replace(/,/g, '');
    const target = parseFloat(cleanNum);
    const hasCommas = numStr.includes(',');
    const decimalPlaces = cleanNum.includes('.') ? cleanNum.split('.')[1].length : 0;

    let raf = 0;
    const render = (val: number) => {
      const formatted =
        decimalPlaces > 0
          ? val.toFixed(decimalPlaces)
          : hasCommas
            ? Math.round(val).toLocaleString()
            : String(Math.round(val));
      el.textContent = prefix + formatted + suffix;
    };

    const animate = () => {
      const t0 = performance.now();
      const ms = duration * 1000;
      const tick = (now: number) => {
        const p = Math.min((now - t0) / ms, 1);
        const eased = 1 - (1 - p) ** 4; // power4.out
        render(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = value;
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          animate();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={spanRef} className={className}>
      {value}
    </span>
  );
}
