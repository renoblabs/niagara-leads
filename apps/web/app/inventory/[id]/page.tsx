import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[]>;
};

// Mock vehicle data
const vehicleData: Record<string, any> = {
  '1': {
    id: 1,
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    price: 18995,
    monthlyPayment: 299,
    km: 45000,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    body: 'Sedan',
    color: 'Silver',
    features: ['Backup Camera', 'Bluetooth', 'Power Windows', 'Air Conditioning', 'Cruise Control'],
    description: 'Well-maintained Honda Civic with low mileage. Perfect for daily commuting with excellent fuel efficiency.',
  },
  '2': {
    id: 2,
    make: 'Toyota',
    model: 'Corolla',
    year: 2021,
    price: 21495,
    monthlyPayment: 349,
    km: 32000,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    body: 'Sedan',
    color: 'Black',
    features: ['Backup Camera', 'Bluetooth', 'Power Windows', 'Air Conditioning', 'Cruise Control', 'ABS'],
    description: 'Reliable Toyota Corolla with excellent maintenance history. Known for durability and low cost of ownership.',
  },
  '3': {
    id: 3,
    make: 'Mazda',
    model: '3',
    year: 2023,
    price: 24995,
    monthlyPayment: 399,
    km: 15000,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    body: 'Sedan',
    color: 'Red',
    features: ['Backup Camera', 'Bluetooth', 'Power Windows', 'Air Conditioning', 'Cruise Control', 'ABS', 'Alloy Wheels'],
    description: 'Newer Mazda3 with low mileage. Stylish design combined with modern features and excellent performance.',
  },
};

export default function VehicleDetailPage({ params, searchParams = {} }: Props) {
  const vehicle = vehicleData[params.id] || vehicleData['1'];

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
        {/* Breadcrumb */}
        <section style={{ padding: '1rem', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
          <div className="container">
            <Link href="/inventory" style={{ color: '#2563eb' }}>
              ← Back to Inventory
            </Link>
          </div>
        </section>

        {/* Vehicle Details */}
        <section style={{ padding: '3rem 1rem' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div className="grid grid-2" style={{ gap: '3rem' }}>
              {/* Left: Image Gallery */}
              <div>
                <div
                  style={{
                    backgroundColor: '#e5e7eb',
                    height: '400px',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    fontSize: '1.2rem',
                    marginBottom: '1rem',
                  }}
                >
                  {vehicle.year} {vehicle.make} {vehicle.model} - Main Image
                </div>
                <div className="grid grid-3" style={{ gap: '0.5rem' }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: '#e5e7eb',
                        height: '100px',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9ca3af',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                    >
                      Image {i}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Details & CTA */}
              <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>

                {/* Price */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.5rem' }}>
                    ${vehicle.price.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '1.1rem', color: '#6b7280' }}>
                    From ${vehicle.monthlyPayment}/month with approved financing
                  </div>
                </div>

                {/* Key Specs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  <div className="card">
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>Transmission</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{vehicle.transmission}</div>
                  </div>
                  <div className="card">
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>Fuel Type</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{vehicle.fuel}</div>
                  </div>
                  <div className="card">
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>Mileage</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{vehicle.km.toLocaleString()} km</div>
                  </div>
                  <div className="card">
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>Color</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{vehicle.color}</div>
                  </div>
                </div>

                {/* Features */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Features</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {vehicle.features.map((feature: string) => (
                      <div key={feature} style={{ padding: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                        ✓ {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <Link
                    href={`/finder?vehicleId=${vehicle.id}`}
                    className="primary-button"
                    style={{ display: 'block', textAlign: 'center', padding: '1rem' }}
                  >
                    Check Approval for This Vehicle
                  </Link>
                  <Link
                    href="/inventory"
                    className="secondary-button"
                    style={{ display: 'block', textAlign: 'center', padding: '1rem' }}
                  >
                    View More Vehicles
                  </Link>
                </div>

                {/* Trust Info */}
                <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                    ✓ All vehicles inspected • ✓ Warranty available • ✓ Flexible financing
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>About This Vehicle</h2>
              <p style={{ color: '#6b7280', lineHeight: '1.8' }}>{vehicle.description}</p>
            </div>
          </div>
        </section>

        {/* Related Vehicles */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#f9fafb' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', textAlign: 'center' }}>Similar Vehicles</h2>
            <div className="grid grid-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card">
                  <div
                    style={{
                      backgroundColor: '#e5e7eb',
                      height: '150px',
                      borderRadius: '0.375rem',
                      marginBottom: '1rem',
                    }}
                  />
                  <h3>Similar Vehicle {i}</h3>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Automatic • Low mileage</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.5rem' }}>
                    $19,995
                  </p>
                  <Link href="/inventory/1" className="secondary-button" style={{ display: 'inline-block' }}>
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: '3rem 1rem', backgroundColor: '#2563eb', color: 'white', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Ready to Drive Home?</h2>
            <p style={{ fontSize: '1.05rem', marginBottom: '2rem', opacity: 0.95 }}>
              Get pre-approved in minutes and schedule a test drive.
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

