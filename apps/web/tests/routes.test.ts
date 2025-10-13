import { describe, it, expect } from 'vitest';
import { appendUTMs, originAllowed } from '@/lib/routes';

describe('routes helpers', () => {
  it('appends UTM params and lead_id', () => {
    const base = 'https://dest.example.com/path?foo=bar';
    const params = new URLSearchParams({ utm_source: 'fb', lead_id: '123' });
    const out = appendUTMs(base, params);
    expect(out).toContain('foo=bar');
    expect(out).toContain('utm_source=fb');
    expect(out).toContain('lead_id=123');
  });

  it('originAllowed exact and subdomain match', () => {
    const allowed = ['https://example.com'];
    expect(originAllowed('https://example.com', allowed)).toBe(true);
    expect(originAllowed('https://sub.example.com', allowed)).toBe(true);
    expect(originAllowed('https://evil.com', allowed)).toBe(false);
  });
});
