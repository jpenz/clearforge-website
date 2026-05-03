/**
 * content-quality.test.ts
 *
 * Guards the high-visibility marketing data against obvious AI-slop phrases.
 * This does not replace editorial judgment; it catches the terms we have
 * explicitly removed from buyer-facing copy.
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  adCampaigns,
  buyerLanguage,
  channelAllocation,
  keywordClusters,
  positioningAngles,
} from '@/data/ad-strategy';
import { caseStudies } from '@/data/case-studies';
import {
  automationAmbitionWedges,
  automationPlaybookChapters,
  automationPlaybookJourney,
  blueprintBuildSteps,
  blueprintSourceRules,
  blueprintSummary,
  carnegieAppeal,
  crowdstrikeSourceTrail,
  cybersecurityCompanyFY2026,
  functionAnalysis,
  futureStateUseCases,
  proposalRoadmap,
  roleBrief,
  roleCoverage,
  strategicProposal,
  transformationMethod,
  valueChainFutureState,
  whyJames,
} from '@/data/cybersecurity-blueprint';
import { forgeProducts } from '@/data/forge-products';
import { engagementModels, firstWeekPlan, howWeWorkFaqs } from '@/data/how-we-work';
import { broadIndustries, deepIndustries } from '@/data/industries';
import { industries } from '@/data/industries-value-chains';
import { insightCategories, insights } from '@/data/insights';
import { faqs as pricingFaqs, pricingTiers } from '@/data/pricing';
import { services } from '@/data/services';
import { journeyStages, solutions } from '@/data/solutions';
import { useCases } from '@/data/use-cases';
import {
  aiTransformationOfferCatalogJsonLd,
  clearForgeMethodJsonLd,
  coreKeywords,
  founderPersonJsonLd,
  organizationJsonLd,
  siteNavigationJsonLd,
  websiteJsonLd,
} from '@/lib/metadata';
import { pillars, questions, scaleLabels } from '@/lib/scorecard';
import {
  categories,
  questions as newScorecardQuestions,
  questionOptions,
} from '@/lib/scorecard-new';

const bannedPatterns = [
  /\bAI machine\b/i,
  /\boperating machine\b/i,
  /\bhighest-leverage\b/i,
  /\bleverage\b/i,
  /\b3-5x ROI\b/i,
  /\baverage ROI\b/i,
  /\bmedian payback\b/i,
  /\bROI projections\b/i,
  /\b89% (?:reach|reaches|projects)\b/i,
  /\b95% of AI Pilots\b/i,
  /\b100x speed\b/i,
  /\bexponentially smarter\b/i,
  /\bworld-class\b/i,
  /\bsupercharge\b/i,
  /\bgame[- ]changer\b/i,
  /\bparadigm\b/i,
  /\bsynergy\b/i,
  /\bholistic\b/i,
  /\bestimated ROI\b/i,
  /\binvent ROI\b/i,
];

const promptOnlyBannedPatterns = [/\bfuture state\b/i, /\bfuture-state\b/i];

const promptFiles = [
  'src/app/api/discover/route.ts',
  'src/app/api/discover/report/route.ts',
  'src/app/api/discover/value-chain/route.ts',
  'src/app/api/discover/research/route.ts',
  'src/app/api/assessment/route.ts',
  'src/app/api/advisor/route.ts',
];

const repoRoot = resolve(__dirname, '../../..');

function isAllowedRuleContext(text: string): boolean {
  return /\b(no|avoid|never|do not|don't)\b.{0,80}\b(leverage|synergy|paradigm|holistic|invent ROI|estimated ROI|future[- ]state)\b/i.test(
    text,
  );
}

function collectStrings(value: unknown, path = 'root'): { path: string; text: string }[] {
  if (typeof value === 'string') return [{ path, text: value }];
  if (!value || typeof value !== 'object') return [];

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectStrings(item, `${path}[${index}]`));
  }

  return Object.entries(value).flatMap(([key, item]) => collectStrings(item, `${path}.${key}`));
}

describe('buyer-facing content quality', () => {
  it('does not reintroduce obvious AI-slop phrases', () => {
    const corpus = {
      caseStudies,
      cybersecurityBlueprint: {
        automationAmbitionWedges,
        automationPlaybookChapters,
        automationPlaybookJourney,
        blueprintBuildSteps,
        blueprintSourceRules,
        blueprintSummary,
        carnegieAppeal,
        crowdstrikeSourceTrail,
        cybersecurityCompanyFY2026,
        functionAnalysis,
        futureStateUseCases,
        proposalRoadmap,
        roleBrief,
        roleCoverage,
        strategicProposal,
        transformationMethod,
        valueChainFutureState,
        whyJames,
      },
      forgeProducts,
      howWeWork: {
        engagementModels,
        firstWeekPlan,
        howWeWorkFaqs,
      },
      industries,
      industryData: {
        broadIndustries,
        deepIndustries,
      },
      insights: {
        insightCategories,
        insights,
      },
      metadata: {
        aiTransformationOfferCatalogJsonLd,
        clearForgeMethodJsonLd,
        coreKeywords,
        founderPersonJsonLd,
        organizationJsonLd,
        siteNavigationJsonLd,
        websiteJsonLd,
      },
      paidMediaStrategy: {
        adCampaigns,
        buyerLanguage,
        channelAllocation,
        keywordClusters,
        positioningAngles,
      },
      pricing: {
        pricingFaqs,
        pricingTiers,
      },
      scorecard: {
        categories,
        newScorecardQuestions,
        pillars,
        questionOptions,
        questions,
        scaleLabels,
      },
      services,
      solutions: {
        journeyStages,
        solutions,
      },
      useCases,
    };

    const offenders = collectStrings(corpus)
      .map(({ path, text }) => {
        const match = bannedPatterns.find((pattern) => pattern.test(text));
        return match ? `${path}: ${match.source} -> ${text}` : null;
      })
      .filter(Boolean);

    expect(offenders).toEqual([]);
  });

  it('keeps generation prompts grounded in evidence instead of AI-slop', () => {
    const offenders = promptFiles.flatMap((file) => {
      const source = readFileSync(resolve(repoRoot, file), 'utf8');

      return source
        .split('\n')
        .map((line, index) => ({ line, lineNumber: index + 1 }))
        .filter(({ line }) => !isAllowedRuleContext(line))
        .map(({ line, lineNumber }) => {
          const match = [...bannedPatterns, ...promptOnlyBannedPatterns].find((pattern) =>
            pattern.test(line),
          );
          return match ? `${file}:${lineNumber}: ${match.source} -> ${line.trim()}` : null;
        })
        .filter(Boolean);
    });

    expect(offenders).toEqual([]);
  });
});
