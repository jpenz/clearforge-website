'use client';

import { motion } from 'framer-motion';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

/**
 * SVG circular progress ring with animated fill.
 * Score 0-100 maps to 0-360 degrees.
 */
export function ScoreRing({ score, size = 200, strokeWidth = 8 }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const center = size / 2;

  const color = score >= 70 ? 'var(--color-success)' : score >= 50 ? 'var(--color-brass)' : 'var(--color-warm-gray)';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
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
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>
      {/* Score number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="metric-xl" style={{ color, fontSize: size * 0.3 }}>{score}</span>
        <span className="text-xs text-warm-gray mt-1">out of 100</span>
      </div>
    </div>
  );
}
