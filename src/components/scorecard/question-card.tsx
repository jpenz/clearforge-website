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
      className="rounded-xl border border-border-subtle bg-bg-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <p className="text-sm font-medium text-text-primary leading-relaxed">
        <span className="mr-2 font-mono text-xs text-text-muted">
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
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg border px-3 py-3 text-xs transition-all ${
              value === score
                ? "border-blue bg-blue/10 text-blue"
                : "border-border-subtle text-text-muted hover:border-border-medium hover:text-text-secondary"
            }`}
            aria-label={`${scaleLabels[score - 1]} - ${score} out of 5`}
          >
            <span className="text-lg font-bold">{score}</span>
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
