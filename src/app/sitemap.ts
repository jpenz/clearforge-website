import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { insights } from "@/data/insights";
import { solutions } from "@/data/solutions";
import { deepIndustries } from "@/data/industries";

const siteUrl = "https://clearforge.ai";
const lastModified = new Date("2026-02-25");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/assessment`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${siteUrl}/solutions`, lastModified, changeFrequency: "weekly", priority: 0.92 },
    { url: `${siteUrl}/industries`, lastModified, changeFrequency: "weekly", priority: 0.88 },
    { url: `${siteUrl}/how-we-work`, lastModified, changeFrequency: "monthly", priority: 0.86 },
    { url: `${siteUrl}/insights`, lastModified, changeFrequency: "weekly", priority: 0.82 },
    { url: `${siteUrl}/case-studies`, lastModified, changeFrequency: "monthly", priority: 0.82 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.74 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.74 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const solutionPages: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: `${siteUrl}/solutions/${solution.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = deepIndustries.map((industry) => ({
    url: `${siteUrl}/industries/${industry.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.78,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteUrl}/case-studies/${study.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const insightPages: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${siteUrl}/insights/${insight.slug}`,
    lastModified: new Date(insight.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...solutionPages, ...industryPages, ...caseStudyPages, ...insightPages];
}
