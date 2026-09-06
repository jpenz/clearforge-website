import { BookCallButton } from '@/components/functional/BookCallButton';
import { HeroAgent } from '@/components/functional/HeroAgent';
import { Container } from '@/components/ui/Container';
import { Plate } from '@/components/ui/Plate';

/**
 * Beat (a): the core statement plus the live agent card as proof of craft.
 * V13: a full-bleed cinematic band (HDR core, one drifting aurora on the
 * right, one slow light sweep, all CSS) that fills the first viewport at
 * lg and up. The left 58 percent carries a five-word eyebrow, the
 * statement, the one-line diagnostic statement, the one-line audience
 * sentence, and the booking button over the plate's dark third (no aurora
 * on the left: it lifted the eyebrow zone below 4.5:1); the free tool
 * floats on the right with the cobalt glow, offset down so the plate
 * shows above it, carrying its own single header (no instrument labels
 * above it). The back plate (public/renders/hero-forge.jpg) is the LCP
 * image: preloaded, fetched at high priority, right-weighted under the
 * legibility scrim. Entrance is a one-time load stagger; reduced motion
 * renders everything instantly.
 */
export function HeroSection() {
  return (
    <section aria-label="Introduction" className="cf-dark-band overflow-clip">
      <Plate src="/renders/hero-forge.jpg" priority position="72% 50%" overlay="strong-right" />
      <div aria-hidden="true" className="cf-aurora-b" />
      <div aria-hidden="true" className="cf-sweep" />
      <Container className="relative flex flex-col lg:min-h-[min(82svh,1000px)]">
        <div className="grid grow gap-y-12 pt-10 pb-12 md:pt-14 md:pb-16 lg:grid-cols-[58fr_42fr] lg:gap-x-12 lg:pt-16 xl:gap-x-20">
          {/* Left: the core statement */}
          <div className="flex flex-col justify-center">
            <p className="cf-enter text-[12px] tracking-[0.16em] text-ghost/75 uppercase">
              Founder-led AI consulting and build
            </p>
            <h1
              className="cf-enter font-display mt-8 max-w-[15ch] text-[clamp(44px,5.4vw,104px)] leading-[1.02] font-medium tracking-[-0.01em] md:mt-10"
              style={{ '--d': '80ms' } as React.CSSProperties}
            >
              ClearForge builds AI systems your team actually uses and your bottom line{' '}
              <em className="text-cobalt-bright italic">actually feels.</em>
            </h1>
            <p
              className="cf-enter mt-8 max-w-[44ch] text-[17px] leading-snug text-ghost/80 md:text-[18px] lg:max-w-none"
              style={{ '--d': '180ms' } as React.CSSProperties}
            >
              Engagements start with a{' '}
              <span className="font-semibold text-ghost">fixed-fee diagnostic.</span>{' '}
              <span className="tnum font-semibold text-ghost">Two weeks, one workflow.</span>
            </p>
            <p
              className="cf-enter tnum mt-3 max-w-[60ch] text-[16px] leading-snug text-ghost/70"
              style={{ '--d': '220ms' } as React.CSSProperties}
            >
              For mid-market companies $20M to $500M and PE operating teams.
            </p>
            <div
              className="cf-enter mt-8 md:mt-10"
              style={{ '--d': '260ms' } as React.CSSProperties}
            >
              <BookCallButton size="lg" />
            </div>
          </div>

          {/* Right: the free tool, floating on the band */}
          <div className="flex flex-col lg:self-end lg:pt-24">
            <div className="cf-enter cf-glow" style={{ '--d': '380ms' } as React.CSSProperties}>
              <HeroAgent />
            </div>
            <p
              className="cf-enter pt-4 text-[12px] leading-relaxed text-ghost/75"
              style={{ '--d': '440ms' } as React.CSSProperties}
            >
              Founder James Penz. Background: Bain AI and Automation practice, EY, Capgemini.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
