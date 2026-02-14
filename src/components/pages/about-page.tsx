"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  User,
  Search,
  Pencil,
  Wrench,
  BarChart3,
  GitMerge,
  Users,
  Target,
  Lightbulb,
  Shield,
  Zap,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const methodology = [
  {
    phase: "Phase 1",
    title: "Diagnose",
    description:
      "Deep-dive into your operations, data, and workflows to identify the highest-impact AI opportunities.",
    icon: Search,
  },
  {
    phase: "Phase 2",
    title: "Design",
    description:
      "Architect solutions that align with your business goals, technical constraints, and team capabilities.",
    icon: Pencil,
  },
  {
    phase: "Phase 3",
    title: "Build",
    description:
      "Hands-on engineering — we build working solutions, not slide decks. Rapid iteration with your team.",
    icon: Wrench,
  },
  {
    phase: "Phase 4",
    title: "Optimize",
    description:
      "Measure results, fine-tune performance, and scale what works across your organization.",
    icon: BarChart3,
  },
];

const differentiators = [
  {
    icon: GitMerge,
    title: "We Bridge the Gap",
    description:
      "Most firms are either strategy consultants who can't build, or engineers who can't think strategically. We do both — fluently.",
  },
  {
    icon: Users,
    title: "Senior-Led Delivery",
    description:
      "No bait-and-switch. The experienced operators who scope your project are the same ones who deliver it.",
  },
  {
    icon: Target,
    title: "Results, Not Reports",
    description:
      "We measure success by business impact — revenue gained, costs saved, processes automated — not pages delivered.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Clarity Over Complexity",
    description:
      "We cut through AI hype to focus on what actually works for your business right now.",
  },
  {
    icon: Shield,
    title: "Radical Transparency",
    description:
      "No black boxes. We explain every recommendation, share every trade-off, and own every outcome.",
  },
  {
    icon: Zap,
    title: "Speed to Value",
    description:
      "We optimize for time-to-impact. Quick wins build momentum; momentum drives transformation.",
  },
  {
    icon: Heart,
    title: "Partnership, Not Projects",
    description:
      "We succeed when you succeed. Our best client relationships are measured in years, not invoices.",
  },
];

export function AboutPageClient() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-blue">
            About ClearForge
          </p>
          <h1 className="mt-4 text-4xl font-bold text-text-primary sm:text-5xl">
            Why ClearForge
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed">
            We exist because the AI industry has a delivery problem. Strategy
            firms hand you roadmaps. Tech shops hand you tools. Neither hands
            you results. ClearForge was built to change that.
          </p>
        </motion.div>

        {/* Founder Story */}
        <motion.div
          className="mx-auto mt-20 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
            <div className="flex h-56 w-56 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-bg-card">
              <User className="h-20 w-20 text-text-muted" />
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-blue">
                From the Founder
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
                Built by an Operator, for Operators
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                My career has lived at the intersection of management consulting
                and AI engineering. I&apos;ve led transformation programs at
                top-tier consulting firms and built production AI systems from
                the ground up. That dual perspective revealed a frustrating
                pattern: brilliant strategies that never shipped, and powerful
                technology that never connected to business outcomes.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                ClearForge was founded to solve that disconnect. We bring both
                the business acumen to identify high-impact opportunities and
                the technical depth to deliver working solutions — in weeks, not
                quarters.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Our clients are mid-market leaders and PE-backed companies who
                are done with AI experimentation and ready for AI execution. If
                that sounds like you, I&apos;d love to talk.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Methodology */}
        <div className="mt-24 border-t border-border-subtle pt-20">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-blue">
              Our Approach
            </p>
            <h2 className="mt-4 text-3xl font-bold text-text-primary sm:text-4xl">
              The ClearForge Method
            </h2>
            <p className="mt-4 text-text-secondary">
              A proven four-phase approach that moves from insight to impact
              — fast.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className="relative rounded-xl border border-border-subtle bg-bg-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10">
                    <Icon className="h-5 w-5 text-blue" />
                  </div>
                  <span className="mt-4 block text-xs font-medium text-text-muted">
                    {step.phase}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                  {i < methodology.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-text-muted lg:block" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Differentiators */}
        <div className="mt-24 border-t border-border-subtle pt-20">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              What Makes Us Different
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="rounded-xl border border-border-subtle bg-bg-card p-8 transition-all hover:border-blue/30 hover:bg-bg-elevated"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Icon className="h-6 w-6 text-blue" />
                  <h3 className="mt-4 text-xl font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Values */}
        <div className="mt-24 border-t border-border-subtle pt-20">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-blue">
              Our Principles
            </p>
            <h2 className="mt-4 text-3xl font-bold text-text-primary sm:text-4xl">
              What We Believe
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="flex gap-4 rounded-xl border border-border-subtle bg-bg-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald/10">
                    <Icon className="h-5 w-5 text-emerald" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24 border-t border-border-subtle pt-20">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Growing the Team
            </h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              ClearForge is selectively growing. We&apos;re looking for
              operators who combine strategic thinking with hands-on technical
              skills — people who can diagnose a business problem in the morning
              and ship a working solution by afternoon.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Join Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-24 border-t border-border-subtle pt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            Ready to Work Together?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Book a free discovery call to discuss how ClearForge can drive
            measurable AI results for your business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild>
              <Link href="/contact">
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="secondary" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
