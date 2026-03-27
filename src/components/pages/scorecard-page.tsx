'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  type Answers,
  getQuestionsForPillar,
  pillars,
  questions,
  scaleLabels,
} from '@/lib/scorecard';

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
      sessionStorage.setItem('scorecard-answers', JSON.stringify(answers));
      router.push('/scorecard/results');
    } else {
      setCurrentPillar((prev) => prev + 1);
    }
  }

  function handleBack() {
    if (currentPillar > 0) setCurrentPillar((prev) => prev - 1);
  }

  return (
    <>
      <section className="bg-bg-deep pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">AI Maturity Scorecard</span>
            <h1
              className="mt-4 text-3xl text-text-primary sm:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              How ready is your business for AI agents?
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              20 questions across 5 pillars. Takes about 5 minutes. Get your AI maturity score,
              pillar breakdown, and a personalized roadmap.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-medium text-text-secondary">{pillar.name}</span>
              <span className="metric text-sm">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
            <div className="h-1 bg-border-subtle overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-1 mt-3">
              {pillars.map((p, i) => (
                <button
                  key={p.key}
                  onClick={() => setCurrentPillar(i)}
                  className={`flex-1 h-1.5 transition-colors ${
                    i === currentPillar
                      ? 'bg-accent'
                      : i < currentPillar
                        ? 'bg-accent/40'
                        : 'bg-border-subtle'
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
              <div className="border border-border-subtle bg-bg-surface p-4">
                <h3
                  className="text-sm font-bold text-text-primary"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {pillar.name}
                </h3>
                <p className="text-base text-text-muted mt-1">{pillar.description}</p>
              </div>

              {pillarQuestions.map((q) => (
                <div key={q.id} className="border border-border-subtle bg-bg-primary p-6">
                  <p className="text-base font-medium text-text-secondary mb-4">{q.text}</p>
                  <div className="flex gap-2">
                    {scaleLabels.map((label, idx) => {
                      const value = idx + 1;
                      const isSelected = answers[q.id] === value;
                      return (
                        <button
                          key={value}
                          onClick={() => handleAnswer(q.id, value)}
                          className={`flex-1 border px-2 py-2.5 text-xs font-medium transition-all ${
                            isSelected
                              ? 'border-accent bg-accent text-white'
                              : 'border-border-subtle text-text-muted hover:border-accent hover:text-accent'
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
            <Button variant="ghost" onClick={handleBack} disabled={currentPillar === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext} disabled={!canAdvance}>
              {isLast ? 'See My Results' : 'Next Pillar'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
