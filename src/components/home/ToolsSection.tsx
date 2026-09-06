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
 * Beat (d): try before you call. Two product-tool cards; the whole cell is
 * the link and glows cobalt on hover (700ms, one curve).
 */
export function ToolsSection() {
  return (
    <PageFrame aria-label="Free tools">
      <SectionBand left="Try before you call" right="2 free tools" />
      <div className="grid divide-y divide-hairline md:grid-cols-2 md:divide-x md:divide-y-0">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="cf-tool-glow group block px-5 py-8 md:px-10 md:py-12"
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
