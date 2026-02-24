"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Rocket, BarChart3, PenTool, Bot, ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

const serviceCards = [
  {
    icon: Search,
    title: "Growth Strategy & Diagnosis",
    description: "The entry point: pinpoint where to win and which AI opportunities should be prioritized first.",
    href: "/services#growth-strategy-diagnosis",
    tag: "$15K · 4 Weeks",
    image: images.serviceStrategy,
  },
  {
    icon: Rocket,
    title: "AI Agent Design & Build",
    description: "We deploy AI agents that operate as part of your team — handling workflows, making decisions, and executing tasks in production from day one.",
    href: "/services#ai-design-build",
    tag: "$50K-$100K",
    image: images.serviceBuild,
  },
  {
    icon: BarChart3,
    title: "Managed AI Operations",
    description: "We operate and optimize your AI agents and systems continuously. Performance compounds every cycle — not just at quarterly reviews.",
    href: "/services#managed-ai-operations",
    tag: "$15K+/mo",
    image: images.serviceManaged,
  },
  {
    icon: PenTool,
    title: "Legacy System Modernization",
    description: "AI agents that bridge your existing systems — COBOL, mainframes, legacy ERP — without ripping and replacing. Your infrastructure stays, AI makes it work harder.",
    href: "/services#legacy-system-modernization",
    tag: "Custom",
    image: images.serviceRetainer,
  },
  {
    icon: Bot,
    title: "AI Marketing & Revenue Operations",
    description: "One application of the platform: AI agents that run your full revenue engine — demand generation, outreach, pipeline, and optimization.",
    href: "/services/ai-marketing-agent",
    tag: "Application",
    image: images.aiMarketingAgent,
  },
];

export function ServicesPreview() {
  return (
    <section className="border-y border-gray-200 bg-gray-50 py-24 lg:py-32">
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
            Strategy, build, and managed operations across five service lines.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            We start with where to win, then build and run the systems. AI Marketing & Revenue Operations is one applied
            example of that model.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
            >
              <Link href={service.href}>
                <div className="group h-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-teal/30 hover:shadow-lg">
                  {service.image && (
                    <div className="relative h-32 w-full overflow-hidden bg-slate-navy">
                      <div
                        className="absolute inset-0 opacity-60 transition-opacity group-hover:opacity-80"
                        style={{
                          backgroundImage: `url(${service.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 transition-colors group-hover:bg-teal group-hover:text-white">
                        <service.icon className="h-5 w-5 text-teal group-hover:text-white" />
                      </div>
                      <span className="font-[family-name:var(--font-space-grotesk)] text-xs font-medium uppercase tracking-wider text-teal">
                        {service.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {service.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">{service.description}</p>
                    <div className="mt-5 flex items-center text-base font-medium text-teal transition-all group-hover:gap-2">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
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
              View Services and Pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
