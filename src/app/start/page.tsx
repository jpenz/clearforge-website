import type { Metadata } from 'next';
import { StartFlow } from '@/components/functional/StartFlow';
import { Container } from '@/components/ui/Container';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';
import { Stat } from '@/components/ui/Stat';

export const metadata: Metadata = {
  title: 'Start a project',
  description:
    'Tell us what you need in about sixty seconds. Attach an RFP or brief if you have one. You will hear from the founder within one business day.',
};

/**
 * The intake sits inside the dark plate as the product object, the way the
 * hero agent card does on the home page. The host column that used to share
 * that band now has a light room of its own between the form and the
 * footer: the page was one unbroken dark run from the header to the legal
 * line, with a single hairline where the hero met the footer. Form logic
 * lives in StartFlow and is unchanged by the frame.
 */
export default function StartPage() {
  return (
    <>
      <section aria-label="Start a project" className="cf-dark-band overflow-clip">
        <div aria-hidden="true" className="cf-core" />
        <div aria-hidden="true" className="cf-aurora-b" />
        <div aria-hidden="true" className="cf-sweep" />
        <Container gutter="cells" className="relative">
          <SectionBand
            tone="dark"
            left="Start a project"
            right="About sixty seconds · Reply within one business day"
          />
          <div className="px-5 pt-10 pb-12 md:px-10 md:pt-14 md:pb-16">
            <div className="max-w-[1100px]">
              <h1 className="font-display text-balance text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
                Tell us what you <em className="text-cobalt-bright italic">need.</em>
              </h1>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ghost/85">
                Three short steps. Attach an RFP or a process doc if you have one, and it will be
                read before anyone gets on a call.
              </p>
              <div className="cf-glow mt-8 border border-ink bg-white text-ink">
                <StartFlow />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PageFrame bottomRule={false} aria-label="Who reads the brief">
        <SectionBand left="Who reads it" right="One business day" />
        <div className="grid lg:grid-cols-[2fr_1fr]">
          <div className="border-b border-hairline px-5 py-10 md:px-10 md:py-12 lg:border-r lg:border-b-0">
            <p className="font-display text-[clamp(26px,2.2vw,40px)] leading-[1.1] font-medium">
              James Penz
            </p>
            <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink/80">
              Founder. Every brief is read before anyone gets on a call, and you hear back within
              one business day.
            </p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-hairline">
            <div className="px-5 py-8 md:px-10 md:py-10">
              <Stat
                size="sm"
                value={
                  <>
                    2<span className="align-top text-[0.45em]">wks</span>
                  </>
                }
                label="Fixed-fee Diagnostic, where every engagement starts"
              />
            </div>
            <div className="px-5 py-8 md:px-10 md:py-10">
              <Stat
                size="sm"
                value={
                  <>
                    70<span className="align-top text-[0.45em]">%</span>
                  </>
                }
                label="Weekly-active adoption target by day 90"
              />
            </div>
          </div>
        </div>
      </PageFrame>
    </>
  );
}
