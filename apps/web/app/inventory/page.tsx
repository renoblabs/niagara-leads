import Link from 'next/link';

export const metadata = {
  title: 'Vehicle Inventory - Niagara Auto Finder',
  description: 'Browse our selection of used vehicles with flexible financing options.',
};

// Mock inventory data - in a real app, this would come from a database
const vehicles = [
  {
    id: 1,
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    price: 18995,
    monthlyPayment: 299,
    km: 45000,
    transmission: 'Automatic',
    fuel: 'Gasoline',
  },
  {
    id: 2,
    make: 'Toyota',
    model: 'Corolla',
    year: 2021,
    price: 21495,
    monthlyPayment: 349,
    km: 32000,
    transmission: 'Automatic',
    fuel: 'Gasoline',
  },
  {
    id: 3,
    make: 'Mazda',
    model: '3',
    year: 2023,
    price: 24995,
    monthlyPayment: 399,
    km: 15000,
    transmission: 'Automatic',
    fuel: 'Gasoline',
  },
  {
    id: 4,
    make: 'Ford',
    model: 'Focus',
    year: 2020,
    price: 16495,
    monthlyPayment: 269,
    km: 58000,
    transmission: 'Automatic',
    fuel: 'Gasoline',
  },
  {
    id: 5,
    make: 'Hyundai',
    model: 'Elantra',
    year: 2022,
    price: 19995,
    monthlyPayment: 319,
    km: 38000,
    transmission: 'Automatic',
    fuel: 'Gasoline',
  },
  {
    id: 6,
    make: 'Kia',
    model: 'Forte',
    year: 2021,
    price: 20495,
    monthlyPayment: 329,
    km: 42000,
    transmission: 'Automatic',
    fuel: 'Gasoline',
  },
];

export default function InventoryPage() {
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
        {/* Page Header */}
        <section style={{ padding: '2rem 1rem', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
          <div className="container">
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Our Inventory</h1>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              Browse {vehicles.length} vehicles available with flexible financing options
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section style={{ padding: '2rem 1rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
          <div className="container">
            <div className="grid grid-3" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label>Make</label>
                <select style={{ width: '100%' }}>
                  <option>All Makes</option>
                  <option>Honda</option>
                  <option>Toyota</option>
                  <option>Mazda</option>
                  <option>Ford</option>
                  <option>Hyundai</option>
                  <option>Kia</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price Range</label>
                <select style={{ width: '100%' }}>
                  <option>All Prices</option>
                  <option>Under $15,000</option>
                  <option>$15,000 - $20,000</option>
                  <option>$20,000 - $25,000</option>
                  <option>$25,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label>Monthly Payment</label>
                <select style={{ width: '100%' }}>
                  <option>Any Payment</option>
                  <option>Under $300</option>
                  <option>$300 - $400</option>
                  <option>$400+</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Inventory Grid */}
        <section style={{ padding: '3rem 1rem' }}>
          <div className="container">
            <div className="grid grid-3">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="card">
                  {/* Vehicle Image Placeholder */}
                  <div
                    style={{
                      backgroundColor: '#e5e7eb',
                      height: '200px',
                      borderRadius: '0.375rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                    }}
                  >
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </div>

                  {/* Vehicle Details */}
                  <h3 style={{ marginBottom: '0.5rem' }}>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
                    <div>
                      <span style={{ fontWeight: '500' }}>Transmission:</span> {vehicle.transmission}
                    </div>
                    <div>
                      <span style={{ fontWeight: '500' }}>Fuel:</span> {vehicle.fuel}
                    </div>
                    <div>
                      <span style={{ fontWeight: '500' }}>Mileage:</span> {vehicle.km.toLocaleString()} km
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.25rem' }}>
                      ${vehicle.price.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>
                      From ${vehicle.monthlyPayment}/month
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href={`/inventory/${vehicle.id}`} className="secondary-button" style={{ display: 'block', textAlign: 'center' }}>
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#2563eb', color: 'white', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Ready to Get Pre-Approved?</h2>
            <p style={{ fontSize: '1.05rem', marginBottom: '2rem', opacity: 0.95 }}>
              Get approved in minutes and start shopping with confidence.
            </p>
            <Link href="/finder" className="cta-button" style={{ backgroundColor: '#10b981' }}>
              Get Pre-Approved Now
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

