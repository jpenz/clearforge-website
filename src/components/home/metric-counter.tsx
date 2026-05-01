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
export function MetricCounter({
  value,
  className = 'metric-lg',
  duration = 2,
}: MetricCounterProps) {
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
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      el.textContent = value;

      if (prefersReducedMotion) {
        return;
      }

      const renderValue = () => {
        let formatted: string;
        if (decimalPlaces > 0) {
          formatted = proxy.val.toFixed(decimalPlaces);
        } else {
          const rounded = Math.round(proxy.val);
          formatted = hasCommas ? rounded.toLocaleString() : String(rounded);
        }
        el.textContent = prefix + formatted + suffix;
      };

      const animateCounter = () => {
        proxy.val = 0;
        renderValue();

        gsap.to(proxy, {
          val: target,
          duration,
          ease: 'power4.out',
          snap: { val: decimalPlaces > 0 ? 1 / 10 ** decimalPlaces : 1 },
          onUpdate: renderValue,
          onComplete() {
            // Emerald text-shadow glow that fades out
            gsap.fromTo(
              el,
              { textShadow: '0 0 30px rgba(4,120,87,0.3)' },
              { textShadow: '0 0 0px rgba(4,120,87,0)', duration: 1, ease: 'power2.out' },
            );
          },
        });
      };

      // Container scale entrance
      gsap.fromTo(
        el,
        { scale: 0.85 },
        {
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
            onEnter: animateCounter,
          },
        },
      );
    },
    { scope: spanRef, dependencies: [value, duration] },
  );

  return (
    <span ref={spanRef} className={className}>
      {value}
    </span>
  );
}
