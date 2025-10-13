import { NextResponse } from 'next/server';
import { supabaseAdmin, type LeadInsert } from '@/lib/supabase';
import { computeLeadScore, normalizePayload, tierForScore, extractUTMs } from '@/lib/lead';
import { getAllowedOrigins } from '@/lib/env';
import { originAllowed } from '@/lib/routes';

async function parseBody(req: Request): Promise<any> {
  const ct = req.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return await req.json();
  }
  if (ct.includes('application/x-www-form-urlencoded')) {
    const text = await req.text();
    const params = new URLSearchParams(text);
    const obj: Record<string, any> = {};
    for (const [k, v] of params.entries()) obj[k] = v;
    return obj;
  }
  // attempt JSON then fallback to text
  try {
    return await req.json();
  } catch {
    return {};
  }
}

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  const allowed = getAllowedOrigins();
  if (allowed.length > 0 && !originAllowed(origin, allowed)) {
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
  }

  const raw = await parseBody(req);
  const payload = normalizePayload(raw);

  // Honeypot
  if (payload.website) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const score = computeLeadScore(payload);
  const tier = tierForScore(score);

  const forwardedFor = req.headers.get('x-forwarded-for') || '';
  const ip = forwardedFor.split(',')[0]?.trim() || null;
  const ua = req.headers.get('user-agent') || null;

  const utms = extractUTMs(payload);

  const insert: LeadInsert = {
    source_domain: payload.source_domain ?? (origin ? new URL(origin).host : null),
    source_path: payload.source_path ?? null,
    ...utms,
    first_name: payload.first_name ?? null,
    last_name: payload.last_name ?? null,
    email: payload.email ?? null,
    phone: payload.phone ?? null,
    city: payload.city ?? null,
    postal_code: payload.postal_code ?? null,
    vehicle_interest: payload.vehicle_interest ?? null,
    finance: payload.finance ?? null,
    consent: Boolean(payload.consent) || false,
    consent_ts: Boolean(payload.consent) ? new Date().toISOString() : null,
    ip,
    ua,
    lead_score: score,
    tier,
    status: 'new',
  };

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin.from('leads').insert(insert).select('id').single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const lead_id = data?.id as string | undefined;

  // Record consent copy if provided
  if (lead_id && insert.consent && payload.consent_copy) {
    await supabaseAdmin.from('consents').insert({ lead_id, copy: payload.consent_copy, ip });
  }

  // Tier A webhook
  if (tier === 'A' && process.env.DEALER_WEBHOOK_URL) {
    try {
      await fetch(process.env.DEALER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id, ...payload, score, tier, ip, ua }),
      });
      await supabaseAdmin.from('events').insert({ lead_id, kind: 'dealer_webhook_sent', data: { url: process.env.DEALER_WEBHOOK_URL } });
    } catch (e: any) {
      await supabaseAdmin.from('events').insert({ lead_id, kind: 'dealer_webhook_error', data: { message: String(e?.message || e) } });
    }
  }

  return NextResponse.json({ ok: true, id: lead_id, score, tier });
}
