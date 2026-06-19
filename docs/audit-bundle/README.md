# Audit Bundle — Cognisearch Web Delivery Audit (Astro edition)

**Read this file first, then `repeat-audit-prompt.md`.** The prompt is the user's instruction; this README is the agent's orientation pack.

## What this bundle is

A self-contained handoff folder that lets a fresh Claude Code agent re-run the Cognisearch web-delivery audit on a new repo without needing access to the source repo (`cabana17realty`) where the methodology was first applied. The user has placed it on the same machine as the target repo and pasted the prompt to start the audit.

Contents:

- `repeat-audit-prompt.md` — the prompt the user pasted to the receiving agent
- `Web_Project_Delivery_Plan.docx.md` — the canonical Cognisearch SOP (9 phases + recommended sections); applies to both Next.js and Astro
- `sop-recommendations.md` — phase-by-phase improvements lessoned from the cabana17 build
- `recommended-fixes.md` — the cabana17 deferred-fixes log + 8-incident post-mortem; use as a structural template for the new project's equivalent doc
- `Application Security Tooling 2026.md` — research justifying the free-first security tooling stack (Dependabot/Semgrep/gitleaks/TruffleHog/Socket.dev) over Snyk
- `Web_Project_Delivery_Checklist.csv` + `Web_Project_Delivery_Tasks.csv` — the cabana17 checklists; use as the column schema for the new repo's CSV
- `CLAUDE.md` — the cabana17 CLAUDE.md; reference structure (Conventions / Why-decisions with dates / Gotchas / Run instructions), but **do not copy verbatim** — content is Next.js-specific
- `configs/` — portable in-repo configs to mirror into the target repo. See `configs/README.md` for per-file edits.

## Stack assumption override — Astro

The target repo is **Astro**, not Next.js. The Cognisearch SOP at `Web_Project_Delivery_Plan.docx.md` § "Framework Selection (Cognisearch Default)" sanctions Astro as the default for content-led sites and explicitly says:

> *"The full SOP applies to both frameworks; only the file conventions and image / metadata APIs differ."*

That is your authority for translating Next.js idioms (which the SOP and prompt are written in) to Astro idioms. Apply the table below at every Next.js mention.

## Next → Astro translation table

| Concept | Next.js (cabana17) | Astro (target) |
| --- | --- | --- |
| File conventions (pages) | `src/app/<route>/page.tsx` + `layout.tsx` | `src/pages/<route>.astro` (or `.md`/`.mdx`) + `src/layouts/*.astro` |
| Routing model | App Router file conventions (`page.tsx`, `route.ts`, `layout.tsx`) | File-based routing in `src/pages/`; dynamic routes via `[param].astro` |
| Image component | `next/image` `<Image>` | `astro:assets` `<Image>` (build-time optimization) |
| Per-page metadata | `export const metadata` in server `layout.tsx` | `<head>` injected via layout component or page frontmatter; no special API |
| Hydration boundary | `'use client'` directive | `client:load` / `client:idle` / `client:visible` / `client:only` directives on framework-component imports |
| JSON-LD injection | `<script type="application/ld+json">` in page or layout | Same — server-rendered in layout `<head>`. JSON-LD is identical across both |
| LCP image hint | `priority` prop on `next/image` `<Image>` | `loading="eager"` + `fetchpriority="high"` on `astro:assets` `<Image>` |
| Build output | `next build` | `astro build` |
| Dev server | `next dev` | `astro dev` |
| Preview server (CI) | `next start` | `astro preview` |
| Image config | `next.config.ts` `images.remotePatterns` | `astro.config.mjs` `image.remotePatterns` (Astro 4.0+) or `image.domains` |
| Config root resolution | ESM-safe `path.dirname(fileURLToPath(import.meta.url))` | Astro handles workspace-root detection natively — gotcha doesn't apply |
| Public env vars | `NEXT_PUBLIC_*` prefix | `PUBLIC_*` prefix |
| Static assets | `public/` | `public/` (same) |
| Type checking | `tsc --noEmit` | `astro check` (covers `.astro` files too) — fall back to `tsc --noEmit` for plain TS |
| Server endpoints | `src/app/api/<route>/route.ts` | `src/pages/api/<route>.ts` (need adapter for SSR) |

If the target repo uses an Astro feature not covered above (Content Collections, View Transitions, server islands, integrations), read the relevant Astro docs before proposing changes. Don't guess — Astro's API surface differs meaningfully from Next.js even in places that look superficially similar.

## Package manager — detect, don't assume

Before running any commands, detect the package manager from the lockfile in the target repo:

| Lockfile | Package manager | Run cmd | Dlx cmd |
| --- | --- | --- | --- |
| `pnpm-lock.yaml` | pnpm | `pnpm <script>` | `pnpm dlx <bin>` |
| `bun.lockb` | bun | `bun run <script>` | `bunx <bin>` |
| `yarn.lock` | yarn | `yarn <script>` | `yarn dlx <bin>` |
| `package-lock.json` (or none) | npm | `npm run <script>` | `npx <bin>` |

Translate every `npm run X` and `npx Y` in the prompt and the bundled docs to the equivalent before running anything. If the lockfile is ambiguous or absent, ask the user before proceeding.

## Which `CLAUDE.md` gotchas carry over

The bundled `CLAUDE.md` documents Next.js gotchas. Most translate; a couple don't.

| Gotcha (cabana17 CLAUDE.md) | Carries to Astro? | How |
| --- | --- | --- |
| Three lockfiles confusing Next 16 workspace-root detection | **No** — Astro doesn't have this issue | Skip; Astro handles config root natively |
| Two dev servers can't coexist (port collision) | **Yes** | Same rule applies — kill old `astro dev` before starting a new one |
| **Don't background `next dev`** — crashed dev box | **Yes — same rule for `astro dev`** | Do not run `astro dev` in background. Verify pre-launch with `astro build`. Live preview only in a foreground terminal the user controls |
| `'use client'` doesn't prevent SSR | **N/A** — Astro uses `client:*` directives instead | Astro's hydration model is opt-in islands; nothing renders client-only by default |
| `metadata` exports require a server component | **N/A** — Astro has no metadata API | Inject `<head>` content via layout component slots or per-page frontmatter |
| Biome ignores `docs/` by config | **Yes** | Same rule — keep `docs/` out of Biome's `files.includes` |
| Image `remotePatterns` must be added before using external image hosts | **Yes — same rule** | In `astro.config.mjs` `image.remotePatterns` or `image.domains` |
| Lefthook needs one-time install per clone | **Yes** | Same — `<pkg-mgr> i` runs `prepare` script which calls `lefthook install` |
| **Lefthook `run: \|` blocks must use single-quoted echos** | **Yes — framework-agnostic** | Critical landmine; same rule everywhere |
| **`npm audit fix --force` may suggest dangerous downgrades** | **Yes — framework-agnostic** | Use `overrides` in `package.json` for nested CVEs |
| **knip flags `tailwindcss` as unused** | **Yes — framework-agnostic** | knip doesn't trace CSS `@import`. False positive holds for any PostCSS plugin imported via CSS |
| **`gitleaks` after `winget install`** PATH refresh | **Yes — framework-agnostic** | Open a new terminal after install |

## Deliverables for this audit

Mirror the cabana17 outputs, but write them in the target Astro repo:

1. `docs/Web_Project_Delivery_Checklist.csv` — every row reflects actual project state (use this bundle's CSV as the column schema)
2. `docs/recommended-fixes.md` — deferred fixes + session post-mortem (use this bundle's `recommended-fixes.md` as the structural template; write Astro-specific content)
3. Updated `CLAUDE.md` — Astro-specific Conventions / Why-decisions / Gotchas / Run instructions (use this bundle's `CLAUDE.md` as a structural reference; **do not copy verbatim**)
4. In-repo config files for any sanctioned tools not yet committed (port from `configs/`, applying edits per `configs/README.md`)
5. Optional — alignment notes for a future `cognisearch-astro-starter` template

## Verification gates — translated for Astro

Run all of these green before any commit:

| Gate | Command (translate `<pkg-mgr>` per detected lockfile) |
| --- | --- |
| Type check | `<pkg-mgr> dlx astro check` (or `npx tsc --noEmit` if no `.astro` files) |
| Lint + format | `<pkg-mgr> dlx biome ci .` |
| Build | `<pkg-mgr> run build` (i.e. `astro build`) — all routes pre-rendered |
| Dependency audit | `npm audit` / `pnpm audit` / `yarn audit` / `bun pm audit` — 0 vulns (use `overrides` for nested CVEs) |
| Secrets (full history) | `gitleaks git --log-opts=--all` — 0 leaks |
| Working tree | clean before / after each commit |

If any step fails, stop and surface it rather than chaining more changes.

## Your first reply (overrides the equivalent section in `repeat-audit-prompt.md`)

1. Read in this order: target repo's `package.json` + lockfile + `astro.config.*` + `CLAUDE.md` (if present) + any existing `docs/Web_Project_Delivery_Checklist.csv`, then this README + `configs/README.md` + `repeat-audit-prompt.md`.
2. Report:
   - Detected package manager
   - Astro version + integrations (`@astrojs/*` packages, especially `react`, `tailwind`, `mdx`, `sitemap`, `vercel`)
   - Existing tooling vs the sanctioned stack — what's already in place, what's missing, what's substituted with something else
   - Closest cabana17 baseline parallels and meaningful divergences
3. Propose a plan starting with **one phase** — usually Phase 6 (Code Integrity) or Phase 7 (Performance) on a content-led marketing site.
4. Ask the user clarifying questions about launch state, brand colors, content sources, and anything ambiguous in the target repo. Don't assume — the cabana17 patterns are defaults, not laws.

## Maintainer note

If the cabana17 source repo is also accessible on this machine, you can cross-reference its current state by reading `<cabana17-path>/CLAUDE.md` and `<cabana17-path>/docs/`. Otherwise, treat this bundle as the complete source of truth — every file you need is in here.
