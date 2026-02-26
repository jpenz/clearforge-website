"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export function ServicesPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <span className="section-label">Services</span>
            <h1 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl lg:text-6xl">
              Services designed for measurable operating lift.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate">
              Built for CEO teams, PE operating partners, and owner-led businesses in the mid-market and lower
              middle market. Our service architecture covers the full cycle: identify value, ship systems, and
              continuously improve results.
            </p>
          </motion.div>
        </div>
      </section>

      {services.map((service, idx) => {
        const isEven = idx % 2 === 0;

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={isEven ? "bg-ivory py-24 lg:py-30" : "bg-white py-24 lg:py-30"}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                  <div>
                    <p className="section-label">{service.tagline}</p>
                    <h2 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl">{service.title}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-slate">{service.description}</p>
                    <p className="mt-5 border-l-2 border-brass pl-4 text-sm leading-relaxed text-stone">
                      Ideal for: {service.idealClient}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {service.outcomes.map((outcome) => (
                      <div key={outcome.metric} className="border border-fog bg-white p-5">
                        <p className="metric-display text-3xl">{outcome.metric}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate">{outcome.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                  <article className="border border-fog bg-white p-6">
                    <h3 className="text-2xl text-midnight">Deliverables</h3>
                    <ul className="mt-4 space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate">
                          <span className="mt-2 h-1.5 w-1.5 bg-brass" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="border border-fog bg-white p-6">
                    <h3 className="text-2xl text-midnight">Timeline</h3>
                    <div className="mt-4 space-y-3">
                      {service.workflow.map((step) => (
                        <div key={step.phase} className="border border-fog bg-ivory p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-brass">{step.phase}</p>
                          <p className="mt-1 text-base font-semibold text-midnight">{step.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-slate">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      <section className="bg-midnight py-24 lg:py-30">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-4xl leading-tight text-white sm:text-5xl">Need help selecting the right starting point?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
            We&apos;ll map your situation to the right starting point, including succession-sensitive plans for
            owner-led companies with $2M-$15M seller earnings.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-midnight" asChild>
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
