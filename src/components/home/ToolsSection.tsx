import { ArrowLink } from '@/components/ui/ArrowLink';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';

const TOOLS = [
  {
    title: 'Map the Workflow',
    href: '/discover',
    description:
      'Forge Intelligence reads your site, maps one revenue workflow, and flags the manual steps. Free.',
  },
  {
    title: 'Take the scorecard',
    href: '/scorecard',
    description: '10 questions across 5 pillars. A scored readout of your AI readiness at the end.',
  },
];

/**
 * Beat (d): try before you call. Two product-tool cards resting on the
 * dotted canvas: white, hairline-edged, a faint cobalt inset ring at rest
 * and the cobalt glow on hover (700ms, one curve). The title is the one
 * go link on the site (ArrowLink), stretched over the whole card so the
 * card is the target. This is the one light band with cards, so it never
 * reads as the booking band that follows it.
 */
export function ToolsSection() {
  return (
    <PageFrame aria-label="Free tools">
      <SectionBand left="Try before you call" right="Free · No account" />
      <div className="cf-dots grid gap-5 px-5 py-8 md:grid-cols-2 md:gap-6 md:px-10 md:py-12">
        {TOOLS.map((tool) => (
          <article
            key={tool.href}
            className="cf-tool-glow relative border border-hairline-strong bg-white px-6 py-8 text-ink shadow-[inset_0_0_0_1px_rgba(36,84,255,0.18)] md:px-10 md:py-12"
          >
            <p className="text-[12px] tracking-[0.16em] text-ink/70 uppercase">Free tool</p>
            <ArrowLink
              href={tool.href}
              className="mt-3 text-[clamp(20px,1.4vw,26px)] leading-snug tracking-[-0.01em] after:absolute after:inset-0"
            >
              {tool.title}
            </ArrowLink>
            <p className="tnum mt-3 max-w-[46ch] text-[15px] leading-relaxed text-ink/75">
              {tool.description}
            </p>
          </article>
        ))}
      </div>
    </PageFrame>
  );
}
