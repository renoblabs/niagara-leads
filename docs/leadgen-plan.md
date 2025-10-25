 # Niagara Lead‑Gen Master Plan (Cohesive)

 Version: 0.1

 This master plan consolidates: (a) brainstorming JSON, (b) Notion pages (sales‑only micro‑brands, GBP ops, site/funnel design, geo tactics), and (c) the live code/API/spec in this repo. It is the operational guide; see docs/leadgen-spec.md for the technical contract.

 ## Scope and Principles
 - Dealer‑first, sales‑only rollout; no hard credit pull; no service hubs in MVP.
 - “Same licence, different buyer lane”: micro‑brands route into the same sales engine.
 - Single site + sub‑directories per micro‑brand; ALLOWED_ORIGINS acts as guardrail.
 - OSS stack: Next.js 14 API, Supabase, Doppler, Vercel. No secrets in code.

 ## Micro‑Brand Strategy (Sales‑Only)
 Pick 2–3 distinct buyer lanes; each gets a sub‑directory and unique phone line.
 Examples:
 - No Hype Used Cars — under‑market value
 - Peace Bridge Auto Deals — cross‑border savings
 - Commuter Cars — QEW/Hamilton commuters

 URL structure (final domain TBD at purchase time):
 - /no-hype, /peace-bridge, /commuter
 - Avoid subdomains; use sub‑directories to qualify for distinct GBPs.

 ## GBP Setup (Per Micro‑Brand)
 - Business name: “Niagara No Hype Used Cars” (no city suffix)
 - Category: Used Car Dealer
 - Address: same lot; add “Suite B/Rear Entrance”
 - Phone: unique Twilio/VoIP line; forwards to sales
 - Hours: slightly different from main desk
 - Website: sub‑directory URL (see above)
 - Content operations: weekly Google Posts, fast message replies, seed a few real reviews, upload photo pack (exterior, interior kiosk, process graphic, team badge)

 ## Architecture Alignment (This Repo)
 - Ingest: POST /api/lead — origin validation, honeypot, normalization, scoring, tiering, Supabase insert, Tier A webhook.
 - Redirect/Tracking: GET /api/go — resolves offer destination from env or routes table; appends UTMs and logs click.
 - Health: GET /api/ping.
 - Config (Doppler): SUPABASE_*, DEALER_WEBHOOK_URL, ALLOWED_ORIGINS, ROUTE_*.
 - Data model: infra/supabase/schema.sql (leads, clicks, routes, events, consents).

 Frontend composition (suggested):
 - Brands as routed folders under app/(brands)/{no-hype, peace-bridge, commuter}
 - Shared components: Hero, Trade‑in estimator, Payment slider, Social proof
 - Minimal compliant form: see docs/forms/credit-min-form.html (posts to /api/lead)

 ## Lead Routing and Dispatch
 - Digital forms: submit to /api/lead; UTM included; honeypot enabled.
 - Calls: brand phone numbers forward to sales; attribute by DID and UTM.
 - Tiering: A (dealer webhook if configured), B/C stored for later partners.

 ## Funnels (Implement incrementally)
 1) Credit Pre‑Qual (no hard pull): minimal form + consent → /api/lead → TY page → optional /api/go offer.
 2) Trade‑In Estimator (later): VIN/photo flow gating results behind contact.
 3) Shop‑by‑Payment (later): sliders → gated results → /api/lead with finance fields.
 4) Fresh‑Start Credit (later targeted page): empathy copy; same API contract.

 All flows must:
 - Capture consent and store consent_copy text; avoid SIN/SSN.
 - Include UTMs; respect bracket notation for nested finance/vehicle fields.

 ## Tracking & KPIs
 - Capture UTMs at lead time; clicks via /api/go.
 - KPIs weekly: submission volume, honeypot drop rate, tier mix, Tier‑A dispatch count, accept rate (when dealer feedback available), UTM contribution to Tier A.
 - Call attribution: per‑brand DID; unify with UTM for blended CPL.

 ## Phased Rollout
 Phase 0 (Today)
 - Lock technical spec (docs/leadgen-spec.md) and master plan (this doc).
 - Gather placeholders: ALLOWED_ORIGINS, DEALER_WEBHOOK_URL.

 Phase 1 (Week 1)
 - Launch 1–2 micro‑brand sub‑directories with minimal form.
 - Verify GBPs; publish initial photo pack; schedule weekly posts.
 - Configure ROUTE_CREDIT for /api/go; turn on Tier‑A dealer webhook (Doppler).

 Phase 2 (Weeks 2–4)
 - Add Shop‑by‑Payment widget; enrich finance fields for scoring.
 - Introduce Trade‑in estimator (stub if needed) and gate results via /api/lead.
 - Build Looker/GA4 dashboard for KPIs; standardize UTMs per brand.

 Phase 3 (Weeks 4+)
 - Dispatch engine: partner connectors, retries, DLQ, HMAC signing.
 - Advanced geo tactics (cross‑border CTA, commuter creatives) and content.
 - Optional: municipal “service hub” strategy — out of MVP scope; track in backlog.

 ## Operational Checklists
 Content
 - 3 brand photos (ext/int/process), 1 staff badge shot, 1 short walkaround video.
 - 2 Google Posts per brand queued for first month.

 Config
 - Unique DID per brand; forwarding tested; whisper tag with brand label.
 - ALLOWED_ORIGINS includes production domain; ROUTE_CREDIT set.

 QA
 - Postman: happy path (json & form‑urlencoded), honeypot, origin blocked.
 - Lint/typecheck/tests pass before deploy.

 ## Backlog (Cross‑reference with spec)
 - Modular dispatch rules, partner connectors, retries, DLQ, HMAC.
 - Lead dedupe + merge policy; scoring refinements; consent versioning.
 - Parasite SEO/editorial placements; YouTube/podcast assets; QR/event funnels.

 ---
 Owner: Mark (dealer‑first). PRs should reference this plan for scope.
