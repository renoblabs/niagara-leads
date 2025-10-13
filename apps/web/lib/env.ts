export function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export function getAllowedOrigins(): string[] {
  const raw = process.env.ALLOWED_ORIGINS || '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function resolveRouteFromEnv(offer: string): string | null {
  const key = `ROUTE_${offer.toUpperCase()}`;
  return process.env[key] || null;
}
