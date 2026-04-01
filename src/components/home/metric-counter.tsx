'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface MetricCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Scroll-triggered counter. Handles: "1,250" "98%" "$4.2M" "12x" "500+" "3.5T" "<90"
 */
export function MetricCounter({ value, className = 'metric-lg', duration = 2 }: MetricCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const el = spanRef.current;
      if (!el) return;

      const match = value.match(/^([<>$]?)([\d,.]+)(.*)/);
      if (!match) {
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
      const proxy = { val: 0 };

      el.textContent = prefix + '0' + suffix;

      gsap.to(proxy, {
        val: target,
        duration,
        ease: 'power4.out',
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

  return <span ref={spanRef} className={className}>{value}</span>;
}
