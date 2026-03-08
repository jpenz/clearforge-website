"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const values = [
  {
    title: "Strategy must end in execution",
    description:
      "We don't stop at recommendations. Every strategy engagement is built to move into delivery.",
  },
  {
    title: "Senior-led teams",
    description:
      "You work directly with experienced consultants and engineers, not a leverage model of junior handoffs.",
  },
  {
    title: "Engineering depth with operating discipline",
    description:
      "We build real systems, then manage them with clear metrics and accountable cadence.",
  },
  {
    title: "Plainspoken, board-ready communication",
    description:
      "We keep recommendations clear, practical, and grounded in measurable outcomes.",
  },
];

const approach = [
  {
    number: "01",
    title: "Diagnose where you should win",
    description:
      "Consulting-grade analysis of market position, operational bottlenecks, and AI opportunity sizing.",
  },
  {
    number: "02",
    title: "Build the systems that matter",
    description:
      "Engineering translates strategy into production AI workflows tied to core business metrics.",
  },
  {
    number: "03",
    title: "Operate and improve continuously",
    description:
      "We run and optimize systems so value compounds instead of decaying after launch.",
  },
];

const clients = [
  {
    title: "PE Operating Partners",
    description: "Value-creation teams driving performance across portfolio companies.",
  },
  {
    title: "Business Owners & CEOs",
    description: "Leaders who need AI outcomes without building an internal AI department.",
  },
  {
    title: "Revenue & Ops Leaders",
    description: "Operators responsible for growth, efficiency, and measurable execution.",
  },
];

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-deep pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="section-label">About ClearForge</p>
            <h1
              className="mt-4 text-4xl text-text-primary sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Strategy consulting discipline. AI engineering depth.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              ClearForge was built for leaders who need more than
              recommendations. We combine management consulting rigor with
              hands-on delivery so strategy turns into live systems that
              perform in production.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach — Light */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="section-label text-accent-dark">Our Approach</p>
          <h2
            className="mt-4 text-3xl text-text-on-light sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Diagnose. Build. Operate.
          </h2>

          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {approach.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <span className="metric text-sm text-accent-dark">{item.number}</span>
                <h3
                  className="mt-3 text-xl text-text-on-light"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-on-light-sub">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — Dark */}
      <section className="bg-bg-deep py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="section-label">What We Believe</p>
          <h2
            className="mt-4 text-3xl text-text-primary sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Principles that keep delivery accountable.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="flex gap-6"
              >
                <span className="metric text-sm mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary">
                    {v.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With — Light */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="section-label text-accent-dark">Who We Work With</p>
          <h2
            className="mt-4 max-w-2xl text-3xl text-text-on-light sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Teams that need strategy and execution from the same partner.
          </h2>

          <div className="mt-12 grid gap-px bg-border-light md:grid-cols-3">
            {clients.map((c) => (
              <div key={c.title} className="bg-bg-light p-8">
                <h3 className="text-lg font-semibold text-text-on-light">
                  {c.title}
                </h3>
                <p className="mt-2 text-base text-text-on-light-sub">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Dark */}
      <section className="bg-bg-deep py-20 lg:py-28 hero-glow">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2
            className="text-3xl text-text-primary sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Let&apos;s discuss your priorities.
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            A real conversation about where AI fits in your operation and what
            it would take to get there.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">
                Request a Proposal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
