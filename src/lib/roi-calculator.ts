export interface ROIInputs {
  annualRevenue: number;
  employees: number;
  manualHoursPerWeek: number;
  industry: string;
}

export interface ROIResult {
  estimatedAnnualValue: number;
  timeReclaimed: number;
  errorReduction: number;
  productivityGain: number;
  breakdown: {
    laborSavings: number;
    errorSavings: number;
    productivityValue: number;
  };
}

const industryMultipliers: Record<
  string,
  { labor: number; error: number; productivity: number }
> = {
  manufacturing: { labor: 1.2, error: 1.3, productivity: 1.1 },
  "professional-services": { labor: 1.0, error: 1.1, productivity: 1.3 },
  "financial-services": { labor: 1.1, error: 1.4, productivity: 1.2 },
  technology: { labor: 0.9, error: 1.0, productivity: 1.4 },
  healthcare: { labor: 1.1, error: 1.5, productivity: 1.1 },
  retail: { labor: 1.3, error: 1.2, productivity: 1.0 },
  logistics: { labor: 1.3, error: 1.2, productivity: 1.1 },
  other: { labor: 1.0, error: 1.1, productivity: 1.1 },
};

export const industries = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "professional-services", label: "Professional Services" },
  { value: "financial-services", label: "Financial Services" },
  { value: "technology", label: "Technology / Software" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail / E-commerce" },
  { value: "logistics", label: "Logistics / Supply Chain" },
  { value: "other", label: "Other" },
];

export function calculateROI(inputs: ROIInputs): ROIResult {
  const { annualRevenue, employees, manualHoursPerWeek, industry } = inputs;
  const multiplier = industryMultipliers[industry] || industryMultipliers.other;

  // Average fully-loaded cost per employee hour (~$45 for mid-market)
  const costPerHour = 45;

  // Assume AI can automate 40-60% of manual hours
  const automationRate = 0.5;
  const hoursAutomated = manualHoursPerWeek * automationRate;
  const weeksPerYear = 50;

  // Labor savings: automated hours * cost per hour * weeks * industry multiplier
  const laborSavings = Math.round(
    hoursAutomated * costPerHour * weeksPerYear * multiplier.labor
  );

  // Error reduction: 1-3% of revenue from manual processes affected
  // Scale down for smaller operations
  const errorRate = 0.015; // 1.5% average
  const processRevenueFraction = Math.min(
    manualHoursPerWeek / (employees * 40),
    0.3
  );
  const errorSavings = Math.round(
    annualRevenue * processRevenueFraction * errorRate * multiplier.error
  );

  // Productivity gain: reclaimed hours redirected to revenue-generating activities
  // Each redirected hour generates proportional revenue value
  const revenuePerEmployeeHour = annualRevenue / (employees * 2000);
  const productivityValue = Math.round(
    hoursAutomated * weeksPerYear * revenuePerEmployeeHour * 0.3 * multiplier.productivity
  );

  const estimatedAnnualValue = laborSavings + errorSavings + productivityValue;
  const timeReclaimed = Math.round(hoursAutomated * weeksPerYear);
  const errorReduction = Math.round(processRevenueFraction * 100 * 0.7);
  const productivityGain = Math.round(
    (hoursAutomated / (employees * 40)) * 100
  );

  return {
    estimatedAnnualValue,
    timeReclaimed,
    errorReduction: Math.min(errorReduction, 85),
    productivityGain: Math.min(productivityGain, 40),
    breakdown: {
      laborSavings,
      errorSavings,
      productivityValue,
    },
  };
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`;
  }
  return `$${value.toLocaleString()}`;
}
