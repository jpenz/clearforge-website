"use client";

import { motion } from "framer-motion";
import { scaleLabels, type ScorecardQuestion } from "@/lib/scorecard";

interface QuestionCardProps {
  question: ScorecardQuestion;
  value: number | undefined;
  onChange: (questionId: number, value: number) => void;
  index: number;
}

export function QuestionCard({
  question,
  value,
  onChange,
  index,
}: QuestionCardProps) {
  return (
    <motion.div
      className="border-b border-border-subtle py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <p className="text-sm font-medium text-forge-navy leading-relaxed">
        <span className="metric-display mr-2 text-xs text-text-muted">
          Q{question.id}
        </span>
        {question.text}
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(question.id, score)}
            className={`flex flex-1 flex-col items-center gap-1 border px-3 py-3 text-xs transition-all ${
              value === score
                ? "border-molten-amber bg-molten-amber/10 text-molten-amber"
                : "border-border-subtle text-text-muted hover:border-border-medium hover:text-text-secondary"
            }`}
            aria-label={`${scaleLabels[score - 1]} - ${score} out of 5`}
          >
            <span className="metric-display text-lg font-bold">{score}</span>
            <span className="hidden text-center sm:block">
              {scaleLabels[score - 1]}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-text-muted sm:hidden">
        <span>{scaleLabels[0]}</span>
        <span>{scaleLabels[4]}</span>
      </div>
    </motion.div>
  );
}
