'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Scroll-triggered counter that animates numeric values.
 *
 * Handles formats like:
 *   "1,250"   "98%"   "$4.2M"   "12x"   "500+"   "3.5T"   "47K"
 *
 * Prefix ($) and suffix (%, +, x, T, M, K, etc.) are preserved.
 */
export function GSAPCounter({
  value,
  className = 'metric text-3xl font-bold sm:text-4xl',
  duration = 2,
}: GSAPCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const el = spanRef.current;
      if (!el) return;

      // Parse the value string into prefix, number, and suffix
      const match = value.match(/^(\$)?([\d,.]+)(.*)/);
      if (!match) {
        // Not a numeric value — just set text directly
        el.textContent = value;
        return;
      }

      const prefix = match[1] || '';
      const numStr = match[2];
      const suffix = match[3] || '';

      const cleanNum = numStr.replace(/,/g, '');
      const target = parseFloat(cleanNum);
      const hasCommas = numStr.includes(',');
      const decimalPlaces = cleanNum.includes('.') ? cleanNum.split('.')[1].length : 0;

      // Proxy object for GSAP to tween
      const proxy = { val: 0 };

      // Set initial display
      el.textContent = prefix + '0' + suffix;

      gsap.to(proxy, {
        val: target,
        duration,
        ease: 'power2.out',
        snap: { val: decimalPlaces > 0 ? 1 / 10 ** decimalPlaces : 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onUpdate() {
          let formatted: string;
          if (decimalPlaces > 0) {
            formatted = proxy.val.toFixed(decimalPlaces);
          } else {
            const rounded = Math.round(proxy.val);
            formatted = hasCommas ? rounded.toLocaleString() : String(rounded);
          }
          el.textContent = prefix + formatted + suffix;
        },
      });
    },
    { scope: spanRef, dependencies: [value, duration] },
  );

  return (
    <span ref={spanRef} className={className}>
      {value}
    </span>
  );
}
