# Cognisearch Astro Project — Kickoff Prompt

> **What this is.** The canonical kickoff message to paste into a fresh Claude Code session opened in a newly-cloned `web-starter-claude` repo. Use it for delivery-process projects (Cognisearch SOP-driven) where Phase 9 audit and a post-mortem are expected. For a quick personal site, AGENTS.md § "Session opening" is enough on its own.
>
> The prompt is stable. Mid-project, do not edit it. Lessons go to [`docs/lessons/draft.md`](lessons/draft.md) first; only patterns that recur across 3+ projects earn promotion to this prompt or to a starter config.
>
> **How it layers with what's already in the starter:**
>
> - [AGENTS.md § "Session opening"](../AGENTS.md) — the creative kickoff (brand tokens, voice, design reference, copy, page list). The agent runs that conversation first if the user provides design inputs.
> - [docs/PHASE-PLAN-TEMPLATE.md](PHASE-PLAN-TEMPLATE.md) — the **tactical** day-by-day build plan (6 phases, Foundation → Post-launch).
> - **This file** — the **organizational** wrapper (Cognisearch SOP-driven 9-phase delivery, lessons loop, sanctioned tooling). Wraps around the tactical plan.
> - [docs/wordpress-clone-setup-prompt.md](wordpress-clone-setup-prompt.md) — **before this kickoff** if the engagement starts with porting an existing WordPress site. Produces Astro code (MDX + `<Image>` + extracted design tokens) inside this clone — not a static mirror. Phase 0 / pre-Phase-1 artifact for SOP-driven rebuilds.

Paste everything below the horizontal rule into your first message.

---

# 📋 Cognisearch Astro Project — Kickoff for `<client name>`

You're in a freshly-cloned `web-starter-claude` repo for `<client>`. The starter ships with the Cognisearch sanctioned tooling stack pre-configured; your job is to deliver this project from sales-handoff to live launch without re-litigating decisions that have already been made.

**Read the whole brief, read the predecessors (next section), then ask any clarifying questions before proposing a plan.**

## Before anything — read your predecessors

Read these in order before proposing any plan:

1. [`docs/lessons/INDEX.md`](docs/lessons/INDEX.md) — one-line entries for every prior project's post-mortem
2. The 3 most recent `docs/lessons/<slug>-<YYYY-MM-DD>.md` files
3. [`AGENTS.md`](AGENTS.md) — the canonical context map (stack, conventions, gotchas, "Session opening" creative kickoff)
4. [`docs/STACK-OVERVIEW.md`](docs/STACK-OVERVIEW.md) — why each tech choice
5. [`docs/PHASE-PLAN-TEMPLATE.md`](docs/PHASE-PLAN-TEMPLATE.md) — the tactical day-by-day build plan
6. `package.json` + `astro.config.mjs` — confirm the starter version + Astro version + integrations installed

If a lesson in `docs/lessons/` contradicts something in this prompt, **surface the conflict before proceeding** — the prompt usually needs updating, but I want to make that call.

If `docs/lessons/INDEX.md` is empty (this is the first project from the starter), say so and proceed; the loop starts here.

## Stack — already wired in this starter

Don't re-install or substitute these without explicit reason and approval:

| Layer | Tool | Config in starter |
| --- | --- | --- |
| Framework | Astro 6+ (TS strict, `astro/tsconfigs/strict`) | `astro.config.mjs`, `tsconfig.json` |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | `src/styles/global.css` `@theme {}` |
| Interactivity | Preact islands (`client:*` directives) | `src/components/islands/` |
| Lint + format | Biome | `biome.json` |
| Lint + format (.astro only) | Prettier + `prettier-plugin-astro` | `.prettierrc`, `.prettierignore` |
| Git hooks | Lefthook | `lefthook.yml` |
| Unused exports | knip | `knip.json` |
| Dependency CVEs | Dependabot | `.github/dependabot.yml` |
| SAST | Semgrep | `.github/workflows/ci.yml` |
| Secrets pre-commit + CI | gitleaks + TruffleHog (CI) | `lefthook.yml`, `.github/workflows/ci.yml` |
| Supply chain | Socket.dev | `socket.yml` |
| Lighthouse CI | desktop ≥ 0.95 / mobile ≥ 0.90 + LCP/CLS/INP | `lighthouserc.json`, `lighthouserc.mobile.json` |
| Analytics + errors + replay | PostHog (env-gated `PUBLIC_POSTHOG_KEY`) | `src/components/global/Analytics.astro`, `src/lib/posthog.ts` |
| Performance RUM | Vercel Speed Insights + Analytics | mounted in `Analytics.astro` |
| Search | Pagefind (built into `npm run build`) | no config — uses `dist/client` output |
| Email | Resend (env-gated `RESEND_API_KEY`) | `src/pages/api/contact.ts` |
| Hosting | Vercel | `@astrojs/vercel` adapter |

**Off the table** unless a procurement contract specifically names them: ESLint, Prettier (outside `.astro` scope), Husky, lint-staged, Snyk, Sentry standalone, Clarity. Each was deliberately replaced.

If the project genuinely needs a substitution, **flag it before installing** with: what you want to swap, why, what you're replacing it with, and what risk the swap introduces.

## The 9-phase Cognisearch delivery plan — keep all of it in mind from turn 1

Don't ship Phase 4 code that creates Phase 6 / 8 work. The starter's tactical [docs/PHASE-PLAN-TEMPLATE.md](docs/PHASE-PLAN-TEMPLATE.md) covers the developer-facing Foundation → Launch arc; this 9-phase view is the wider organizational delivery in 3 acts.

**Implementer / Verifier convention**: every phase has an Implementer (who does the work) and a Verifier (a different person — or a fresh agent session — who signs off the Definition of Done). Self-sign-off is the default failure mode. Even solo, the Verifier pass is a separate, named activity (fresh agent session, `/audit` slash command, or peer review) — never the implementer's own "I checked it."

### ACT I — PRE-LAUNCH (Phases 1–3)

| # | Phase | Implementer → Verifier | Output / Gate |
| --- | --- | --- | --- |
| 1 | Sales & Discovery & Tasks Setup | Sales → Client | Scoped SOW + deposit + tasks set up |
| 2 | Information Architecture | IA → PM | Brief approved, copy done/in progress, handoff to designer |
| 3 | Visual Design | Designer → PM | Mockups approved, copy done, handoff to dev |

**Phase 1 — Sales & Discovery & Tasks Setup**

- Discovery call captures goals, audience, must-have pages, deadlines (record if client agrees).
- Confirm minimum project value ($2k). Walk away if scope can't support it.
- Ask whether client has existing template / brand book / Figma → template discount visible in quote if applied.
- On signature, collect: brand assets, copy, logins, references, image dimensions, intended hero/LCP role per page.
- **Brand-color WCAG preflight (HIGH)**: run palette through contrast calculator vs `#FFFFFF` and planned bg before signing SOW. If brand fails 4.5:1 body / 3:1 large/UI, surface NOW. Discovering this in Phase 6 (Code Integrity) costs 30+ touchpoints of rework.
- **Image-host decision (MED)**: decide in Phase 1 — `public/` / client CDN / Vercel Blob. Locks `image.remotePatterns` in `astro.config.mjs` early. Mixing three CDNs because the decision was deferred is the default failure mode.
- **Dev-machine setup as deliverable (MED)**: starter ships [`docs/dev-setup.md`](docs/dev-setup.md). Hand it to the receiving dev day 1.
- **Asset spreadsheet** must include the LCP-candidate column (one image per route flagged for `loading="eager"` + `fetchpriority="high"`).

**Phase 2 — Information Architecture (Gemini-assisted)**

- Designer drives Gemini through long-context synthesis of every client doc + transcript + reference page.
- Produces sitemap diagram (pages + how they link). Mermaid or Whimsical, exported to project folder.
- Marks LCP candidate per route directly in the sitemap export.
- Inline link inventory: flat list of in-page links per route — surfaces dead/legacy links pre-design.
- **Verifier (PM) re-reads the original brief WITHOUT looking at the Gemini transcript**, then reads the sitemap. Does the IA actually serve the brief? Lists any goals the sitemap fails to express. Loop until Verifier signs off.
- Client signature is the final external Verifier — lock IA before any design begins.

**Phase 3 — Visual Design**

- Pull standard Claude page template + load brand book into Claude (colors, type, voice, logos).
- Generate page designs section by section against the locked IA.
- **Tap-target review**: every interactive ≥ 24×24 px on smallest target viewport (375 px). Pagination dots, icon buttons, close X are the usual offenders.
- **Contrast review**: all text-on-bg pairs against the locked palette restriction from Phase 1. If "accent is decorative only", design must respect that — eyebrow labels in coral-on-white become contrast failures otherwise.
- Designer marks LCP-candidate images per breakpoint. Exactly one image per route gets the priority flag.
- **Verifier (Lead Designer)**: independent review at 375×667 with axe-core in dev. Files written checklist, not a thumbs-up.
- Client sign-off (one revision round per contract).

---

### ACT II — DEVELOPMENT (Phases 4–6)

| # | Phase | Implementer → Verifier | Output / Gate |
| --- | --- | --- | --- |
| 4 | Building Locally from Template | Dev → PR Reviewer | Staging URL |
| 5 | Launch Review and Repo Handoff | Dev → Lead Dev | Repo + site reviewed, launched on Cognisearch Vercel/GitHub |

**▸ MILESTONE ▸ WEBSITE V1 BUILT AND READY FOR CLIENT REVIEW**

| # | Phase | Implementer → Verifier | Output / Gate |
| --- | --- | --- | --- |
| 6 | Pre-Launch Audit & Security & DNS Cutover | Dev → Lead Dev | Live on production |

**▸ MILESTONE ▸ LAUNCHED & DEPLOYED**

**Phase 4 — Building Locally from Template**

- Clone this starter into a new private GitHub repo. `main` + `develop` branches. CODEOWNERS pointing at `@Cognisearch/admins`.
- Implement pages following the locked IA + approved designs. Component-driven; reuse before recreating.
- Wire all internal links per the sitemap. No orphans, no broken links.
- Vercel project connected; preview deployments for every PR.
- **Never self-merge** — every PR gets a second pair of eyes (separate Dev or fresh Claude agent session).
- Don't background `astro dev`. Verify pre-launch with `astro build` only. Live preview only in a foreground terminal you control.

**Phase 5 — Launch Review and Repo Handoff**

- Lead Dev re-runs the full local build + walks the staging URL end-to-end.
- Confirms `git status` clean, lockfile committed, CLAUDE.md filled (Conventions / Why-decisions / Gotchas / Run instructions).
- Verifies every PR was merged by someone other than the author (no self-merges in `git log`).
- Hands off to Phase 6 audit only when the code-complete gate is unambiguously green.

**Phase 6 — Pre-Launch Audit & Security Hardening & DNS Cutover**

Three integrity sub-sections + three cutover sub-sections, all signed off by Lead Dev as Verifier.

- **6.1 Code Integrity** (Security + Quality + A11y three-signal gate):
  - Dependabot + Semgrep + gitleaks + TruffleHog + Socket.dev — all green, no High/Critical CVEs.
  - **Three-signal a11y**: Lighthouse a11y ≥ 0.95 + axe-core 0 serious/critical + tap-target Playwright check (every interactive ≥ 24×24 px at 375 px).
  - Manual screen-reader spot check (VoiceOver / NVDA) on hero, navigation, every form, error/success states.
  - TypeScript strict; 0 `any` in `src/`; 0 unpaired `@ts-ignore`; bundle-size delta < 10% or justified.
  - Cleanup pass: knip green, dead routes removed, commented-out code stripped.
- **6.2 Performance** (Core Web Vitals — per-metric thresholds, not just category score):
  - LCP ≤ 2,500 ms on mobile; CLS ≤ 0.1; INP ≤ 200 ms.
  - Lighthouse mobile ≥ 90; desktop ≥ 95.
  - Hero LCP image carries `loading="eager"` + `fetchpriority="high"`.
  - AVIF preferred + WebP fallback via `astro:assets` `<Image>` (raw `<img>` banned by `biome.json`).
  - Fonts self-hosted; `font-display: swap`.
- **6.3 Schema**: Organization + WebSite + Service + FAQPage + BreadcrumbList live and validated. LocalBusiness vs Organization per decision tree (physical address + service area + hours → LocalBusiness). Person + VideoObject + BlogPosting + HowTo where applicable. All FAQ answers 50–150 words (CI-asserted). Google Rich Results Test passes per route.
- **6.4 Security hardening**: `public/.well-known/security.txt` filled in (RFC 9116). CSP in Report-Only for 7 days before enforcement (especially if Zoho iframes, PostHog, or fonts are in play). OWASP Secure Headers baseline (HSTS preload, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy with sensitive features empty) — already set in `vercel.json`.
- **6.5 DNS pre-cutover**: pre-reduce TTL 24–48 hours before cutover window. Apex + www records prepared. 301 redirects from legacy URLs documented (Screaming Frog crawl if legacy site exists).
- **6.6 Cutover**: rollback runbook written + tested on staging (DNS revert / Vercel deployment rollback / lockfile rollback / customer comms). For high-stakes clients: canary 10% → 50% → 100% via Vercel edge config. Second audit after DNS propagates.

---

### ACT III — POST-LAUNCH (Phases 7–9)

| # | Phase | Implementer → Verifier | Output / Gate |
| --- | --- | --- | --- |
| 7 | Email & Domain Security | DevOps → Lead Dev | DMARC ramp scheduled |
| 8 | Analytics, Monitoring, Observability & Ads | Dev → PM | Dashboards + alerts live |
| 9 | Post-Launch Retrospective | PM → Outside reviewer | Retro doc circulated |

**▸ MILESTONE ▸ PROJECT COMPLETE**

**Phase 7 — Email & Domain Security**

DKIM + DMARC only become meaningful once the domain is live and sending. Default stack: Google Workspace mailbox, Cloudflare DNS/WAF/inbound, Resend on dedicated subdomain (`mail.client.com`), Cloudflare Email Security Phishguard (Free baseline; Pro for regulated/high-target clients).

**DMARC 90-day ramp (mandatory)**:

- **Day 0–14**: `p=none` with `rua` reporting (collect via dmarcian / Postmark DMARC / Cloudflare DMARC Management).
- **Day 15–45**: `p=quarantine`, ramp `pct=25 → 50 → 75 → 100` as legitimate sources are confirmed in reports.
- **Day 46–90**: `p=reject`. Lock the domain. No new sending source goes live without first being added to SPF/DKIM.
- After `p=reject` is stable: add BIMI record (logo in Gmail/Yahoo inbox). VMC ($1.5–2k/yr) only worth it if client sends ≥ 100k/mo transactional.
- **Verifier** (Lead Dev) sends seed-test mails from a fresh test mailbox across Gmail / Outlook / Yahoo / iCloud. Implementer's own inbox doesn't count.
- DNSSEC enabled at Cloudflare with KSK rolled every 12 months (calendar reminder set).

**Phase 8 — Analytics, Monitoring, Observability & Ads**

Dual-stack analytics by default. PostHog covers what the team needs (errors, replays, funnels, feature flags); GA4 covers what the client expects (marketing attribution, Google Ads / Search Console linking). Vercel Speed Insights handles RUM Core Web Vitals — don't double-track CWV in GA4.

- **PostHog** (free tier: 1M events + 100k errors + 5k session replays/mo). `PUBLIC_POSTHOG_KEY` in Vercel env. Cookieless mode (`respect_dnt` enabled, `person_profiles: 'identified_only'`) — no consent banner required for PostHog alone.
- **GA4** via gtag.js or GTM with **Consent Mode v2** (required in EU/UK/CH when GA4 is in scope). Free for typical marketing-site volumes.
- **Vercel Speed Insights** for real-user LCP/CLS/INP. Free on Vercel Hobby (with data-point cap); $10/project/mo on Pro. Already wired in `Analytics.astro`.
- **Better Stack uptime** on a separate domain (so a Vercel outage doesn't kill the status page too). Synthetic checks for homepage load, contact form submit, sitemap currency, JSON-LD validity.
- **Search Console + Bing Webmaster Tools** verified, sitemap submitted to both. GA4 ↔ Search Console association configured.
- **Sentry decision recorded** (yes / no / deferred): upgrade for projects with deep performance / source-map / stack-trace needs. PostHog's error tracking covers most cases.
- **Logs**: Axiom or Logtail (skip until needed). **Tracing**: OpenTelemetry via Vercel OTel exporter only when meaningful server-side complexity exists.
- **Alerting**: PagerDuty or Better Stack on-call. On-call escalation path documented in CLAUDE.md.
- **Cookie consent**: required in EU/UK/CH when GA4 is in scope. Cookiebot / Iubenda / self-hosted Klaro all acceptable.
- **Ads sub-section**: GA4 ↔ Google Ads linking, Bing Webmaster Tools verification, conversion-event taxonomy documented in CLAUDE.md and mirrored across PostHog + GA4.
- **Semrush** is NOT a default — paid Care Plan add-on, billed through to the client at cost.

**Phase 9 — Post-Launch Retrospective**

The mechanism is the `/audit` slash command (ships at [`.claude/commands/audit.md`](.claude/commands/audit.md)), not a vague "run it back through Claude."

- Run `/audit` in the project repo → produces gap list, not fixes.
- Triage: truly missing → ticket. Stale → CLAUDE.md update.
- **Outside reviewer spot-checks 3 random "complete" rows** to make sure nothing got rubber-stamped. On solo work: the outside reviewer is a fresh Claude Code session opened in the starter repo with the retro doc loaded.
- Lessons-learned write-up in `docs/recommended-fixes.md` (use Cabana 17 doc as structural template).
- Promote portable lessons into the starter via [`docs/lessons/PROMOTION-RUNBOOK.md`](docs/lessons/PROMOTION-RUNBOOK.md). Recurring (≥3 projects) → starter pre-baked configs, [`docs/LESSONS-LEARNED.md`](docs/LESSONS-LEARNED.md), or this kickoff prompt's Appendix A.

## Collaboration preferences — apply from turn 1

1. **Phase by phase, plan + execute.** Plan mode before each phase. Item by item within. No mega-turns.
2. **Ask clarifying questions per non-trivial step** with `AskUserQuestion`. Don't guess on branch points.
3. **Prefer in-repo config over external dashboards.** The starter ships configs for everything; commit edits to those files, don't migrate to web UIs.
4. **Brand colors are non-negotiable.** Hex values fixed at AGENTS.md § "Session opening" intake. For accessibility failures, restrict usage and substitute accessible colors for body text — never recolor the brand.
5. **Incident-as-it-happens logging.** When something breaks (failed gate, surprising bug, tool misbehaving), append to `docs/lessons/draft.md` immediately. Don't wait for project end — root causes get fuzzy.
6. **No commits or pushes without explicit ask.** Stage and propose; user commits.
7. **Don't background `astro dev`.** Verify with `astro build`. Live preview only in a foreground terminal the user controls.

## Quality gates — must all pass before any commit

Detect package manager from the lockfile, then translate `<pkg-mgr>` accordingly (default npm). Starter ships with `package-lock.json`:

```sh
<pkg-mgr> run check                         # astro check, 0 errors
<pkg-mgr>x biome ci .                       # 0 errors
<pkg-mgr>x prettier --check "**/*.astro"    # 0 errors
<pkg-mgr> run knip                          # 0 unused
<pkg-mgr> run build                         # all routes prerender + Pagefind index
<pkg-mgr> run validate:schema               # all JSON-LD valid
<pkg-mgr> run check:seo                     # all pages have title + meta + canonical
<pkg-mgr> audit                             # 0 vulns (overrides for nested CVEs)
gitleaks git --log-opts=--all               # 0 leaks (run before launch)
```

If any gate fails: **stop, surface, log to `docs/lessons/draft.md` if it's not an obvious typo.** Don't chain more changes on top of broken state.

## Known landmines — surface immediately if you hit one

The starter is configured to avoid most of these out-of-the-box. Surface if anything looks adjacent. See **Appendix A** at the bottom of this prompt for the full framework-tagged list (12 items). If you discover a *new* landmine on this project, append it to `docs/lessons/draft.md` immediately with: what broke, root cause, fix, takeaway. Top 5 to keep in working memory:

1. **Lefthook `run: |` blocks must use single-quoted echos** — Lefthook wraps in `bash -c "..."`; inner double-quotes break the wrapper.
2. **Never `npm audit fix --force` for nested CVEs** — use `package.json` `overrides` instead. Force-fix can downgrade Astro by major versions.
3. **Tailwind 4.2.3+ trips Rolldown `tsconfigPaths` error** in Astro 6. Pinned to 4.2.2; Dependabot ignore in place. See `docs/LESSONS-LEARNED.md §6a`.
4. **`<Image>` stretch/fill needs a parent with explicit dimensions.** Don't reach for fill without confirming the parent has `aspect-X` or `w-Y h-Z`.
5. **Subagent dimensional/contrast math is unreliable.** Always verify any tap-target / contrast / bundle-size calculation by reading the source yourself.

## Phase-end ritual

At every phase boundary, before moving to the next:

1. **Confirm DoD** for the phase. Defer items only by writing them to `docs/recommended-fixes.md` (create if missing) with rule + where it fails + proposed fix + reasoning + reason for deferral.
2. **Run all quality gates.** All green.
3. **Roll up incidents** from the phase into `docs/lessons/draft.md`.
4. **Stage changes**; let the user commit.
5. **Plan-mode the next phase** before writing more code.

## Project-end ritual — the feedback loop

When Phase 9 closes (post-launch retrospective):

1. **Promote the draft.** Copy `docs/lessons/POSTMORTEM-TEMPLATE.md` to `docs/lessons/<client-slug>-<YYYY-MM-DD>.md`. Fill every section. Sanitize per the checklist in the template.
2. **Update the index.** Append one line to `docs/lessons/INDEX.md` (newest at top): `- [<slug>](<slug>-<date>.md) — <one-line takeaway>`.
3. **Cross-project distillation.** Read the last ~10 entries in `INDEX.md`. Any lesson that appears in **3+ post-mortems** is a candidate to promote into:
   - the starter's pre-baked configs (preferred — fix it once, all future projects benefit)
   - `docs/STACK-OVERVIEW.md` or `AGENTS.md` § "Do Not"
   - this kickoff prompt (last resort — only for behavior shifts, not config or rule)

   When you spot one, propose the promotion as a separate PR against the **starter template repo** (not this client repo).
4. **Sanitize before sharing.** Strip client-confidential details (names, URLs, credentials). Technical content stays verbatim.
5. **Stage everything.** User reviews and PRs back to the starter.

## Your first reply

Keep it tight:

1. **Versions** — `package.json` `version` (starter), `astro` version, integrations installed (e.g., `react, mdx, sitemap, vercel, preact`).
2. **Three most recent post-mortems** — name + one-line takeaway each, so the user knows you actually read them. If `INDEX.md` is empty, say "first project — lessons loop starts here."
3. **Conflicts** — flag anything in `docs/lessons/` that contradicts this prompt.
4. **Phase 1 questions** — ask about: client name + slug, brand color hex values + intended usage (CTA / accents / decorative-only), image host (`public/` / CDN / Vercel Blob), target launch date, content sources (existing site / Gemini synthesis / fresh copy), special integrations needed.
5. **Plan-mode Phase 1** with the proposed checklist of Phase 1 DoD items, one `AskUserQuestion` round per ambiguity.

If the user opens with a casual greeting, prefer the AGENTS.md § "Session opening" creative kickoff (brand tokens, voice, design reference). Use *this* prompt's structured 9-phase frame for SOP-driven delivery projects where Phase 9 retrospective is expected.

Ready when you are.

---

## Appendix A — Common Landmines (12 items)

Pre-baked into the starter's `docs/LESSONS-LEARNED.md`. Reproduced here so the SOP wrap is self-contained. Most are framework-agnostic; framework column says which apply.

| # | Landmine | Framework | How to avoid |
| --- | --- | --- | --- |
| 1 | Three lockfiles confusing workspace-root detection | Next.js 16+ | Use ESM-safe path resolution in `next.config.ts`: `turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) }`. Astro handles workspace root natively. |
| 2 | Two dev servers can't coexist (port collision) | Both | Kill the old `next dev` / `astro dev` before starting a new one. |
| 3 | Don't background `next dev` / `astro dev` | Both | Crashed dev boxes traced to backgrounded dev servers. Verify pre-launch with `build` only. |
| 4 | `'use client'` doesn't prevent SSR | Next.js | App Router still SSRs client components on initial load. JSON-LD inside `'use client'` files DOES end up in SSR HTML. (Astro: N/A — uses `client:*` directives instead.) |
| 5 | `metadata` exports require a server component | Next.js | Add sibling `layout.tsx` (server component) to each route. (Astro: N/A — use layout slots or page frontmatter.) |
| 6 | Biome ignores `docs/` by config | Both | Keep `docs/` out of Biome's `files.includes`. |
| 7 | Image `remotePatterns` must be set before using external image hosts | Both | Add to `next.config.ts` `images.remotePatterns` or `astro.config.mjs` `image.remotePatterns`. Failure: build error or silent no-optimization. |
| 8 | Lefthook needs one-time `lefthook install` per clone | Both | `"prepare": "lefthook install"` in `package.json` so `npm install` runs it automatically. |
| 9 | Lefthook `run: \|` blocks must use single-quoted echos | Both | Lefthook wraps in `bash -c "..."`. Inner double-quotes break the wrapper. |
| 10 | `npm audit fix --force` may suggest dangerous downgrades | Both | Use `overrides` in `package.json` for nested CVEs, not `--force`. |
| 11 | knip flags `tailwindcss` as unused | Both | knip doesn't trace CSS `@import`. Pre-allowlisted in `knip.json`. |
| 12 | `gitleaks` after `winget install` PATH refresh | Both (Windows-only) | Open a new terminal after install — winget doesn't refresh the current shell's PATH. |

Starter-specific additions (live in `docs/LESSONS-LEARNED.md`):

- **6a**: Tailwind 4.2.3+ trips `Missing field 'tsconfigPaths'` in Astro 6 Rolldown layer. Pin `tailwindcss` + `@tailwindcss/vite` to `4.2.2` (no caret). Dependabot ignore rule in `.github/dependabot.yml`.
- **CSP must allow analytics endpoints**: PostHog (`*.i.posthog.com`), GA4 (`*.google-analytics.com`, `www.googletagmanager.com`), Vercel SI (`vitals.vercel-insights.com`). `vercel.json` ships these.
- **Lefthook 2 injects local absolute paths into `.husky/_/`**: untrack via `.gitignore` and let `prepare: lefthook install` regenerate per-machine.

---

## Appendix B — Framework Translation Table

This kickoff prompt is meant to work alongside both `web-starter-claude` (Astro) and a future `web-starter-next` (Next.js App Router). The SOP applies to both. File conventions and a few APIs differ.

| Concept | Next.js (App Router) | Astro |
| --- | --- | --- |
| Page route | `src/app/<route>/page.tsx` | `src/pages/<route>.astro` (or `.md`/`.mdx`) |
| Dynamic route | `src/app/[slug]/page.tsx` + `generateStaticParams()` | `src/pages/[slug].astro` + `getStaticPaths()` |
| Layout | `src/app/layout.tsx` (`children`) | `src/layouts/Layout.astro` (slot-based) |
| API route | `src/app/api/foo/route.ts` | `src/pages/api/foo.ts` (needs SSR adapter) |
| Per-page metadata | `metadata` export from server component | `<head>` in layout component or page frontmatter |
| Hydration boundary | `'use client'` directive | `client:load` / `client:idle` / `client:visible` / `client:only` |
| Image component | `next/image` `<Image>` | `astro:assets` `<Image>` |
| LCP image hint | `priority` prop | `loading="eager"` + `fetchpriority="high"` |
| JSON-LD injection | `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />` | `<script type="application/ld+json" set:html={JSON.stringify(data)} />` |
| Sitemap | `src/app/sitemap.ts` | `@astrojs/sitemap` integration |
| `robots.txt` | `src/app/robots.ts` | `public/robots.txt` (static) |
| Manifest (PWA) | `src/app/manifest.ts` | `public/manifest.webmanifest` |
| Security headers | `next.config.ts async headers()` | `vercel.json` headers, OR Cloudflare Transform Rules |
| Image config | `next.config.ts images.remotePatterns` | `astro.config.mjs image.remotePatterns` (Astro 4.0+) |
| Public env vars | `NEXT_PUBLIC_*` prefix | `PUBLIC_*` prefix |
| Type checking | `tsc --noEmit` | `astro check` (covers `.astro` files) |
| Build | `next build` | `astro build` |
| Dev server | `next dev` | `astro dev` |
| Preview server (CI) | `next start` | `astro preview` |

Astro features not in this table (Content Collections, View Transitions, server islands, integrations) — read the relevant Astro docs before proposing changes. Don't guess; the API surface differs meaningfully even where it looks similar.

---

## Appendix C — Optional Handover & Care Plan

**◇ OPTIONAL ◇** This block fires only when the client signs a Handover or Care Plan SOW. Default off. Slot between Phase 8 (Analytics) and Phase 9 (Retrospective).

### Decision tree — does this fire?

| Client signed... | What runs |
| --- | --- |
| Warranty + Handover SOW only | Warranty / Credentials / Documentation handoff / Runbooks |
| Care Plan retainer SOW only | Care plan offering + ongoing cadence start. Crosses into Monthly Maintenance SOP. |
| Both | All of the below |
| Neither | None of the below. Skip directly to Phase 9. Note in project folder that handover was declined. |

### Sub-sections (only run those that fire)

- **Warranty** (Handover SOW): 30-day warranty from deployment milestone. Bug-fix SLA: critical 4h, high 24h, low 5 days. Written into SOW. Excludes new feature work, design changes, content production, framework major upgrades.
- **Credentials and accounts** (Handover SOW): All credentials transferred via shared 1Password / Bitwarden vault. Never via email or chat. All third-party accounts in client's name where possible (domain registrar, Vercel, Cloudflare, Workspace, Resend, PostHog, GA4). Cognisearch-owned accounts have a documented migration path.
- **Documentation handoff** (Handover SOW): `CLAUDE.md` included in repo handover; `docs/runbooks/` folder included (cutover-rollback, deploy, content-edit, dns-change). Loom walkthroughs recorded for: editing content, deploying changes, common admin tasks. Embed Loom links in CMS welcome screen if applicable.
- **Care plan offering** (Care Plan SOW): Monthly maintenance retainer in two tiers — Essentials (~1–2h/mo, $200–$400) or Full Care (~4–5h/mo, $800–$1,500). Both cancellable with 30 days notice. QBR as paid annual add-on. Semrush position tracking only at Full Care tier (billed through to client at cost).
- **Runbook templates** (Handover SOW): `docs/runbooks/deploy.md` (how to ship), `docs/runbooks/content-edit.md` (update copy without touching code), `docs/runbooks/dns-change.md` (safely change DNS).

### Definition of Done (only sub-sections that fire need sign-off)

- ☐ Warranty period clock started. SLA written into a follow-up doc.
- ☐ All credentials transferred via vault. Access verified by **client** (client is the Verifier here).
- ☐ All accounts in client's name where possible. Migration path documented for exceptions.
- ☐ Loom walkthroughs recorded and shared.
- ☐ Care plan tier selected and signed; monthly cadence start date confirmed.
- ☐ Runbooks delivered.
- ☐ If this block did NOT fire: noted in project folder + retrospective doc with reason.
