# Doppler Setup

1. Create project and configs:
   - Project: `niagara-leads`
   - Configs: `dev`, `prod`
2. Add secrets in both configs:
   - `NEXT_PUBLIC_ENV`
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE`
   - `DEALER_WEBHOOK_URL`, `HMAC_SECRET`, `ALLOWED_ORIGINS`
   - `ROUTE_CREDIT`, `ROUTE_INSURANCE`, `ROUTE_WARRANTY`, `ROUTE_RIDESHARE`
3. Local dev:
   - `npx doppler run -- npm run dev`
4. Vercel:
   - Add `DOPPLER_TOKEN` per environment
   - Build: `npx doppler run -- npm run build`