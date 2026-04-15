'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  type Answers,
  calculateResults,
  getQuestionsForPillar,
  type PillarKey,
  pillars,
} from '@/lib/scorecard';
import { ProgressBar } from './progress-bar';
import { QuestionCard } from './question-card';

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
        const qs = getQuestionsForPillar(pillar.key);
        return qs.every((q) => answers[q.id] !== undefined);
      })
      .map((p) => p.key),
  );

  const isCurrentComplete = currentQuestions.every((q) => answers[q.id] !== undefined);
  const isLastStep = currentStep === pillars.length - 1;

  const handleAnswer = useCallback((questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const goNext = () => {
    if (currentStep < pillars.length - 1) setCurrentStep((s) => s + 1);
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const results = calculateResults(answers);

    try {
      await fetch('/api/scorecard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, results, source: 'scorecard-form' }),
      });
    } catch {
      // Non-blocking
    }

    sessionStorage.setItem('scorecardResults', JSON.stringify(results));
    sessionStorage.setItem('scorecard-answers', JSON.stringify(answers));
    router.push('/scorecard/results');
  };

  return (
    <div>
      <ProgressBar currentStep={currentStep} completedSteps={completedSteps} />

      {/* key={currentPillar.key} re-mounts this div on step change,
          which re-fires the CSS fade-in animation defined in globals.css */}
      <div key={currentPillar.key} className="space-y-4 animate-fade-in-up">
        {/* Pillar header */}
        <div className="border border-divider bg-warm-white p-5">
          <h3 className="text-h4 text-anthracite">{currentPillar.name}</h3>
          <p className="text-body-sm text-warm-gray mt-1">{currentPillar.description}</p>
        </div>

        {currentQuestions.map((question, i) => (
          <QuestionCard
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={handleAnswer}
            index={i}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8 sm:mt-10 flex items-center justify-between gap-4">
        <Button variant="ghost" onClick={goPrev} disabled={currentStep === 0} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>

        {isLastStep ? (
          <Button onClick={handleSubmit} disabled={!isCurrentComplete || isSubmitting} className="gap-2" size="lg">
            {isSubmitting ? 'Calculating...' : 'See My Results'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={goNext} disabled={!isCurrentComplete} className="gap-2">
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
