import { NextResponse } from 'next/server';
import { resolveOfferDestination, appendUTMs } from '@/lib/routes';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offer = (searchParams.get('offer') || '').toLowerCase();
  const lead_id = searchParams.get('lead_id');
  if (!offer) return NextResponse.json({ error: 'offer required' }, { status: 400 });

  const dest = await resolveOfferDestination(offer);
  if (!dest) return NextResponse.json({ error: 'route not found' }, { status: 404 });

  const location = appendUTMs(dest, searchParams);

  const forwardedFor = req.headers.get('x-forwarded-for') || '';
  const ip = forwardedFor.split(',')[0]?.trim() || null;
  const ua = req.headers.get('user-agent') || null;

  // Log click
  if (supabaseAdmin) {
    const utms: Record<string, string> = {};
    for (const [k, v] of searchParams.entries()) {
      if (k.startsWith('utm_')) utms[k] = v;
    }
    await supabaseAdmin.from('clicks').insert({ lead_id, offer, url: location, utms, ip, ua });
  }

  return NextResponse.redirect(location, { status: 302 });
}
