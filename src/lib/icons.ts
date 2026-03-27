import {
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  Cog,
  Compass,
  Factory,
  Gauge,
  Layers,
  LineChart,
  type LucideIcon,
  PenTool,
  Rocket,
  Target,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react';
import type { EngagementIcon } from '@/data/how-we-work';
import type { IndustryIcon } from '@/data/industries';
import type { ServiceIcon } from '@/data/services';
import type { SolutionIcon } from '@/data/solutions';

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  LineChart,
  Cog,
  Rocket,
  Bot,
};

export const solutionIcons: Record<SolutionIcon, LucideIcon> = {
  Compass,
  Bot,
  Gauge,
  Layers,
  TrendingUp,
};

export const industryIcons: Record<IndustryIcon, LucideIcon> = {
  Factory,
  Briefcase,
  Building2,
  Target,
};

export const engagementIcons: Record<EngagementIcon, LucideIcon> = {
  Zap,
  PenTool,
  Wrench,
  BarChart3,
};
