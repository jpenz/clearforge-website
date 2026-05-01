'use client';

import { useEffect, useState } from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

/**
 * SVG circular progress ring with animated fill.
 * Score 0-100 maps to 0-360 degrees.
 *
 * Uses native SVG + CSS transition on stroke-dashoffset — no animation
 * library. Respects prefers-reduced-motion (animation is skipped).
 */
export function ScoreRing({ score, size = 200, strokeWidth = 8 }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const center = size / 2;

  const color =
    score >= 70
      ? 'var(--color-success)'
      : score >= 50
        ? 'var(--color-brass)'
        : 'var(--color-warm-gray)';

  // Start at full offset (empty ring) and animate to target via CSS transition
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Respect reduced motion — set final state immediately
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setOffset(circumference - progress);
      return;
    }
    // Small delay so the from-state paints before the transition kicks in
    const t = setTimeout(() => setOffset(circumference - progress), 300);
    return () => clearTimeout(t);
  }, [circumference, progress]);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
        focusable="false"
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--color-divider)"
          strokeWidth={strokeWidth}
        />
        {/* Animated progress */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </svg>
      {/* Score number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="metric-xl" style={{ color, fontSize: size * 0.3 }}>
          {score}
        </span>
        <span className="text-xs text-warm-gray mt-1">out of 100</span>
      </div>
    </div>
  );
}
