![][image1]

**Web Project Delivery Plan.**

*From sales call to live site, then live site to ongoing care*

Internal SOP — Team Reference

Version 2.0   •   April 30, 2026

# **Table of Contents**

[**Table of Contents	2**](#heading=)

[**1\. Overview	3**](#heading=)

[Project Qualification	3](#heading=)

[Workflow at a Glance	3](#heading=)

[Framework Selection	3](#heading=)

[**2\. Phase 1 — Sales & Qualification	5**](#heading=)

[Sales steps	5](#heading=)

[Brand-color accessibility preflight (HIGH)	5](#heading=)

[Image-host decision (MED)	5](#heading=)

[Dev-machine setup as a deliverable (MED)	5](#heading=)

[Definition of Done	5](#heading=)

[**3\. Phase 2 — Information Architecture (Gemini)	6**](#heading=)

[Steps	6](#heading=)

[Definition of Done	6](#heading=)

[**4\. Phase 3 — Design (Claude template \+ brand book)	7**](#heading=)

[Steps	7](#heading=)

[Definition of Done	7](#heading=)

[**5\. Phase 4 — Build, GitHub, Vercel Staging	8**](#heading=)

[Starter repos	8](#heading=)

[What the starter ships (high level — see starter repo README for full inventory)	8](#heading=)

[Build steps	9](#heading=)

[Definition of Done	9](#heading=)

[**6\. Phase 5 — Code Integrity Audit	10**](#heading=)

[Owner	10](#heading=)

[Automated security scans (mandatory in CI)	10](#heading=)

[Accessibility — three-signal gate	10](#heading=)

[TypeScript & Code Quality	10](#heading=)

[CLAUDE.md as Living Context Map	11](#heading=)

[Hardcoding & Secrets	11](#heading=)

[Cleanup Pass (before merging to main)	11](#heading=)

[Definition of Done	11](#heading=)

[**7\. Phase 6 — Performance Optimization	12**](#heading=)

[Hero & above-the-fold	12](#heading=)

[Below the fold	12](#heading=)

[Fonts	12](#heading=)

[Images	12](#heading=)

[Mobile	12](#heading=)

[Definition of Done — Core Web Vitals (per-metric thresholds, not just category score)	12](#heading=)

[CLAUDE.md performance checklist (template)	13](#heading=)

[**8\. Phase 7 — Schema Markup Verification	14**](#heading=)

[Cognisearch Mandate (every launch ships these JSON-LD blocks)	14](#heading=)

[LocalBusiness vs Organization decision tree	14](#heading=)

[VideoObject and BlogPosting	14](#heading=)

[Implementation Standards	14](#heading=)

[Definition of Done	15](#heading=)

[**9\. Phase 8 — Pre-Launch Security Audit & Cutover	16**](#heading=)

[Security audit	16](#heading=)

[DNS pre-cutover	16](#heading=)

[Cutover	16](#heading=)

[**10\. Phase 9 — Email & Domain Security	18**](#heading=)

[Why this is post-launch (v2 reorganization)	18](#heading=)

[Cognisearch Default Stack	18](#heading=)

[DMARC Maturity Plan (mandatory — 90-day path to p=reject)	18](#heading=)

[DNSSEC and rollover	19](#heading=)

[Definition of Done	19](#heading=)

[**11\. Phase 10 — Analytics, Tracking & Consent	20**](#heading=)

[PostHog free tier (Cognisearch default)	20](#heading=)

[When to add cookie consent	20](#heading=)

[Search Console \+ Bing Webmaster	20](#heading=)

[Event taxonomy	20](#heading=)

[Compliance	20](#heading=)

[Definition of Done	20](#heading=)

[**12\. Phase 11 — Monitoring & Observability	21**](#heading=)

[Uptime	21](#heading=)

[Errors	21](#heading=)

[Real User Monitoring (RUM)	21](#heading=)

[Distributed tracing (when Server Actions get heavy)	21](#heading=)

[Logs	21](#heading=)

[Alerting	21](#heading=)

[Definition of Done	21](#heading=)

[**13\. Phase 12 — Handover & Care Plan	22**](#heading=)

[Warranty	22](#heading=)

[Credentials and accounts	22](#heading=)

[Documentation handoff	22](#heading=)

[Care plan offering	22](#heading=)

[Runbook templates (handed over)	22](#heading=)

[Definition of Done	22](#heading=)

[**14\. Phase 13 — Post-Launch Retrospective	23**](#heading=)

[Concrete /audit prompt template	23](#heading=)

[Steps	23](#heading=)

[Definition of Done	23](#heading=)

[**15\. Appendix A — Common Landmines	24**](#heading=)

[**16\. Appendix B — Framework Translation Table	26**](#heading=)

[**17\. Appendix C — Cross-Cutting Recommendations Not Yet Promoted	28**](#heading=)

[Visual regression baseline	28](#heading=)

[OWASP ZAP automated scan in CI	28](#heading=)

[Internationalization	28](#heading=)

[AI / LLM Visibility	28](#heading=)

[Conversion Rate Optimization (post-launch retainer)	28](#heading=)

[Backup & Disaster Recovery	28](#heading=)

[**18\. Appendix D — Cognisearch Default Stack (cheat sheet)	29**](#heading=)

[Per-stack code	29](#heading=)

[Cross-stack	29](#heading=)

[Pricing rules	29](#heading=)

# **1\. Overview**

This document defines the standard delivery workflow for a web project, beginning with the initial sales call and ending with an ongoing care plan on a live site. v2 reorganizes the workflow into two acts — Pre-Launch and Post-Launch — and introduces named milestones that mark transitions between major chunks of work. It is intended as an internal reference for the delivery team.

## **Project Qualification**

* A project must result in a publication — a live, public web property is the deliverable.

* Minimum project value: $2,000. Do not engage below this floor.

* If the client already has a usable design template, production cost (and price) should be reduced accordingly. Quote the discount explicitly.

## **Workflow at a Glance**

PRE-LAUNCH:

* Phase 1 — Sales & Qualification (with brand-color preflight \+ image-host decision)

* Phase 2 — Information Architecture (Gemini-assisted)

* Phase 3 — Design (Claude template \+ brand book \+ tap-target & contrast review)

* MILESTONE: Started Development

* Phase 4 — Build, GitHub, Vercel staging (from cognisearch-next-starter / cognisearch-astro-starter)

* Phase 5 — Code Integrity Audit (multi-signal gates)

* Phase 6 — Performance Optimization (CLAUDE.md self-checks; AVIF preferred)

* Phase 7 — Schema Markup Verification

* MILESTONE: Pre-Launch Audit Complete

* Phase 8 — Pre-Launch Security Audit & Cutover (security.txt, canary, rollback runbook)

* MILESTONE: Website Deployed (Live on Production Domain)

POST-LAUNCH:

* Phase 9 — Email & Domain Security (DMARC ramp on the now-live domain)

* Phase 10 — Analytics, Tracking & Consent (PostHog free tier)

* Phase 11 — Monitoring & Observability

* Phase 12 — Handover & Care Plan (cross-reference: Monthly Maintenance SOP)

* Phase 13 — Post-Launch Retrospective (/audit slash command)

* MILESTONE: Project Complete (Care Plan Active)

## **Framework Selection**

Default to Astro for content-led sites (marketing, realty, blogs, portfolios). Default to Next.js (App Router) for app-led sites (auth, dashboards, server actions, live data). The full SOP applies to both. Only file conventions and image / metadata APIs differ — see Appendix B for the translation table. Pick at kickoff; do not migrate mid-project.

**PRE-LAUNCH.**

*Phases 1 through 8 — from sales call to live site*

# **2\. Phase 1 — Sales & Qualification**

Goal: confirm the project meets our floor, lock in scope, capture every input the design and IA work will need, and run two preflight checks that prevent the most common mid-project surprises.

### **Sales steps**

| Step / Action | Owner | Notes |
| :---- | :---- | :---- |
| Run discovery call. Capture goals, audience, must-have pages, deadlines. | Sales | Record the call if the client agrees. |
| Confirm minimum value ($2k). Walk away if scope cannot support it. | Sales | No exceptions without leadership sign-off. |
| Ask whether client has an existing template / brand book / Figma file. | Sales | Template \= lower production cost; reflect in the quote. |
| Send proposal with itemized pricing (template discount visible if applied). | Sales | Use proposal template v3. |
| On signature, collect: brand assets, copy, logins, references, content docs, image dimensions, intended hero/LCP role per page. | Sales → PM | Drop in project Drive folder. Asset spreadsheet must include the LCP-role column. |

### **Brand-color accessibility preflight (HIGH)**

Before signing the SOW, run the client's brand palette through a contrast calculator against \#FFFFFF and the planned background color. If the brand fails 4.5:1 body / 3:1 large/UI, surface the conflict to the client now and decide together: recolor (rare), or restrict-to-decorative-only with dark text substituted for body (common). Discovering this in Phase 5 (Code Integrity) costs 30+ touchpoints of rework.

### **Image-host decision (MED)**

Decide in Phase 1 whether images live in /public, on the client's existing CDN, or on Vercel Blob (post-launch state). Locks remotePatterns early. Mixing three CDNs because the decision was deferred is the default failure mode.

### **Dev-machine setup as a deliverable (MED)**

Add docs/dev-setup.md to the project from day 1, with explicit Windows / macOS / Linux steps for the toolchain (Node, gitleaks, Lefthook prepare, terminal restart after winget install). Onboarding docs get read first; CLAUDE.md gotchas get read second.

### **Definition of Done**

☐  Signed contract on file.

☐  Deposit invoiced and paid.

☐  All client materials uploaded to project folder, including the asset spreadsheet with image dimensions and LCP-role column.

☐  Brand-color preflight complete; any contrast violation surfaced and decided.

☐  Image-host decision recorded in CLAUDE.md as a why-decision.

☐  Kick-off scheduled with delivery team.

# **3\. Phase 2 — Information Architecture (Gemini)**

Goal: produce the page map and link structure that the design and build will follow. This is the strategy artifact — nothing visual yet.

### **Steps**

| Step / Action | Owner | Notes |
| :---- | :---- | :---- |
| Gather every client document, transcript, and reference page. | PM | Include the recorded sales call transcript if available. |
| Feed all source material into Gemini. | Designer | Gemini handles long-context synthesis well for IA. |
| Prompt Gemini to propose page list, hierarchy, and internal links. | Designer | Iterate until coverage and navigation feel right. |
| Produce a sitemap diagram (pages \+ how they link). | Designer | Mermaid or Whimsical — export to project folder. |
| Mark LCP candidate per route in the sitemap export. | Designer | One line per route: "Above-the-fold image responsible for LCP on /: hero portrait". Saves Phase 6 from re-deriving. |
| Inline link inventory: flat list of in-page links per route. | Designer | Surfaces dead/legacy links pre-design instead of during the Phase 8 DNS audit. |
| Review sitemap with client; lock IA before any design begins. | PM | Sign-off in writing. |

### **Definition of Done**

☐  Sitemap approved by client.

☐  Page list, link structure, and per-route LCP candidate stored in project folder.

☐  IA shared with design \+ dev so both work from the same map.

# **4\. Phase 3 — Design (Claude template \+ brand book)**

Goal: turn the locked IA into a designed page set that already passes accessibility gates. Tap-target and contrast checks happen here, not at Phase 5\.

### **Steps**

| Step / Action | Owner | Notes |
| :---- | :---- | :---- |
| Pull the standard Claude page template. | Designer | Latest version from internal repo. |
| Load the client brand book into Claude (colors, type, voice, logos). | Designer | If no brand book, build a one-page brand summary first. |
| Generate page designs section by section against the locked IA. | Designer | One page at a time; review before moving on. |
| Tap-target review: every interactive element ≥ 24×24 px on smallest target viewport (375 px). | Designer | Checkbox on each component before approval. Pagination dots, icon buttons, close X are the usual offenders. |
| Contrast review on all text-on-bg pairs against the agreed-upon palette restriction from Phase 1\. | Designer | If "accent is decorative only", design must respect that. Eyebrow labels in coral-on-white become contrast failures otherwise. |
| Designer marks LCP-candidate images per breakpoint. | Designer | Exactly one image per route gets the priority flag. This is a design-time output, not a build-time reverse-engineering. |
| Internal design review. Check consistency, hierarchy, mobile layout. | Lead Designer | Mobile layouts verified at 375×667 with axe-core in dev — not vague "verified". |
| Send designs to client for sign-off. Collect feedback in one round. | PM | Cap revisions per the contract. |

### **Definition of Done**

☐  All pages designed and approved.

☐  Tap-target review passed; component checklist filed.

☐  Contrast review passed; palette restrictions respected.

☐  LCP-candidate images marked per breakpoint.

☐  Mobile layouts verified at 375×667 with axe-core.

☐  Final assets exported and ready for build.

**▸  MILESTONE  ▸  Started Development**

# **5\. Phase 4 — Build, GitHub, Vercel Staging**

Goal: implement the approved design from a starter repo that ships with the security, quality, and gotcha-prevention baked in. The starter is the source of truth — do not retrofit configurations into a vanilla Next.js or Astro project.

*The starter template ships every config that prevents the gotchas listed in Appendix A. If you find yourself adding a tool here, you are working around a missing starter feature — open an issue against the starter repo, do not paper over it in the client repo.*

### **Starter repos**

* cognisearch-next-starter — App Router, TypeScript strict, Biome, Lefthook, Knip, Lighthouse CI (desktop \+ mobile), Semgrep \+ gitleaks \+ TruffleHog \+ Socket.dev wired into CI, security headers preset, Sharp \+ AVIF/WebP image config.

* cognisearch-astro-starter — Astro 5, TypeScript strict, the same toolchain. Astro-specific image API and sitemap integration.

* Bootstrap: \`npx degit Cognisearch/cognisearch-next-starter \<client-name\>\` (or \`-astro-\` variant). Run \`bootstrap.sh\` to write the brand palette into globals.css, pre-fill CLAUDE.md, install deps, init git.

### **What the starter ships (high level — see starter repo README for full inventory)**

* .claude/commands/audit.md — the Phase 13 review prompt as a slash command.

* .github/workflows/ci.yml — lint \+ typecheck \+ build \+ Lighthouse \+ Semgrep \+ gitleaks \+ TruffleHog \+ knip as parallel jobs.

* .github/dependabot.yml — grouped weekly updates.

* .github/PULL\_REQUEST\_TEMPLATE.md — references the SOP phase being closed.

* docs/dev-setup.md — per-OS toolchain setup.

* docs/runbooks/cutover-rollback.md — Phase 8 rollback template.

* biome.json — including noImgElement: error, security/noDangerouslySetInnerHtml: off (intentional for JSON-LD), correctness/useExhaustiveDependencies: warn.

* lefthook.yml — single-quoted echos in run blocks (Lefthook wraps run blocks in bash \-c so inner double-quotes break the wrapper).

* knip.json — pre-configured ignoreDependencies for tailwindcss / @tailwindcss/postcss (knip doesn't trace CSS @import).

* lighthouserc.json \+ lighthouserc.mobile.json — desktop ≥ 0.95 / mobile ≥ 0.90, plus explicit LCP ≤ 2500ms / CLS ≤ 0.1 / INP ≤ 200ms audits.

* socket.yml v2 — package.json \+ package-lock.json triggerPaths, githubApp.enabled.

* next.config.ts — ESM-safe path resolution (path.dirname(fileURLToPath(import.meta.url))), security headers preset, images.formats: \["image/avif", "image/webp"\].

* package.json — overrides block scaffolded for transitive-dep CVE patches. "prepare": "lefthook install" so hooks self-install on npm install.

* CLAUDE.md template — pre-filled with the 11 portable lessons (see Appendix A).

* .claude/projects/.../memory/MEMORY.md template — seed feedback memories: "ask clarifying questions per step", "prefer in-repo config over external-only setup", "brand colors are non-negotiable, otherwise follow industry standards".

### **Build steps**

| Step / Action | Owner | Notes |
| :---- | :---- | :---- |
| Bootstrap from starter repo into a new private GitHub repo. | Dev | main \+ develop branches. CODEOWNERS pointing at @Cognisearch/admins by default. |
| Implement pages following the locked IA and approved designs. | Dev | Component-driven; reuse before recreating. |
| Wire all internal links per the sitemap. | Dev | No orphan or broken links. |
| Connect Vercel project; configure preview deployments for every PR. | Dev | Every PR gets a preview URL for review. |
| Don't background \`next dev\` (or \`astro dev\`). Verify with build only. | Dev | Backgrounded dev servers crash the dev box. Live preview only in a foreground terminal. |
| Deploy to a Vercel staging URL for client review. | Dev | Lock behind a preview password if needed. |

### **Definition of Done**

☐  Repo on GitHub from the appropriate starter, with clean commit history.

☐  Vercel project deployed; preview URL working.

☐  CLAUDE.md filled with project-specific Conventions / Why-decisions / Gotchas / Run instructions.

☐  Client signs off on staging build.

# **6\. Phase 5 — Code Integrity Audit**

Goal: ship code that is efficient, secure, accessible, and maintainable. The 2026 standard is trunk-based development with automated SAST \+ SCA \+ secrets \+ supply-chain scanning, plus WCAG 2.2 AA enforced in CI through three signals (Lighthouse score \+ axe-core \+ tap-target). Single-signal gates miss too much.

### **Owner**

Lead Dev owns this phase end-to-end and signs off the mandatory "Vulnerability & A11y" pass before deploy.

### **Automated security scans (mandatory in CI)**

Cognisearch default is the free-first stack — see the Application Security Tooling research paper for the full evaluation.

* Dependabot — primary SCA. Grouped weekly. SLA: review within 48h of PR open, merge within 7 days.

* Semgrep — primary SAST. Free for ≤10 contributors. Beats Snyk on SAST in EASE 2024 benchmarks. p/default \+ p/owasp-top-ten \+ Cognisearch custom rules.

* gitleaks (pre-commit via Lefthook) \+ GitHub Push Protection (always on) \+ TruffleHog (CI deep scan).

* Socket.dev (free tier) — supply-chain risk in PR comments. Catches malicious packages that Dependabot fundamentally cannot see.

* Trivy — container and IaC scanning when in scope.

* Wordfence CLI — only when WordPress is in scope.

* Aikido as paid upsell ($150–$300/month flat) for clients requiring unified compliance reporting; Snyk only when contractually named.

### **Accessibility — three-signal gate**

* Lighthouse a11y ≥ 0.95 on every audited page (severity: error in lighthouserc).

* axe-core — 0 serious or critical violations in CI. @axe-core/react in dev surfaces violations during \`next dev\` so they don't survive to CI.

* Tap-target Playwright check — walks the site, computes effective hit area for each interactive element, fails if any drop below 24×24 px.

* Manual screen-reader spot check (VoiceOver on macOS/iOS, NVDA on Windows) — explicit scope: hero, navigation, every form, error states, success states. Not vague "manual a11y check".

### **TypeScript & Code Quality**

* TypeScript everywhere. No new JS files in the repo without an explicit reason in the PR.

* strict: true in tsconfig.json. Zero \`any\` in src/. Zero \`// @ts-ignore\` without \`// @ts-expect-error\` paired with a ticket reference.

* Per-stack lint/format: Next.js → Biome (lint \+ format) plus minimal ESLint for eslint-plugin-react-hooks and eslint-plugin-next. Astro → ESLint with eslint-plugin-astro plus Prettier with prettier-plugin-astro (Biome's Astro support is still experimental as of v2.3 — not yet ready for client work).

* noImgElement: error in biome.json from day 1\. Forces next/image (or astro:assets) — raw \<img\> tags become a hard fail.

* \`// biome-ignore\` authoring micro-guide in CLAUDE.md: when an inline ignore is justified, restore as Biome-syntax suppression with the reason, not just the rule.

* Lefthook for git hooks (single Go binary, parallel execution, single lefthook.yml). "prepare": "lefthook install" in package.json so hooks install on npm install.

* Knip for dead-code and unused-export detection. Runs in CI and during the cleanup pass.

* Bundle-size assertion via @next/bundle-analyzer. Fail PRs that bump the JS bundle by ≥ 10% without justification.

* Trunk-based development: short-lived branches, every PR gets a Vercel preview, merges happen daily.

### **CLAUDE.md as Living Context Map**

CLAUDE.md is not a README. It is the canonical context map that AI coding agents (and humans) read first. Treat it as code — it ships in every PR that changes architecture.

* Architecture overview, conventions, why-decisions with dates, gotchas, run instructions.

* Sections specific to this SOP: Performance checklist (referenced in Phase 6), Schema-emission rules (referenced in Phase 7), DMARC posture (referenced in Phase 9).

### **Hardcoding & Secrets**

☐  No secrets in the repo. Verified with gitleaks pre-commit and TruffleHog in CI.

☐  All env-specific values (URLs, keys, IDs) live in Vercel environment variables, scoped per environment.

☐  No magic numbers or strings in components — extract to a config or constants file.

### **Cleanup Pass (before merging to main)**

* Remove commented-out code, unused dependencies, dead routes, stale assets.

* Run knip to find unused exports, files, and dependencies. Already wired into CI per the Code Quality section above.

* Verify with a codebase search before deleting anything that \*looks\* unused — confirm zero references first.

* Document removals in the PR description so reviewers can sanity-check.

### **Definition of Done**

☐  Dependabot \+ Semgrep \+ Socket.dev green. No High/Critical CVEs or unreviewed risky-package warnings.

☐  Lighthouse a11y ≥ 0.95 \+ axe-core 0 serious/critical \+ tap-target Playwright check passing on every audited page.

☐  TypeScript strict mode on. Zero \`any\` in src/. Zero unaccompanied @ts-ignore.

☐  Bundle-size delta justified or under 10%.

☐  CLAUDE.md updated in this PR if architecture or conventions changed.

☐  Secret scan clean. No hardcoded values.

☐  Cleanup sweep done; PR description lists removals.

# **7\. Phase 6 — Performance Optimization**

Goal: fast loads on desktop and mobile. Hero renders quickly; everything else gets out of the way. These rules live in two places — this phase, AND in the project's CLAUDE.md so Claude self-checks them during build rather than discovering them at audit time.

*Every performance check below is also a checkbox in the project's CLAUDE.md. The intent is that Claude verifies its own work as it builds — performance is not something we audit at the end, it is something that fails CI on the first PR that breaks it.*

### **Hero & above-the-fold**

* Design the hero so it renders with minimal blocking JS / large images.

* Inline critical CSS for the hero where it earns its weight (Next 16's CSS chunking helps but doesn't eliminate render-blocking CSS; trigger a critical-CSS pass when total CSS \> 14kb).

* If hero contains video: host on Vercel Blob, not in the repo. \`\<video\>\` element with \`preload="metadata"\`, \`playsinline\`, \`muted\`, \`loop\`. Provide a poster image so the LCP measurement uses the poster, not the first video frame.

### **Below the fold**

* Lazy-load every image, video, and heavy component below the fold.

* Defer non-critical scripts.

### **Fonts**

* Host fonts locally — no third-party font CDNs in production.

* Use font-display: swap to avoid invisible text during load.

### **Images**

* AVIF preferred, WebP fallback. Configure images.formats: \["image/avif", "image/webp"\] in next.config.ts (Astro: same key in astro.config.mjs). 2026 caniuse: AVIF \~95%, WebP \~97%, with AVIF 30–45% smaller than WebP for the same quality. The \`\<picture\>\` fallback chain covers essentially 100% of users.

* Use next/image (or astro:assets) — never raw \<img\>. The starter's biome.json enforces this with noImgElement: error.

* Compress and resize source files via Sharp as part of the asset pipeline.

* Standardize picture resolution: hero images at one resolution, body images at another. Avoids ad-hoc sizing decisions.

* Upload images to Vercel Blob and serve from there. Document expected cache TTL per client (Vercel's image optimizer hits its cache for next/image requests).

* Always set explicit width/height to prevent layout shift.

### **Mobile**

* Test mobile loading speed explicitly; do not rely on desktop scores.

* Throttle to slow 3G / mid-tier device profile during testing.

### **Definition of Done — Core Web Vitals (per-metric thresholds, not just category score)**

☐  Lighthouse mobile performance ≥ 90\.

☐  Lighthouse desktop performance ≥ 95\.

☐  LCP ≤ 2,500 ms on mobile (per-audit assertion in lighthouserc.mobile.json).

☐  CLS ≤ 0.1.

☐  INP ≤ 200 ms (replaced FID as a Core Web Vital in March 2024 — currently named in lighthouserc.mobile.json).

### **CLAUDE.md performance checklist (template)**

Add the following block to every project's CLAUDE.md so Claude verifies its own output as it builds. The exact text is in the starter repo's CLAUDE.md template — paste-ready.

* Before declaring a page "done": run Lighthouse mobile, confirm ≥ 90 perf, LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms.

* Before adding any image: confirm it's served via next/image or astro:assets, formats include avif and webp, dimensions are explicit, and one image per route carries the priority flag.

* Before adding any third-party script: confirm it's deferred or behind consent.

* Before declaring the hero done: if it contains video, confirm video is on Vercel Blob with poster image and inline playsinline / muted / loop.

# **8\. Phase 7 — Schema Markup Verification**

Schema is the semantic data layer that determines whether Perplexity, ChatGPT, Gemini, and Google AI Overviews can cite the client's site. The actual schema-emitting code is built into the project from the initial Claude prompt (the starter repo includes the JSON-LD foundation in src/app/layout.tsx for Next.js, src/layouts/Layout.astro for Astro). This phase exists to verify that Claude's emission is correct and complete, not to retrofit schema after the fact.

*If the starter repo and initial Claude prompt are doing their job, this phase is a five-minute checklist. If you find yourself authoring schema by hand here, treat it as a starter-repo bug and fix it upstream.*

### **Cognisearch Mandate (every launch ships these JSON-LD blocks)**

* Organization — global, on every page. Includes name, url, logo, sameAs, contactPoint.

* WebSite — global, on every page. Includes potentialAction (SearchAction) when site has search.

* Service — one block per service the client offers. Linked to Organization via @id.

* FAQPage — on the homepage and on every service / pricing page that has Q\&A content.

* BreadcrumbList — on every page below the homepage.

* HowTo — on tutorial, onboarding, or process pages where genuinely applicable. Don't fake it.

* Person — for any author, founder, or quoted expert. With sameAs to LinkedIn, Wikidata, GitHub, ORCID.

### **LocalBusiness vs Organization decision tree**

* Use LocalBusiness (or a subtype like RealEstateAgent, Restaurant, MedicalBusiness) when the client has: a physical address \+ a defined service area \+ opening hours.

* Use Organization when the client is online-only, multi-location without a primary storefront, or a service business without walk-in hours.

* Both can carry the same sameAs and contactPoint properties; the choice signals "local intent" to search engines.

### **VideoObject and BlogPosting**

* VideoObject for any embedded video the client wants indexed (hero video, testimonial reels, tutorials).

* BlogPosting for every blog or article entry. Required for Google's Top Stories carousel.

### **Implementation Standards**

| Step / Action | Owner | Notes |
| :---- | :---- | :---- |
| Entity Mapping with @id fragments | Dev | Stable @id values like "https://client.com/\#organization" so AI engines link entities across pages into a coherent knowledge graph. |
| Author Authority via Person \+ sameAs | Dev | Link authors to verified profiles: LinkedIn, Wikidata, GitHub, ORCID. This drives E-E-A-T signals. |
| Natural-language Q\&A copy | Content | FAQPage answers in 50–150 words, written as direct answers. CI assertion walks faqPage JSON-LD and counts words per Answer.text. |
| JSON-LD only | Dev | No microdata, no RDFa. Inject via \<script type="application/ld+json"\> in \<head\> (Next.js) or via set:html (Astro). |
| Server-rendered, not injected client-side | Dev | AI crawlers and many traditional crawlers skip JS. Confirmed via view-source on the deployed page. |
| Validate every type before launch | Dev | Google Rich Results Test \+ Schema.org validator \+ Schema App Validator. CI step hits the public Schema.org validator API for each route on every PR. |

### **Definition of Done**

☐  Organization, WebSite, Service, FAQPage, BreadcrumbList live and validated.

☐  HowTo, Person, VideoObject, BlogPosting added wherever applicable.

☐  All entities use stable @id fragments and link to each other.

☐  Author profiles include sameAs to LinkedIn (and Wikidata where available).

☐  All FAQ answers are 50–150 words (verified by CI assertion).

☐  Schema CI gate passing for every page.

**▸  MILESTONE  ▸  Pre-Launch Audit Complete**

# **9\. Phase 8 — Pre-Launch Security Audit & Cutover**

Goal: ship with no soft spots and a written rollback path. Confirm the stack, hosting, and DNS are correct. Cut over with a canary if the client's traffic warrants it.

### **Security audit**

☐  Framework and major dependencies are on their latest stable versions.

☐  No secrets are committed to the repo or shipped to the client side.

☐  Firewall / WAF strategy decided (Cloudflare default) and configured.

☐  Hosting choice re-validated — confirm Vercel is the right fit for this project.

☐  security.txt and .well-known/security.json present at the root pre-launch (RFC 9116, standard since 2022). Lets researchers report vulns without panic.

☐  CSP in Report-Only mode for at least 7 days before enforcement (especially if Zoho iframes, PostHog, or fonts are in play).

☐  OWASP Secure Headers baseline present: HSTS (max-age=63072000; includeSubDomains; preload), X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy with camera/microphone/geolocation/interest-cohort all empty.

☐  OWASP ZAP passive scan in CI (or scheduled pre-launch); 0 High findings.

### **DNS pre-cutover**

☐  Pre-reduce DNS TTL 24–48 hours before the cutover window.

☐  Apex and www records prepared for the new Vercel deployment (do not switch yet).

☐  HTTPS enforced; HSTS configured.

☐  301 redirects from any legacy URLs documented and ready (Screaming Frog crawl of the legacy site if applicable).

### **Cutover**

☐  Pre-launch checklist signed off across QA, performance, schema, analytics-ready, monitoring-ready, and compliance.

☐  Rollback runbook written: docs/runbooks/cutover-rollback.md covers DNS revert, Vercel deployment rollback, lockfile rollback, and customer comms. Tested on staging.

☐  Status page set to "scheduled maintenance" if visible downtime is expected.

☐  For high-stakes clients: canary deployment using Vercel edge config — 10% → 50% → 100% traffic split.

☐  Cutover window with rollback decision criteria in writing.

☐  Run a second audit after DNS changes propagate (apex, www, security.txt resolves, HTTPS works, schema still serving).

**▸  MILESTONE  ▸  Website Deployed (Live on Production Domain)**

**POST-LAUNCH.**

*Phases 9 through 13 — from launch through care plan handover*

# **10\. Phase 9 — Email & Domain Security**

Goal: stand up a Zero-Trust email setup on the client's now-live domain, with consolidated edge security and modern deliverability. This phase begins immediately after launch (Phase 8\) — DKIM and DMARC enforcement only become meaningful once the domain is actually serving production traffic and sending real mail.

### **Why this is post-launch (v2 reorganization)**

v1 of this SOP had Email & Domain Security as Phase 5, before launch. In practice that ordering created two problems: DMARC reports during the staging period are uninformative (no real senders to baseline against), and clients often stand up their own MX records during the launch event in ways that trample our planning. v2 moves email config to immediately post-launch when the domain is live and sending.

### **Cognisearch Default Stack**

| Step / Action | Owner | Notes |
| :---- | :---- | :---- |
| Mailbox / collaboration | Default | Google Workspace. Microsoft 365 only when the client is already standardized on it. |
| DNS, WAF, email routing | Default | Cloudflare — single edge environment. Already configured at cutover (Phase 8). |
| Transactional sending (app, forms, receipts) | Default | Resend on a dedicated subdomain (mail.client.com). Strong DX, native Vercel/Next.js fit, sane pricing. |
| Defensive AI layer (ICES) | Tiered | Cloudflare Email Security Phishguard Free baseline for every project. Upgrade to Phishguard Pro for clients with regulated data, finance, or executive-target risk. |

### **DMARC Maturity Plan (mandatory — 90-day path to p=reject)**

| Step / Action | Owner | Notes |
| :---- | :---- | :---- |
| Day 0–14: p=none with rua reporting | Dev | Collect DMARC reports via dmarcian, Postmark DMARC, or Cloudflare DMARC Management. |
| Day 15–45: p=quarantine, pct=25 → 100 | Dev | Ramp percentage as legitimate sources are confirmed in reports. |
| Day 46–90: p=reject | Dev | Lock the domain. No new sending source goes live without first being added to SPF/DKIM. |
| Add BIMI record after p=reject is stable | Dev | Logo in Gmail/Yahoo inbox. VMC ($1.5–2k/yr) only worth it if client sends ≥ 100k/mo transactional — see BIMI ROI worksheet. |

### **DNSSEC and rollover**

* DNSSEC enabled at Cloudflare (DS records published at the registrar).

* KSK rolled every 12 months; calendar reminder set.

### **Definition of Done**

☐  Cloudflare Email Security Phishguard tier active on inbound.

☐  Resend domain verified; transactional sends from a dedicated subdomain.

☐  DMARC at p=none with reports flowing; calendar reminder set for the 90-day enforcement ramp.

☐  Seed test passes across Gmail, Outlook, Yahoo, iCloud.

☐  DNSSEC enabled with rollover schedule documented.

# **11\. Phase 10 — Analytics, Tracking & Consent**

Goal: stand up product analytics, error tracking, and (when needed) consent on the live site. The Cognisearch default consolidates onto PostHog free tier, which sidesteps the cookie banner requirement when the rest of the stack is cookie-free.

### **PostHog free tier (Cognisearch default)**

* 1M events \+ 100k errors \+ 5k session replays per month, plus feature flags / experiments.

* Single SDK (posthog-js), single dashboard, single privacy story.

* Cookieless mode: no third-party cookies, localStorage-only client tokens, respect\_dnt enabled, PII sanitization on.

* PostHog provider component reads NEXT\_PUBLIC\_POSTHOG\_KEY (or PUBLIC\_POSTHOG\_KEY for Astro). If absent, returns children unchanged and never initializes — graceful no-op until the key lands.

### **When to add cookie consent**

* Default: NO cookie banner. PostHog cookieless \+ no GA4 \+ no ad tags \= no tracking cookies \= no consent legally required under GDPR / ePrivacy / CCPA.

* Add a banner only when: GA4, Google Ads, Meta Ads, or any third-party analytics with persistent identifiers gets wired in.

* If consent is needed: implement Google Consent Mode v2. No third-party tag fires before consent. Cookiebot, Iubenda, or self-hosted Klaro.

### **Search Console \+ Bing Webmaster**

* Verify the property in Google Search Console.

* Verify in Bing Webmaster Tools (different audience, same effort).

* Submit sitemap.xml to both.

### **Event taxonomy**

* Document the project's event taxonomy in CLAUDE.md so future analysts and AI agents understand the dataset.

* Standard events: page\_view (auto), form\_submit (per form), conversion (per defined goal).

### **Compliance**

* Document the GDPR/CCPA delete-on-request workflow for PostHog. PostHog has a public API for user deletion; record the runbook in docs/runbooks/.

### **Definition of Done**

☐  PostHog provider mounted in the layout. Key in Vercel env vars.

☐  Cookie banner decision recorded in CLAUDE.md as a why-decision (default: deferred).

☐  Search Console \+ Bing Webmaster Tools verified, sitemap submitted to both.

☐  Event taxonomy documented in CLAUDE.md.

☐  GDPR/CCPA delete-on-request runbook in docs/runbooks/.

# **12\. Phase 11 — Monitoring & Observability**

Goal: know when the site is broken before the client does. PostHog covers a lot (errors, replays, analytics) but uptime and traces need their own tooling.

### **Uptime**

* Better Stack (or UptimeRobot) on a separate domain — so a Vercel outage doesn't take the status page down too.

* Synthetic checks for critical flows (homepage load, contact form submit, sitemap content vs current routes, JSON-LD validity on key pages).

* Public status page if the client wants one.

### **Errors**

* PostHog free tier covers 100k errors/month \+ session replays — sufficient for most marketing sites.

* Sentry as upgrade for projects with deep performance / source-map / stack-trace needs.

### **Real User Monitoring (RUM)**

* Vercel Speed Insights — free, native, captures real-user LCP / CLS / INP.

* Sentry Performance for deeper traces if needed.

### **Distributed tracing (when Server Actions get heavy)**

* OpenTelemetry via Vercel OTel exporter when the project gains meaningful server-side complexity (multiple Server Actions, async background work, third-party API chains).

* Skip until needed — most marketing sites never need it.

### **Logs**

* Axiom (generous free tier, native Vercel integration) or Logtail.

### **Alerting**

* PagerDuty or Better Stack on-call for P1 incidents.

* In current Cognisearch staffing: founder is the on-call. Document the escalation path explicitly.

### **Definition of Done**

☐  Uptime monitoring active with alerting wired.

☐  Synthetic checks for at least 3 critical flows.

☐  Vercel Speed Insights enabled.

☐  Sentry decision recorded (yes / no / deferred).

☐  On-call escalation path documented in CLAUDE.md.

# **13\. Phase 12 — Handover & Care Plan**

Goal: hand the live site over to the client cleanly, set up the ongoing relationship, and trigger the monthly maintenance cadence.

### **Warranty**

* 30-day warranty period from the deployment milestone. Bug-fix SLA: critical 4h, high 24h, low 5 days. Written into the SOW.

* Excludes: new feature work, design changes, content production, framework major upgrades.

### **Credentials and accounts**

* All credentials transferred via a shared 1Password or Bitwarden vault. Never via email or chat.

* All third-party accounts created in the client's name where possible — domain registrar, Vercel, Cloudflare, Google Workspace, Resend, PostHog. Avoid agency lock-in.

* Where Cognisearch must own the account (e.g. shared CI tooling): document the migration path.

### **Documentation handoff**

* CLAUDE.md included in the repo handover (the client's next dev or AI agent will need it).

* docs/runbooks/ folder included (cutover-rollback, deploy, content edit, DNS change at minimum).

* Recorded Loom walkthroughs for: editing content, deploying changes, common admin tasks.

* Embed Loom links in the CMS welcome screen if applicable.

### **Care plan offering**

* Monthly maintenance retainer in two tiers — Essentials (\~1–2h/mo, $200–$400) or Full Care (\~4–5h/mo, $800–$1,500). See the Monthly Website Maintenance SOP for the full checklist and report templates.

* Both tiers cancellable with 30 days notice.

* Quarterly Business Review as a paid add-on for clients on annual contracts.

### **Runbook templates (handed over)**

* docs/runbooks/deploy.md — how to ship a change.

* docs/runbooks/content-edit.md — how to update copy without touching code.

* docs/runbooks/dns-change.md — how to safely change a DNS record.

### **Definition of Done**

☐  Warranty period clock started. SLA written into a follow-up doc.

☐  All credentials transferred via vault. Access verified by the client.

☐  All accounts in the client's name where possible. Migration path documented for any exceptions.

☐  Loom walkthroughs recorded and shared.

☐  Care plan tier selected and signed; monthly cadence start date confirmed.

☐  Runbooks delivered.

# **14\. Phase 13 — Post-Launch Retrospective**

Goal: capture what was learned on this project and feed it back into the starter repo, the SOP, and the team's working memory. The mechanism is a concrete /audit slash command, not a vague "run it back through Claude".

### **Concrete /audit prompt template**

Ship as .claude/commands/audit.md in every starter repo. The exact prompt:

*/audit — read CLAUDE.md and docs/Web\_Project\_Delivery\_Checklist.csv. For each Phase, verify the DoD against the current state of the repo. Report: which rows are actually complete, which are partially complete, which are stale. Do not fix anything. Output the gap list.*

### **Steps**

| Step / Action | Owner | Notes |
| :---- | :---- | :---- |
| Run the /audit slash command in the project repo. | Lead Dev | Output: gap list, not fixes. |
| Triage the gap list. Anything truly missing → ticket. Anything stale → CLAUDE.md update. | Lead Dev | Don't bulk-close "complete" rows just because Claude said so — verify. |
| Lessons learned write-up: what surprised us, what worked, what the next project should pre-empt. | Lead Dev \+ PM | Live in docs/recommended-fixes.md (use the Cabana 17 doc as the structural template). |
| Promote portable lessons into the next-project starter template. | Lead Dev | Open PR against cognisearch-next-starter or cognisearch-astro-starter. Don't keep gotchas project-local — they belong in the starter. |
| Update docs/sop-recommendations.md if any phase needs sharpening. | Lead Dev | This is how the SOP itself improves over time. |

### **Definition of Done**

☐  /audit gap list produced and triaged.

☐  Lessons learned captured in docs/recommended-fixes.md.

☐  Starter-repo PR opened (or filed as future-issues if no immediate change is warranted).

☐  SOP recommendations updated if necessary.

**▸  MILESTONE  ▸  Project Complete (Care Plan Active)**

# **15\. Appendix A — Common Landmines**

Eleven gotchas that have bitten Cognisearch projects in real builds. Pre-baked into the starter repo's CLAUDE.md template; reproduced here so the SOP itself stays self-contained. Most are framework-agnostic.

| Landmine | Framework | How to avoid |
| :---- | :---- | :---- |
| Three lockfiles confusing workspace-root detection | Next.js 16+ | Use ESM-safe path resolution in next.config.ts: turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) }. Astro handles workspace root natively. |
| Two dev servers can't coexist (port collision) | Both | Kill the old \`next dev\` / \`astro dev\` before starting a new one. |
| Don't background \`next dev\` / \`astro dev\` | Both | Crashed dev boxes traced to backgrounded dev servers. Verify pre-launch with build only. Live preview only in a foreground terminal the user controls. |
| 'use client' doesn't prevent SSR | Next.js | App Router still SSRs client components on initial load. JSON-LD inside 'use client' files DOES end up in the SSR HTML. Validated by view-source. (Astro: N/A — uses client:\* directives instead.) |
| metadata exports require a server component | Next.js | Add a sibling layout.tsx (server component) to each route to carry metadata. Page can stay 'use client'. (Astro: N/A — use layout slots or page frontmatter.) |
| Biome ignores docs/ by config | Both | Keep docs/ out of Biome's files.includes. |
| Image remotePatterns must be added before using external image hosts | Both | Add to next.config.ts images.remotePatterns or astro.config.mjs image.remotePatterns. Failure: build error or worse, silent no-optimization. |
| Lefthook needs one-time \`lefthook install\` per clone | Both | Add "prepare": "lefthook install" to package.json so npm install runs it automatically. |
| Lefthook \`run: |\` blocks must use single-quoted echos | Both | Lefthook wraps run blocks in \`bash \-c "..."\`. Inner double-quotes break the wrapper. Critical landmine — always single-quote echos. |
| \`npm audit fix \--force\` may suggest dangerous downgrades | Both | Use overrides in package.json for nested CVEs, not \--force. The starter ships with overrides scaffolded as a teaching pattern. |
| knip flags \`tailwindcss\` as unused | Both | knip doesn't trace CSS @import directives. Pre-configure ignoreDependencies for tailwindcss \+ @tailwindcss/postcss. False positive holds for any PostCSS plugin imported via CSS. |
| \`gitleaks\` after \`winget install\` PATH refresh | Both (Windows-only) | Open a new terminal after install — winget doesn't refresh the current shell's PATH. |

# **16\. Appendix B — Framework Translation Table**

Cognisearch's full SOP applies to both Astro and Next.js. The security stack, lint/format toolchain, CI workflow, monitoring, analytics, and most engineering decisions are identical. The differences are in file conventions, the image / metadata APIs, and a few CI specifics.

| Concept | Next.js (App Router) | Astro |
| :---- | :---- | :---- |
| Page route | src/app/\<route\>/page.tsx | src/pages/\<route\>.astro (or .md / .mdx) |
| Dynamic route | src/app/\[slug\]/page.tsx \+ generateStaticParams() | src/pages/\[slug\].astro \+ getStaticPaths() |
| Layout | src/app/layout.tsx (children) | src/layouts/Layout.astro (slot-based) |
| API route | src/app/api/foo/route.ts | src/pages/api/foo.ts (needs adapter for SSR) |
| Per-page metadata | metadata export from server component | \<head\> in layout component or page frontmatter |
| Hydration boundary | 'use client' directive | client:load / client:idle / client:visible / client:only |
| Image component | next/image \<Image\> | astro:assets \<Image\> |
| LCP image hint | priority prop | loading="eager" \+ fetchpriority="high" |
| JSON-LD injection | \<script type="application/ld+json" dangerouslySetInnerHTML={{ \_\_html: JSON.stringify(data) }} /\> | \<script type="application/ld+json" set:html={JSON.stringify(data)} /\> |
| Sitemap | src/app/sitemap.ts | @astrojs/sitemap integration |
| robots.txt | src/app/robots.ts | public/robots.txt (static) |
| Manifest (PWA) | src/app/manifest.ts | public/manifest.webmanifest |
| Security headers | next.config.ts async headers() | vercel.json headers, OR Cloudflare Transform Rules |
| Image config | next.config.ts images.remotePatterns | astro.config.mjs image.remotePatterns (Astro 4.0+) |
| Public env vars | NEXT\_PUBLIC\_\* prefix | PUBLIC\_\* prefix |
| Type checking | tsc \--noEmit | astro check (covers .astro files) |
| Build | next build | astro build |
| Dev server | next dev | astro dev |
| Preview server (CI) | next start | astro preview |

Astro features not in this table (Content Collections, View Transitions, server islands, integrations) — read the relevant Astro docs before proposing changes. Don't guess; the API surface differs meaningfully even where it looks similar.

# **17\. Appendix C — Cross-Cutting Recommendations Not Yet Promoted**

Items that didn't make the numbered phases but are worth tracking. Promote individually as the agency's needs justify.

## **Visual regression baseline**

* Chromatic or Percy on first design approval. Catches accidental UI changes during the long Phase 4 → 8 stretch. Currently filed under Phase 5 testing, but worth its own treatment when the agency runs \> 5 active projects.

## **OWASP ZAP automated scan in CI**

* Currently mentioned in Phase 8\. Promote to a standalone scheduled scan (e.g. weekly) for projects that handle PII or auth.

## **Internationalization**

* Skipped by default — most Cognisearch projects are single-locale. When the first multi-locale project lands, write the i18n SOP then. Likely additions: i18n routing, Lokalise or Crowdin tied to GitHub PRs, locale-aware formatting, RTL support if Arabic / Hebrew in scope, hreflang correctness.

## **AI / LLM Visibility**

* llms.txt at the root declaring crawl preferences.

* Quarterly check: query Perplexity, ChatGPT, and Gemini about the client; verify the citations and facts. (Captured in the Monthly Maintenance SOP as a quick monthly check; deeper audit is a Quarterly Business Review item.)

## **Conversion Rate Optimization (post-launch retainer)**

* PostHog feature flags \+ experiments for A/B testing — already in the analytics stack.

* Quarterly heatmap and funnel review with prioritized CRO recommendations.

* Tie experiments to commercial KPIs, not vanity metrics.

## **Backup & Disaster Recovery**

* Database: daily automated backups, weekly off-site copy, monthly restore test.

* Vercel Blob versioning enabled for asset history.

* Cloudflare zone file exported into the project folder.

* Define RPO / RTO per client tier.

* Test the restore procedure once before declaring backups "working."

# **18\. Appendix D — Cognisearch Default Stack (cheat sheet)**

### **Per-stack code**

* Next.js: TypeScript strict, App Router. Biome \+ minimal ESLint (eslint-plugin-react-hooks \+ eslint-plugin-next). Lefthook. Knip. Sharp for image pipeline. CLAUDE.md as living context map.

* Astro: TypeScript strict, Astro 5+. ESLint with eslint-plugin-astro \+ Prettier with prettier-plugin-astro. Lefthook. Knip. Sharp via astro:assets. CLAUDE.md as living context map.

### **Cross-stack**

* Hosting: Vercel by default.

* DNS / WAF / inbound email: Cloudflare.

* Mailbox: Google Workspace.

* Transactional email: Resend on a dedicated subdomain (mail.client.com).

* ICES: Cloudflare Email Security Phishguard (Free baseline; Pro upsell for regulated/high-target clients).

* Analytics \+ errors \+ replays: PostHog free tier (cookieless, no consent banner needed).

* Uptime \+ status page: Better Stack on a separate domain.

* RUM: Vercel Speed Insights.

* Schema: Organization \+ WebSite \+ Service \+ FAQPage \+ BreadcrumbList on every launch (HowTo / Person / VideoObject / BlogPosting where applicable).

* CI/CD: GitHub Actions gating every PR with Dependabot \+ Semgrep \+ gitleaks \+ TruffleHog \+ Socket.dev \+ axe-core \+ Lighthouse \+ knip. Aikido as paid upsell when client compliance demands unified reporting.

* Image format: AVIF preferred, WebP fallback. AVIF 30–45% smaller than WebP at the same quality. Combined \~99%+ browser support via \<picture\> fallback.

### **Pricing rules**

* Floor: $2,000 per project. No project below this.

* Template / brand book / design system supplied by client → reduce production cost; reflect in quote.

* Always itemize: discovery, IA, design, build, deploy, security, post-launch. Discounts apply line-by-line.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgsAAAB5CAYAAAC3KmItAAAdT0lEQVR4Xu2dC7AlR1nHNwsEeYSXPORlluWy957pnrO73MDm7szcHEiACpKwATelJBsEEao0UEoBImplITyUhzxUkMKgoqKI8rJQAUWQdwIYKahEhEogQEhCSAiE3c3T7rvnbPr8p3vOTE/3nDnJ/1f1L8jt7/99X8+eR8+Z16ZNhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEFLNYLD+KCnyW1Fbt67eG2MJIYQQcgdDJNkluEgAvQs9hBBCCLmDYFkYWCVEfgp6CSH9Qb1PLzSF44QQ4oWU2XG4KKgS+gkh/YHvV0JIFITIr8IPmCqhnxDSH/h+JYREAT9cZkmI3b+COQgh/QDfrzhOCCFe4IfLLHGxQEh/wfcrjhNCiBfqA+UG/ICp0urqSbyMkpCegu9XHCeEEC9SUbwEP2CqhH5CSH/g+5UQEg38gKnQ+9BLCOkP+J7FcUII8WbtYWt3ww8Ziw6ijxDSL/B9i+OEENIa9eHyFfywGevPMZYQ0j/wvYvjhBASDCHE0UKs3W/Tpv2bcYwQ0l+4WCCEEEJIJVwsEEIIIaQSLhYIIYQQUgkXC4QQQgiphIuFjhgO1x8xHBYnCpE9R4jiOfr/S1kMMa7vJElWpEn+LD0HKfOnJMn6TozpO0tLJ9/18L9FceTfYjAoHoxxtxdue+3p+eZnSbm+G2MIIaQKLhYisLS0615qY/4YN24tJfnHtmwZ/Qzm7Jrl5ewY1c8Vpf5qSH0hvbAPc9Ds3bv3Tmqbvh97nKkkv1LfIwDzISWfQ+hzgT6X0GewWSbZ6Rg/U0lxJiYKgUiyL5dqWYS+QGzetm10fymz16oanzlcK/vsxv+X2dN27BjdBw19QPeVpsUe1evHU5F/d7yNdM+vTdPsyfq9iZ4+IsTonmqB+iQ1h7er99OXxvO4VL0+P6l2OPaubl1dyNt771gZbZGiuKyb1/D+zfrqoVQUv3Xba3j8ekjyP9Ovk662Y5v5rq6u3l3tKL8Rc5Qk83fq1w36b3ekIvuP0uRbSL3JPo81YqPqfhr7aCP1AvlLrNEF20XxWOzFV+mg2IP5J2CsS+hzgT6X0Hd4gZrdjHEeukYvsDC/L10vFlZXT7m7+mC9BPPX0Df1Bxrm6wK9cJG+Oxci/8bOpeIBmHMejHcw/sfS40ypHYzvbl/Jt2HOKjAHjlfR1Ks+i/8LPSj0+KJq/R7mrq2kuLbq86oNWAvHLaiFTv6/6GugSzHhwjMcPvEelokG03A4ehjWDM1w+XHLWDek1tZm76WHQtX7FtZvK5HkV2EdDca5hD4X6HNpyiPzZ+N4awU6VNHlYkHt7X0d83ro25g3FmpR8/uW+t5Si527YI0uGI1Gd8Ze2qjuPNCH41XU9Q4Gxz8aY11Cb1PGi8ZSXl/pw49Yow2YH8dN1CLhXIz3lsxfifkXEplk15YmF0cHsHYoLLVi6YdYOyT6C85SM6zgS7Q07pDpqQJ9LhnxN+JYQF1v9uZDF4uFNMlOxnytpRZgWCcUUhavLtULpx9jvVjowyWq3o8sPYTQdVgPQQ+OV1HHKxu+t9BfF7Vo/CDmCiq5+5FY0wfMi+Oa8Wui3MO0rla6WIjsA+p/L7KM2yWzJ2C9hSBNs+eVJtOBVlZO/FnsxZc0WT8D83eh4XK2jL20Ra1kv4B1Ykkktx0ewjGXzF6rQJ9LKvQo/FssYY9NiL1YwDyGrq7z8/xQFE9XsQcsfvXvnM38wmrCxvkzljqGvpem6yn6bKgPWv2rhPsR4Em8xY5G1fh2qaahVORf1ScSow9JkuznVfw30W/oo+iZgLE4XkWVV99lFMdBV6vte56Uux5k+pqSpvl9LblNfVOIJ90PfTb0F6la4F5pyTHRNeoV2OrwIuYsjSfF8zFGayiLF2NsFcb5LSWpz/l/x/heo5r+FE6iSwmxewf21BSV50LM26lk8TrsyReV75pS/vi6eFwb/24V9uwCfX0R9lmXmIsFad/z89qzHn+RW798MdaHoVh/POY9Ipkdh/FNUF/Mf1DKeViXYWwILHUmOtjm5Mvt29ceasmpZf1VFeNwvIoqL45tSObn6fOCzLg2qC+915RqjDUYrD8K45ugcp+COScaDnd5H9LGXDBW+oVpONz9QDOmKVKu78ecY30fY3uJemN/2NJ852pzJjfmmpuS7NXYW1NKObuVeXZypbBvF+jrk7DXOsRaLKi8l2AO9d48HeOakori7FJej/5M1If3MzBf25w2pMjOxxqB67h+zboBA9swPlESa5TmMWu8CpcX/670b6YvBCrn+yx1bknTfBVj26BeD/oqIKyjd9S8LtnHPJO/q/fipTAW9HHzWHdDSf5+jOsVqsFzSk3PUdhfHQKdMR9ODX+iMqlzhnJfhL27QF+/VPwj9juLWIsF9If4tW2CylX+FUD6XVqapuvrpVwii7Zn5DpmjHE+YE4ttRD6Q4wLhcqNJ6zebI5jL+bYLGxekUzXi3H598bhC6it9AmMC8f+zZZ6XiecYw79t3QlXzX/FvJ9aKJy/zPWr3OYcS7ojYvN1tTMVZZ6U/yyxVdHN2KuKtSbwXpsdt7yeVMOBrsl5mmkJH8z5tSMf45+aym+pbCOC/T5SB8vTtPda5hbI+X6QCbFJ9FTV5hvFjEWC7J8uOCLGNMWYbkMGmNmoc/qxxz652eMC4/9CwKjmmDbycCYGOjLWafqJvnnJmNt+rF5jf++BeNDsHNn9hCsq96r52JcDLBu0+2lsfnN/1YLhcegJySqxlW2HnoHNjlLqSg+gDlqYH2TV2nn4PHHYhIb6SA/Cb19EvZbhWvvqYb0h8BRmK8KtTd9uSVPY2FeF+hroq0Nb84iZX4a5pilVOZXYp4qIi0WvL1NwDrDpWaXMKNfvZb+DmNiUq6fvwlj6qB8f4W5MCYyU4c/hsPhPfQf2/SEXrWIe69PniZYar4bY2Iiy4vsRouiUv9J/oYj/y3XH47xMcAe0uSEkzFmrqh/1Ns2Sg3pO25hjiZgvllCvw309FHYswv01dDNbe9VYcnZSJjPBfrqKTuEeZrQ9CZGo1H9X4JCLxZWVo7fYvqEKF6CMaFQe31/An3WvjpCxX4CvNb7dMREiBMe47udTTCHvoIBY2IjxGgJ54F9oacK9E6UpsUJGBsCabn3C8Z0AfawsvLY2lfXoffINpPFtRgbi+3b821YH2PmCjZXJfT6onLdgrldSgfZk9FvYjkBpZ+qcVa4vt1tyVch182UfFD5foL56wpzuUBfDVnPFG+KynO9JbdLtRcnoRcLAs78x/HQ+Pbp6wuNWgj+GvTS6NClLO2NFudjTFfo2pM+1OdA6d4aGF8Fen1yNKD0izEGdIV6/2z37QV9Tf2hKNffvxlj5oKU+euxOZeEWFtCvy81rsmeEvpNMLbPwt4RjJ8l9LdFlj486wnzuEDfLKG/DZi7Suh1EWGxMLW3j+Oh8elT4j0/ZD7CmC7xmYPGdmdGjOka7Me3N/RqLS9nD8G4EGAdKYuXYUyXYD847gJ9Y30D42IzHBRwV83iIxgzFywbx66k2bHcupTqOIS+CWrsTzG216r4YB0Os0a3pEZ/KLBOHWEOF+irUpLku9DfBn1dNNZwST+DAf02IiwWpq5Pj71XMb7LXKM+fecWCzWHx031JPNzMMYGzkMm2Yswpmv0r4+lvjy2M3qb+pvQVZ26WC4P/hrG2MB5zHMufenjCE2e+YDeUGAdl/RTydCrwbi+K5X5TTiHCWr8EMa75HOFRV2E2DvrDm8lYQ4X6KsSekOANVzSdzBFr43wi4XpY9f6cmaMmSelmy/J/AUYMw98trePpwuwL5/+0NvUXxcJV1bpO29izDzwmTt66vpi0Jc+jtDkHu7o7QvY5yII5zAB46qE3tDIBueUNOkHfRW6Ar0hUB9mNe9Tn9X66S/0YqG0gE+6O7mqDr7zio2Ew2c4jqhF2c/BXILeeKkNqpcLcDvXmZMJevXzGTAmBFhHH9rBmHmAfeG4DfTU9cVA1f5aH/o4Am4Yp+Ro5ol580B98L+81OsCCOcxAeNcanKGry/ptnwr1q0S+l2gz6WQj5E22bXxqOtyPZvQayP0YkGD3u1JlmPMvMDecHxeqC/DP2rSl4S7k8a62Y4vuJ3rzMkEvWman4QxIcA6OD4vhMh/wxSO28C56FtgY0xX6ENpZi8xf0muRWnjOIS+viCbneHeJ11YmktSnGmJswq9scC6VUKvC/S5hL6QYC2X0Gcj0mJhaq+iqT8WlmPBn8aYeTLVm8z347hJH7evCfbXtMc23iZAnc4efx4D3GZpulbroWcxGD+AzOglvy/GdApuHJfQ1xewzwXS1G1dx3O51BJn02fQGwspiv+z1LcKvS7Q5xL6QoK1XEKfjRiLBQ36xzka3XArNBKenihE8ViMmSewvb6D4yaWbdsrpMxKdyHFmCraeOsiRPYOs8Y8v1xDYNlm836/HelFiPwUHO8U3DgOfQ99fcHS68LIdy5dHIKYoC+1wvouodcF+lxCX0iwlkvosxFrsVA6w38s9ffnYGxXYC84Pm+gv8obTEFstGdZ+JImxVPbbO823rrIJLs2do0u6WKbNcHsJU2yl+J4Z6Rp/kLcOFbJ/B/Q2xdKvS6QfOeCvthgfZfQ5wJ9LqEvJFjLJfTZiLVY0CjfKzHPRGovbgXjY4M94Pi8gf5+iuMmEDvz+TbzoM32buOtSxc1uqRv8zF70Tdrw/HOUIuAj+HGsSnm7WbboO/Vjb0ukkrzscTYhL7YYH2X0OcCfS6hLyRYyyX02Yi5WNDoB2ZhLlP6VtY7VkZb0BcDrI3j8wb6cy4Whklx4lSszJ+CMX2gzfZu461LFzW6pG/zMXuZ72JB5JfhxrFK5qehtw/oZ5aXel0gleZjibEJfbHB+i6hzwX6XEJfSLCWS+izEXuxMEHl+DjmtGolHy0tnXxX9IegVKvfci4W0jR7qRmL430B54TjVbTx1qWLGl3St/mYvcx3sZDkV+LGsUquD9DbB7hY6Aas7xL6XKDPJfSFBGu5hD4bXS0WJsikeB3mrtAVSZIFe2qdJX+f5VwsqH+zqXtt4HhfwDnheBVtvHXpokaX9G0+Zi/zXSzU/GUh6dE13iZcLHQD1ncJfS7Q5xL6QoK1XEKfja4XCyapqFd7olkPZJsF5uu5rsb+J3CxEIYuanRJ3+Zj9jLvxcLFuHFsSpPsDPT2AbwOddGE88Fxl9AXG6zvEvpcoM8l9IUEa7mEPhvzXCxM0HfNUx8m52LNClVeVuiilEdmv9pjnY79T9DnYZnzwPG+gNsbx6to461LFzW6pG/zMXuZ72JB5r+LG8cqWfwNevuAEKN7lnpdIOF8cNwl9MUG67uEPhfocwl9IcFaLqHPRh8WCzbUl+VfYw8lyfxL6KsC/Ti+KKjFQmbOIxX5MzCmD7TZ3m28demiRpf0bT5mL3NdLOg7QuHGcegi9PYFS68LI9+5rKwcvwW9sRBi7X5Y3yX0ukCfS+gLCdZyCX02+rpYMLFdsw+91br5jMW3sEzPJfssjveBNtu7jbcu+qF4sWt0SRfbrAlmL3NdLGhw47iEvr6AfS6QbrHMZerueG4V56M3FuoF+vZyfbvQ6wJ9LqEvJFjLJfTZWITFgomU+XewNy39+G6MRdCzurp6F4xZFGAuzvMb5oW+Yx9ub4ypoo23LirvNbFrdEkX26wJZi9cLLQE+1wg3ViaS1K8zBJnFXpjgXWrhF4X6HMJfSHBWi6hz8aiLRY0qp9PYX/SsoBFVMzlpkd9gG3HmEUB54/j80Ym5cNIGFNFG29dVN4PmTWWl7NjMGaR6GKbNcHsZWEWC3N/4pUDIbJLsNdF0A4xsj7hDuNc6mqPDutWCb0u0OcS+kKCtVxCn41FXCxobHuuUuavxzgT9X57hRmfivxvMWZRwLnj+LzB/pr22MbbhOnXQ/FlHF8kutpmdTF76cFiIav1oKBU+p09HZvBYNejsNdFEM5jAsZVCb2hkbDXMEvod4E+l9AXEqzlEvpsLOpiQSOT/PVN+2wa31ckHPYbDHYfizHzBLdz023dxtuEruo0Re9QmcJxG32bi9lLyMXCrc997l208O+V6Ge44wZyCb2hkIeftvi9WVIb693o1WCfiyCcwwQ19hOMdQm9ocF6s4R+F+hzCX0hwVouoc/GIi8WNFIUU685HEf6Oi/Vy1VN+tJPzIS59Oa8BdXb03E715mTSRtvE7qq0xSfvnw8MTF7abtYOHDWqecc3PfUW206dNae/RhvBTeQSyLJ347eEGAdl9A3QY3dgLF9Vprme3EOE/Q9/jG+SugPBdapI8zhAn0uoS8kWMsl9NlY+MWCzEdmn/qyQowxwauoUpGfizHzwGd7+3i6APvy6a+NtwmpKODQVPFGjJkHPvP38cTE7MV3sXDgGU87FhcHLt26f/9m9E+hGrkCN5JL6G2LyvlTrOESeidIuetBGNtnYf8IxldK5hejvy3qw/8NpTo1hHlcoM8l9IUEa7mEPhshFwsbdyU1hOOxMPtUi4VfxHHEZ24x0edU+fSEHn31D8Z0TZqup9hXkzlNaONtSpe16qAWLGeb/aj//iDG2OjbPMxefBYLVz371GNwQTBLmKMEbqQqodcXles/MbdLQmTPRL+JirkZPX2UmsdvYu9ImmZnoK9SSfYezOGLWnzsK+WvKczlAn0uoS8kWMsl9NkIulgQ2dRljZtq3v+gLWbNOosF9eH7XvA8CWO6JJXFtdDP0zHGxt5Ne+/k8+8UE+zHt7c23qao/DdCvbdiTJf4zt3XFwuzF5/FAi4Eaup6zDOFauZC3FAVmnmJ1SzUXtOrLHmdQj+iT2BBTx+FfbtA30wFOAFVNjyhEYX5XKDPJfSFBGu5hD4bQRcLSfaWKZ/MjsOY0AwGxYOna+YjjLHhM79YtOlFxV8/5U+KazGmK9Rr6QOTPtL0hNKjyTG+ijZeD47quJ6T8nbLDmGMi77MYYLZS9PFwoF9e86zLARq6dYzTr4X5psCN9QsLS3tqk7oQDb4RUFrOBgdjzlsqNhvoLdPanINstozStBfS4PixZhrFjt2jO5TyuMhzOsCfS6hLyRYyyX02Qi5WND4+nxRC5KpBYoQe4/GGBupyF8Ivf4IY7pAfRlM/aooPM6hwG1ed8EUEjycuvE36As9VbTx+qBeD1/tuqYN7KHulRAa9OJ415i9NF0s4AKgkc7c83XMN0WTKyMM3YB5XOhDCRb/TGGeKtDbF/ksrPDEs2YqvoD5kMEgO17F3lL2+gnzu0CfS+gLCdZyCX02Fn6x0KIeepW+iDExkZbXL8bUQS2YSo/9Vn+uPtkrMGbtpaWT74p/azq3Nl5fsKbShRgTE2k5HI0xVbTxxsDspdPFwr565y603Tv/hJrUa9Sb71X6AVSy5pMtXcL+ZrF3b/kY5LzV5uxg5f8W5uursHcX6HMJfSHBWi6hz0boxUKa5s9Cb5O9oyao3Aeh1hUYMwvsVb3334YxMZBwq2GtUYubx1m2xa3bto3uj3GhEUIcbdY0T8bDfkzfLNp4fSkd0tqYT/6vGBcDrOsz57b+0Ji99G6xoFGNTT0cZF5aW1u7G/ZWByFOeAzmmqMuwP6aYsnZmZrcIRP7doE+l9AXEqzlEvpshF4saNA79gc92TFNsudZajRmeTl7COZROohxIbHU0zdVWse4pmBOrZg3pJMiOx/q3TQ9Pt2LOTaLNt426LuAYm3psQiti2sHEePqECJHSMxeerlY0EjLzzldSl8+hD01oR8LhuLvsS9fyrk70cZNaix/twp7doE+l9AXEqzlEvpsxFgsjEajO6NfS9/jAGN9UAuFl2JuNY+/wLi6SLn+RMwXst8J6UpxAtbYkMzegrGebC7lHmt1dfXuGOyL/Wmu2c0YhzE4XkUbb1tkkr0N62ulIn8uxrZB5Xwr1tiQ3PUgjK0D5sHxrjF76e1iQYMbriupF9R7sRcfHHs8nUgk+VXYT1uwRmw1rWv2WgX6XEJfSLCWS+izEWOxoJGOq1PqXNpYxVCsPxNz+vSHqL6OnMk/1W+SH9gU4Pi/ynUR5h6r+lIvDyw1DispWh9i0TsRpbzCvv3rxLho4w2Bqnkd9jCWPs+t5a9k9l8TtNT3x29jdF0wF453jdmLx2LhZlwANNApmG8m6s2hzzso/YNEk1zfjT20w/2iiqWY15zLbg4RTZ3Vbhm3yvRUgT6X0BcSrOUS+mzEWixopMzPwzy3qfgIxleh7/FRzuHfm43yZWvTUh94v46eKtI0e7LESxtNyd2PRE8Y9jt/YRjriuGwOBFdLoZJcSLeC8JQ6Qm0EzAWx6to4w2FTPI3Yx+GblCv79PQU4VMshdJy0mtE+mryNDTBMyH410zPbdmi4Uf7zvtgZZFQC1hrtqM72Hg/AcKJL33EY2NEy7LNUPrcqwbA/2isdQOoqHITsV6GOMS+lygzyX0hQRruYQ+GzEXC5qdO4sHyPJNb6qkn6XyRcvfbboU64VA5f2hpZZL+rOlbr9jFT/AmjFQX3bvKdcOp+3b1x6KNU0wHseraOMNjWz2/fEj2ey+P1ofwpo+YF4c7xqzl6aLBY364v8JLgRm6dCZe/ZgnsakqeN4YVvJE72OL/mg6v1TqX5rZdfHOlu9ClX7snIv3nJeV2uJtQp9LtDnEvpCgrVcQp+N2IuFCZ6XNjs1HI4ehjVCsrp60r2xZgDd0uR+JaGQsnixpRdvpaJ4OdawgT4cr6KNNwbDwUhiTwF0EdZpA+bH8a4xe/FZLGjUAuBGXBA4ddZTQ537cxh9DbBq/iu4YRvqTZi3S4aD4tHy8AoW+6qry0OfrOOLvjTT0l89yfydmA8peRxCnwv0uYS+kGAtl9Bno6vFgonK99+Yv56KH6xuPenemC82QhS/JFs98K14B+acB/qwh3rff7fcXy1dpz7wt2POKjAHjlfRxhsb/bmD/TXQAZlkp2POEGAtHO8asxffxYLm4Fmn/ktpYYA687QnoC80R+mf0qTrrNQNZZ+Vg+wJ89gjqIP+VWA4XH+EegG75yDzN433xFqfqBWTjb25Qb4vlfaHg+m77uk7NqKvCszhEvpIN+gz69NBsUd9gH4S/02UPrpDFJnvZcgx0O+3wWD3sfo9JZLpL171359Xf3+zfvrq5MZEPeaojfsKJMXvbPQ9vd2/reeh57mp558Z82Y4fOI9Dj84LX+XhMMVG9s1yc+Rcv3hm7gdW3PwrNO2qYXBTcYi4dBP9z3l5zGOEC8sX0BWoY8QQgghdxBwUeAS+gghhBByBwEXBS6hjxBCCCF3APRd63BR4NDF6CWEEELIHQAp8xdYFgZlJcXz0UsIIYSQSMiaNzBBXwywpks+j+AmhBBCiCey6va2hrq4Xh5ruoQ+QgghhEREDopfwC9jl9AbkgY3n9EPhiGEEEJIl1i+kK2KeJvpo7CWS6kozkYzIYQQQiKDX8hVinGnO6xRJfQSQgghpANSkb8bv5SrhP42pLLBY7Bl/jn0E0IIIaQjZM2rIgzdiDmasGPHaIslZ6UwByGEEEI6Br+c62rvpr13wlwuxk8RLeWYJSHy12AuQgghhHRMKkpPs/PRBVJmb5FJ/gItIYo/FqLeY5UrdBP2SgghhJA5YfminruwR0IIIYTMGfyynqeEEEdjf4QQQgjpAbLmnR1jCnsihBBCSM9IRfEK/ALvREnxYeyFEEIIIT1GfYEfKn2hR9Lq1tXoz6AghBBCSAT0rZ7xiz2oZHYc1iSEEELIgpKK7Gwpsu+XvvCb64Ll5ewYzE8IIYSQ2xHD5WxZfek3WThcNxjsPhbzEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGE3P75f4SyEE6ZkARCAAAAAElFTkSuQmCC>