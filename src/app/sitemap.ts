import type { MetadataRoute } from 'next';
import { blueprints } from '@/data/blueprints';
import { caseStudies } from '@/data/case-studies';
import { industries } from '@/data/industries-value-chains';
import { insights } from '@/data/insights';
import { services } from '@/data/services';
import { useCases } from '@/data/use-cases';

const siteUrl = 'https://clearforge.ai';
const contentLastModified = new Date('2026-05-05T00:00:00.000Z');

function stableDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const tier1: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: contentLastModified, changeFrequency: 'weekly', priority: 1.0 },
    {
      url: `${siteUrl}/discover`,
      lastModified: contentLastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/scorecard`,
      lastModified: contentLastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/operating-model`,
      lastModified: contentLastModified,
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: contentLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/use-cases`,
      lastModified: contentLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/industries`,
      lastModified: contentLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blueprints`,
      lastModified: contentLastModified,
      changeFrequency: 'weekly',
      priority: 0.89,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: contentLastModified,
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: contentLastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  const tier2: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/about`,
      lastModified: contentLastModified,
      changeFrequency: 'monthly',
      priority: 0.78,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: contentLastModified,
      changeFrequency: 'monthly',
      priority: 0.78,
    },
    {
      url: `${siteUrl}/insights`,
      lastModified: contentLastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ];

  const industryPages: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${siteUrl}/industries/${ind.slug}`,
    lastModified: contentLastModified,
    changeFrequency: 'monthly',
    priority: 0.82,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: contentLastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const useCasePages: MetadataRoute.Sitemap = useCases.map((useCase) => ({
    url: `${siteUrl}/use-cases/${useCase.slug}`,
    lastModified: contentLastModified,
    changeFrequency: 'monthly',
    priority: 0.83,
  }));

  const blueprintPages: MetadataRoute.Sitemap = blueprints
    .filter((blueprint) => blueprint.slug !== 'cybersecurity-technology-company')
    .map((blueprint) => ({
      url: `${siteUrl}${blueprint.href}`,
      lastModified: contentLastModified,
      changeFrequency: 'monthly',
      priority: 0.76,
    }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteUrl}/case-studies/${study.slug}`,
    lastModified: contentLastModified,
    changeFrequency: 'monthly',
    priority: 0.74,
  }));

  const insightPages: MetadataRoute.Sitemap = insights.map((article) => ({
    url: `${siteUrl}/insights/${article.slug}`,
    lastModified: stableDate(article.dateModified ?? article.date),
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  const legal: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/privacy`,
      lastModified: contentLastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: contentLastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [
    ...tier1,
    ...tier2,
    ...industryPages,
    ...servicePages,
    ...useCasePages,
    ...blueprintPages,
    ...caseStudyPages,
    ...insightPages,
    ...legal,
  ];
}
