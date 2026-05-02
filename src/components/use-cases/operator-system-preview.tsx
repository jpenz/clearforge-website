import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  type LucideIcon,
  Radar,
  Target,
  TrendingUp,
  UserCheck,
  Users,
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

function LeadVolumeChart({
  data,
}: {
  data: NonNullable<UseCase['operatorView']['analytics']>['leadVolume'];
}) {
  const maxFound = Math.max(...data.map((item) => item.found), 1);

  return (
    <div className="border border-bone/10 bg-bone/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-brass-light" />
          <p className="text-sm font-semibold text-bone">Lead Volume</p>
        </div>
        <span className="flex items-center gap-1 text-xs text-brass-light">
          <TrendingUp className="h-3.5 w-3.5" />
          MoM signal growth
        </span>
      </div>
      <div className="mt-5 flex h-36 items-end gap-3">
        {data.map((item) => {
          const foundHeight = Math.max(18, Math.round((item.found / maxFound) * 100));
          const validatedHeight = Math.max(12, Math.round((item.validated / maxFound) * 100));
          const qualifiedHeight = Math.max(8, Math.round((item.qualified / maxFound) * 100));

          return (
            <div key={item.month} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="flex h-28 w-full items-end justify-center gap-1.5">
                <span
                  className="w-3 rounded-t-sm bg-stone/35"
                  style={{ height: `${foundHeight}%` }}
                  title={`${item.found} leads found`}
                />
                <span
                  className="w-3 rounded-t-sm bg-sky-300"
                  style={{ height: `${validatedHeight}%` }}
                  title={`${item.validated} validated`}
                />
                <span
                  className="w-3 rounded-t-sm bg-emerald-300"
                  style={{ height: `${qualifiedHeight}%` }}
                  title={`${item.qualified} qualified`}
                />
              </div>
              <div className="text-center">
                <p className="metric text-xs text-bone">{item.month}</p>
                <p className="metric text-[11px] text-stone">{item.found}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-stone">
        {[
          ['Found', 'bg-stone/35'],
          ['Validated', 'bg-sky-300'],
          ['Qualified', 'bg-emerald-300'],
        ].map(([label, swatch]) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={cn('h-2 w-2 rounded-full', swatch)} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function TeamPerformancePanel({
  data,
}: {
  data: NonNullable<UseCase['operatorView']['analytics']>['teamPerformance'];
}) {
  return (
    <div className="border border-bone/10 bg-forge-black/35 p-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-brass-light" />
        <p className="text-sm font-semibold text-bone">Team Performance</p>
      </div>
      <div className="mt-4 space-y-4">
        {data.map((member) => (
          <div
            key={member.member}
            className="border-t border-bone/10 pt-4 first:border-t-0 first:pt-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-bone">{member.member}</p>
                <p className="text-xs text-stone">{member.territory}</p>
              </div>
              <span className="metric rounded-full bg-bone/10 px-2 py-1 text-xs text-brass-light">
                {member.score}
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bone/10">
              <div
                className="h-full rounded-full bg-brass-light"
                style={{ width: `${member.score}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-[11px]">
              <div>
                <p className="metric text-bone">{member.opportunities}</p>
                <p className="text-stone">Opps</p>
              </div>
              <div>
                <p className="metric text-bone">{member.stageMovement}</p>
                <p className="text-stone">Moved</p>
              </div>
              <div>
                <p className="metric text-bone">{member.firstContact}</p>
                <p className="text-stone">Contact</p>
              </div>
              <div>
                <p className="metric text-bone">{member.feedback}</p>
                <p className="text-stone">Feedback</p>
              </div>
            </div>
          </div>
        ))}
      </div>
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

              {view.analytics ? (
                <div className="mt-6 grid items-start gap-5 xl:grid-cols-[1.12fr_0.88fr]">
                  <LeadVolumeChart data={view.analytics.leadVolume} />
                  <TeamPerformancePanel data={view.analytics.teamPerformance} />
                </div>
              ) : null}

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
