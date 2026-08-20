import { PageFrame } from "@/components/ui/PageFrame";

/**
 * Proof-by-name band: where the practice comes from, and what the systems
 * are built with. Styled text wordmarks (grayscale, quiet) rather than
 * fetched logo assets; nominative use only, no partnership implied beyond
 * the factual toolchain.
 */
const PRACTICE = ["Bain & Company", "EY", "Capgemini"];
const STACK = ["Claude by Anthropic", "Microsoft", "Supabase", "n8n", "Vercel"];

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
            The practice comes from
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {PRACTICE.map((name) => (
              <Wordmark key={name} name={name} />
            ))}
          </div>
        </div>
        <div className="cf-dots px-5 py-8 md:px-10">
          <p className="tnum text-[11px] tracking-[0.18em] text-ink/50 uppercase">
            Systems built with
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {STACK.map((name) => (
              <Wordmark key={name} name={name} />
            ))}
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
