"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { serviceIcons } from "@/lib/icons";

export default function ServicesPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-text-primary sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Four practice areas, one mission: measurable business impact through
            AI and operational excellence.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border-subtle bg-bg-card p-8 transition-all hover:border-blue/30 hover:bg-bg-elevated"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue/10">
                  <Icon className="h-6 w-6 text-blue" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-text-primary">
                  {service.title}
                </h2>
                <p className="mt-2 text-text-muted">{service.tagline}</p>
                <p className="mt-4 flex-1 text-text-secondary leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-blue">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          );})}
        </div>
      </div>
    </div>
  );
}
