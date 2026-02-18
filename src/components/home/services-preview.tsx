"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Rocket, BarChart3, ClipboardCheck, ArrowRight } from "lucide-react";

const serviceCards = [
  {
    icon: Search,
    title: "AI Strategy & Market Intelligence",
    description: "Market studies, competitive analysis, and AI opportunity mapping. Know where AI creates the most value before you build anything.",
    href: "/services#ai-strategy",
    tag: "Discover",
  },
  {
    icon: Rocket,
    title: "AI Design & Build",
    description: "Custom AI agents, workflow automation, and production systems. Architected for your business outcome, shipped on schedule.",
    href: "/services#ai-design-build",
    tag: "Build",
  },
  {
    icon: BarChart3,
    title: "Managed AI Operations",
    description: "Continuous optimization, model retraining, and market monitoring. Your AI compounds in value every month without adding headcount.",
    href: "/services#managed-ai-operations",
    tag: "Optimize",
  },
  {
    icon: ClipboardCheck,
    title: "AI Readiness Assessment",
    description: "4-week diagnostic across 5 pillars. Scored assessment with a 90-day action plan. The fastest way to know if your business is ready.",
    href: "/services#ai-readiness-assessment",
    tag: "$15K · 4 Weeks",
  },
];

export function ServicesPreview() {
  return (
    <section className="bg-gray-50 py-24 lg:py-32 border-y border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="section-label">Services</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Four services. One focus: measurable results.
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Each service maps to a phase of our methodology. Start anywhere, expand as you see results.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {serviceCards.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
            >
              <Link href={service.href}>
                <div className="group bg-white border border-gray-200 rounded-xl p-8 h-full hover:border-teal/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 group-hover:bg-teal group-hover:text-white transition-colors">
                      <service.icon className="h-5 w-5 text-teal group-hover:text-white" />
                    </div>
                    <span className="text-xs font-medium text-teal uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <div className="mt-5 flex items-center text-base text-teal font-medium group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">
              View All Services & Pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
