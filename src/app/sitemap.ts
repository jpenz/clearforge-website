import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { insights } from "@/data/insights";

const siteUrl = "https://clearforge.ai";
const lastModified = new Date("2026-02-24");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/services/ai-marketing-agent`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteUrl}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/case-studies`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/scorecard`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/insights`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${siteUrl}/case-studies/${cs.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const insightPages: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${siteUrl}/insights/${insight.slug}`,
    lastModified: new Date(insight.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...caseStudyPages, ...insightPages];
}
