# `configs/` — Portable In-Repo Configs (Astro edition)

These are the cabana17 in-repo configs, copied verbatim. Most port to an Astro project as-is; a few need entry-point or command edits. This README lists the per-file changes the receiving agent should make in the target repo.

**Rule of thumb:** the config goes into the target repo's project root (or `.github/` for GitHub-specific files). Don't symlink — copy and commit.

---

## Port as-is (zero edits)

| File | Target location | Notes |
| --- | --- | --- |
| `biome.json` | repo root | Linter rules apply equally to Astro/TS/JS. The `noImgElement: warn` rule still applies — Astro projects should use `astro:assets` `<Image>`, not raw `<img>`. Consider promoting to `error` per `sop-recommendations.md` § Phase 4. |
| `lefthook.yml` | repo root | All jobs (Biome on staged files, `tsc --noEmit`, gitleaks pre-commit, `biome ci .` pre-push) are framework-agnostic. **Critical:** keep the single-quoted echos inside the gitleaks `run: \|` block — double-quotes break the `bash -c "..."` wrapper. |
| `socket.yml` | repo root | Triggers on `package.json` + `package-lock.json` regardless of framework. If the target uses a different lockfile (`pnpm-lock.yaml`, `bun.lockb`), add it to `triggerPaths`. |
| `dependabot.yml` | `.github/` | npm + GitHub Actions weekly updates with prod/dev grouping. Zero framework coupling. If the target uses pnpm/bun/yarn, change `package-ecosystem: npm` to the matching value (`pnpm` works; `bun` is not yet supported by Dependabot — fall back to npm or use Renovate). |

---

## Port with edits

### `knip.json`

The `entry` array currently lists Next.js App Router conventions. Replace with Astro conventions:

```json
{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "entry": [
    "src/pages/**/*.{astro,md,mdx,ts,tsx,js,jsx}",
    "src/layouts/**/*.astro",
    "src/content/config.ts",
    "astro.config.{mjs,ts,js}",
    "scripts/*.{mjs,ts,js}"
  ],
  "project": ["src/**/*.{astro,ts,tsx,js,jsx,md,mdx}", "scripts/**/*.{mjs,ts,js}"],
  "ignore": ["**/node_modules/**", "dist/**", ".astro/**"],
  "ignoreDependencies": ["@vercel/speed-insights", "@vercel/analytics"]
}
```

Pre-add `tailwindcss` and `@tailwindcss/postcss` to `ignoreDependencies` if the target uses Tailwind via `@import` in CSS — knip doesn't trace CSS imports. Same false-positive list applies; see `sop-recommendations.md` § Phase 4 → `knip.json`.

### `lighthouserc.json` + `lighthouserc.mobile.json`

Change `startServerCommand` from `npx next start` to the Astro equivalent:

```json
"startServerCommand": "<pkg-mgr> run preview"
```

…where `<pkg-mgr> run preview` resolves to `astro preview` (the script Astro generates by default). Adjust `startServerReadyPattern` to `"local:"` (Astro's preview-ready signal) instead of `"Ready"` (Next.js).

Also update the `url` array to match the target Astro project's actual routes. The cabana17 URLs (`/about`, `/how-it-works`, etc.) are realty-specific.

The `assert` blocks (a11y ≥ 0.95, perf ≥ 0.95 desktop / 0.90 mobile, LCP ≤ 2500ms, CLS ≤ 0.1) are universal — keep as-is.

### `tsconfig.json`

Astro projects typically extend `astro/tsconfigs/strict` (or `strictest`):

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "jsx": "preserve"
  },
  "include": ["src/**/*", "astro.config.*"],
  "exclude": ["node_modules", "dist", ".astro"]
}
```

The cabana17 `tsconfig.json` extends nothing (defaults to Next.js's needs) and has `"plugins": [{ "name": "next" }]`. Drop the Next plugin; `astro check` covers `.astro` files separately. Keep `strict: true` and the `@/*` paths alias if the target uses it.

### `PULL_REQUEST_TEMPLATE.md`

The template is mostly framework-neutral, but two lines need editing:

- **Code quality section** — replace `Tested with next build + next dev` → `Tested with astro build + astro dev` (or whatever phrasing the target prefers)
- **Performance section** — replace `Images use next/image with explicit width/height` → `Images use astro:assets <Image> with explicit width/height`

Schema/SEO checklist items (JSON-LD, canonical URL, OG/Twitter metadata) apply unchanged — the underlying spec is framework-independent.

### `CODEOWNERS`

The cabana17 file references Next.js-specific paths. Edit:

- **Remove:** `/next.config.ts @Cognisearch/admins`
- **Remove:** `/vercel.json @Cognisearch/admins` (only if the target doesn't have one)
- **Add:** `/astro.config.mjs @Cognisearch/admins` (or `.ts` per the target's choice)
- **Possibly remove or rename:** the `/src/app/layout.tsx` line — Astro's equivalent is `/src/layouts/*.astro`

Schema-related paths (`/src/app/sitemap.ts`, `/src/app/robots.ts`, `/src/app/manifest.ts`) translate to `/src/pages/sitemap.xml.ts`, `/src/pages/robots.txt.ts`, `/public/manifest.json` respectively, depending on how the target generates them. Review each line and adapt to the target's actual layout.

### `ci.yml` (`.github/workflows/`)

Most jobs are framework-agnostic. Specific edits:

- **`lint-and-build` job** — replace `npm run build` env block. The cabana17 version sets `NEXT_TELEMETRY_DISABLED: "1"`; Astro has no equivalent telemetry env var (the `astro telemetry disable` CLI is local-only). Remove the env block.
- **`lighthouse` job** — same `npm run build` consideration. The `lhci autorun --config=./lighthouserc.json` command works identically; the changes are inside the lighthouserc files (see above).
- **`semgrep` job** — change `--config=p/nextjs` to `--config=p/astro` if Semgrep ships an Astro pack; otherwise drop that pack and rely on `p/default + p/owasp-top-ten + p/typescript`. (Check Semgrep registry — if no Astro pack exists, `p/javascript` is a useful addition.)
- **`gitleaks` and `trufflehog` jobs** — port unchanged.
- **`knip` job** — port unchanged; `npm run knip -- --reporter compact` works after the `knip.json` edits above.
- **Package manager** — translate every `npm ci` and `npm run X` to the target's lockfile-detected equivalent. For pnpm: `pnpm install --frozen-lockfile` + `pnpm run X`. For bun: `bun install --frozen-lockfile` + `bun run X`.

If the target repo uses `actions/setup-node@v4` with `cache: npm`, switch the cache key to match the package manager (`pnpm` / `yarn`); for bun, use `oven-sh/setup-bun@v1` instead.

---

## Files NOT in this folder (and why)

The cabana17 repo has additional configs that didn't make it into this bundle:

- **`next.config.ts`** — Next-specific. Astro projects use `astro.config.mjs`; structure is fundamentally different.
- **`package.json`** — depends entirely on the target project. Use the cabana17 `overrides` block pattern for nested CVEs (see `sop-recommendations.md` § Phase 4 → `package.json`) but write project-specific dependencies.
- **`vercel.json`** — Vercel deployment config; only port if the target deploys to Vercel and needs the same headers/rewrites.
- **`postcss.config.mjs`** + **`tailwind.config.*`** — CSS pipeline configs; these depend on the target's Tailwind/PostCSS setup. Astro's Tailwind integration (`@astrojs/tailwind`) handles much of this differently.
- **`.gitleaks.toml`** — cabana17 doesn't have one. If the target needs custom gitleaks rules (e.g. allowlisting hex colors that look like API keys), create one then.
- **AGENTS.md** — cabana17's is Next-specific and only ~2 lines. Re-create for Astro on the target side if needed.

---

## Quick checklist for a clean port

When mirroring this folder into the target repo, work through this list:

- [ ] `biome.json` → repo root, no edits (verify `files.includes` covers `.astro` files if Biome adds Astro support; otherwise rely on `astro check` for `.astro` linting)
- [ ] `lefthook.yml` → repo root, no edits
- [ ] `socket.yml` → repo root, add lockfile path if non-npm
- [ ] `dependabot.yml` → `.github/`, swap `npm` → `pnpm`/`yarn` if needed
- [ ] `knip.json` → repo root, replace `entry` array per the snippet above
- [ ] `lighthouserc.json` + `.mobile.json` → repo root, swap `startServerCommand` and `url` array
- [ ] `tsconfig.json` → repo root, extend Astro's preset, drop Next plugin
- [ ] `PULL_REQUEST_TEMPLATE.md` → `.github/`, swap two build/image lines
- [ ] `CODEOWNERS` → `.github/`, swap framework-specific paths
- [ ] `ci.yml` → `.github/workflows/`, swap Semgrep packs + package manager commands

After porting, run all verification gates per `audit-bundle/README.md` § "Verification gates" before committing.
