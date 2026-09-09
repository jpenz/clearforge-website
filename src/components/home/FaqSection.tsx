import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';
import { HOME_FAQS } from '@/data/faqs';

/**
 * Beat (e): the questions a first-time reader has left, in their own band.
 * They used to trail the booking column, so the page ended on an accordion
 * instead of the commitment; answering them before the booking room keeps
 * the last thing read the thing we want done, and keeps the answers where
 * an answer engine can lift a whole one.
 */
export function FaqSection() {
  return (
    <PageFrame aria-label="Common questions">
      <SectionBand left="Common questions" right="Before you book" />
      <div className="px-5 py-8 md:px-10 md:py-10">
        <FaqAccordion items={HOME_FAQS} />
      </div>
    </PageFrame>
  );
}
