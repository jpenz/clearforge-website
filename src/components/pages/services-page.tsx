"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { Search, PenTool, Rocket, BarChart3, Bot, ArrowRight } from "lucide-react";

const iconMap: Record<string, typeof Search> = { Search, PenTool, Rocket, BarChart3, Bot };

export function ServicesPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="section-label">Services</span>
            <h1 className="mt-4 text-4xl font-bold text-text sm:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
              Strategy, AI engineering, and managed operations in one firm.
            </h1>
            <p className="mt-6 text-lg text-text-secondary">
              ClearForge follows a Strategy to Build to Operate model. AI Marketing & Revenue Operations is one applied
              service inside that broader platform.
            </p>
          </motion.div>
        </div>
      </section>

      {services.map((service, idx) => {
        const Icon = iconMap[service.icon];
        const isEven = idx % 2 === 0;
        return (
          <section key={service.slug} id={service.slug} className={isEven ? "bg-surface py-20 lg:py-28" : "bg-white py-20 lg:py-28"}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                  <div>
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal">
                      {Icon && <Icon className="h-5 w-5" />}
                    </div>
                    <h2 className="text-3xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                      {service.title}
                    </h2>
                    <p className="mt-2 text-lg font-medium text-teal">{service.tagline}</p>
                    <p className="mt-4 text-lg leading-relaxed text-text-secondary">{service.description}</p>
                    <p className="mt-4 text-lg text-text-secondary">
                      <strong className="text-text-secondary">Who it&apos;s for:</strong> {service.idealClient}
                    </p>
                    {service.slug === "ai-marketing-revenue-operations" && (
                      <Button className="mt-6" variant="outline" asChild>
                        <Link href="/services/ai-marketing-agent">
                          View application page <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {service.outcomes.map((outcome) => (
                        <div key={outcome.metric} className="rounded-lg border border-border bg-white p-5">
                          <div className="metric-display text-2xl">{outcome.metric}</div>
                          <p className="mt-1 text-base text-text-secondary">{outcome.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-lg font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>Deliverables</h3>
                    <ul className="space-y-2">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-base text-text-secondary">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>Timeline</h3>
                    <div className="space-y-3">
                      {service.workflow.map((step) => (
                        <div key={step.phase} className="flex gap-4 rounded-lg border border-border bg-white p-4">
                          <span className="metric-display whitespace-nowrap text-sm">{step.phase}</span>
                          <div>
                            <p className="text-base font-semibold text-text">{step.title}</p>
                            <p className="text-base text-text-secondary">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            Need help choosing the right service line?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            We can diagnose where to start and map your fastest path to measurable results.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-text" asChild>
              <Link href="/pricing">
                View Pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
