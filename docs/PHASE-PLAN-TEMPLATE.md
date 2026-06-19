# Phase plan template

A generic phase breakdown for any web project on this stack. Adapt per
project — timelines are elastic. The point is to **do one phase at a
time**: don't deploy before Phase 1 passes its exit criteria, don't add
forms before Phase 2 is done.

The guardrails (type check, lint, pre-commit, CI, schema validation) are
already in place from day one; each phase builds on those.

---

## Phase 1 — Foundation (Day 0–3)

**Goal**: A running dev server with your brand applied. Nothing public yet.

**Do**:
- Clone/copy the template, `npm install`, `npm run dev`
- Edit [`src/lib/constants.ts`](../src/lib/constants.ts): site name, URL,
  description, email, nav items, social links
- Edit [`src/styles/global.css`](../src/styles/global.css) `@theme {}`
  block: brand colors, font family
- Update [`astro.config.mjs`](../astro.config.mjs): `site:` to your real URL
- Update [`package.json`](../package.json): `"name"` to your project
- Drop logo + favicon assets into `public/`
- First commit pushed to GitHub

**Don't yet**:
- Write real copy (placeholders are fine)
- Add forms or interactive pieces
- Connect to Vercel
- Write any custom backend logic

**Exit criteria**:
- `npm run check && npm run lint && npm run build` all green
- You can visit `/`, `/about`, `/contact`, `/privacy`, `/terms`, `/404`
  locally
- Site looks like your brand (not the template's defaults)

---

## Phase 2 — Core pages + copy (Day 3–10)

**Goal**: Every page has real, final-ish copy. No half-finished text.

**Do**:
- Fill in `src/data/home/home.mdx` with real homepage copy
- Write real `about.astro` (or move copy into `src/data/pages/about.mdx`
  and render via `getEntry`)
- Write real `privacy.astro` + `terms.astro` (use a generator or a lawyer)
- Add additional top-level pages you need (`/services`, `/portfolio`,
  `/team` — whatever fits)
- Add FAQ entries in `src/data/faqs/`
- Wire up main navigation in `NAV_ITEMS`

**Don't yet**:
- Launch the domain
- Set up analytics
- Enable forms (still OK to scaffold them)

**Exit criteria**:
- Anyone reading the live preview can understand what the site is for
- No "Lorem ipsum" or "TODO" visible anywhere public
- Internal links all resolve (no 404s from clicking around)

---

## Phase 3 — Interactivity (Day 10–15)

**Goal**: Forms, search, and any interactive UI working end-to-end.

**Do**:
- Sign up for [Resend](https://resend.com), add API key to Vercel's env
  vars and to local `.env.local`
- Test `/api/contact` end-to-end: submission → email lands in inbox
- Add honeypot checks + rate limits to any other form endpoints you create
- If you want search, `npm run build` already produces the Pagefind
  index; add a `<script src="/pagefind/pagefind-ui.js">` to a search
  page
- Add any other islands (modals, tabs, carousels) you need

**Don't yet**:
- Launch the domain (but preview URLs are useful for user testing)
- Send real marketing emails

**Exit criteria**:
- Contact form submissions reach a real inbox
- Rate limit triggers at the right threshold
- All forms have client + server validation agreeing on the same schema

---

## Phase 4 — Content + SEO (Day 15–30)

**Goal**: Site is crawlable, indexable, and socially shareable.

**Do**:
- Publish first real blog posts (if you have a blog)
- Confirm every page has a unique title and meta description (run
  `npm run check:seo` — it scans built HTML)
- Verify Open Graph images are set (1200×630 recommended)
- Verify JSON-LD schemas validate (`npm run validate:schema`)
- Add `sitemap-index.xml` reference to `robots.txt` (already done in the
  template, just update the domain)
- Submit sitemap to Google Search Console after launch
- Audit accessibility with Lighthouse or axe DevTools

**Don't yet**:
- Buy ads (you want organic SEO settling first)

**Exit criteria**:
- `check:seo` returns clean
- `validate:schema` returns 0 failures
- Lighthouse scores ≥ 90 on Performance, Accessibility, Best Practices, SEO

---

## Phase 5 — Launch (Day 30–35)

**Goal**: Domain live. Analytics collecting. Consent banner up.

**Do**:
- Buy domain, add to Vercel, DNS propagates
- Update `astro.config.mjs` `site:` to real domain (if not done)
- Set `PUBLIC_GA4_ID` in Vercel env vars (and locally)
- Set `PUBLIC_COOKIEYES_ID` if using CookieYes, or wire in your preferred
  consent tool
- Verify analytics events in the GA4 DebugView
- Verify consent banner appears on first visit and analytics is gated
  on accept
- Submit site to Google Search Console + Bing Webmaster Tools

**Don't yet**:
- Pivot to new features. Give the launched version a week to settle.

**Exit criteria**:
- Production URL is the real domain (not `.vercel.app`)
- Analytics shows live traffic
- Consent banner respected (analytics paused until accepted)

---

## Phase 6 — Post-launch (ongoing)

**Goal**: Keep shipping without breaking what works.

**Do**:
- Watch Vercel Analytics + GA4 for crashes/slow pages
- Monitor Search Console for coverage errors
- Write content on a cadence (weekly / monthly)
- Add new sections / pages as needs emerge
- Do a full Lighthouse audit monthly — catch regressions
- Keep deps fresh (monthly `npm outdated`, quarterly major updates)
- Back up on-disk content (MDX files are git-backed; everything else
  that's user-generated lives in Vercel/Resend dashboards)

**Don't**:
- Skip the pre-commit hooks
- Push untested changes straight to main
- Let deps drift more than 6 months

---

## Adapting for your project

- **Marketing site / landing page**: skip Phase 2's "additional pages" —
  the homepage + /contact + /privacy + /terms might be the whole site.
- **Blog-first / newsletter**: start Phase 4 in parallel with Phase 2.
- **Portfolio**: swap "blog" for "projects" in collections (see
  CONTENT-GUIDE.md "add a new collection type").
- **SaaS landing / docs site**: bolt on a docs collection in Phase 2.
- **Agency site**: adapt nav to Services / Industries / Work hub, expand
  content collections accordingly.

The scaffolding doesn't care about your business model — it just makes
sure you can't ship broken code.