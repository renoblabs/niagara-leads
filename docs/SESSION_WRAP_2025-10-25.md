# Session Wrap & Handoff — 2025-10-25

Owner: Mark Lambie

This document captures the current state, remaining work, and exact steps to resume quickly in a fresh session.

## Current State

- Repo: renoblabs/niagara-leads
- Active production branch in Vercel: `docs/brainstorm-spec`
- App root: `apps/web` (Next.js 14 App Router)
- Deployed preview: https://niagara-leads-d321xy8pl-marks-projects-a0690b36.vercel.app
- Domain: 905autos.ca (Cloudflare)
- CI: GitHub Actions workflow at `.github/workflows/vercel-deploy.yml` (deploys on push to `docs/brainstorm-spec` and `main`)

## Environment Variables (Vercel → Project → Settings → Environment Variables → Production)

- `SUPABASE_URL` = [Supabase Project URL]
- `SUPABASE_SERVICE_ROLE` = [service_role key]
- `ALLOWED_ORIGINS` = `https://905autos.ca,https://www.905autos.ca,https://niagara-leads-d321xy8pl-marks-projects-a0690b36.vercel.app`
- `DEALER_WEBHOOK_URL` = (empty for now)

Notes:
- No spaces; no trailing slashes in `ALLOWED_ORIGINS`.
- After any change to envs, trigger a redeploy.

## DNS & Domains

Cloudflare (DNS Only / gray cloud):
- `A 905autos.ca → 76.76.21.21`
- `CNAME www → cname.vercel-dns.com`

Vercel → Domains:
- Add `905autos.ca` and make it Primary.
- Redirect `www.905autos.ca` → `905autos.ca`.
- If prompted, add TXT `_vercel` for verification (DNS only), then Verify.

## CI / CD

- Workflow: `.github/workflows/vercel-deploy.yml`
- Required GitHub secrets (repo → Settings → Secrets → Actions):
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
- The workflow runs lint, typecheck, tests, then builds and deploys from `apps/web` using Vercel CLI.

## Open Items (do next)

1. Fix CORS: ensure `ALLOWED_ORIGINS` includes the exact `.vercel.app` host above and both apex + www. Redeploy after saving.
2. Finish domain: set DNS to DNS Only and verify in Vercel; make `905autos.ca` primary with `www → apex` redirect.
3. Smoke test: submit `/finder` form on both the `.vercel.app` URL and `https://905autos.ca/finder`; verify row appears in Supabase `leads`.
4. Optional: Doppler → Vercel sync for envs (Doppler prod → Vercel Production; dev → Preview).
5. Homepage redirect: temporarily redirect `/` → `/finder` until the site scaffold lands.
6. v0.dev scaffold (see prompt below) on a new branch; open PR.
7. Branch cleanup: once live flow verified, merge PR #2 and switch Vercel Production Branch to `main`; then delete `docs/brainstorm-spec`.

## v0.dev Prompt (copy/paste)

Project: Next.js 14 App Router, TypeScript, Tailwind. Monorepo; app at `apps/web`. Keep existing `/finder` form posting to `/api/lead` with consent/UTM fields and honeypot.

Create:
- `/` Home: hero, USP bullets, stats/testimonials, CTA to `/finder`, featured inventory grid.
- `/inventory`: filters (make/model/price/payment), cards; link to `/inventory/[id]`.
- `/inventory/[id]`: gallery, specs, “Check Approval” CTA → `/finder?vehicleId=...`.
- `/about`, `/contact`, `/thank-you`.

Components:
- `VehicleCard`, `LeadCTA`, `Badge`, `Stat`, `Testimonial`.

Requirements:
- Tailwind configured; responsive; accessible; SEO meta + OpenGraph; JSON-LD basics.
- Do not break `/api/lead` or existing CORS. Place files under `apps/web/app/...`.
- If home isn’t ready, add a server redirect from `/` to `/finder`.

Output: A patch ready to drop into `apps/web` with pages, components, and styles.

## Branch Strategy

- Keep `docs/brainstorm-spec` as Production until end-to-end is verified.
- New work: create feature branches (e.g., `feat/site-scaffold`) and open PRs into `docs/brainstorm-spec`.
- After verification: merge PRs into `main`, switch Vercel Production Branch to `main`, delete `docs/brainstorm-spec`.

## Command Reference

Local (Node 18):
- Install: `npm ci`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Test: `npm test`
- Dev: `npm --workspace apps/web run dev`

Supabase Keys: Project → Settings → API → copy `Project URL` and `service_role`.

## Contacts / Ownership

- GitHub: https://github.com/renoblabs/niagara-leads
- Vercel Project: set Production Branch = `docs/brainstorm-spec`, Root Directory = `apps/web`.
