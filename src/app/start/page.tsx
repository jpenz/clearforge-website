import type { Metadata } from 'next';
import { StartFlow } from '@/components/functional/StartFlow';
import { Container } from '@/components/ui/Container';
import { SectionBand } from '@/components/ui/SectionBand';
import { Stat } from '@/components/ui/Stat';

export const metadata: Metadata = {
  title: 'Start a project',
  description:
    'Tell us what you need in about sixty seconds. Attach an RFP or brief if you have one. You will hear from the founder within one business day.',
};

/**
 * The intake sits inside the dark plate as the product object, the way
 * the hero agent card does on the home page, with a quiet host column:
 * who reads the brief and the two numbers the reader met on every other
 * page. Form logic lives in StartFlow and is unchanged by the frame.
 */
export default function StartPage() {
  return (
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
        <div className="grid gap-10 px-5 pt-10 pb-12 md:px-10 md:pt-14 md:pb-16 lg:grid-cols-[2fr_1fr] lg:gap-14">
          <div>
            <h1 className="font-display text-balance text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
              Tell us what you <em className="text-cobalt-bright italic">need.</em>
            </h1>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ghost/80">
              Three short steps. Attach an RFP or a process doc if you have one, and it will be read
              before anyone gets on a call.
            </p>
            <div className="cf-glow mt-8 border border-ink bg-white text-ink">
              <StartFlow />
            </div>
          </div>
          <aside aria-label="Who reads the brief" className="lg:pt-28">
            <p className="text-[12px] tracking-[0.16em] text-ghost/75 uppercase">Who reads it</p>
            <p className="font-display mt-4 text-[clamp(26px,2.2vw,40px)] leading-[1.1] font-medium">
              James Penz
            </p>
            <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-ghost/80">
              Founder. Every brief is read before anyone gets on a call, and you hear back within
              one business day.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-hairline-ghost pt-6">
              <Stat
                tone="dark"
                size="sm"
                value={
                  <>
                    2<span className="align-top text-[0.45em]">wks</span>
                  </>
                }
                label="Fixed-fee Diagnostic, where every engagement starts"
              />
              <Stat
                tone="dark"
                size="sm"
                value={
                  <>
                    70<span className="align-top text-[0.45em]">%</span>
                  </>
                }
                label="Weekly-active adoption target by day 90"
              />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
