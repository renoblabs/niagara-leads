type Props = { searchParams?: Record<string, string | string[]> };

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
    <section>
      <h2>Get Your Buying Power</h2>
      <p>Fast, no hard credit pull. We’ll follow up with options that fit your budget.</p>
      <form method="POST" action="/api/lead" style={{ display: 'grid', gap: '0.75rem' }}>
        <input type="hidden" name="utm_source" value={utm_source} />
        <input type="hidden" name="utm_medium" value={utm_medium} />
        <input type="hidden" name="utm_campaign" value={utm_campaign} />
        <input type="hidden" name="utm_term" value={utm_term} />
        <input type="hidden" name="utm_content" value={utm_content} />
        <input type="hidden" name="source_path" value="/finder" />
        <input type="hidden" name="consent_copy" value={consentCopy} />
        {/* Honeypot */}
        <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        <label>
          First name
          <input name="first_name" required placeholder="Jane" />
        </label>
        <label>
          Last name
          <input name="last_name" required placeholder="Doe" />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="jane@example.com" />
        </label>
        <label>
          Phone
          <input name="phone" placeholder="905-555-0123" />
        </label>

        <fieldset style={{ border: '1px solid #e5e7eb', padding: '0.75rem' }}>
          <legend>Budget</legend>
          <label>
            Monthly payment target ($)
            <input name="finance[down_payment]" placeholder="500" />
          </label>
          <label>
            Income band
            <select name="finance[income_band]" defaultValue="medium">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            Credit range
            <select name="finance[credit_band]" defaultValue="fair">
              <option value="excellent">720+</option>
              <option value="good">620-719</option>
              <option value="fair">520-619</option>
              <option value="rebuild">Under 520</option>
            </select>
          </label>
        </fieldset>

        <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <input type="checkbox" name="consent" required />
          <span>{consentCopy}</span>
        </label>

        <button type="submit" style={{ padding: '0.75rem 1rem' }}>See My Buying Power</button>
      </form>
    </section>
  );
}
