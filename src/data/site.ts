export const SITE_NAME = "ClearForge";
export const SITE_TAGLINE = "AI systems your team actually uses";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://clearforge.ai";

/** The one canonical booking CTA label. Never vary it. */
export const CTA_LABEL = "Book a 30-min intro";

/** Cal.com event link, e.g. "james-penz/30min". */
export const CAL_LINK =
  process.env.NEXT_PUBLIC_CALCOM_LINK ?? "james-penz/30min";
export const CAL_NAMESPACE = "clearforge-30min";
/** Separate namespace so the inline calendar's ready event is its own. */
export const CAL_INLINE_NAMESPACE = "clearforge-30min-inline";

export interface NavItem {
  label: string;
  href: string;
}

/** Top navigation: exactly five items plus one button, at every width. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Proof", href: "/proof" },
  { label: "Engagements", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export interface FooterColumn {
  title: string;
  items: NavItem[];
}

/** Footer sitemap. Carries the only nav path to /discover. */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Services",
    items: [
      { label: "Forge Diagnostic", href: "/services" },
      { label: "Eval and Reliability Audit", href: "/services" },
      { label: "Forge Sprint", href: "/services" },
      { label: "Forge Scale", href: "/services" },
      { label: "Forge Run", href: "/services" },
      { label: "PE Portfolio Pack", href: "/services" },
    ],
  },
  {
    title: "Proof",
    items: [
      { label: "Case studies", href: "/proof" },
      { label: "Blueprint library", href: "/proof" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "Firm",
    items: [
      { label: "About", href: "/about" },
      { label: "Engagements", href: "/pricing" },
      { label: "Start a project", href: "/start" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Free tools",
    items: [
      { label: "Forge Intelligence", href: "/discover" },
      { label: "AI readiness scorecard", href: "/scorecard" },
    ],
  },
];
