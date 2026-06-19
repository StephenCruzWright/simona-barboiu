# Deployment

The site is a **Next.js** app hosted on **Vercel**, auto-deploying from `main` to [simonabarboiu.com](https://simonabarboiu.com).

## How it works

1. Push to a branch → Vercel builds a **Preview** deployment with its own URL.
2. Merge to `main` → Vercel builds and promotes to **Production** (the custom domain).

Vercel auto-detects Next.js — no `vercel.json` is required. Build command `next build`, output handled by the Next.js framework preset.

## One-time setup (already done for this project)

1. Import the GitHub repo in the Vercel dashboard.
2. Framework preset: **Next.js** (auto-detected).
3. Add the custom domain `simonabarboiu.com` under Project → Settings → Domains.
4. Set any environment variables (see below) under Project → Settings → Environment Variables.

## Environment variables

None are required for the current build. If/when the contact form (`app/api/contact/route.ts`) ships with email delivery, add the provider key (e.g. `RESEND_API_KEY`) in Vercel and document it in a `.env.example`. Until then the form uses a mailto fallback.

## Before you push

```bash
npm run lint
npx tsc --noEmit
npm run test:media   # if you added/moved files in public/
npm run build        # catch build-time errors locally
```

CI ([.github/workflows/quality-checks.yml](../.github/workflows/quality-checks.yml)) runs `test:media` + `build` on every push/PR, but it is not yet a merge gate — keep the local checks green.

## Rollback

In the Vercel dashboard → Deployments, find a previous green Production deployment and **Promote to Production**. Instant, no rebuild.

## Performance after deploy

Add **Vercel Speed Insights** to capture field Core Web Vitals (INP only surfaces in real-user data). Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. Run Lighthouse against the deployed home page, a 3D project page, and the gallery — each has a different LCP element.
