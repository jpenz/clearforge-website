import Link from 'next/link';
import { PageFrame } from '@/components/ui/PageFrame';
import { Plate } from '@/components/ui/Plate';
import { CASE_STUDIES } from '@/data/case-studies';

/**
 * Beat (c): one featured case study as an image card (serif headline over
 * the proof-threads render, whole card clickable) beside a rail of its
 * five real numbers, plus a one-line second case and the link to the rest.
 */
export function ProofSection() {
  const [caseA, caseB] = CASE_STUDIES;

  return (
    <PageFrame id="proof" aria-label="Proof">
      <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-5 md:px-10">
        <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">Featured proof</span>
        <Link
          href="/proof"
          className="text-[13px] font-semibold text-cobalt underline-offset-4 hover:underline"
        >
          All case studies →
        </Link>
      </div>

      {/* Case A: the image card beside the five-stat rail */}
      <div className="grid border-b border-hairline lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <article className="cf-image-card group relative flex min-h-[440px] flex-col justify-end overflow-hidden bg-[#030b13] text-ghost lg:min-h-[560px]">
          <Plate
            src="/renders/proof-threads.jpg"
            overlay="soft"
            position="60% 50%"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
          <div className="relative px-5 py-8 md:px-10 md:py-10">
            <p className="tnum text-[11px] tracking-[0.18em] text-ghost/70 uppercase">
              Case {caseA.letter} · {caseA.scopeTag}
            </p>
            <h2 className="font-display mt-4 max-w-[22ch] text-[clamp(28px,2.6vw,48px)] leading-[1.1] font-medium">
              {caseA.headline}{' '}
              <em className="text-cobalt-bright italic">{caseA.headlineEmphasis}</em>
            </h2>
            <Link
              href={`/proof/${caseA.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-ghost after:absolute after:inset-0 focus-visible:outline-cobalt-bright"
            >
              Read the case study
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </Link>
          </div>
        </article>
        <div className="flex flex-col divide-y divide-hairline lg:border-l lg:border-hairline">
          {caseA.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex grow items-baseline justify-between gap-4 px-5 py-4 md:px-10 md:py-5"
            >
              <p className="tnum text-[28px] leading-none font-light md:text-[clamp(36px,2.6vw,48px)]">
                {metric.value}
              </p>
              <p className="tnum text-right text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Case B: one line */}
      <div className="grid lg:grid-cols-[300px_1fr]">
        <div className="border-b border-hairline px-5 py-4 md:px-10 md:py-6 lg:border-r lg:border-b-0">
          <p className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">Case {caseB.letter}</p>
          <p className="mt-1 text-[15px] font-medium">
            <Link href={`/proof/${caseB.slug}`} className="hover:text-cobalt">
              {caseB.client}
            </Link>
          </p>
        </div>
        <div className="flex items-center px-5 py-4 md:px-8 md:py-6">
          <p className="tnum text-[15px] text-ink/80">
            Commercial pipeline rebuilt from zero.{' '}
            <span className="font-semibold text-ink">42</span> targets identified,{' '}
            <span className="font-semibold text-ink">31</span> contacted,{' '}
            <span className="font-semibold text-ink">18</span> quoted,{' '}
            <span className="font-semibold text-ink">7</span> recurring accounts won.
          </p>
        </div>
      </div>
    </PageFrame>
  );
}
