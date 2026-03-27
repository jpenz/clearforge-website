import type { MetadataRoute } from 'next';
import { caseStudies } from '@/data/case-studies';

const siteUrl = 'https://clearforge.ai';
const lastModified = new Date('2026-03-07');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: 'weekly', priority: 0.92 },
    { url: `${siteUrl}/case-studies`, lastModified, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${siteUrl}/scorecard`, lastModified, changeFrequency: 'monthly', priority: 0.86 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.74 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteUrl}/case-studies/${study.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.72,
  }));

  return [...staticPages, ...caseStudyPages];
}
