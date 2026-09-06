import Link from 'next/link';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { PageFrame } from '@/components/ui/PageFrame';
import { Plate } from '@/components/ui/Plate';
import { Stat } from '@/components/ui/Stat';
import { CASE_STUDIES } from '@/data/case-studies';

/**
 * Beat (c): one featured case study as an image card (serif headline over
 * the proof-threads render, whole card clickable) beside its numbers on
 * the /proof hierarchy: the result at display size with its scope in the
 * caption, then the two secondary figures smaller. No rail opens the band;
 * the image card is the opener, and the link to the rest sits in the
 * Case B row. Case B is one line with its funnel counts.
 */
export function ProofSection() {
  const [caseA, caseB] = CASE_STUDIES;
  const [primary, ...secondary] = caseA.metrics;

  return (
    <PageFrame id="proof" aria-label="Proof">
      {/* Case A: the image card beside the stat rail */}
      <div className="grid border-b border-hairline lg:grid-cols-[2fr_1fr]">
        <article className="cf-image-card group relative flex min-h-[440px] flex-col justify-end overflow-clip bg-[#030b13] text-ghost lg:min-h-[560px]">
          <Plate
            src="/renders/proof-threads.jpg"
            overlay="soft"
            position="60% 50%"
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
          <div className="relative px-5 py-8 md:px-10 md:py-10">
            <p className="tnum text-[12px] tracking-[0.16em] text-ghost uppercase">
              Case {caseA.letter} · {caseA.scopeTag}
            </p>
            <h2 className="font-display mt-4 max-w-[22ch] text-balance text-[clamp(28px,2.6vw,48px)] leading-[1.1] font-medium">
              {caseA.headline}{' '}
              <em className="text-cobalt-bright italic">The system found the opportunities.</em>
            </h2>
            <Link
              href={`/proof/${caseA.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-cobalt-bright after:absolute after:inset-0 hover:text-ghost focus-visible:outline-cobalt-bright"
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
        <div className="flex flex-col lg:border-l lg:border-hairline">
          <div className="grow border-b border-hairline px-5 py-8 md:px-10 md:py-10">
            <Stat size="lg" value={primary.value} label={primary.label} />
          </div>
          <div className="grid grid-cols-2 divide-x divide-hairline">
            {secondary.map((metric) => (
              <div key={metric.label} className="px-5 py-6 md:px-10 md:py-8">
                <Stat size="sm" value={metric.value} label={metric.label} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case B: one line, then the way to the rest */}
      <div className="grid lg:grid-cols-[1fr_2fr]">
        <div className="relative border-b border-hairline px-5 py-4 transition-colors hover:bg-white md:px-10 md:py-6 lg:border-r lg:border-b-0">
          <p className="text-[12px] tracking-[0.16em] text-ink/70 uppercase">Case {caseB.letter}</p>
          <ArrowLink
            href={`/proof/${caseB.slug}`}
            size="sm"
            className="mt-1 after:absolute after:inset-0"
          >
            {caseB.client}
          </ArrowLink>
        </div>
        <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-6">
          <p className="tnum max-w-[68ch] text-[15px] text-ink/80">
            Commercial pipeline rebuilt from zero.{' '}
            <span className="font-semibold text-ink">42</span> targets identified,{' '}
            <span className="font-semibold text-ink">31</span> contacted,{' '}
            <span className="font-semibold text-ink">18</span> quoted,{' '}
            <span className="font-semibold text-ink">7</span> recurring accounts won.
          </p>
          <ArrowLink href="/proof" size="sm" className="shrink-0 whitespace-nowrap">
            All case studies
          </ArrowLink>
        </div>
      </div>
    </PageFrame>
  );
}
