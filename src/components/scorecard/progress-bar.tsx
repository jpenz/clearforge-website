"use client";

import { pillars, type PillarKey } from "@/lib/scorecard";
import { cn } from "@/lib/utils";

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
              "flex items-center gap-1.5 text-xs font-medium transition-colors",
              i === currentStep
                ? "text-blue"
                : completedSteps.has(pillar.key)
                  ? "text-emerald"
                  : "text-text-muted"
            )}
          >
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all",
                i === currentStep
                  ? "bg-blue text-white"
                  : completedSteps.has(pillar.key)
                    ? "bg-emerald text-white"
                    : "bg-bg-elevated text-text-muted"
              )}
            >
              {completedSteps.has(pillar.key) ? "✓" : i + 1}
            </div>
            <span className="hidden lg:inline">{pillar.name}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
        <div
          className="h-full rounded-full bg-blue transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Current pillar info */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">
            {pillars[currentStep].name}
          </span>{" "}
          — {pillars[currentStep].description}
        </p>
        <p className="text-xs text-text-muted">
          Step {currentStep + 1} of {pillars.length}
        </p>
      </div>
    </div>
  );
}
