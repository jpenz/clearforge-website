'use client';

import { motion } from 'framer-motion';
import { type ScorecardQuestion, scaleLabels } from '@/lib/scorecard';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: ScorecardQuestion;
  value: number | undefined;
  onChange: (questionId: number, value: number) => void;
  index: number;
}

export function QuestionCard({ question, value, onChange, index }: QuestionCardProps) {
  return (
    <motion.div
      className="border border-divider bg-surface p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <p className="text-body font-medium text-anthracite leading-relaxed">
        <span className="metric text-xs text-brass mr-2">Q{question.id}</span>
        {question.text}
      </p>

      {/* Card-style radio buttons */}
      <div className="mt-5 grid grid-cols-5 gap-2 sm:flex sm:gap-3">
        {scaleLabels.map((label, idx) => {
          const score = idx + 1;
          const isSelected = value === score;
          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(question.id, score)}
              className={cn(
                'border min-h-[44px] px-2 sm:px-3 py-2 sm:py-3 text-center transition-all duration-200 sm:flex-1',
                isSelected
                  ? 'border-brass bg-forge-black text-bone ring-2 ring-brass sm:ring-0 sm:border-l-4 sm:border-l-brass'
                  : 'border-divider text-warm-gray hover:border-brass/50 hover:text-anthracite',
              )}
              aria-label={`${label} — ${score} out of 5`}
            >
              <span className="metric text-base sm:text-lg font-bold block">{score}</span>
              <span className="text-[10px] sm:text-xs hidden sm:block mt-1">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile scale labels */}
      <div className="mt-2 flex justify-between text-xs text-warm-gray sm:hidden">
        <span>{scaleLabels[0]}</span>
        <span>{scaleLabels[4]}</span>
      </div>
    </motion.div>
  );
}
