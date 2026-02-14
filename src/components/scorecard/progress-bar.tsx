"use client";

import { pillars, type PillarKey } from "@/lib/scorecard";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  completedSteps: Set<PillarKey>;
}

export function ProgressBar({ currentStep, completedSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / pillars.length) * 100;

  // Heat gradient: cool blue → warm amber → hot
  const getHeatColor = (pct: number) => {
    if (pct <= 33) return "from-signal-blue to-signal-blue";
    if (pct <= 66) return "from-signal-blue via-molten-amber to-molten-amber";
    return "from-signal-blue via-molten-amber to-red-500";
  };

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
                ? "text-molten-amber"
                : completedSteps.has(pillar.key)
                  ? "text-forge-navy"
                  : "text-text-muted"
            )}
          >
            <div
              className={cn(
                "metric-display flex h-6 w-6 items-center justify-center text-xs font-bold transition-all",
                i === currentStep
                  ? "bg-molten-amber text-forge-navy"
                  : completedSteps.has(pillar.key)
                    ? "bg-forge-navy text-warm-white"
                    : "bg-bg-elevated text-text-muted"
              )}
            >
              {completedSteps.has(pillar.key) ? "\u2713" : i + 1}
            </div>
            <span className="hidden lg:inline">{pillar.name}</span>
          </div>
        ))}
      </div>

      {/* Heat-gradient progress bar */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Assessment progress: ${currentStep + 1} of ${pillars.length} pillars`}
        className="h-1.5 w-full overflow-hidden bg-bg-elevated"
      >
        <div
          className={cn("h-full bg-gradient-to-r transition-all duration-500", getHeatColor(progress))}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Current pillar info */}
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-sm text-text-secondary">
          <span className="font-medium text-forge-navy">
            {pillars[currentStep].name}
          </span>{" "}
          <span className="hidden sm:inline">&mdash; {pillars[currentStep].description}</span>
        </p>
        <p className="metric-display shrink-0 text-xs text-text-muted">
          {currentStep + 1} / {pillars.length}
        </p>
      </div>
    </div>
  );
}
