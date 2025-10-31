import React from 'react'

// Simple consent gate that stores a flag in localStorage.
// When consent is granted, it renders children (analytics scripts).
// Shows a minimal banner until consent is given or dismissed.

"use client"

type Props = { children?: React.ReactNode }

export default function ConsentGate({ children }: Props) {
  const [consented, setConsented] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    try {
      const v = window.localStorage.getItem('consent')
      setConsented(v === 'true')
    } catch {
      setConsented(false)
    }
  }, [])

  const accept = () => {
    try {
      window.localStorage.setItem('consent', 'true')
    } catch {}
    setConsented(true)
    // Optional: push event for GTM
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({ event: 'consent_granted' })
  }

  const decline = () => {
    try {
      window.localStorage.setItem('consent', 'false')
    } catch {}
    setConsented(false)
  }

  return (
    <>
      {consented ? children : null}
      {consented === false || consented === null ? (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
          background: '#111827', color: 'white', padding: '1rem'
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ opacity: 0.9 }}>
              We use cookies for analytics and to improve your experience. You can change your choice anytime.
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={decline} style={{ background: '#374151', color: 'white', padding: '0.5rem 1rem', borderRadius: 6 }}>Decline</button>
              <button onClick={accept} className="primary-button" style={{ padding: '0.5rem 1rem' }}>Allow</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
