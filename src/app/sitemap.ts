import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/data/case-studies";
import { ARTICLES } from "@/data/insights";
import { INDUSTRIES } from "@/data/industries";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/proof",
    "/pricing",
    "/insights",
    "/about",
    "/contact",
    "/discover",
    "/scorecard",
    "/industries",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dynamicRoutes = [
    ...CASE_STUDIES.map((cs) => `/proof/${cs.slug}`),
    ...ARTICLES.map((article) => `/insights/${article.slug}`),
    ...INDUSTRIES.map((industry) => `/industries/${industry.slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
