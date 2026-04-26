import type { MetadataRoute } from 'next';
import { caseStudies } from '@/data/case-studies';
import { industries } from '@/data/industries-value-chains';
import { insights } from '@/data/insights';
import { services } from '@/data/services';

const siteUrl = 'https://clearforge.ai';
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const tier1: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/discover`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${siteUrl}/scorecard`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/industries`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/case-studies`, lastModified, changeFrequency: 'weekly', priority: 0.88 },
    { url: `${siteUrl}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
  ];

  const tier2: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${siteUrl}/insights`, lastModified, changeFrequency: 'weekly', priority: 0.75 },
  ];

  const industryPages: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${siteUrl}/industries/${ind.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.82,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteUrl}/case-studies/${study.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.74,
  }));

  const insightPages: MetadataRoute.Sitemap = insights.map((article) => ({
    url: `${siteUrl}/insights/${article.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  const legal: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [
    ...tier1,
    ...tier2,
    ...industryPages,
    ...servicePages,
    ...caseStudyPages,
    ...insightPages,
    ...legal,
  ];
}
