'use client';

import { motion } from 'framer-motion';

export function ForgeVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Copper gradient orb — top right */}
      <motion.div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(193,127,78,0.12)_0%,rgba(193,127,78,0.04)_40%,transparent_70%)]" />
      </motion.div>

      {/* Geometric lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Diagonal precision lines */}
        <motion.line
          x1="900"
          y1="0"
          x2="1440"
          y2="540"
          stroke="rgba(193,127,78,0.15)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
        />
        <motion.line
          x1="1000"
          y1="0"
          x2="1440"
          y2="440"
          stroke="rgba(193,127,78,0.08)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
        />
        <motion.line
          x1="1100"
          y1="0"
          x2="1440"
          y2="340"
          stroke="rgba(193,127,78,0.12)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeInOut' }}
        />

        {/* Horizontal accent */}
        <motion.line
          x1="800"
          y1="600"
          x2="1440"
          y2="600"
          stroke="rgba(193,127,78,0.06)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />

        {/* Arc — forge shape */}
        <motion.path
          d="M 1050 100 Q 1300 250 1200 550"
          stroke="rgba(193,127,78,0.1)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 1100 50 Q 1400 300 1250 600"
          stroke="rgba(193,127,78,0.06)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 0.4, ease: 'easeInOut' }}
        />

        {/* Small detail circles */}
        <motion.circle
          cx="1050"
          cy="100"
          r="3"
          fill="rgba(193,127,78,0.3)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        />
        <motion.circle
          cx="1200"
          cy="550"
          r="3"
          fill="rgba(193,127,78,0.3)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        />
        <motion.circle
          cx="1250"
          cy="600"
          r="2"
          fill="rgba(193,127,78,0.2)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        />
      </svg>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-deep to-transparent" />
    </div>
  );
}
