import { describe, it, expect } from 'vitest';
import { computeLeadScore, tierForScore, normalizePayload } from '@/lib/lead';

describe('lead scoring', () => {
  it('scores by phone, email, down_payment, income', () => {
    const p = normalizePayload({
      email: 'a@b.com',
      phone: '123',
      'finance[down_payment]': '500',
      'finance[income_band]': 'mid',
    });
    expect(computeLeadScore(p)).toBe(20);
  });

  it('tiers correctly', () => {
    expect(tierForScore(15)).toBe('A');
    expect(tierForScore(8)).toBe('B');
    expect(tierForScore(3)).toBe('C');
  });
});
