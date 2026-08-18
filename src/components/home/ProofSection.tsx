import Link from "next/link";
import { PageFrame } from "@/components/ui/PageFrame";
import { CASE_STUDIES } from "@/data/case-studies";

/**
 * Beat (c): one featured case study with its real numbers,
 * plus a one-line second case and the link to the rest.
 */
export function ProofSection() {
  const [caseA, caseB] = CASE_STUDIES;

  return (
    <PageFrame id="proof" aria-label="Proof">
      <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-5 md:px-10">
        <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
          Featured proof
        </span>
        <Link
          href="/proof"
          className="text-[13px] font-semibold text-cobalt underline-offset-4 hover:underline"
        >
          All case studies →
        </Link>
      </div>

      {/* Case A: the featured study */}
      <div className="grid border-b border-hairline lg:grid-cols-[300px_1fr]">
        <div className="border-b border-hairline px-5 py-6 md:px-10 md:py-10 lg:border-r lg:border-b-0">
          <p className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
            Case {caseA.letter}
          </p>
          <h3 className="mt-3 text-[19px] leading-snug font-semibold md:text-[21px]">
            <Link href={`/proof/${caseA.slug}`} className="hover:text-cobalt">
              {caseA.client}
            </Link>
          </h3>
        </div>
        <div className="grid divide-y divide-hairline md:grid-cols-5 md:divide-x md:divide-y-0">
          {caseA.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-baseline justify-between gap-3 px-5 py-4 md:flex-col md:items-stretch md:justify-between md:px-6 md:py-10"
            >
              <p className="tnum text-[28px] leading-none font-light md:text-[44px]">
                {metric.value}
              </p>
              <p className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase md:mt-5">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Case B: one line */}
      <div className="grid lg:grid-cols-[300px_1fr]">
        <div className="border-b border-hairline px-5 py-4 md:px-10 md:py-6 lg:border-r lg:border-b-0">
          <p className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
            Case {caseB.letter}
          </p>
          <p className="mt-1 text-[15px] font-medium">
            <Link href={`/proof/${caseB.slug}`} className="hover:text-cobalt">
              {caseB.client}
            </Link>
          </p>
        </div>
        <div className="flex items-center px-5 py-4 md:px-8 md:py-6">
          <p className="tnum text-[15px] text-ink/80">
            Commercial pipeline rebuilt from zero.{" "}
            <span className="font-semibold text-ink">42</span> targets
            identified, <span className="font-semibold text-ink">31</span>{" "}
            contacted, <span className="font-semibold text-ink">18</span>{" "}
            quoted, <span className="font-semibold text-ink">7</span> recurring
            accounts won.
          </p>
        </div>
      </div>
    </PageFrame>
  );
}
