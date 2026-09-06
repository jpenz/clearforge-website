import Link from 'next/link';
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
 * and the cobalt glow on hover (700ms, one curve). The whole card is the
 * link. This is the one light band with cards, so it never reads as the
 * booking band that follows it.
 */
export function ToolsSection() {
  return (
    <PageFrame aria-label="Free tools">
      <SectionBand left="Try before you call" right="2 free tools" />
      <div className="cf-dots grid gap-5 px-5 py-8 md:grid-cols-2 md:gap-6 md:px-10 md:py-12">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="cf-tool-glow group block border border-hairline-strong bg-white px-6 py-8 text-ink shadow-[inset_0_0_0_1px_rgba(36,84,255,0.18)] md:px-10 md:py-12"
          >
            <p className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">Free tool</p>
            <p className="mt-3 text-[clamp(20px,1.4vw,26px)] leading-snug font-semibold tracking-[-0.01em] transition-colors group-hover:text-cobalt">
              {tool.title}{' '}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </p>
            <p className="tnum mt-3 max-w-[46ch] text-[15px] leading-relaxed text-ink/75">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </PageFrame>
  );
}
