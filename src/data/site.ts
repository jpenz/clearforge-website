export const SITE_NAME = 'ClearForge';
export const SITE_TAGLINE = 'AI systems your team actually uses';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clearforge.ai';

/** The one canonical booking CTA label. Never vary it. */
export const CTA_LABEL = 'Book a 30-min intro';

/** Cal.com event link, e.g. "james-penz/30min". */
export const CAL_LINK = process.env.NEXT_PUBLIC_CALCOM_LINK ?? 'james-penz/30min';
export const CAL_NAMESPACE = 'clearforge-30min';
/** Separate namespace so the inline calendar's ready event is its own. */
export const CAL_INLINE_NAMESPACE = 'clearforge-30min-inline';

/** The founder's public contact line (footer, /about, /security, legal pages). */
export const FOUNDER_EMAIL = 'james@clearforge.ai';
/** The founder's public profile, the one verifiable lineage link on the site. */
export const FOUNDER_LINKEDIN = 'https://www.linkedin.com/in/jamespenz/';

export interface NavItem {
  label: string;
  href: string;
}

/** Top navigation: exactly five items plus one button, at every width. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Proof', href: '/proof' },
  { label: 'Private equity', href: '/private-equity' },
  { label: 'Engagements', href: '/pricing' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
];

export interface FooterColumn {
  title: string;
  items: NavItem[];
}

/** Footer sitemap. Carries the only nav path to /discover. Every service and proof link lands on its own anchor. */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Services',
    items: [
      { label: 'Forge Diagnostic', href: '/services#forge-diagnostic' },
      { label: 'Eval and Reliability Audit', href: '/services#eval-and-reliability-audit' },
      { label: 'Forge Sprint', href: '/services#forge-sprint' },
      { label: 'Forge Scale', href: '/services#forge-scale' },
      { label: 'Forge Run', href: '/services#forge-run' },
      { label: 'PE Portfolio Pack', href: '/services#pe-portfolio-pack' },
    ],
  },
  {
    title: 'Proof',
    items: [
      { label: 'Case studies', href: '/proof#case-studies' },
      { label: 'Build patterns', href: '/proof#build-patterns' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    title: 'Firm',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Engagements', href: '/pricing' },
      { label: 'Private equity', href: '/private-equity' },
      { label: 'Start a project', href: '/start' },
      { label: 'Security', href: '/security' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Free tools',
    items: [
      { label: 'Forge Intelligence', href: '/discover' },
      { label: 'AI readiness scorecard', href: '/scorecard' },
    ],
  },
];
