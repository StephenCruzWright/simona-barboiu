# Recommended Fixes

Audit findings deferred from the security/a11y branch. Each entry has the rule, where it fails, the proposed change, and the reasoning. Pick these up when there's bandwidth for a focused design + a11y pass.

---

## Color contrast — WCAG 2.1 SC 1.4.3 / 1.4.11 (deferred from delivery checklist row 40)

**Branding rule for this site:** brand color hex values are non-negotiable. Where they fail accessibility, restrict their usage to contexts that pass and substitute an accessible color (`--dark`, `--foreground`) for body text and small UI.

### Computed contrast against `#FFFFFF`

| Token | Hex | Ratio | Body (4.5:1) | Large/UI (3:1) |
| :-- | :-- | --: | :--: | :--: |
| `--foreground` | `#252525` | 14.7 | PASS | PASS |
| `--dark-light` | `#3A3A3A` | 11.3 | PASS | PASS |
| `--muted` | `#6B7280` | 4.91 | PASS | PASS |
| `--muted-foreground` | `#9CA3AF` | **2.48** | FAIL | FAIL |
| `--primary` | `#7EB2DD` | **2.25** | FAIL | FAIL |
| `--primary-dark` | `#5A9ACC` | 3.0 | FAIL | PASS (boundary) |
| `--accent` | `#EA7E5D` | **2.76** | FAIL | FAIL |
| `--accent-light` | `#F09A80` | < 2.5 | FAIL | FAIL |
| white on `--primary` | — | 2.25 | FAIL | FAIL |
| white on `--accent` | — | 2.76 | FAIL | FAIL |

### Mapping plan when picked up

| Pattern | Current | Proposed fix | Why |
| :-- | :-- | :-- | :-- |
| Eyebrow labels (`text-sm uppercase text-[var(--accent)]`) | coral text at 14px | `text-[var(--dark)]` | 14px regular is body — needs 4.5:1; coral fails |
| Inline emphasis spans inside `<h1>` / `<h2>` (`<span class="text-[var(--accent)]">`) | coral phrase inside heading | `text-[var(--dark)]` + keep serif/weight for emphasis | Still fails 3:1 large-text threshold |
| Link variant in [src/components/ui/button.tsx:18](../src/components/ui/button.tsx#L18) | `text-[var(--primary)] underline-offset-4 hover:underline` | `text-[var(--dark)] underline underline-offset-4` | Standard underlined dark link |
| Hover states `hover:text-[var(--accent)]` on text | coral hover | `hover:text-[var(--dark-light)]` (or persistent underline) | Hover state must also pass 4.5:1 |
| Decorative icons paired with a text label (Phone+number, MapPin+address) | coral icon `text-[var(--accent)]` | **leave as-is** | WCAG 1.4.11 exception: purely decorative graphics next to a labeled element |
| Functional rating stars in [google-reviews.tsx:74](../src/components/ui/google-reviews.tsx#L74), [google-reviews.tsx:109](../src/components/ui/google-reviews.tsx#L109), [testimonial-slider.tsx:74](../src/components/ui/testimonial-slider.tsx#L74) | `fill-[var(--accent)] text-[var(--accent)]` | `fill-[var(--primary-dark)] text-[var(--primary-dark)]` | Stars communicate rating value — need 3:1; `#5A9ACC` = 3.0 (boundary) |
| `PrimaryButton` primary variant in [src/components/ui/primary-button.tsx:30](../src/components/ui/primary-button.tsx#L30) | `bg-[var(--accent)] text-white` | `bg-[var(--accent)] text-[var(--dark)]` | Dark text on coral = 5.55:1 — industry-standard for warm-fill CTAs |
| Founder section in [src/app/how-it-works/page.tsx:332-353](../src/app/how-it-works/page.tsx#L332-L353) | `bg-[var(--primary)]` with white blockquote and `text-white/70` byline | `bg-[var(--primary-dark)]` + solid `text-white` byline | 3.0:1 boundary for large blockquote on `#5A9ACC` |
| `text-[var(--muted-foreground)]` (`#9CA3AF`) at [testimonial.tsx:83-86](../src/components/ui/testimonial.tsx#L83-L86) | 2.48:1 (dead code today) | `text-[var(--muted)]` (4.91:1) | Already-defined accessible alternative |

### Files touched (estimated)

15 files, ~60 individual className edits. Largest concentrations:
- [src/app/case-studies/[slug]/page.tsx](../src/app/case-studies/[slug]/page.tsx) — many eyebrows + inline accents
- [src/app/page.tsx](../src/app/page.tsx) — multiple eyebrows + 2 inline accents
- [src/app/how-it-works/page.tsx](../src/app/how-it-works/page.tsx) — multiple eyebrows + step badge + founder bg
- [src/app/about/page.tsx](../src/app/about/page.tsx)
- [src/app/guaranteed-offer-form/page.tsx](../src/app/guaranteed-offer-form/page.tsx)
- [src/app/contact/page.tsx](../src/app/contact/page.tsx)

### Verification when applied

- Chrome DevTools accessibility panel contrast picker on each fixed pair
- Re-run Lighthouse a11y (currently asserts ≥ 0.95 in `lighthouserc.json`)
- Manual smoke: visit every route at staging and confirm CTAs read clearly

---

## Pre-convert `public/` JPEGs to .webp (deferred from delivery checklist row 50)

**Status today:** runtime conversion via `next/image` + `formats: ["image/avif", "image/webp"]` in [next.config.ts](../next.config.ts) already delivers AVIF/WebP to browsers. Pre-converting source files is purely repo hygiene.

**Why defer:** post-launch the plan is to move all images to Vercel Blob in WebP/AVIF. Pre-converting `public/` now is work that gets thrown away by that migration.

**When to act:**
- If repo size becomes a concern (currently small, not an issue)
- Or as the first step of the Vercel Blob migration (convert + upload in one pass)

**Files in scope:**
- [public/danny/cheers.jpg](../public/danny/cheers.jpg) (1200×1600)
- [public/danny/papacito.jpg](../public/danny/papacito.jpg) (1366×1600)
- [public/danny/papacito-kiss.jpg](../public/danny/papacito-kiss.jpg) (1344×1600)
- [public/danny/frida.jpg](../public/danny/frida.jpg) (1200×1600)
- [public/logo.png](../public/logo.png) (2003×951) — keep as PNG for transparency, or convert to WebP (lossy doesn't preserve alpha well; use lossless WebP)

**How to act (when picked up):**
- Use `sharp` (already installed for `scripts/generate-favicons.mjs`) to batch-convert
- Update src= references across all touchpoints (search for `/danny/` in `src/`)
- Verify after with `npm run build` + a Lighthouse pass

---

## Session post-mortem (2026-05-05) — errors and problems encountered

Captured for future reference. Each entry: what broke, root cause, fix applied, and the takeaway. The shorter takeaways have also been folded into [CLAUDE.md](../CLAUDE.md)'s **Gotchas** section.

### 1. Lefthook gitleaks hook crashed with `unexpected EOF while looking for matching '"'`

**What broke:** Pre-commit hook printed `echo : -c: line 2: unexpected EOF while looking for matching '"'` and exited 2, blocking every commit.

**Root cause:** The first version of the gitleaks job's `run: |` block in [lefthook.yml](../lefthook.yml) used double-quoted echos (`echo "  │  gitleaks ..."`). Lefthook wraps multi-line run blocks in `bash -c "<script>"` for execution. The inner `"` quotes prematurely closed the outer wrapper, leaving bash with a malformed script.

**Fix applied:** Switched every echo string inside the run block to single quotes. Box-drawing Unicode characters were never the problem — quotes were.

**Takeaway:** In Lefthook `run: |` blocks, always use single-quoted strings inside. This is the most subtle and most likely landmine when adding new hooks.

---

### 2. Tailwind `@import "tailwindcss"` couldn't resolve in dev (`Can't resolve 'tailwindcss' in 'C:\Users\Stephen\GithubRepos'`)

**What broke:** `npm run dev` started cleanly (`Ready in 727ms`) but the first page request blew up with `Can't resolve 'tailwindcss' in 'C:\Users\Stephen\GithubRepos'` — note the path is the *parent* of the project, not the project itself.

**Root cause:** Two things compounding:
1. A stray `package-lock.json` at `C:\Users\Stephen\package-lock.json` (86 bytes) confuses Next 16's auto workspace-root detection.
2. The pre-existing `turbopack.root: __dirname` override in [next.config.ts](../next.config.ts) silently no-ops in Next 16's compiled `next.config.ts`. `__dirname` is unreliable in the bundled output (CJS↔ESM compilation modes), so Turbopack falls back to auto-detection, which lands on a directory the resolver can't traverse.

**Fix applied:** Replaced `__dirname` with the standard ESM-safe pattern:
```ts
import path from "node:path";
import { fileURLToPath } from "node:url";
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
// ...
turbopack: { root: projectRoot },
```
Same pattern that [scripts/generate-favicons.mjs](../scripts/generate-favicons.mjs) already uses for the same reason.

**Takeaway:** In Next 16+ `next.config.ts`, never use `__dirname`. Use `path.dirname(fileURLToPath(import.meta.url))` for absolute paths. This rule extends to any other ESM TS config files in the project.

---

### 3. Background `next dev` crashed the dev box

**What broke:** While verifying the Tailwind fix, an attempt to start `next dev` in the background and curl localhost crashed the user's PC.

**Root cause:** Almost certainly the resolver loop from problem #2 above + Turbopack's aggressive recompilation thrashing CPU/memory while the resolver kept failing. The background-and-poll pattern made it harder to interrupt cleanly.

**Fix applied:** Don't background `next dev`. Verify pre-launch via `npm run build` (which exits cleanly) instead. If a live preview is needed, the user runs dev in a foreground terminal they control directly.

**Takeaway:** Avoid backgrounding long-running watch-mode processes from automation. Use `npm run build` for verification; reserve `next dev` for foreground human-driven sessions.

---

### 4. `npm audit fix --force` would have downgraded Next to v9

**What broke:** After bumping Next 16.2.1 → 16.2.4 closed the high-severity DoS, `npm audit` still reported two moderate postcss XSS findings. `npm audit fix --force` proposed `next@9.3.3` — a major downgrade — as the "fix."

**Root cause:** The vulnerable postcss is bundled inside Next's own deps. npm's audit-fix algorithm couldn't find a forward path to the patch, so it resolved by walking *backward* until the dep tree no longer pulled the vulnerable postcss. That landed on Next 9.

**Fix applied:** Added an `overrides` block to [package.json](../package.json) pinning postcss to `^8.5.14`:
```json
"overrides": {
  "postcss": "^8.5.14"
}
```
`npm install` then rewrote both the top-level and Next-bundled postcss to the patched version. Final state: `npm audit` reports 0 vulnerabilities.

**Takeaway:** Never blindly run `npm audit fix --force`. Read the proposed change. Nested-dep CVEs almost always want an `overrides` block, not a parent downgrade.

---

### 5. knip's "unused devDependencies" output is unreliable for CSS-imported tools

**What broke:** [knip](https://knip.dev) flagged `tailwindcss` as an unused devDependency (and `motion`, `class-variance-authority`, `@radix-ui/react-slot`). Following knip blindly would have removed `tailwindcss` and broken `@import "tailwindcss"` in [globals.css](../src/app/globals.css).

**Root cause:** knip traces JS/TS imports but not CSS `@import` directives.

**Fix applied:** None — this was caught before any package was removed. `tailwindcss` stays in devDependencies.

**Takeaway:** Before removing any "unused" dep flagged by knip, grep CSS files (and any other non-JS source) for the package name. The same false-positive applies to PostCSS plugins, build-only tools, and anything imported via config files.

---

### 6. Removing the orphan `// eslint-disable-next-line` re-surfaced a real warning

**What broke:** During the stale-tooling sweep, deleting `// eslint-disable-next-line` from [src/components/ui/circular-testimonials.tsx:73](../src/components/ui/circular-testimonials.tsx#L73) added three Biome `useExhaustiveDependencies` warnings to the next commit.

**Root cause:** The original suppression was actually *justified*. The useEffect references `handlePrev` / `handleNext` which are declared *below* via `useCallback`. Adding them to the deps array would TDZ-fail at render time because the deps array is evaluated immediately while the callbacks are still in temporal dead zone.

**Fix applied:** Restored the suppression in Biome syntax with a real reason:
```tsx
// biome-ignore lint/correctness/useExhaustiveDependencies: handlePrev/handleNext declared below; including them in deps would TDZ. Closure reads them at key-event time, which is after declaration.
```

**Takeaway:** When deleting a legacy `// eslint-disable-...` comment, run lint *before* committing to confirm no real rule was being suppressed. If a warning appears, decide between fixing the underlying issue (preferred) or restoring the suppression with a Biome-syntax `// biome-ignore lint/<rule>: <why>` comment that documents *why* the suppression is correct.

---

### 7. A subagent got tap-target arithmetic wrong

**What broke:** During the WCAG 2.5.8 audit, an Explore subagent claimed the header mobile-menu button was `20×20px` (FAIL) because it had `p-2` + `w-5 h-5` icon. Real math: `p-2` = 8px each side, so 20+16 = `36×36px` (PASS).

**Root cause:** Subagent confused `p-2` (Tailwind spacing scale) with literal `2px`.

**Fix applied:** Verified each flagged element by reading the file directly before applying any fix. Only the pagination dots in three carousel components were real violations.

**Takeaway:** Subagent numerical audits are best-effort; verify any dimension/contrast calculations by reading the source. Spot-check at least one finding before treating the report as authoritative.

---

### 8. Tried to use snyk.io as a verification source

**What broke:** During the supply-chain audit, an early WebFetch to snyk.io for package health was correctly flagged by the user — this project has explicitly moved off Snyk per [docs/Application Security Tooling 2026.md](Application%20Security%20Tooling%202026.md).

**Root cause:** Default-mode behavior — Snyk advisor is the most popular npm package health source — overrode the project's documented tooling decision.

**Fix applied:** Switched to npm registry direct + GitHub repos as authoritative sources. Saved `reference_security_tooling.md` memory so this doesn't recur.

**Takeaway:** Re-read CLAUDE.md before reaching for an industry-default tool. The project's tooling decisions ("we explicitly moved off X") override generic best practices.

---