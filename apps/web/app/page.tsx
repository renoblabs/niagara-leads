/* eslint react/no-unescaped-entities: 0 */
import Link from 'next/link';

export default function HomePage() {
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
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>Get Pre-Approved Without the Hassle</h1>
            <p>Fast, no hard credit pull. Find your next car with flexible financing options.</p>
            <Link href="/finder" className="cta-button">
              See Your Buying Power
            </Link>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="container">
          <div className="trust-badges">
            <div className="badge">
              <div className="badge-icon">✓</div>
              <div>No Hard Credit Pull</div>
            </div>
            <div className="badge">
              <div className="badge-icon">⚡</div>
              <div>Instant Results</div>
            </div>
            <div className="badge">
              <div className="badge-icon">🔒</div>
              <div>Secure & Private</div>
            </div>
            <div className="badge">
              <div className="badge-icon">🚗</div>
              <div>All Credit Types</div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#f9fafb', marginTop: '2rem' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>How It Works</h2>
            <div className="grid grid-3">
              <div className="card">
                <h3>1. Get Pre-Approved</h3>
                <p>Answer a few quick questions about your budget and credit profile. Takes less than 2 minutes.</p>
              </div>
              <div className="card">
                <h3>2. See Your Options</h3>
                <p>Get matched with vehicles that fit your budget and financing needs from our inventory.</p>
              </div>
              <div className="card">
                <h3>3. Drive Home Happy</h3>
                <p>Connect with our team to finalize your purchase and drive away in your new car.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ padding: '3rem 1rem' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Why Choose Us</h2>
            <div className="grid grid-3">
              <div className="stat">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat">
                <div className="stat-number">$500M+</div>
                <div className="stat-label">In Financing Approved</div>
              </div>
              <div className="stat">
                <div className="stat-number">98%</div>
                <div className="stat-label">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#f9fafb' }}>
          <div className="container" style={{ maxWidth: '700px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>What Our Customers Say</h2>
            
            <div className="testimonial">
              <div className="testimonial-text">
                "I was worried about my credit, but the team was so helpful. I got approved and found the perfect car in just a few days!"
              </div>
              <div className="testimonial-author">— Sarah M., Toronto</div>
            </div>

            <div className="testimonial">
              <div className="testimonial-text">
                "The process was incredibly simple. No pressure, no hidden fees. I'd recommend them to anyone looking for a car."
              </div>
              <div className="testimonial-author">— James T., Niagara Falls</div>
            </div>

            <div className="testimonial">
              <div className="testimonial-text">
                "Best experience I've had buying a car. The financing options were flexible and the staff was knowledgeable."
              </div>
              <div className="testimonial-author">— Maria G., Hamilton</div>
            </div>
          </div>
        </section>

        {/* Featured Inventory */}
        <section style={{ padding: '3rem 1rem' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Featured Vehicles</h2>
            <div className="grid grid-3">
              <div className="card">
                <div style={{ backgroundColor: '#e5e7eb', height: '200px', borderRadius: '0.375rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>
                    Vehicle Image
                  </div>
                </div>
                <h3>2022 Honda Civic</h3>
                <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Automatic • 45,000 km</p>
                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb', marginBottom: '1rem' }}>$18,995</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>From $299/month</p>
                <Link href="/inventory/1" className="secondary-button" style={{ display: 'inline-block' }}>
                  View Details
                </Link>
              </div>

              <div className="card">
                <div style={{ backgroundColor: '#e5e7eb', height: '200px', borderRadius: '0.375rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>
                    Vehicle Image
                  </div>
                </div>
                <h3>2021 Toyota Corolla</h3>
                <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Automatic • 32,000 km</p>
                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb', marginBottom: '1rem' }}>$21,495</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>From $349/month</p>
                <Link href="/inventory/2" className="secondary-button" style={{ display: 'inline-block' }}>
                  View Details
                </Link>
              </div>

              <div className="card">
                <div style={{ backgroundColor: '#e5e7eb', height: '200px', borderRadius: '0.375rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>
                    Vehicle Image
                  </div>
                </div>
                <h3>2023 Mazda3</h3>
                <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Automatic • 15,000 km</p>
                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb', marginBottom: '1rem' }}>$24,995</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>From $399/month</p>
                <Link href="/inventory/3" className="secondary-button" style={{ display: 'inline-block' }}>
                  View Details
                </Link>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/inventory" className="cta-button">
                Browse All Vehicles
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#2563eb', color: 'white', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Find Your Next Car?</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.95 }}>
              Get pre-approved in minutes. No hard credit pull. No surprises.
            </p>
            <Link href="/finder" className="cta-button" style={{ backgroundColor: '#10b981' }}>
              Start Pre-Approval Now
            </Link>
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
