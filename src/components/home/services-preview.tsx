"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Rocket, BarChart3, PenTool, Bot, ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

const serviceCards = [
  {
    icon: Bot,
    title: "AI Marketing Agent",
    description: "Our flagship service: full-funnel strategy, execution, reporting, and optimization in one monthly operating model.",
    href: "/services/ai-marketing-agent",
    tag: "Flagship",
    image: images.aiMarketingAgent,
  },
  {
    icon: Search,
    title: "AI Strategy & Market Intelligence",
    description: "Board-ready clarity on where AI should be applied before you commit implementation dollars.",
    href: "/services#ai-strategy",
    tag: "$15K · 4 Weeks",
    image: images.serviceStrategy,
  },
  {
    icon: Rocket,
    title: "AI Design & Build",
    description: "Production AI systems shipped in 6-8 weeks and tied to measurable operating outcomes.",
    href: "/services#ai-design-build",
    tag: "$50K-$100K",
    image: images.serviceBuild,
  },
  {
    icon: PenTool,
    title: "AI Agent Retainer",
    description: "Continuous monthly build capacity with weekly operating cadence. You own the code.",
    href: "/services#ai-agent-retainer",
    tag: "$15K/mo",
    image: images.serviceRetainer,
  },
  {
    icon: BarChart3,
    title: "Managed AI Services",
    description: "We build and run AI systems as an ongoing service for teams that do not want to operate them in-house.",
    href: "/services#managed-ai-services",
    tag: "Custom",
    image: images.serviceManaged,
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
            Five service lines. One operator-first model.
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Start with strategy, launch a performance sprint, or move directly to the AI Marketing Agent.
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
                <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden h-full hover:border-teal/30 hover:shadow-lg transition-all duration-300">
                  {service.image && (
                    <div className="h-32 w-full overflow-hidden bg-slate-navy relative">
                      <div
                        className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity"
                        style={{
                          backgroundImage: `url(${service.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                  )}
                  <div className="p-8">
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
