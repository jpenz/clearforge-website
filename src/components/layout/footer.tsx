import Link from "next/link";

const footerLinks = {
  Services: [
    { href: "/services/ai-marketing-agent", label: "AI Marketing Agent" },
    { href: "/services", label: "All Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/case-studies", label: "Case Studies" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/insights", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ],
  Resources: [
    { href: "/scorecard", label: "AI Readiness Scorecard" },
    { href: "/insights/continuous-ai-agents", label: "The Continuous AI Agent" },
  ],
};

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-gray-200 bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                ClearForge<span className="text-teal">.ai</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">Strategy that ships. AI that performs.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm text-slate-600 transition-colors hover:text-teal">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} ClearForge.ai. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-teal">Privacy</Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-teal">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
