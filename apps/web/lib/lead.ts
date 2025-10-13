export type LeadPayload = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  postal_code?: string;
  vehicle_interest?: {
    make?: string;
    model?: string;
    budget?: number | string;
  };
  finance?: {
    income_band?: string;
    job_length?: string;
    down_payment?: number | string;
    credit_band?: string;
  };
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  source_domain?: string;
  source_path?: string;
  consent?: boolean | string;
  consent_copy?: string;
  website?: string; // honeypot
};

export function computeLeadScore(p: LeadPayload): number {
  let score = 0;
  if (p.phone) score += 5;
  if (p.email) score += 5;
  const dp = Number((p.finance as any)?.down_payment ?? 0);
  if (!isNaN(dp) && dp > 0) score += 5;
  const income = (p.finance as any)?.income_band;
  if (income && income.toLowerCase() !== 'low') score += 5;
  return score;
}

export function tierForScore(score: number): 'A' | 'B' | 'C' {
  if (score >= 15) return 'A';
  if (score >= 8) return 'B';
  return 'C';
}

export function normalizePayload(input: any): LeadPayload {
  // Flatten bracket notation like finance[down_payment]
  const p: any = { ...input };
  for (const [k, v] of Object.entries(input || {})) {
    const m = k.match(/^(\w+)\[(\w+)\]$/);
    if (m) {
      const [, obj, key] = m;
      p[obj] = p[obj] || {};
      (p[obj] as any)[key] = v;
    }
  }
  // Coerce booleans
  if (typeof p.consent === 'string') {
    const s = p.consent.toLowerCase();
    p.consent = s === 'true' || s === '1' || s === 'on' || s === 'yes';
  }
  // Build utm object from either nested or flat
  p.utm = p.utm || {
    source: p.utm_source,
    medium: p.utm_medium,
    campaign: p.utm_campaign,
    term: p.utm_term,
    content: p.utm_content,
  };
  return p as LeadPayload;
}

export function extractUTMs(p: LeadPayload) {
  return {
    utm_source: p.utm?.source ?? p.utm_source ?? null,
    utm_medium: p.utm?.medium ?? p.utm_medium ?? null,
    utm_campaign: p.utm?.campaign ?? p.utm_campaign ?? null,
    utm_term: p.utm?.term ?? p.utm_term ?? null,
    utm_content: p.utm?.content ?? p.utm_content ?? null,
  };
}
