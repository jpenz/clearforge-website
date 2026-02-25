import {
  Search,
  PenTool,
  Rocket,
  BarChart3,
  Bot,
  Compass,
  Gauge,
  Layers,
  TrendingUp,
  Factory,
  Briefcase,
  Building2,
  Target,
  Zap,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/data/services";
import type { SolutionIcon } from "@/data/solutions";
import type { IndustryIcon } from "@/data/industries";
import type { EngagementIcon } from "@/data/how-we-work";

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  Search,
  PenTool,
  Rocket,
  BarChart3,
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
