import { CheckCircle2, Database, Gauge, LineChart, Route, Workflow } from 'lucide-react';

const operatingLayers = [
  { label: 'Value chain', detail: 'Where money, time, quality, or service is leaking' },
  { label: 'Workflow', detail: 'The exact handoffs, decisions, systems, and exceptions' },
  { label: 'Control loop', detail: 'Owner view, thresholds, reviews, and improvement backlog' },
];

const advantageMetrics = [
  { label: 'Growth', value: 'Lead signal' },
  { label: 'Speed', value: 'Cycle time' },
  { label: 'Quality', value: 'Exception rate' },
  { label: 'Service', value: 'Response time' },
  { label: 'Margin', value: 'Manual load' },
];

const buildPath = [
  { icon: Route, label: 'Find', detail: 'Pick the highest-value constraint.' },
  { icon: Workflow, label: 'Build', detail: 'Fit AI into the real workflow.' },
  { icon: Gauge, label: 'Run', detail: 'Measure adoption, quality, and value.' },
];

export function OperatingChangeMap() {
  return (
    <div className="border border-divider bg-warm-white shadow-sm">
      <div className="grid border-b border-divider lg:grid-cols-[1fr_0.9fr]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="overline text-[10px]">Operating Map</p>
              <h3 className="mt-2 text-h3">One workflow becomes a managed system.</h3>
            </div>
            <div className="hidden h-14 w-14 place-items-center rounded-full border border-brass/30 bg-brass/10 text-brass sm:grid">
              <LineChart className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            {operatingLayers.map((layer, index) => (
              <div
                key={layer.label}
                className="grid grid-cols-[2rem_1fr] gap-4 border border-divider bg-parchment/70 p-4"
              >
                <span className="metric text-sm text-brass">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-semibold text-anthracite">{layer.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-warm-gray">{layer.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-divider bg-anthracite p-6 text-bone sm:p-8 lg:border-t-0 lg:border-l">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-brass-light" />
            <p className="overline text-[10px] text-stone">Owner View</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {advantageMetrics.map((metric) => (
              <div key={metric.label} className="border border-white/10 bg-white/[0.04] p-4">
                <p className="metric text-sm text-brass-light">{metric.label}</p>
                <p className="mt-2 text-sm text-stone">{metric.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border border-brass/30 bg-brass/10 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass-light" />
              <p className="text-sm leading-relaxed text-bone">
                The team sees what changed, what needs review, and what gets improved next.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3">
        {buildPath.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="border-b border-divider p-5 lg:border-r lg:last:border-r-0"
            >
              <Icon className="h-5 w-5 text-brass" />
              <p className="mt-4 metric text-sm text-brass">{step.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-warm-gray">{step.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
