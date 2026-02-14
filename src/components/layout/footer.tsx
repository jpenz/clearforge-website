import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Services: [
    { href: "/services/ai-revenue-operations", label: "AI Revenue Operations" },
    { href: "/services/performance-improvement", label: "Performance Improvement" },
    { href: "/services/pe-value-creation", label: "PE Value Creation" },
    { href: "/services/custom-ai-agents", label: "Custom AI Agents" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/pricing", label: "Pricing" },
    { href: "/insights", label: "Insights" },
  ],
  Tools: [
    { href: "/scorecard", label: "AI Readiness Scorecard" },
    { href: "/roi-calculator", label: "ROI Calculator" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-border-subtle bg-bg-dark">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-text-primary">
                ClearForge<span className="text-blue">.ai</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-muted">
              Strategy that ships. AI that performs. Combining management
              consulting rigor with hands-on AI engineering.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold text-text-primary">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} ClearForge.ai. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
