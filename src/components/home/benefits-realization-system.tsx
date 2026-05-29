import { CheckCircle2, ShieldCheck, Trophy } from 'lucide-react';
import { benefitsDashboardPanels, benefitsMetrics, benefitsOperatingModel } from '@/data/homepage';
import { homeIcons } from './icon-map';
import { MetricCounter } from './metric-counter';

export function BenefitsRealizationSystem() {
  return (
    <section className="dark-section border-t border-divider-dark py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:items-start lg:gap-16">
          <div>
            <p className="overline">Human + AI Benefits System</p>
            <h2 className="mt-6 text-display text-bone">
              Track the work, the adoption, and the benefit in one cadence.
            </h2>
            <p className="mt-6 text-body-lg text-stone">
              ClearForge designs adoption telemetry around the workflow, not surveillance. Leaders
              see what AI handled, where people reviewed or overrode it, what changed operationally,
              and which teams are turning usage into measurable value.
            </p>
            <div className="mt-8 flex items-start gap-4 border-l border-brass-light pl-5">
              <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-brass-light" />
              <p className="max-w-xl text-body-sm leading-relaxed text-stone">
                Incentives should reward value realized, quality held, customer outcomes, and
                responsible adoption. The wrong metric is raw prompt volume or tool logins.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#0A0B0D]">
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(242,239,232,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(242,239,232,0.18)_1px,transparent_1px)] [background-size:44px_44px]" />
            <div className="relative flex items-center justify-between border-y border-bone/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-brass-light" />
                <div>
                  <p className="text-sm font-semibold text-bone">Benefits realization ledger</p>
                  <p className="text-xs text-stone">Monthly value and adoption review</p>
                </div>
              </div>
              <span className="hidden border-l border-success/40 pl-3 text-xs text-stone sm:inline-flex">
                Role-level, not keystroke-level
              </span>
            </div>

            <div className="relative grid border-b border-bone/10 lg:grid-cols-3">
              {benefitsDashboardPanels.map((panel) => {
                const Icon = homeIcons[panel.icon];
                return (
                  <div
                    key={panel.title}
                    className="border-b border-bone/10 p-5 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-brass-light" />
                      <p className="text-sm font-semibold text-bone">{panel.title}</p>
                    </div>
                    <div className="mt-5 space-y-3">
                      {panel.rows.map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between gap-4 border-t border-bone/10 pt-3 first:border-t-0 first:pt-0"
                        >
                          <p className="text-xs text-stone">{label}</p>
                          <p className="metric text-sm text-brass-light">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative grid md:grid-cols-4">
              {benefitsOperatingModel.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-bone/10 p-5 md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <h3 className="mt-4 text-h4 text-bone">{item.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-stone">{item.detail}</p>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-light">
                    {item.signal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-bone/10 pt-10 md:grid-cols-4">
          {benefitsMetrics.map((metric) => (
            <div key={metric.label}>
              <MetricCounter value={metric.value} className="metric text-3xl text-brass-light" />
              <p className="mt-3 text-body-sm leading-relaxed text-stone">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
