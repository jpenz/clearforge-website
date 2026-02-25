"use client";

import { pillars, type PillarKey } from "@/lib/scorecard";
import { cn } from "@/lib/utils";

interface ProgressBarProps { currentStep: number; completedSteps: Set<PillarKey> }

export function ProgressBar({ currentStep, completedSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / pillars.length) * 100;
  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center justify-between">
        {pillars.map((pillar, i) => (
          <div key={pillar.key} className={cn("flex items-center gap-1.5 text-xs font-medium transition-colors", i === currentStep ? "text-amber" : completedSteps.has(pillar.key) ? "text-text" : "text-text-secondary")}>
            <div className={cn("metric-display flex h-6 w-6 items-center justify-center text-xs font-bold transition-all", i === currentStep ? "bg-amber text-white" : completedSteps.has(pillar.key) ? "bg-navy text-white" : "bg-border text-text-secondary")}>
              {completedSteps.has(pillar.key) ? "\u2713" : i + 1}
            </div>
            <span className="hidden lg:inline">{pillar.name}</span>
          </div>
        ))}
      </div>
      <div role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} className="h-1 w-full overflow-hidden bg-border">
        <div className="h-full bg-amber transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-sm text-text-secondary"><span className="font-medium text-text">{pillars[currentStep].name}</span> <span className="hidden sm:inline">&mdash; {pillars[currentStep].description}</span></p>
        <p className="metric-display shrink-0 text-xs text-text-secondary">{currentStep + 1} / {pillars.length}</p>
      </div>
    </div>
  );
}
