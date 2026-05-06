import { CheckCircle2, Gauge, LineChart, Radar, Workflow } from 'lucide-react';

const metrics = [
  { label: 'Value pools', value: '18', trend: 'prioritized' },
  { label: 'Adoption coverage', value: '86%', trend: 'active users' },
  { label: 'Benefits tracked', value: '$4.8M', trend: 'run rate' },
];

const workflow = [
  ['Strategy', 'Value thesis'],
  ['Design', 'Future workflow'],
  ['Build', 'AI operating system'],
];

const actions = [
  ['Revenue growth system', 'Scaling', 'CEO sponsor'],
  ['Service response redesign', 'Launch', 'COO owner'],
  ['Exception control loop', 'Adopt', 'Ops lead'],
];

export function HeroOperatingScene() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#090A0C]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(9,10,12,0.98)_0%,rgba(9,10,12,0.9)_44%,rgba(35,31,29,0.78)_100%)]" />
      <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(242,239,232,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(242,239,232,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="absolute right-[-18rem] top-[11%] hidden w-[58rem] max-w-[62vw] lg:block">
        <div className="hero-scene-float border border-bone/10 bg-[#151414]/92 shadow-2xl shadow-forge-black/40 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <Radar className="h-5 w-5 text-brass-light" />
              <div>
                <p className="text-sm font-semibold text-bone">AI Transformation Office</p>
                <p className="text-xs text-stone">Benefits realization review</p>
              </div>
            </div>
            <span className="border border-success/25 bg-success/15 px-3 py-1.5 text-xs font-semibold text-[#CDEBE4]">
              Live
            </span>
          </div>

          <div className="grid gap-4 p-6">
            <div className="grid grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="border border-bone/10 bg-bone/[0.04] p-4">
                  <p className="metric text-2xl text-brass-light">{metric.value}</p>
                  <p className="mt-2 text-xs font-semibold text-bone/80">{metric.label}</p>
                  <p className="mt-1 text-[11px] text-[#CDEBE4]">{metric.trend}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="border border-bone/10 bg-forge-black/35 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-brass-light" />
                    <p className="text-sm font-semibold text-bone">Benefits realization</p>
                  </div>
                  <span className="text-xs text-stone">Plan to run rate</span>
                </div>
                <div className="mt-6 flex h-40 items-end gap-3">
                  {[22, 31, 38, 55, 74, 96].map((height, index) => (
                    <div key={height} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex h-32 w-full items-end">
                        <span
                          className="w-full border border-success/20 bg-success/60"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="metric text-[10px] text-stone">
                        {['J', 'F', 'M', 'A', 'M', 'J'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="border border-bone/10 bg-bone/[0.04] p-5">
                  <div className="flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-brass-light" />
                    <p className="text-sm font-semibold text-bone">Transformation path</p>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {workflow.map(([label, detail], index) => (
                      <div key={label} className="grid grid-cols-[2rem_1fr] gap-3">
                        <span className="metric text-xs text-brass-light">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-bone">{label}</p>
                          <p className="text-xs text-stone">{detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-bone/10 bg-forge-black/35 p-5">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-brass-light" />
                    <p className="text-sm font-semibold text-bone">Executive workstream</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {actions.map(([name, stage, owner]) => (
                      <div
                        key={name}
                        className="grid grid-cols-[1fr_auto] gap-3 border-t border-bone/10 pt-3 first:border-t-0 first:pt-0"
                      >
                        <div>
                          <p className="truncate text-xs font-semibold text-bone">{name}</p>
                          <p className="mt-1 text-[11px] text-stone">{owner}</p>
                        </div>
                        <span className="h-fit border border-brass-light/20 bg-brass-light/10 px-2 py-1 text-[11px] font-semibold text-brass-light">
                          {stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-bone/10 pt-5">
              {['Sponsor named', 'Benefits baseline', 'Adoption tracked'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-semibold text-stone"
                >
                  <CheckCircle2 className="h-4 w-4 text-brass-light" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
