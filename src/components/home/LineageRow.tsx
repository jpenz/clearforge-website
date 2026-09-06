import { PageFrame } from '@/components/ui/PageFrame';

/**
 * Lineage band: where the founder comes from, and how we build. Research
 * verdict 2026-08-20: elite firms signal named verifiable practices, not
 * tool inventories (a raw tools list fails the "can nobody else say it"
 * test). Every practice here is factual: evals are a named Sprint
 * deliverable and adoption is the metric every build is graded on. The 70
 * percent target is stated once, on the adoption plate, so this band does
 * not restate it two screens early. The stack stays as a quiet supporting line. Named tools
 * are the ones a mid-market buyer recognizes; specialized research tooling
 * is described by capability rather than brand (2026-08-26 owner call,
 * after a public-footprint check). The strip names one founder, so its
 * label says so; the firm names sit at ink/70 (AA at 19px semibold).
 */
const TEAM_FROM = ['Bain & Company', 'EY', 'Capgemini'];
const PRACTICES = [
  'Evals ship with every sprint',
  'Adoption is the metric we are graded on',
  'The deliverable is a running system, not a report',
];
const STACK_LINE =
  'Built with Claude by Anthropic, n8n, Supabase, Microsoft, and Vercel, plus specialized research agents.';

function Wordmark({ name }: { name: string }) {
  return (
    <span className="text-[17px] font-semibold tracking-[-0.01em] whitespace-nowrap text-ink/70 transition-colors hover:text-ink md:text-[19px]">
      {name}
    </span>
  );
}

export function LineageRow() {
  return (
    <PageFrame aria-label="Founder lineage and practices">
      <div className="grid md:grid-cols-2">
        <div className="cf-dots border-b border-hairline px-5 py-6 md:border-r md:border-b-0 md:px-10 md:py-7">
          <p className="text-[12px] tracking-[0.16em] text-ink/70 uppercase">
            The founder comes from
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {TEAM_FROM.map((name) => (
              <Wordmark key={name} name={name} />
            ))}
          </div>
        </div>
        <div className="cf-dots px-5 py-6 md:px-10 md:py-7">
          <p className="text-[12px] tracking-[0.16em] text-ink/70 uppercase">How we build</p>
          <ul className="mt-4 space-y-2">
            {PRACTICES.map((practice) => (
              <li
                key={practice}
                className="tnum flex items-baseline gap-3 text-[15px] font-medium text-ink/70 md:text-[16px]"
              >
                <span
                  aria-hidden="true"
                  className="inline-block size-[6px] shrink-0 translate-y-[-1px] bg-cobalt"
                />
                {practice}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-[68ch] text-[12px] leading-relaxed text-ink/60">{STACK_LINE}</p>
        </div>
      </div>
    </PageFrame>
  );
}
