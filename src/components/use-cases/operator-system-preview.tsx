import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  type LucideIcon,
  Radar,
  Target,
  UserCheck,
  Zap,
} from 'lucide-react';
import type { OperatorTone, UseCase } from '@/data/use-cases';
import { cn } from '@/lib/utils';

const toneStyles: Record<
  OperatorTone,
  {
    badge: string;
    dot: string;
    line: string;
    panel: string;
  }
> = {
  emerald: {
    badge: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-200',
    dot: 'bg-emerald-300',
    line: 'bg-emerald-300',
    panel: 'border-emerald-300/20 bg-emerald-400/10',
  },
  blue: {
    badge: 'border-sky-300/25 bg-sky-400/10 text-sky-200',
    dot: 'bg-sky-300',
    line: 'bg-sky-300',
    panel: 'border-sky-300/20 bg-sky-400/10',
  },
  amber: {
    badge: 'border-amber-300/25 bg-amber-300/10 text-amber-200',
    dot: 'bg-amber-300',
    line: 'bg-amber-300',
    panel: 'border-amber-300/20 bg-amber-300/10',
  },
  red: {
    badge: 'border-rose-300/25 bg-rose-400/10 text-rose-200',
    dot: 'bg-rose-300',
    line: 'bg-rose-300',
    panel: 'border-rose-300/20 bg-rose-400/10',
  },
  slate: {
    badge: 'border-bone/15 bg-bone/5 text-stone',
    dot: 'bg-stone',
    line: 'bg-bone/25',
    panel: 'border-bone/10 bg-bone/5',
  },
};

const autonomyIcons: Record<UseCase['operatorView']['autonomy'][number]['label'], LucideIcon> = {
  Auto: Zap,
  'AI Draft': Bot,
  'Human Led': UserCheck,
};

function MiniMetric({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <div className="border border-bone/10 bg-bone/5 p-4">
      <p className="metric text-2xl text-brass-light">{value}</p>
      <p className="mt-2 text-sm font-semibold text-bone">{label}</p>
      <p className="mt-2 text-xs leading-relaxed text-stone">{detail}</p>
    </div>
  );
}

function AutonomyRow({ label, detail, tone }: UseCase['operatorView']['autonomy'][number]) {
  const Icon = autonomyIcons[label];

  return (
    <div className={cn('border p-4', toneStyles[tone].panel)}>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            toneStyles[tone].badge,
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <p className="text-sm font-semibold text-bone">{label}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-stone">{detail}</p>
    </div>
  );
}

function StagePill({
  label,
  count,
  tone,
  maxCount,
}: UseCase['operatorView']['stages'][number] & { maxCount: number }) {
  const numericCount = Number.parseInt(count.replace(/\D/g, ''), 10);
  const progress = Number.isFinite(numericCount)
    ? Math.min(100, Math.max(14, Math.round((numericCount / maxCount) * 100)))
    : 48;

  return (
    <div className={cn('border px-3 py-3', toneStyles[tone].badge)}>
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-xs font-semibold">{label}</span>
        <span className="metric text-xs">{count}</span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-bone/10">
        <div
          className={cn('h-full rounded-full', toneStyles[tone].line)}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function OpportunityRow({
  opportunity,
}: {
  opportunity: UseCase['operatorView']['opportunities'][number];
}) {
  return (
    <div className="grid gap-4 border-t border-bone/10 px-4 py-4 md:grid-cols-12 md:items-center">
      <div className="min-w-0 md:col-span-4">
        <div className="flex items-start gap-3">
          <span
            className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', toneStyles[opportunity.tone].dot)}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-snug text-bone">{opportunity.name}</p>
            <p className="mt-1 text-xs text-stone">{opportunity.owner}</p>
          </div>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-stone md:col-span-3">{opportunity.trigger}</p>
      <div className="flex flex-wrap items-center gap-2 md:col-span-2">
        <span
          className={cn(
            'border px-2 py-1 text-xs font-semibold',
            toneStyles[opportunity.tone].badge,
          )}
        >
          {opportunity.stage}
        </span>
        <span className="metric rounded-full bg-bone/10 px-2 py-1 text-xs text-bone">
          {opportunity.score}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-bone/80 md:col-span-3 md:pl-3">
        {opportunity.action}
      </p>
    </div>
  );
}

export function OperatorSystemPreview({
  useCase,
  className,
}: {
  useCase: UseCase;
  className?: string;
}) {
  const view = useCase.operatorView;
  const maxStageCount = Math.max(
    ...view.stages.map((stage) => Number.parseInt(stage.count.replace(/\D/g, ''), 10) || 1),
  );

  return (
    <section
      className={cn(
        'dark-section noise-texture border-t border-divider-dark py-24 lg:py-40',
        className,
      )}
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:items-start">
          <div>
            <p className="overline">{view.eyebrow}</p>
            <h2 className="mt-6 text-display text-bone">{view.headline}</h2>
            <p className="mt-6 text-body-lg text-stone">{view.body}</p>

            <div className="mt-8 grid gap-3">
              {view.autonomy.map((item) => (
                <AutonomyRow key={item.label} {...item} />
              ))}
            </div>
          </div>

          <div className="overflow-hidden border border-bone/10 bg-[#0D1425] shadow-2xl shadow-forge-black/40">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bone/10 bg-forge-black/70 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-bone">{view.productLabel}</p>
                  <p className="text-xs text-stone">{view.rhythm}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 border border-bone/10 bg-bone/5 px-3 py-2 text-xs text-stone">
                <Radar className="h-3.5 w-3.5 text-brass-light" />
                Live signal review
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-7">
              <div className="grid gap-3 sm:grid-cols-3">
                {view.kpis.map((metric) => (
                  <MiniMetric key={metric.label} {...metric} />
                ))}
              </div>

              <div className="mt-6 grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
                <div className="min-w-0 border border-bone/10 bg-forge-black/35">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bone/10 px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-brass-light" />
                      <p className="text-sm font-semibold text-bone">Pipeline Control</p>
                    </div>
                    <span className="text-xs text-stone">
                      Scored by urgency, fit, and actionability
                    </span>
                  </div>

                  <div className="grid gap-2 p-4 sm:grid-cols-3">
                    {view.stages.map((stage) => (
                      <StagePill key={stage.label} {...stage} maxCount={maxStageCount} />
                    ))}
                  </div>

                  <div className="border-t border-bone/10">
                    <div className="hidden grid-cols-12 gap-4 px-4 py-3 text-[11px] font-semibold uppercase text-stone md:grid">
                      <span className="md:col-span-4">Priority Work</span>
                      <span className="md:col-span-3">Trigger</span>
                      <span className="md:col-span-2">Stage</span>
                      <span className="md:col-span-3">Next Action</span>
                    </div>
                    {view.opportunities.map((opportunity) => (
                      <OpportunityRow key={opportunity.name} opportunity={opportunity} />
                    ))}
                  </div>
                </div>

                <div className="grid gap-5">
                  <div className="border border-bone/10 bg-bone/5 p-4">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4 text-brass-light" />
                      <p className="text-sm font-semibold text-bone">Action Plan</p>
                    </div>
                    <div className="mt-4 space-y-3">
                      {view.actionPlan.map((item) => (
                        <div key={item.phase} className="grid grid-cols-[4.5rem_1fr] gap-3">
                          <p className="metric text-xs text-brass-light">{item.phase}</p>
                          <p className="text-xs leading-relaxed text-stone">{item.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-amber-300/20 bg-amber-300/10 p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-200" />
                      <p className="text-sm font-semibold text-bone">Intelligence Gaps</p>
                    </div>
                    <div className="mt-4 space-y-3">
                      {view.intelligenceGaps.map((gap) => (
                        <div key={gap} className="flex gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200" />
                          <p className="text-xs leading-relaxed text-stone">{gap}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-bone/10 bg-forge-black/35 p-4">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4 text-brass-light" />
                      <p className="text-sm font-semibold text-bone">Feedback Loop</p>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {view.feedbackLoop.map((item, index) => (
                        <div key={item.label} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-bone/10 bg-bone/5">
                              {index === view.feedbackLoop.length - 1 ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-brass-light" />
                              ) : (
                                <Target className="h-3.5 w-3.5 text-stone" />
                              )}
                            </span>
                            {index < view.feedbackLoop.length - 1 ? (
                              <span className="h-6 w-px bg-bone/10" />
                            ) : null}
                          </div>
                          <div className="pb-3">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-bone">{item.label}</p>
                              {index < view.feedbackLoop.length - 1 ? (
                                <ArrowRight className="h-3.5 w-3.5 text-stone" />
                              ) : null}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-stone">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
