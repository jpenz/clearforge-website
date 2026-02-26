import { LineChart, Cog, Rocket, Bot } from "lucide-react";
import type { ServiceIcon } from "@/data/services";

export const serviceIcons: Record<ServiceIcon, typeof LineChart> = {
  LineChart,
  Cog,
  Rocket,
  Bot,
};
