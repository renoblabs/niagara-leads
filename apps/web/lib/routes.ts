import { supabaseAdmin } from './supabase';
import { resolveRouteFromEnv } from './env';

export async function resolveOfferDestination(offer: string): Promise<string | null> {
  const fromEnv = resolveRouteFromEnv(offer);
  if (fromEnv) return fromEnv;
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from('routes')
    .select('dest_url')
    .eq('offer', offer)
    .maybeSingle();
  if (error) {
    console.warn('resolveOfferDestination error', error.message);
    return null;
  }
  return data?.dest_url ?? null;
}

export function appendUTMs(baseUrl: string, params: URLSearchParams): string {
  const url = new URL(baseUrl);
  for (const [k, v] of params.entries()) {
    if (k.startsWith('utm_') || k === 'lead_id') {
      url.searchParams.set(k, v);
    }
  }
  return url.toString();
}

export function originAllowed(origin: string | null | undefined, allowed: string[]): boolean {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    const host = url.host.toLowerCase();
    return allowed.some((o) => {
      const ohost = new URL(o).host.toLowerCase();
      return host === ohost || host.endsWith(`.${ohost}`);
    });
  } catch {
    return false;
  }
}
