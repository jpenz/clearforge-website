import { FaqSection } from '@/components/home/FaqSection';
import { HeroSection } from '@/components/home/HeroSection';
import { ProofSection } from '@/components/home/ProofSection';
import { StartSection } from '@/components/home/StartSection';
import { StepsSection } from '@/components/home/StepsSection';
import { TrustSection } from '@/components/home/TrustSection';
import { HOME_FAQS } from '@/data/faqs';
import { faqJsonLd, JsonLdScriptProps, organizationJsonLd } from '@/lib/seo';

/**
 * The home page as one story a first-time reader can follow, each band
 * answering the next question they ask: what do you do (hero), what does
 * that look like (a real example), what happens if I hire you (four
 * steps), why trust you, what will it cost me and what if it fails
 * (straight answers), and how do I start.
 */
export default function HomePage() {
  return (
    <>
      <script {...JsonLdScriptProps(organizationJsonLd())} />
      <script {...JsonLdScriptProps(faqJsonLd(HOME_FAQS))} />
      <HeroSection />
      <ProofSection />
      <StepsSection />
      <TrustSection />
      <FaqSection />
      <StartSection />
    </>
  );
}
