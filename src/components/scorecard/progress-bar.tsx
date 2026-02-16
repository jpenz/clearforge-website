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
          <div key={pillar.key} className={cn("flex items-center gap-1.5 text-xs font-medium transition-colors", i === currentStep ? "text-brass" : completedSteps.has(pillar.key) ? "text-midnight" : "text-stone")}>
            <div className={cn("metric-display flex h-6 w-6 items-center justify-center text-xs font-bold transition-all", i === currentStep ? "bg-brass text-white" : completedSteps.has(pillar.key) ? "bg-midnight text-white" : "bg-fog text-stone")}>
              {completedSteps.has(pillar.key) ? "\u2713" : i + 1}
            </div>
            <span className="hidden lg:inline">{pillar.name}</span>
          </div>
        ))}
      </div>
      <div role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} className="h-1 w-full overflow-hidden bg-fog">
        <div className="h-full bg-brass transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-sm text-stone"><span className="font-medium text-midnight">{pillars[currentStep].name}</span> <span className="hidden sm:inline">&mdash; {pillars[currentStep].description}</span></p>
        <p className="metric-display shrink-0 text-xs text-stone">{currentStep + 1} / {pillars.length}</p>
      </div>
    </div>
  );
}
