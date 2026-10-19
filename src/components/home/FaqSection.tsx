import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';
import { HOME_FAQS } from '@/data/faqs';

/**
 * The questions a first-time reader has left before booking: cost, what
 * their people do, what happens if nothing is worth building, ownership
 * and data. Answered before the last band so the page ends on how to start.
 */
export function FaqSection() {
  return (
    <PageFrame aria-label="Straight answers">
      <SectionBand left="Straight answers" right="Cost · Time · Risk" />
      <div className="px-5 py-8 md:px-10 md:py-10">
        <FaqAccordion items={HOME_FAQS} />
      </div>
    </PageFrame>
  );
}
