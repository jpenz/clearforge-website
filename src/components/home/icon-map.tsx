import { Gauge, LineChart, type LucideIcon, Search, Target, Users, Workflow } from 'lucide-react';

export type HomeIconName = 'gauge' | 'line-chart' | 'search' | 'target' | 'users' | 'workflow';

export const homeIcons: Record<HomeIconName, LucideIcon> = {
  gauge: Gauge,
  'line-chart': LineChart,
  search: Search,
  target: Target,
  users: Users,
  workflow: Workflow,
};
