"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  pillars,
  getQuestionsForPillar,
  calculateResults,
  type Answers,
  type PillarKey,
} from "@/lib/scorecard";
import { ProgressBar } from "./progress-bar";
import { QuestionCard } from "./question-card";

export function ScorecardForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPillar = pillars[currentStep];
  const currentQuestions = getQuestionsForPillar(currentPillar.key);

  const completedSteps = new Set<PillarKey>(
    pillars
      .filter((pillar) => {
        const pillarQs = getQuestionsForPillar(pillar.key);
        return pillarQs.every((q) => answers[q.id] !== undefined);
      })
      .map((p) => p.key)
  );

  const isCurrentStepComplete = currentQuestions.every(
    (q) => answers[q.id] !== undefined
  );

  const handleAnswer = useCallback((questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const goNext = () => {
    if (currentStep < pillars.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const results = calculateResults(answers);

    try {
      await fetch("/api/scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, results }),
      });
    } catch {
      // Non-blocking - results still show even if API fails
    }

    // Store results in sessionStorage for the results page
    sessionStorage.setItem(
      "scorecardResults",
      JSON.stringify(results)
    );

    router.push("/scorecard/results");
  };

  const isLastStep = currentStep === pillars.length - 1;

  return (
    <div>
      <ProgressBar
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPillar.key}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {currentQuestions.map((question, i) => (
            <QuestionCard
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={handleAnswer}
              index={i}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={goPrev}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        {isLastStep ? (
          <Button
            onClick={handleSubmit}
            disabled={!isCurrentStepComplete || isSubmitting}
            className="gap-2"
            size="lg"
          >
            {isSubmitting ? "Calculating..." : "See My Results"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={goNext}
            disabled={!isCurrentStepComplete}
            className="gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
