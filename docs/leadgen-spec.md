 # Niagara Leads — Distilled Lead‑Gen Spec (Dealer‑First)

 Version: 0.1

 ## Executive Summary
 Dealer‑first rollout for used‑car credit leads. No credit pull; capture consented PII and soft finance intent, score and tier (A/B/C), and dispatch Tier A to dealer webhook. Open‑source stack: Next.js 14 (TypeScript) API routes, Supabase (storage + events), Doppler (secrets/config), Vercel (hosting). Funnels expand over time; brokers later.

 Goals (MVP):
 - Accept leads via POST /api/lead from allowed origins only; block bots with honeypot.
 - Normalize payload, compute score, assign tier, persist to Supabase, log consent copy (if provided).
 - Dispatch Tier A to DEALER_WEBHOOK_URL; record success/error events. Tier B/C retained for later routing.
 - Track UTMs and click redirections via GET /api/go.

 ## Funnel Blueprint — Credit (MVP)
 1) Landing: credit intent page(s) with minimal compliant form (no SIN/SSN, no hard pull).
 2) Form submit: POST to `/api/lead` as `application/x-www-form-urlencoded` or JSON.
 3) Server: origin validation (ALLOWED_ORIGINS), honeypot drop, normalization, score + tier, Supabase insert, optional consent copy capture, Tier A webhook.
 4) Thank‑you: confirm receipt; optional CTA to offers via `/api/go?offer=credit&lead_id=…` (UTMs preserved).
 5) Dealer handling: Tier A arrives via webhook; B/C held for later broker/partner dispatch.

 Notes
 - Content‑type supported: JSON or URL‑encoded form.
 - Use bracket notation for nested keys in forms (e.g., `finance[down_payment]`).
 - Include `utm_*` or nested `utm.{field}`; system will flatten.

 ## Data Contract → /api/lead
 The API accepts a flexible payload. Fields below map to Supabase schema (infra/supabase/schema.sql) and code (apps/web/lib/lead.ts, supabase.ts, routes.ts, and app/api/lead/route.ts).

 Required (by policy for credit funnel)
 - consent: boolean true (checkbox required). If provided, `consent_ts` is recorded automatically.
 - At least one of: phone or email.

 Recommended
 - first_name, last_name, city, postal_code (Canada format `A1A 1A1` or `A1A1A1`), vehicle_interest.make/model, finance.down_payment, finance.income_band, finance.credit_band.

 Top‑level fields
 - first_name, last_name, email, phone, city, postal_code
 - source_domain (string), source_path (string)
 - consent (bool|string), consent_copy (string) — free‑text of disclosure user accepted
 - website (string) — honeypot; if present, lead is ignored (ok:true, ignored:true)

 Nested objects (form bracket notation works)
 - vehicle_interest.{ make, model, budget }
 - finance.{ income_band, job_length, down_payment, credit_band }

 UTM fields
 - Either nested: utm.{ source, medium, campaign, term, content }
 - Or flat: utm_source, utm_medium, utm_campaign, utm_term, utm_content

 Validation Rules (server‑side expectations)
 - consent: cast from string; accepted truthy: "true", "1", "on", "yes" → true; else false.
 - phone/email: at least one present; basic formatting validated client‑side; server stores as provided.
 - postal_code: client‑side validate Canadian pattern; server stores as text.
 - finance.down_payment: numeric coercion; > 0 increases score.
 - finance.income_band: if provided and not "low" (case‑insensitive) increases score.
 - Origin: request `Origin` header must match one of ALLOWED_ORIGINS (exact host or subdomain match). If ALLOWED_ORIGINS is empty, allow all.
 - Honeypot: if `website` present/non‑empty → ignored.

 Persisted columns (Supabase: leads)
 - source_domain, source_path, utm_source, utm_medium, utm_campaign, utm_term, utm_content
 - first_name, last_name, email, phone, city, postal_code
 - vehicle_interest (jsonb), finance (jsonb)
 - consent (bool), consent_ts (timestamptz)
 - ip (inet), ua (text)
 - lead_score (int), tier (text 'A'|'B'|'C'), status ('new')

 ## Scoring, Tiering, Dispatch
 Scoring (apps/web/lib/lead.ts → computeLeadScore):
 - +5 if phone present
 - +5 if email present
 - +5 if finance.down_payment > 0
 - +5 if finance.income_band provided and not "low"

 Tier thresholds (tierForScore)
 - A: score ≥ 15
 - B: 8 ≤ score < 15
 - C: score < 8

 Dispatch (app/api/lead/route.ts)
 - Tier A: if `DEALER_WEBHOOK_URL` is set, POST JSON `{ lead_id, ...payload, score, tier, ip, ua }` to dealer. Log `dealer_webhook_sent` or `dealer_webhook_error` in `events`.
 - Tier B/C: store only (MVP). No outbound dispatch.
 - Future: broker/partner connectors per rules below.

 Initial Dealer Dispatch Plan (MVP)
 - Configure `DEALER_WEBHOOK_URL` in Doppler (dev/prod). If unset, Tier A is not dispatched but lead is stored.
 - Define dealer accept criteria outside code; adjust score inputs if needed.

 ## System Architecture
 - Next.js 14 API routes:
   - POST `/api/lead`: ingest, validate origin, honeypot, normalize, score/tier, insert, optional Tier A webhook
   - GET `/api/go`: offer redirector; resolves destination from env or `routes` table; appends `utm_*` + `lead_id`; logs click
   - GET `/api/ping`: health
 - Supabase (infra/supabase/schema.sql):
   - tables: leads, clicks, routes, events, consents
 - Config via Doppler (infra/doppler/README.md):
   - NEXT_PUBLIC_ENV, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE
   - DEALER_WEBHOOK_URL, HMAC_SECRET (reserved), ALLOWED_ORIGINS
   - ROUTE_CREDIT, ROUTE_INSURANCE, ROUTE_WARRANTY, ROUTE_RIDESHARE
 - Hosting: Vercel (build via `npx doppler run -- npm run build`)

 ## Tracking & KPIs
 - UTMs captured from payload (nested or flat) and persisted on lead; `/api/go` appends UTMs on redirects and logs clicks (offer, url, utms, ip, ua).
 - Events table records webhook outcomes and other future lifecycle events.
 - Suggested KPIs (weekly):
   - Submission volume, valid vs. honeypot drops
   - Tier mix (A/B/C) and average score
   - Dealer dispatch count (A) and accept rate (if/when dealer feedback wired)
   - UTM source/medium contribution to Tier A volume
   - Offer clicks from `/api/go` and click‑to‑lead linkage (via lead_id)

 ## Operational Config (Doppler)
 - ALLOWED_ORIGINS: comma‑separated absolute origins (e.g., `https://example.com, https://www.example.ca`). Subdomain match supported.
 - DEALER_WEBHOOK_URL: dealer endpoint to receive Tier A leads (set per env). If unavailable, leave unset; Tier A will not be dispatched.
 - ROUTE_CREDIT: default destination for credit offer redirects via `/api/go?offer=credit`.

 ## Backlog
 MVP → Phase 2/3
 - Dispatch engine: modular rules (by tier, geo, UTM, time), retries with backoff, DLQ.
 - Partner connectors: generic webhook, email, CSV S3, HubSpot, Zapier; per‑partner mapping.
 - Security: HMAC signing on outbound webhooks (HMAC_SECRET), idempotency keys, replay protection.
 - Lead de‑duplication: hash on email/phone + recency window; merge policy.
 - Scoring refinements: postal code distance to dealer, prior clicks, page depth; configurable weights.
 - Consent: versioned consent copy storage and locale support.
 - Admin ops: simple dashboard (read‑only) for volumes, tier mix, recent events.
 - Origin management: add admin UI or Doppler notes for ALLOWED_ORIGINS changes.
 - QA tooling: expand Postman collection; seed routes; local Doppler runbooks.

 ## Appendices
 - Minimal client form available at `docs/forms/credit-min-form.html` (optional). Uses bracket notation to match server normalizer and posts to `/api/lead`.
