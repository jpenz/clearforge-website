import { PageFrame } from "@/components/ui/PageFrame";

/**
 * Proof band: where the team comes from, and how we build. Research
 * verdict 2026-08-20: elite firms signal named verifiable practices, not
 * tool inventories (a raw tools list fails the "can nobody else say it"
 * test). Every practice here is factual: evals are a named Sprint
 * deliverable, 70% weekly-active is the adoption bar we build to, and the
 * stack-trends-weekly task re-tests the stack every Tuesday. The stack
 * stays as a quiet supporting line; updates arrive as PRs from that task.
 */
const TEAM_FROM = ["Bain & Company", "EY", "Capgemini"];
const PRACTICES = [
  "Evals ship with every sprint",
  "Adoption is the metric: 70% weekly-active",
  "Stack re-tested every week",
];
const STACK_LINE =
  "Built with Claude by Anthropic, CellCog, n8n, Supabase, Microsoft, and Vercel.";

function Wordmark({ name }: { name: string }) {
  return (
    <span className="text-[17px] font-semibold tracking-[-0.01em] whitespace-nowrap text-ink/45 transition-colors hover:text-ink/70 md:text-[19px]">
      {name}
    </span>
  );
}

export function LineageRow() {
  return (
    <PageFrame aria-label="Practice lineage and toolchain">
      <div className="grid md:grid-cols-2">
        <div className="cf-dots border-b border-hairline px-5 py-8 md:border-r md:border-b-0 md:px-10">
          <p className="tnum text-[11px] tracking-[0.18em] text-ink/50 uppercase">
            Our team comes from
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {TEAM_FROM.map((name) => (
              <Wordmark key={name} name={name} />
            ))}
          </div>
        </div>
        <div className="cf-dots px-5 py-8 md:px-10">
          <p className="tnum text-[11px] tracking-[0.18em] text-ink/50 uppercase">
            How we build
          </p>
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
          <p className="mt-4 text-[12px] leading-relaxed text-ink/50">
            {STACK_LINE}
          </p>
        </div>
      </div>
    </PageFrame>
  );
}
