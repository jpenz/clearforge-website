import { ArrowDownRight, CheckCircle2, Gauge, Route, Workflow } from 'lucide-react';

const valueEquation = [
  {
    label: 'Growth spot',
    detail: 'Where demand, service, speed, quality, or margin can move.',
  },
  {
    label: 'Future work',
    detail: 'The redesigned decisions, handoffs, controls, and owner rhythm.',
  },
  {
    label: 'AI system',
    detail: 'Agents, automations, dashboards, integrations, and exception rules.',
  },
  {
    label: 'Adoption cadence',
    detail: 'Human review, coaching, governance, and incentive alignment.',
  },
] as const;

const ledgerRows = [
  ['Revenue', 'Buying events found', '+38%', 'Weekly'],
  ['Service', 'First response variance', '-31%', 'Daily'],
  ['Operations', 'Manual cycle load', '-42%', 'Weekly'],
  ['Quality', 'Repeat exceptions closed', '96%', 'Monthly'],
  ['Margin', 'Run-rate benefit verified', '$4.8M', 'Monthly'],
] as const;

const operatingChecks = [
  { label: 'Workflow owner', icon: Workflow },
  { label: 'Adoption telemetry', icon: Gauge },
  { label: 'Benefit review', icon: CheckCircle2 },
] as const;

export function ValueOperatingSystem() {
  return (
    <section className="dark-section border-y border-divider-dark py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            <p className="overline">The ClearForge Pattern</p>
            <h2 className="mt-6 text-display text-bone">
              Find the constraint. Rebuild the work. Instrument the benefit.
            </h2>
            <p className="mt-6 max-w-xl text-body-lg text-stone">
              Generic AI programs stall because they never become a new way to run the business.
              ClearForge builds the operating system around AI: where value is found, how people
              work, what the system handles, and what leadership can measure.
            </p>
          </div>

          <div className="relative">
            <div className="grid border-y border-bone/10 lg:grid-cols-4">
              {valueEquation.map((item, index) => (
                <div
                  key={item.label}
                  className="relative border-b border-bone/10 py-6 last:border-b-0 lg:border-b-0 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <p className="metric text-xs text-brass-light">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-5 text-h4 text-bone">{item.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{item.detail}</p>
                  {index < valueEquation.length - 1 ? (
                    <ArrowDownRight className="absolute right-4 top-6 hidden h-4 w-4 text-brass-light lg:block" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.46fr_0.54fr] lg:items-start">
              <div className="border-l border-brass pl-5">
                <div className="flex items-center gap-3">
                  <Route className="h-5 w-5 text-brass-light" />
                  <p className="text-sm font-semibold text-bone">Operating edge, not a demo</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-stone">
                  Every first build has to change a real workflow and leave behind a management
                  surface leaders can run.
                </p>
                <div className="mt-6 grid gap-3">
                  {operatingChecks.map(({ label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-3 text-sm text-bone">
                      <Icon className="h-4 w-4 text-success" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-y border-bone/10">
                <div className="grid grid-cols-[0.9fr_1.2fr_0.7fr_0.7fr] gap-3 border-b border-bone/10 py-3 text-[10px] font-semibold uppercase text-stone">
                  <span>Value pool</span>
                  <span>Signal</span>
                  <span>Move</span>
                  <span>Cadence</span>
                </div>
                {ledgerRows.map(([pool, signal, move, cadence]) => (
                  <div
                    key={pool}
                    className="grid grid-cols-[0.9fr_1.2fr_0.7fr_0.7fr] gap-3 border-b border-bone/10 py-4 last:border-b-0"
                  >
                    <span className="text-sm font-semibold text-bone">{pool}</span>
                    <span className="text-sm text-stone">{signal}</span>
                    <span className="metric text-sm text-brass-light">{move}</span>
                    <span className="text-xs text-stone">{cadence}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
