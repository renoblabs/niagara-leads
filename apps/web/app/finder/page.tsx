import Link from 'next/link';

type Props = { searchParams?: Record<string, string | string[]> };

export const metadata = {
  title: 'Get Pre-Approved - Niagara Auto Finder',
  description: 'Get pre-approved for car financing in minutes. No hard credit pull required.',
};

export default function FinderPage({ searchParams = {} }: Props) {
  const qp = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v || '';
  };

  const utm_source = qp('utm_source');
  const utm_medium = qp('utm_medium');
  const utm_campaign = qp('utm_campaign');
  const utm_term = qp('utm_term');
  const utm_content = qp('utm_content');

  const consentCopy =
    'By submitting, you agree to be contacted by Niagara Auto Finder by phone, text, and email regarding your inquiry. Message/data rates may apply. Consent is not a condition of purchase.';

  return (
    <>
      <header>
        <nav>
          <h1>Niagara Auto Finder</h1>
          <div>
            <Link href="/">Home</Link>
            <Link href="/inventory">Inventory</Link>
            <Link href="/finder">Get Pre-Approved</Link>
          </div>
        </nav>
      </header>

      <main>
        <section style={{ padding: '2rem 1rem', backgroundColor: '#f9fafb' }}>
          <div className="container" style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              See Your Buying Power
            </h1>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Fast, no hard credit pull. We'll follow up with options that fit your budget.
            </p>

            <form method="POST" action="/api/lead" style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Hidden UTM fields */}
              <input type="hidden" name="utm_source" value={utm_source} />
              <input type="hidden" name="utm_medium" value={utm_medium} />
              <input type="hidden" name="utm_campaign" value={utm_campaign} />
              <input type="hidden" name="utm_term" value={utm_term} />
              <input type="hidden" name="utm_content" value={utm_content} />
              <input type="hidden" name="source_path" value="/finder" />
              <input type="hidden" name="consent_copy" value={consentCopy} />

              {/* Honeypot */}
              <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* Personal Information Section */}
              <fieldset>
                <legend>Your Information</legend>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="first_name">First Name *</label>
                    <input
                      id="first_name"
                      type="text"
                      name="first_name"
                      required
                      placeholder="Jane"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name *</label>
                    <input
                      id="last_name"
                      type="text"
                      name="last_name"
                      required
                      placeholder="Doe"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="(905) 555-0123"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      placeholder="Niagara Falls"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postal_code">Postal Code</label>
                    <input
                      id="postal_code"
                      type="text"
                      name="postal_code"
                      placeholder="L2E 1A1"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Vehicle Interest Section */}
              <fieldset>
                <legend>Vehicle Interest</legend>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="vehicle_make">Make (e.g., Honda, Toyota)</label>
                    <input
                      id="vehicle_make"
                      type="text"
                      name="vehicle_interest[make]"
                      placeholder="Honda"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="vehicle_model">Model (e.g., Civic, Corolla)</label>
                    <input
                      id="vehicle_model"
                      type="text"
                      name="vehicle_interest[model]"
                      placeholder="Civic"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="vehicle_budget">Budget ($)</label>
                  <input
                    id="vehicle_budget"
                    type="number"
                    name="vehicle_interest[budget]"
                    placeholder="20000"
                    style={{ width: '100%' }}
                  />
                </div>
              </fieldset>

              {/* Finance Section */}
              <fieldset>
                <legend>Financing Details</legend>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="down_payment">Monthly Payment Target ($)</label>
                    <input
                      id="down_payment"
                      type="number"
                      name="finance[down_payment]"
                      placeholder="350"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="income_band">Income Band</label>
                    <select
                      id="income_band"
                      name="finance[income_band]"
                      defaultValue="medium"
                      style={{ width: '100%' }}
                    >
                      <option value="">Select...</option>
                      <option value="low">Under $30K</option>
                      <option value="medium">$30K - $75K</option>
                      <option value="high">$75K+</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="credit_band">Credit Range</label>
                  <select
                    id="credit_band"
                    name="finance[credit_band]"
                    defaultValue="fair"
                    style={{ width: '100%' }}
                  >
                    <option value="">Select...</option>
                    <option value="excellent">Excellent (720+)</option>
                    <option value="good">Good (620-719)</option>
                    <option value="fair">Fair (520-619)</option>
                    <option value="rebuild">Rebuilding (Under 520)</option>
                  </select>
                </div>
              </fieldset>

              {/* Consent */}
              <div className="form-group">
                <div className="checkbox-group">
                  <input type="checkbox" id="consent" name="consent" required />
                  <label htmlFor="consent">
                    {consentCopy}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="primary-button" style={{ width: '100%', padding: '1rem' }}>
                See My Buying Power
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6b7280' }}>
                Your information is secure and private. We never sell your data.
              </p>
            </form>

            {/* Trust Indicators */}
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                ✓ No hard credit pull • ✓ Instant results • ✓ 100% secure
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ padding: '3rem 1rem' }}>
          <div className="container" style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#1f2937' }}>Will this hurt my credit?</h3>
              <p style={{ color: '#6b7280' }}>
                No. Our pre-qualification process uses a soft credit inquiry, which does not affect your credit score.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#1f2937' }}>How long does the process take?</h3>
              <p style={{ color: '#6b7280' }}>
                You can complete the pre-qualification in under 2 minutes. You'll hear back from our team within 24 hours.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#1f2937' }}>What if I have bad credit?</h3>
              <p style={{ color: '#6b7280' }}>
                We work with all credit profiles. Our team specializes in helping customers with challenging credit histories find the right vehicle and financing.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#1f2937' }}>Is there any obligation?</h3>
              <p style={{ color: '#6b7280' }}>
                No. Getting pre-approved is completely free and comes with no obligation to purchase.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Niagara Auto Finder. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
          By submitting, you agree to our terms and privacy policy.
        </p>
      </footer>
    </>
  );
}

