import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL as string | undefined;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE as string | undefined;

if (!SUPABASE_URL) {
  console.warn('SUPABASE_URL is not set');
}
if (!SUPABASE_SERVICE_ROLE) {
  console.warn('SUPABASE_SERVICE_ROLE is not set');
}

export const supabaseAdmin = SUPABASE_URL && SUPABASE_SERVICE_ROLE
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

export type LeadInsert = {
  source_domain?: string | null;
  source_path?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  postal_code?: string | null;
  vehicle_interest?: any;
  finance?: any;
  consent?: boolean | null;
  consent_ts?: string | null;
  ip?: string | null;
  ua?: string | null;
  lead_score?: number | null;
  tier?: string | null;
  status?: string | null;
};
