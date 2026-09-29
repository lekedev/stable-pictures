# Stable Pictures & Filmworks: landing page

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion. Fonts are self-hosted via Fontsource (no Google requests, which keeps the site UK GDPR friendly).

## Run
```
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```
In `npm run dev` the quote form logs leads to the terminal if no keys are set. In production the API returns an error unless Resend or Supabase is configured, so leads are never lost silently.

## Set up lead delivery
1. Copy `.env.example` to `.env.local` and fill it in.
2. **Resend**: verify your sending domain, create an API key, set `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL`.
3. **Supabase**: create a project, run `supabase/schema.sql` in the SQL editor, set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server only).
4. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (UK number, e.g. `447700900123`) and `NEXT_PUBLIC_SITE_URL`.
A lead is accepted if either email or storage succeeds.

## Deploy
Push to GitHub, import into Vercel, add the same env vars, deploy.

## Where to edit
- `src/lib/data.ts`: services, packages, prices (£, sample values), budget ranges, finder questions, shoot-slot counter.
- `src/components/Intro.tsx`: proof stats and promise copy (sample figures).
- `src/components/Content.tsx`: process steps, testimonials (sample), FAQ answers (drafts).
- `src/components/Footer.tsx`: contact details, socials, service areas (placeholders).
- `src/components/Work.tsx`: replace the two sample tiles with real video and 3D tour embeds.
- `src/lib/scene.ts`: the building illustration used until real photography is ready.
- `public/`: logo files. Swap in an SVG or transparent PNG when you have one.
