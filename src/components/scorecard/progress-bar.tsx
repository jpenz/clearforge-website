'use client';

import { type PillarKey, pillars } from '@/lib/scorecard';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  completedSteps: Set<PillarKey>;
}

export function ProgressBar({ currentStep, completedSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / pillars.length) * 100;

  return (
    <div className="mb-10">
      {/* Step indicators */}
      <div className="mb-3 flex items-center justify-between">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.key}
            className={cn(
              'flex items-center gap-1 sm:gap-1.5 text-xs font-medium transition-colors',
              i === currentStep
                ? 'text-brass'
                : completedSteps.has(pillar.key)
                  ? 'text-anthracite'
                  : 'text-warm-gray',
            )}
          >
            <div
              className={cn(
                'flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center text-[10px] sm:text-xs font-bold transition-all shrink-0',
                i === currentStep
                  ? 'bg-brass text-white'
                  : completedSteps.has(pillar.key)
                    ? 'bg-anthracite text-white'
                    : 'bg-divider text-warm-gray',
              )}
            >
              {completedSteps.has(pillar.key) ? '✓' : i + 1}
            </div>
            <span className="hidden lg:inline">{pillar.name}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1 w-full overflow-hidden bg-divider"
      >
        <div
          className="h-full bg-brass transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Current pillar info */}
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-body-sm text-warm-gray">
          <span className="font-medium text-anthracite">{pillars[currentStep].name}</span>
          <span className="hidden sm:inline"> — {pillars[currentStep].description}</span>
        </p>
        <p className="metric text-xs text-brass shrink-0">
          {currentStep + 1} / {pillars.length}
        </p>
      </div>
    </div>
  );
}
