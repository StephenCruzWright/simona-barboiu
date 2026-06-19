# Repeat-the-Audit Prompt — Astro edition

> Open a fresh Claude Code session in the new repo and paste **everything below the line** into the first message. The prompt is self-contained: it teaches Claude the methodology + landmines from the Cabana 17 audit so the new repo gets the same treatment without you re-explaining.
>
> The other files in this `audit-bundle/` folder (`README.md`, the SOP, the recommendations doc, the post-mortem template, the in-repo configs) are the agent's reference material. Make sure the receiving agent can read them — drop the whole folder into the target repo (or anywhere on the same machine) and tell the agent the absolute path in your first message.

---

> **Stack override for this audit: Astro + TypeScript strict.** The Cognisearch SOP (`Web_Project_Delivery_Plan.docx.md` § "Framework Selection (Cognisearch Default)") sanctions Astro as the default for content-led sites and confirms the full SOP applies to both Astro and Next.js — only file conventions and image / metadata APIs differ. **Read `audit-bundle/README.md` first** for the Next → Astro translation table; everything below the next horizontal rule is the base methodology, written in Next.js terms but applicable as-is once you translate the idioms.
>
> Detect the package manager from the target repo's lockfile (`pnpm-lock.yaml` → pnpm, `bun.lockb` → bun, `yarn.lock` → yarn, default npm) before running any commands; translate `npm run X` and `npx Y` accordingly.

---

# 📋 Cognisearch Web Delivery Audit — Repeat for `<this repo>`

I want to repeat the delivery audit + cleanup pass that was just completed on the Cabana 17 Realty marketing site. The methodology and lessons are codified — your job is to apply them here. **Read the whole brief, then ask any clarifying questions before starting.**

## What "this audit" produced on Cabana 17

A `feature/security-audit` branch that closed Phase 6 (Code Integrity), Phase 7 (Performance), and most of Phase 9 (Audit) of the Cognisearch Web Project Delivery SOP (see `Web_Project_Delivery_Plan.docx.md` in this bundle). Specifically:

- 13 raw `<img>` migrated to `<Image>` from `next/image`; LCP candidates flagged with `priority`; WP CDN + Unsplash added to `remotePatterns`
- WCAG 2.2 SC 2.5.8 tap-target violations fixed (3 carousels)
- Color contrast audit captured (deferred — brand-color decision)
- gitleaks scanned the full git history (0 leaks)
- next 16.2.1 → 16.2.4 + postcss override to close GHSA-q4gf-8mx6-v5v3 + GHSA-qx2v-qp2m-jg93
- 24-dependency supply-chain audit (npm registry trust + postinstall hooks + lockfile sanity) — clean
- Socket.dev `socket.yml` v2 config + GitHub Push Protection enabled org-wide
- Lefthook gitleaks hook with precondition check + clear install instructions
- Lighthouse CI tightened (desktop ≥ 0.95, mobile ≥ 0.90, with explicit LCP ≤ 2500ms / CLS ≤ 0.1 audits)
- A merge of `origin/main` resolved with "keep both" strategy across 11 conflicting files
- Documentation: gotchas folded into `CLAUDE.md` (in this bundle), 8-incident post-mortem in `recommended-fixes.md`, phase-by-phase improvements in `sop-recommendations.md`

## How we worked together — collaboration preferences

These are durable across all my Cognisearch projects. Apply them from turn 1:

1. **Phase by phase, plan + execute.** Use plan mode before each phase to agree on scope. After approval, execute item by item. Don't try to do all phases in one turn.
2. **Ask clarifying questions per step.** Use `AskUserQuestion` before each non-trivial item — especially branch points (e.g. "do we recolor the brand or restrict usage?"). Don't guess.
3. **Prefer in-repo config over external-only setup.** When a tool offers both a dashboard and a config file (Socket.dev / Dependabot / Lefthook / Lighthouse CI), commit the config file with best-practice defaults. The repo is the source of truth.
4. **Brand colors are non-negotiable; otherwise follow industry standards.** Never change defined brand hex values. For accessibility/perf failures, restrict usage and substitute accessible colors for body text. Industry standard for warm-color CTAs is dark text on the brand color, not white.
5. **End-of-session post-mortem habit.** Document errors + sweep for inconsistencies before stopping. Fold takeaways into CLAUDE.md gotchas. The Cabana 17 post-mortem in `recommended-fixes.md` is the template.
6. **Don't push or commit without explicit ask.** I commit checkpoints myself. You can prepare commit messages and stage files, but don't push.
7. **Don't background `next dev`** (or `astro dev` — same rule). It crashed my dev box once. Verify pre-launch via `<pkg-mgr> run build` only — it exits cleanly. If a live preview is needed, I'll run dev in a foreground terminal myself.

## Sanctioned tooling stack (reject anything else, but flag it to me before proceeding)

| Concern | Tool | In-repo config |
| --- | --- | --- |
| Lint + format | **Biome** (replaces ESLint+Prettier) | `biome.json` |
| Git hooks | **Lefthook** (replaces Husky+lint-staged) | `lefthook.yml` |
| Unused exports / files | **knip** | `knip.json` |
| SCA + dependency CVEs | **Dependabot** | `.github/dependabot.yml` |
| SAST | **Semgrep** (p/default + p/owasp-top-ten + p/typescript + p/react + p/nextjs — drop the `p/nextjs` pack on Astro projects) | CI workflow |
| Secrets pre-commit + CI diff | **gitleaks** | Lefthook job + `gitleaks-action@v2` |
| Secrets CI deep, verified | **TruffleHog** (`--results=verified,unknown`) | CI workflow |
| Supply chain | **Socket.dev** GitHub App (org-level) | `socket.yml` v2 |
| GitHub-native blocklist | **Push Protection** (enabled org-wide) | external |
| Analytics + errors + replay | **PostHog** free tier (replaces Plausible+Sentry+Clarity) | provider mounted on `PUBLIC_POSTHOG_KEY` (Astro) / `NEXT_PUBLIC_POSTHOG_KEY` (Next) |
| Performance RUM | Vercel Speed Insights + Vercel Analytics | mounted in root layout |
| Lighthouse CI | desktop perf ≥ 0.95 / mobile ≥ 0.90 with explicit LCP/CLS audits | `lighthouserc.json` + `lighthouserc.mobile.json` |
| **Don't use** | Snyk (we explicitly moved off it 2026-04-30 — use the registry directly or Socket.dev for package vetting) | — |

## Known landmines — surface to me if you hit them

These are folded into the bundled `CLAUDE.md` (which describes Next.js gotchas — most translate to Astro; see `audit-bundle/README.md` § "Which gotchas carry over" for the mapping). Save you debugging time:

1. **Lefthook `run: |` blocks must use single-quoted echos.** Lefthook wraps multi-line blocks in `bash -c "..."`. Inner double-quotes prematurely close the wrapper → `unexpected EOF while looking for matching '"'`. Framework-agnostic.
2. **In Next 16+ `next.config.ts`, never use `__dirname` — use `path.dirname(fileURLToPath(import.meta.url))`.** *Astro: skip this gotcha.* `astro.config.mjs` is ESM-native and Astro handles workspace-root detection itself.
3. **Don't run `npm audit fix --force` blindly.** For nested-dep CVEs, npm sometimes proposes downgrading the parent (e.g. `next@9` to fix bundled postcss). The right pattern is `"overrides": { "<pkg>": "^x.y.z" }` in `package.json`. Framework-agnostic.
4. **knip flags `tailwindcss` as unused** (and any tool imported only via CSS `@import` or PostCSS config). False positive — knip doesn't trace CSS directives. Don't remove based on knip output without grepping CSS too. Framework-agnostic; same rule applies to Astro projects using Tailwind.
5. **`gitleaks` after `winget install`** modifies PATH but doesn't refresh existing shells. Open a new terminal before the pre-commit hook will find it. Framework-agnostic.
6. **`<Image fill>` requires the parent to be `relative` with explicit dimensions** (`aspect-X` or `w-Y h-Z`). Don't migrate raw `<img>` to fill mode without confirming the parent. *Astro:* the same rule applies to `astro:assets` `<Image>` in stretch/fill scenarios.
7. **Background subagent numerical audits often have arithmetic errors.** Spot-verify any tap-target / contrast / dimension calculations they produce. Framework-agnostic.

## SOP phases at a glance (so you know where you are)

| Phase | Name | Typical work |
| --- | --- | --- |
| 1 | Sales | Contract + deposit + assets uploaded; brand-color preflight against WCAG; image-host decision (`public/` vs CDN vs Vercel Blob) |
| 2 | IA | Sitemap + page list signed off; LCP-candidate marked per route in the sitemap export |
| 3 | Design | All pages designed + mobile verified at 375×667; tap-target review at design time; contrast review against the agreed palette restriction |
| 4 | Build | Repo + Vercel preview-per-PR + PR template + CODEOWNERS + secure framework config (`next.config.ts` or `astro.config.mjs`) |
| 5 | Email/DNS | Cloudflare DNS + DNSSEC + Workspace MX + Resend transactional + DMARC ramp + seed tests. **Gated on registrar/Cloudflare migration — usually deferred to launch window.** |
| 6 | Code Integrity | Biome + Lefthook + knip + Semgrep + Dependabot + gitleaks + TruffleHog + Socket.dev + Lighthouse a11y ≥ 0.95 + tap targets ≥ 24×24 + contrast 4.5:1 body / 3:1 large+UI |
| 7 | Performance | Self-hosted fonts + framework `<Image>` everywhere + AVIF/WebP + Lighthouse mobile ≥ 90 / desktop ≥ 95 + LCP < 2.5s / CLS < 0.1 / INP ≤ 200ms |
| 8 | Schema | Organization + WebSite + Service + FAQPage + BreadcrumbList + Person — all server-rendered, validated via Google Rich Results Test pre-launch. Astro injects via `<script type="application/ld+json">` in the layout `<head>`; same as Next.js. |
| 9 | Audit | npm audit clean + gitleaks full-history + WAF strategy + apex+www DNS + HSTS preload + Claude review pass + post-mortem |
| Recommended | Legal/Analytics/SEO/Testing/Monitoring/Launch/Handover/CRO/LLM | All flagged in CSV (see `Web_Project_Delivery_Checklist.csv` and `Web_Project_Delivery_Tasks.csv` in this bundle) |

## What to produce in this audit

Mirroring the Cabana 17 deliverables:

1. **Updated `docs/Web_Project_Delivery_Checklist.csv`** in the target repo — every row reflects actual project state. Be honest about "in progress" vs "complete" vs "deferred." Use the bundled CSV as the column schema reference.
2. **`docs/recommended-fixes.md`** in the target repo — every audit finding deferred for later: rule, where it fails, proposed fix, reasoning. End with a "Session post-mortem" section if any errors/incidents came up. Use the bundled `recommended-fixes.md` as the structural template.
3. **Updated `CLAUDE.md`** in the target repo — project-specific gotchas added; version refs current; tooling decisions documented in a "Why-decisions (with dates)" section. Use the bundled `CLAUDE.md` as a structural reference, but write Astro-specific content (don't copy the Next.js gotchas verbatim).
4. **In-repo config files** for any sanctioned tools that aren't yet committed. Port from `audit-bundle/configs/`; see `audit-bundle/configs/README.md` for the per-file edits needed for Astro.
5. **Optional but valuable:** if the repo is fundamentally similar enough to be a candidate for the proposed `cognisearch-astro-starter` template (or `cognisearch-next-starter` for the Next case), flag what's already aligned and what would need adapting.

## Verification gates — must all pass before any commit

Translated for the target repo's package manager (you detected the lockfile in your first read):

- **Type check** — `npx tsc --noEmit` (or the equivalent `astro check` for Astro projects with `.astro` files): 0 errors
- **Biome** — `npx biome ci .` (use `<pkg-mgr> dlx` if not on npm): 0 errors (warnings OK if documented as pre-existing tech debt)
- **Build** — `<pkg-mgr> run build` (i.e. `astro build`): completes successfully, all routes pre-rendered
- **Audit** — `npm audit` (or `pnpm audit` / `bun pm audit` / `yarn audit`): 0 vulnerabilities (use `overrides` for nested CVEs)
- **Secrets full-history** — `gitleaks git --log-opts=--all`: 0 leaks (run before launch)
- **Working tree clean** before / after each commit

If any step fails, stop and surface it rather than chaining more changes.

## Your first reply

1. Read this repo's `package.json`, `astro.config.*` (or `next.config.*`), `CLAUDE.md` (if present), and any existing `docs/Web_Project_Delivery_Checklist.csv`. Also read `audit-bundle/README.md` and `audit-bundle/configs/README.md` from this bundle.
2. Tell me what stack + tooling state you found in the target repo, what's missing vs the sanctioned stack above, and what feels closest to the cabana17 baseline (or what diverges).
3. Propose a plan starting with **one phase** (whichever has the most open / most critical items per the CSV — usually Phase 6 or 7 on a marketing site).
4. Ask any clarifying questions you have about the project's launch state, brand colors, content sources, etc. Don't assume — the cabana17 patterns are defaults, not laws.

Ready when you are.

---

## Maintainer notes for this prompt

- The original cabana17 prompt is at `cabana17realty/docs/repeat-audit-prompt.md` (Next.js-flavored, untouched). This file is the bundled Astro-aware copy — only the top stack-override block and a few gotcha translations differ.
- If this prompt drifts from reality, update both this file and the cabana17 source. The goal is the bundle alone is enough — no need for the receiving agent to ever reach back into the cabana17 repo.
- When the proposed `cognisearch-astro-starter` (or `cognisearch-next-starter`) template ships, replace the doc references with template references and trim this prompt to just the methodology + collaboration preferences.
