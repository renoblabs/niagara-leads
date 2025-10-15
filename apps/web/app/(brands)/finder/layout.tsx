export default function FinderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ margin: 0 }}>Niagara Auto Finder</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Find your next car without the hype.</p>
        </header>
        <main style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>{children}</main>
      </body>
    </html>
  );
}
