import { PageFrame } from "@/components/ui/PageFrame";

/**
 * Proof-by-name band: where the team comes from, and the tools we build
 * with. Styled text wordmarks (grayscale, quiet); nominative use only, and
 * the tools list stays FACTUAL (only what we actually deliver with). The
 * weekly stack-trends task proposes updates as PRs; owner approves by merge.
 */
const TEAM_FROM = ["Bain & Company", "EY", "Capgemini"];
const TOOLS = [
  "Claude by Anthropic",
  "CellCog",
  "n8n",
  "Supabase",
  "Microsoft",
  "Vercel",
];

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
            Tools we use
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {TOOLS.map((name) => (
              <Wordmark key={name} name={name} />
            ))}
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
