"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { pillars, questions, scaleLabels, type Answers, type PillarKey, getQuestionsForPillar } from "@/lib/scorecard";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ScorecardPage() {
  const router = useRouter();
  const [currentPillar, setCurrentPillar] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const pillar = pillars[currentPillar];
  const pillarQuestions = getQuestionsForPillar(pillar.key);
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const canAdvance = pillarQuestions.every((q) => answers[q.id] !== undefined);
  const isLast = currentPillar === pillars.length - 1;

  function handleAnswer(questionId: number, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleNext() {
    if (isLast) {
      sessionStorage.setItem("scorecard-answers", JSON.stringify(answers));
      router.push("/scorecard/results");
    } else {
      setCurrentPillar((prev) => prev + 1);
    }
  }

  function handleBack() {
    if (currentPillar > 0) setCurrentPillar((prev) => prev - 1);
  }

  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">AI Maturity Scorecard</span>
            <h1 className="mt-4 text-3xl font-bold text-text sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              How ready is your business for AI agents?
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              20 questions across 5 pillars. Takes about 5 minutes.
              Get your AI maturity score, pillar breakdown, and a personalized roadmap with specific next steps.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-medium text-text-secondary">{pillar.name}</span>
              <span className="metric-display text-sm">{answeredCount}/{totalQuestions}</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-teal rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-1 mt-3">
              {pillars.map((p, i) => (
                <button
                  key={p.key}
                  onClick={() => setCurrentPillar(i)}
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    i === currentPillar ? "bg-teal" : i < currentPillar ? "bg-teal/40" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Questions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pillar.key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-10 space-y-6"
            >
              <div className="rounded-lg border border-border bg-surface p-4">
                <h3 className="text-sm font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>{pillar.name}</h3>
                <p className="text-base text-text-tertiary mt-1">{pillar.description}</p>
              </div>

              {pillarQuestions.map((q) => (
                <div key={q.id} className="rounded-lg border border-border bg-white p-6">
                  <p className="text-base font-medium text-text-secondary mb-4">{q.text}</p>
                  <div className="flex gap-2">
                    {scaleLabels.map((label, idx) => {
                      const value = idx + 1;
                      const isSelected = answers[q.id] === value;
                      return (
                        <button
                          key={value}
                          onClick={() => handleAnswer(q.id, value)}
                          className={`flex-1 rounded-md border px-2 py-2.5 text-xs font-medium transition-all ${
                            isSelected
                              ? "border-teal bg-teal text-white"
                              : "border-border text-text-tertiary hover:border-teal hover:text-teal"
                          }`}
                        >
                          <span className="hidden sm:inline">{label}</span>
                          <span className="sm:hidden">{value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentPillar === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canAdvance}
            >
              {isLast ? "See My Results" : "Next Pillar"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
