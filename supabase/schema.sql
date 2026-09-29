create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  property_type text,
  package text,
  target_date date,
  budget text,
  notes text,
  status text not null default 'new'
);

-- Only the server (service role) writes and reads leads. No public policies.
alter table public.leads enable row level security;
