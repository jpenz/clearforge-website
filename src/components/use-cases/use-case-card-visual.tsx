import { BarChart3, CheckCircle2, Gauge, Radar, TrendingUp } from 'lucide-react';
import type { OperatorTone, UseCase } from '@/data/use-cases';
import { cn } from '@/lib/utils';

const toneStyles: Record<OperatorTone, { dot: string; bar: string; badge: string }> = {
  emerald: {
    dot: 'bg-emerald-300',
    bar: 'bg-emerald-300',
    badge: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100',
  },
  blue: {
    dot: 'bg-sky-300',
    bar: 'bg-sky-300',
    badge: 'border-sky-300/25 bg-sky-300/10 text-sky-100',
  },
  amber: {
    dot: 'bg-amber-300',
    bar: 'bg-amber-300',
    badge: 'border-amber-300/25 bg-amber-300/10 text-amber-100',
  },
  red: {
    dot: 'bg-rose-300',
    bar: 'bg-rose-300',
    badge: 'border-rose-300/25 bg-rose-300/10 text-rose-100',
  },
  slate: {
    dot: 'bg-stone',
    bar: 'bg-stone/70',
    badge: 'border-bone/15 bg-bone/5 text-stone',
  },
};

function parseCount(count: string) {
  return Number.parseInt(count.replace(/\D/g, ''), 10) || 1;
}

function TrendSparkline({ useCase }: { useCase: UseCase }) {
  const leadVolume = useCase.operatorView.analytics?.leadVolume;
  const values = leadVolume
    ? leadVolume.map((item) => item.found)
    : useCase.operatorView.stages.slice(0, 5).map((stage) => parseCount(stage.count));
  const maxValue = Math.max(...values, 1);
  const width = 120;
  const height = 36;
  const pointValues = values.map((value, index) => {
    const x = values.length === 1 ? width : (index / (values.length - 1)) * width;
    const y = height - 4 - (value / maxValue) * 26;

    return {
      key: `${index}-${value}`,
      x: x.toFixed(1),
      y: y.toFixed(1),
    };
  });
  const points = pointValues.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <svg
      aria-hidden="true"
      className="h-9 w-full overflow-visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <path d="M0 32 H120" stroke="rgba(234,234,242,0.12)" strokeWidth="1" />
      <path d="M0 20 H120" stroke="rgba(234,234,242,0.08)" strokeWidth="1" />
      <polyline
        fill="none"
        points={points}
        stroke="#34d399"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      {pointValues.map((point) => (
        <circle key={point.key} cx={point.x} cy={point.y} r="2.1" fill="#34d399" stroke="#0b1220" />
      ))}
    </svg>
  );
}
export function UseCaseCardVisual({ useCase }: { useCase: UseCase }) {
  const view = useCase.operatorView;
  const primaryKpis = view.kpis.slice(0, 3);
  const stages = view.stages.slice(0, 3);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b1220] text-bone transition-transform duration-700 group-hover:scale-[1.025]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(52,211,153,0.18),transparent_34%,rgba(199,166,106,0.12)_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(234,234,242,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(234,234,242,0.18)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative flex h-full flex-col p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Radar className="h-3.5 w-3.5 text-brass-light" />
              <p className="truncate text-[11px] font-semibold uppercase leading-none tracking-normal text-brass-light">
                {view.productLabel}
              </p>
            </div>
            <p className="mt-1 truncate text-[11px] text-stone">{view.rhythm}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 border border-bone/10 bg-bone/5 px-2 py-1 text-[10px] text-stone">
            <CheckCircle2 className="h-3 w-3 text-brass-light" />
            Owner view
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {primaryKpis.map((kpi) => (
            <div key={kpi.label} className="border border-bone/10 bg-forge-black/35 p-2">
              <p className="metric text-lg leading-none text-brass-light">{kpi.value}</p>
              <p className="mt-1 truncate text-[10px] font-semibold text-bone/85">{kpi.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid h-20 min-h-0 grid-cols-[1.08fr_0.92fr] gap-3">
          <div className="min-w-0 border border-bone/10 bg-forge-black/35 p-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5 text-brass-light" />
                <p className="text-[11px] font-semibold text-bone">Signal trend</p>
              </div>
              <TrendingUp className="h-3.5 w-3.5 text-brass-light" />
            </div>
            <div className="mt-2">
              <TrendSparkline useCase={useCase} />
            </div>
          </div>

          <div className="min-w-0 border border-bone/10 bg-forge-black/35 p-2">
            <div className="flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-brass-light" />
              <p className="text-[11px] font-semibold text-bone">Control points</p>
            </div>
            <div className="mt-2 space-y-1.5">
              {stages.map((stage) => (
                <div key={stage.label} className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={cn(
                        'h-1.5 w-1.5 shrink-0 rounded-full',
                        toneStyles[stage.tone].dot,
                      )}
                    />
                    <p className="truncate text-[10px] text-stone">{stage.label}</p>
                  </div>
                  <span
                    className={cn(
                      'metric shrink-0 border px-1.5 py-0.5 text-[10px]',
                      toneStyles[stage.tone].badge,
                    )}
                  >
                    {stage.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
