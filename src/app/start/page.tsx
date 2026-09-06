import type { Metadata } from 'next';
import { StartFlow } from '@/components/functional/StartFlow';
import { Container } from '@/components/ui/Container';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';

export const metadata: Metadata = {
  title: 'Start a project',
  description:
    'Tell us what you need in about sixty seconds. Attach an RFP or brief if you have one. You will hear from the founder within one business day.',
};

export default function StartPage() {
  return (
    <>
      {/* Intro: full-bleed dark title block */}
      <section aria-label="Start a project" className="cf-dark-band overflow-hidden">
        <div aria-hidden="true" className="cf-aurora-b" />
        <Container gutter="cells" className="relative">
          <SectionBand
            tone="dark"
            left="Start"
            right="About sixty seconds · Reply within one business day"
          />
          <div className="px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-12">
            <h1 className="font-display text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
              Tell us what you <em className="text-cobalt-bright italic">need.</em>
            </h1>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ghost/80">
              Three short steps. Attach an RFP or a process doc if you have one, and it will be read
              before anyone gets on a call.
            </p>
          </div>
        </Container>
      </section>

      <PageFrame bottomRule={false} aria-label="Project brief form">
        <StartFlow />
      </PageFrame>
    </>
  );
}
