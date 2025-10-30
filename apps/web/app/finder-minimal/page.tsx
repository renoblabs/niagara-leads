import Link from 'next/link';

type Props = { searchParams?: Record<string, string | string[]> };

export const metadata = {
  title: 'Quick Pre-Approval - Niagara Auto Finder',
  description: 'Get pre-approved for car financing in minutes with our quick 3-step form.',
};

export default function FinderMinimalPage({ searchParams = {} }: Props) {
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
            <Link href="/finder">Full Pre-Approval</Link>
          </div>
        </nav>
      </header>

      <main>
        <section style={{ padding: '2rem 1rem', backgroundColor: '#f9fafb' }}>
          <div className="container" style={{ maxWidth: '450px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              Quick Pre-Approval in 60 Seconds
            </h1>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem', fontSize: '1.1rem' }}>
              The fastest way to see your buying power. No hard credit pull.
            </p>

            <form method="POST" action="/api/lead" style={{ display: 'grid', gap: '1rem' }}>
              {/* Hidden UTM fields */}
              <input type="hidden" name="utm_source" value={utm_source} />
              <input type="hidden" name="utm_medium" value={utm_medium} />
              <input type="hidden" name="utm_campaign" value={utm_campaign} />
              <input type="hidden" name="utm_term" value={utm_term} />
              <input type="hidden" name="utm_content" value={utm_content} />
              <input type="hidden" name="source_path" value="/finder-minimal" />
              <input type="hidden" name="consent_copy" value={consentCopy} />

              {/* Honeypot */}
              <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* Minimal Fields */}
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

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="jane@example.com"
                  style={{ width: '100%' }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="vehicle_interest">Vehicle Interest (Make & Model)</label>
                <input
                  id="vehicle_interest"
                  type="text"
                  name="vehicle_interest[make]"
                  placeholder="e.g., Honda Civic or SUV"
                  style={{ width: '100%' }}
                />
              </div>

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
              <button type="submit" className="primary-button" style={{ width: '100%', padding: '1rem', backgroundColor: '#10b981' }}>
                Unlock My Buying Power Now
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6b7280' }}>
                Your information is secure. We will contact you with your pre-approval status.
              </p>
            </form>

            {/* Trust Indicators */}
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                ✓ No hard credit pull • ✓ Fast & Easy • ✓ 100% secure
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

