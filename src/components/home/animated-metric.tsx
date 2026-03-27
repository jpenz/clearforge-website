'use client';

import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function AnimatedMetric({
  value,
  className = 'metric text-3xl font-bold sm:text-4xl',
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part for counting
    const match = value.match(/^([\d,.]+)(.*)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const numStr = match[1].replace(/,/g, '');
    const suffix = match[2];
    const target = parseFloat(numStr);
    const hasCommas = match[1].includes(',');
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const duration = 1200;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3;
      const current = target * eased;

      let formatted: string;
      if (decimals > 0) {
        formatted = current.toFixed(decimals);
      } else {
        const rounded = Math.round(current);
        formatted = hasCommas ? rounded.toLocaleString() : String(rounded);
      }

      setDisplay(formatted + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
