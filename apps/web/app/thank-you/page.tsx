/* eslint react/no-unescaped-entities: 0 */
import Link from 'next/link';

export const metadata = {
  title: 'Thank You - Niagara Auto Finder',
  description: 'Your pre-approval request has been received.',
};

export default function ThankYouPage() {
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
        <section style={{ padding: '4rem 1rem', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
            {/* Success Icon */}
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>✓</div>

            {/* Heading */}
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#10b981' }}>
              Thank You!
            </h1>

            {/* Message */}
            <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '2rem', lineHeight: '1.8' }}>
              Your pre-approval request has been received. Our team will review your information and contact you within 24 hours with your personalized financing options.
            </p>

            {/* Next Steps */}
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: '0.5rem', padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
              <h3 style={{ marginBottom: '1rem', color: '#15803d' }}>What Happens Next</h3>
              <ol style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Review:</strong> Our team reviews your pre-approval request
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Contact:</strong> We'll call or email you with your financing options
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Browse:</strong> Start shopping from our inventory with confidence
                </li>
                <li>
                  <strong>Drive:</strong> Schedule a test drive and drive home in your new car
                </li>
              </ol>
            </div>

            {/* Contact Info */}
            <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '2rem' }}>
              <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                Questions? Contact us anytime:
              </p>
              <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937' }}>
                📞 (905) 555-0123 | 📧 support@niagaraautofinder.com
              </p>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <Link href="/inventory" className="primary-button" style={{ display: 'block', textAlign: 'center', padding: '1rem' }}>
                Browse Inventory
              </Link>
              <Link href="/" className="secondary-button" style={{ display: 'block', textAlign: 'center', padding: '1rem' }}>
                Back to Home
              </Link>
            </div>

            {/* Offer Section */}
            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#1e40af' }}>Exclusive Offer</h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                As a valued pre-approved customer, you're eligible for special financing rates and exclusive inventory access.
              </p>
              <Link href="/inventory" className="primary-button">
                View Exclusive Deals
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#f9fafb' }}>
          <div className="container" style={{ maxWidth: '700px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', textAlign: 'center' }}>Common Questions</h2>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#1f2937' }}>When will I hear from you?</h3>
              <p style={{ color: '#6b7280' }}>
                Our team typically contacts customers within 24 hours during business hours (Monday-Friday, 9 AM - 6 PM EST).
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#1f2937' }}>What if I don't hear back?</h3>
              <p style={{ color: '#6b7280' }}>
                Please check your email spam folder or give us a call at (905) 555-0123. We want to help you get approved!
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#1f2937' }}>Can I change my information?</h3>
              <p style={{ color: '#6b7280' }}>
                Absolutely! Contact our team and we'll update your pre-approval details. You can also submit a new application anytime.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#1f2937' }}>Is my information secure?</h3>
              <p style={{ color: '#6b7280' }}>
                Yes. We use industry-standard encryption and never share your personal information with third parties without your consent.
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

