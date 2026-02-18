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
      {/* Hero */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="section-label">Services</span>
            <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              AI solutions that deliver <span className="gradient-text">measurable results.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Four MECE service lines mapped to our methodology: Discover, Design, Build, Optimize.
              Every engagement ties to a business outcome you can measure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, idx) => {
        const Icon = iconMap[service.icon];
        const isEven = idx % 2 === 0;
        return (
          <section key={service.slug} id={service.slug} className={isEven ? "bg-gray-50 py-24 lg:py-32" : "bg-white py-24 lg:py-32"}>
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
                    <h2 className="text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {service.title}
                    </h2>
                    <p className="mt-2 text-lg font-medium text-teal">{service.tagline}</p>
                    <p className="mt-4 text-lg text-slate-600 leading-relaxed">{service.description}</p>
                    <p className="mt-4 text-lg text-slate-600"><strong className="text-slate-700">Ideal for:</strong> {service.idealClient}</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {service.outcomes.map((outcome) => (
                        <div key={outcome.metric} className="rounded-lg border border-gray-200 bg-white p-5">
                          <div className="metric-display text-2xl">{outcome.metric}</div>
                          <p className="mt-1 text-base text-slate-600">{outcome.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-navy mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>Deliverables</h3>
                    <ul className="space-y-2">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-lg text-slate-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-navy mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>Timeline</h3>
                    <div className="space-y-3">
                      {service.workflow.map((step) => (
                        <div key={step.phase} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
                          <span className="metric-display text-sm whitespace-nowrap">{step.phase}</span>
                          <div>
                            <p className="text-base font-semibold text-slate-navy">{step.title}</p>
                            <p className="text-base text-slate-600">{step.description}</p>
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

      {/* CTA */}
      <section className="bg-slate-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Not sure which service fits?
          </h2>
          <p className="mt-4 text-lg text-slate-200 max-w-xl mx-auto">
            Start with a 30-minute discovery call. We&apos;ll assess your situation and
            recommend the right approach.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-slate-400 text-white hover:bg-white hover:text-slate-navy" asChild>
              <Link href="/pricing">View Pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
