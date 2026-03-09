import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Server-side client with service role for API routes — null if not configured
let supabaseAdmin: SupabaseClient | null = null;
if (supabaseUrl && serviceRoleKey) {
  supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
}

export interface AssessmentLead {
  id?: string;
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  challenge: string;
  company_url?: string;
  phone?: string;
  composite_score: number;
  maturity_level: string;
  pillar_scores: Record<string, number>;
  suggested_solutions: string[];
  suggested_engagement: string;
  closer_report: string;
  company_research: string;
  industry_best_in_class: string;
  source: string;
  created_at?: string;
}

export async function saveAssessmentLead(lead: AssessmentLead): Promise<string | null> {
  if (!supabaseAdmin) {
    console.warn("Supabase not configured; skipping lead save.");
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("assessment_leads")
    .insert(lead)
    .select("id")
    .single();

  if (error) {
    console.error("Failed to save assessment lead:", error);
    return null;
  }

  return data?.id ?? null;
}

export async function saveContactLead(lead: {
  name: string;
  email: string;
  company: string;
  revenue?: string;
  message: string;
  source: string;
}): Promise<string | null> {
  if (!supabaseAdmin) {
    console.warn("Supabase not configured; skipping contact lead save.");
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("assessment_leads")
    .insert({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      role: "",
      industry: "",
      challenge: lead.message,
      composite_score: 0,
      maturity_level: "",
      pillar_scores: {},
      suggested_solutions: [],
      suggested_engagement: lead.revenue || "",
      closer_report: "",
      company_research: "",
      industry_best_in_class: "",
      source: lead.source,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to save contact lead:", error);
    return null;
  }

  return data?.id ?? null;
}
