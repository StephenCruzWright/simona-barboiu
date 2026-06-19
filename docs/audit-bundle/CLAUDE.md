# Cabana 17 Realty — Context Map

> Read this first. AI agents and humans both should orient here before touching code.
> Companion: see [`AGENTS.md`](./AGENTS.md) for Next.js–specific working rules.

## What this site is

Marketing site for **Cabana 17 Realty**, a Charlotte, NC firm that buys homes for cash. Single-locale (en-US), no auth, no logged-in user state, no e-commerce. Lead-gen flows are intentionally handled by **Zoho-hosted iframe forms** rather than native server actions — this keeps the surface area for input-handling vulnerabilities at zero on our side.

## Stack

| Layer | Choice |
| :-- | :-- |
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript strict |
| Runtime | React 19.2.4 |
| Styling | Tailwind CSS v4 + CSS variables in `globals.css` |
| Animation | Framer Motion / Motion |
| Hosting | Vercel |
| DNS / WAF / Email security | Cloudflare (Phase 5 of the SOP) |
| Mailbox | Google Workspace |
| Transactional email (when introduced) | Resend on `mail.cabana17realty.com` |
| Lint + format | **Biome** (single binary, single config — replaces ESLint+Prettier) |
| Git hooks | **Lefthook** (parallel, language-agnostic — replaces Husky+lint-staged) |
| Unused-export detection | **knip** |
| Analytics + errors + replay | **PostHog** free tier (single tool replacing Plausible+Sentry+Clarity) |
| Performance RUM | Vercel Speed Insights + Vercel Analytics |
| Image pipeline | `sharp` (favicons + future WebP conversion) |

### Security CI (free-first stack — see [`docs/Application Security Tooling 2026.md`](./docs/Application%20Security%20Tooling%202026.md))

| Concern | Tool |
| :-- | :-- |
| SCA + dependency CVEs | **Dependabot** (GitHub-native) |
| SAST | **Semgrep** (OWASP top-ten + Next.js + React + TypeScript packs) |
| Secrets (pre-commit + CI diff) | **gitleaks** |
| Secrets (CI deep, with verification) | **TruffleHog** |
| Supply-chain risk (malicious packages) | **Socket.dev** GitHub App (org-level, install required) |
| GitHub-native blocklist | Push Protection (enable in repo Security settings) |
| Container / IaC | Trivy — only when applicable (we don't ship Docker today) |

## Conventions

### File structure
- `src/app/` — App Router pages, layouts, route handlers, file conventions (`robots.ts`, `sitemap.ts`, `manifest.ts`, `icon.png`, `apple-icon.png`, `favicon.ico`, `not-found.tsx`, `error.tsx`, `global-error.tsx`).
- `src/app/<route>/page.tsx` — page UI. Many are `'use client'` because of motion/state.
- `src/app/<route>/layout.tsx` — exists *only* to expose route-segment `metadata` (canonical, OG, title, description). The body just renders `{children}`. Server-component layouts can carry metadata even when the page itself is `'use client'`.
- `src/components/ui/` — reusable presentational components.
- `src/lib/` — helpers and data; `case-studies.ts` is the canonical case-study source, `structured-data.ts` is the JSON-LD factory shared across pages.
- `public/` — static assets. Images in `public/danny/` are personal photos; favicons + manifest icons live here too.
- `scripts/` — one-shot Node scripts (e.g. `generate-favicons.mjs`).
- `docs/` — internal SOPs and research papers; not deployed.

### State management
None. Site is server-rendered + client islands for animation/accordion. No global store, no auth.

### Styling
Tailwind v4 + CSS variables in `src/app/globals.css`. Brand palette:
- Primary: `#7EB2DD` (light blue) / `#5A9ACC` dark / `#99C6E9` light
- Accent: `#EA7E5D` (coral) / `#F09A80` light
- Mint: `#E5F7EB`
- Dark text: `#252525`
- Background: `#FAFBFC`

When adding interactive elements, the SOP minimum tap target is **24×24 px** (WCAG 2.2 SC 2.5.8) and color contrast is 4.5:1 body / 3:1 large text & UI.

### Schema markup
JSON-LD is the SEO + AI-citation backbone for this site. Layout-level (`src/app/layout.tsx`) emits `RealEstateAgent` (Organization), `WebSite`, and `Person` (founder) on every route. Page-level types are added inline in each `page.tsx` via `<script type="application/ld+json">`:
- Home: `Service` ×3 (cash-buying / probate / as-is)
- About: `BreadcrumbList`
- How It Works: `FAQPage` + `HowTo` + `BreadcrumbList`
- Case Studies index: `ItemList` + `BreadcrumbList`
- Case Studies detail: `Article` + `BreadcrumbList`
- Contact / Guaranteed Offer / Privacy: `BreadcrumbList`

All entities use stable `@id` fragments (`#organization`, `#website`, `#founder`, `#service-<slug>`) so AI engines can link them into a coherent knowledge graph. **JSON-LD is server-rendered** — even inside `'use client'` files Next.js still emits the `<script>` tag in the SSR HTML, so AI crawlers see it without JS execution.

## Why-decisions (with dates)

- **2026-04-30 — Snyk → free-first security stack.** Switched to Dependabot + Semgrep + gitleaks + TruffleHog + Socket.dev per [`docs/Application Security Tooling 2026.md`](./docs/Application%20Security%20Tooling%202026.md). Semgrep beats Snyk on EASE 2026 SAST benchmarks; the free stack is $0/mo at our scale; Snyk reserved for clients whose procurement names it.
- **2026-04-30 — ESLint+Prettier → Biome.** ~10–25× faster, single binary, single config (`biome.json`). Used by Vercel for Next.js internal tooling. Edge cases where Biome lacks a niche `eslint-plugin-react` rule are documented in PR review notes rather than blocking the move. Note: `noDangerouslySetInnerHtml` is intentionally **off** because we use it for JSON-LD scripts (the only safe path in App Router).
- **2026-04-30 — Husky+lint-staged → Lefthook.** Parallel hook execution, single Go binary, language-agnostic — better template across Cognisearch's client repos. Pre-commit time drops from ~1.5s → ~50ms.
- **2026-04-30 — Plausible+Sentry+Clarity → PostHog free tier.** One install replaces three tools (1M events + 100k errors + 5k session replays / mo, all free). `error.tsx` and `global-error.tsx` forward exceptions to PostHog when its key is set; the app runs cleanly without it.
- **2026-04-30 — Cloudflare for DNS+WAF+Email.** SOP-mandated. Site is on Vercel, but DNS/WAF/inbound email security live on Cloudflare per Phase 5 (DMARC ramp, Email Security, DNSSEC).
- **Persistent — case-studies are TS data, not a CMS.** Edits are rare, MDX-style data in `src/lib/case-studies.ts` is faster than introducing Sanity/Payload at this scale. Re-evaluate if edit frequency picks up.
- **Persistent — forms are Zoho iframes, not native.** Zero server-side input handling = zero injection surface here. If we ever switch to native + Resend, add Playwright form-input fuzzing and a CSP that allows the form-action origin.

## Gotchas

- **Three lockfiles on this machine.** The user has a stray `package-lock.json` in `C:\Users\Stephen\` that confuses Next 16's auto workspace-root detection. `next.config.ts` pins `turbopack.root` using `path.dirname(fileURLToPath(import.meta.url))` — the ESM-safe path resolution. **Do NOT use `__dirname`** here: in Next 16's compiled `next.config.ts` it can resolve to a temp/parent directory and the override silently no-ops, leaving Turbopack to use the stray lockfile's parent as workspace root and breaking `@import "tailwindcss"` resolution.
- **Two dev servers can't coexist.** When iterating, kill the old `next dev` first — the second one will pick port 3001 and a stale dev process can hold port 3000.
- **Don't background `next dev`.** Running `next dev &` (or any tool that backgrounds it) and then trying to kill/restart it has crashed this dev box. Verify pre-launch via `npm run build` (which exits cleanly) instead. If you need a live preview, run dev in a foreground terminal you control directly.
- **`'use client'` does NOT prevent SSR.** It only marks the hydration boundary. JSON-LD scripts inside `'use client'` files DO appear in the SSR HTML — that's why we put schema directly in client pages.
- **`metadata` exports require a server component.** Most page.tsx files are `'use client'` because of motion. We solve per-page metadata by adding a sibling `layout.tsx` (server) that exports `metadata` and just renders `{children}`. That layout shows up nowhere in the rendered tree.
- **Biome ignores `docs/`** by config — we don't want it reformatting the SOP doc's heavy escape characters.
- **Image RemotePatterns** in `next.config.ts` allow `cabana17realty.com` (+ subdomains) and `images.unsplash.com`. Add new external image hosts here before using `<Image src="https://other.example/...">` or builds will fail.
- **Lefthook needs a one-time install per clone.** `npm i` runs the `prepare` script which calls `lefthook install`. If hooks aren't firing, run `npx lefthook install` manually.
- **Lefthook `run: |` blocks must use single-quoted echos.** Lefthook wraps the run block in `bash -c "..."`. Any inner `"` quote prematurely closes the wrapper, producing `unexpected EOF while looking for matching '"'`. Always use single quotes for echo strings inside multi-line run blocks. Box-drawing Unicode characters work fine — quotes are the only landmine.
- **`npm audit fix --force` may suggest dangerous downgrades.** When a transitive vuln (e.g. postcss inside Next) can't be cleanly updated, npm sometimes proposes downgrading the parent (e.g. `next@9`). Read the proposed change first. The right pattern for nested CVEs is `"overrides": { "<pkg>": "^x.y.z" }` in `package.json` — this is how we handle the postcss XSS at version 8.5.14.
- **knip flags `tailwindcss` as unused — it isn't.** `tailwindcss` is required by the `@import "tailwindcss"` directive in `globals.css`; knip doesn't trace CSS imports. The same false-positive applies to other CSS-imported tooling. Don't remove based on knip output without grepping CSS too.
- **`gitleaks` after `winget install`** modifies PATH but doesn't refresh existing terminals. Open a fresh shell (or restart VS Code's integrated terminal) before the pre-commit hook will find it.

## Run instructions

```bash
# Setup
npm install                      # also runs lefthook install via the prepare script

# Dev
npm run dev                      # http://localhost:3000

# Quality gates
npm run lint                     # biome check
npm run lint:fix                 # biome check --write
npm run format                   # biome format --write
npm run typecheck                # tsc --noEmit
npm run knip                     # unused exports/files
npm run build                    # next build (production)

# One-off scripts
npm run favicons                 # regenerate favicon set from public/logo.png
```

### Required env vars
- `NEXT_PUBLIC_POSTHOG_KEY` — set in Vercel project env (Production + Preview). Without it the app runs but PostHog stays inert.
- `NEXT_PUBLIC_POSTHOG_HOST` — optional override; defaults to `https://us.i.posthog.com`.

### Required GitHub repo secrets
- `LHCI_GITHUB_APP_TOKEN` — optional, enables the Lighthouse CI GitHub bot to comment on PRs.
- `SEMGREP_APP_TOKEN` — optional, enables Semgrep dashboard. CI runs without it via the OSS CLI.

### Required external installs
- **Socket.dev GitHub App** on the `Cognisearch` org.
- **GitHub Push Protection** enabled in repo Security → Code security and analysis.
- **`gitleaks` CLI** installed locally for the Lefthook pre-commit hook (or skip with `LEFTHOOK_EXCLUDE=gitleaks`).

## SOP & checklist

- Internal SOP: [`docs/Web_Project_Delivery_Plan.docx.md`](./docs/Web_Project_Delivery_Plan.docx.md). The 9-phase delivery process; treat as the source of truth for "what's required to launch."
- Live status checklist: [`docs/Web_Project_Delivery_Checklist.csv`](./docs/Web_Project_Delivery_Checklist.csv). Imported to ClickUp; mirrors what's done vs to-do.
- Tooling research: [`docs/Application Security Tooling 2026.md`](./docs/Application%20Security%20Tooling%202026.md).
- Deferred fixes + session post-mortem: [`docs/recommended-fixes.md`](./docs/recommended-fixes.md). Color contrast plan, WebP pre-conversion plan, and 8 incident write-ups from the Cabana 17 build session.
- **Recommendations for the next project template**: [`docs/sop-recommendations.md`](./docs/sop-recommendations.md). Phase-by-phase improvements to bake into the SOP and the proposed `cognisearch-next-starter` template before the next client.
- **Repeat-the-audit prompt**: [`docs/repeat-audit-prompt.md`](./docs/repeat-audit-prompt.md). Self-contained brief to paste into a fresh Claude Code chat opened in a new repo when running this same audit pattern again. Captures the methodology, sanctioned tooling stack, known landmines, and collaboration preferences so the next project gets the same treatment without re-explaining.
