create extension if not exists pgcrypto;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  source_domain text,
  source_path text,
  utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text,
  first_name text, last_name text, email text, phone text,
  city text, postal_code text,
  vehicle_interest jsonb,
  finance jsonb,
  consent boolean default false,
  consent_ts timestamptz,
  ip inet, ua text,
  lead_score int default 0,
  tier text default 'B',
  status text default 'new'
);

create table if not exists clicks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  lead_id uuid references leads(id),
  offer text,
  url text,
  utms jsonb,
  ip inet,
  ua text
);

create table if not exists routes (
  offer text primary key,
  dest_url text not null
);

create table if not exists events (
  id bigserial primary key,
  ts timestamptz default now(),
  lead_id uuid,
  kind text,
  data jsonb
);

create table if not exists consents (
  id bigserial primary key,
  lead_id uuid references leads(id),
  ts timestamptz default now(),
  copy text,
  ip inet
);
