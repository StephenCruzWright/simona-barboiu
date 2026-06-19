# Lessons learned — gotchas already paid for once

Real issues that surfaced during a previous production build of this
stack. Each entry is *Symptom → Root cause → Fix → What the obvious fix
was*. Skim this before you debug anything weird — your symptom is
probably here.

> **Scope:** This is the **stack-wide** log — gotchas that affect every
> project using this template. For **per-project** post-mortems from
> prior client work, see [docs/lessons/INDEX.md](lessons/INDEX.md).
> Recurring lessons in `lessons/` get promoted up to this file or into
> pre-baked configs.

---

## 1. Vercel build fails with `Expected ":" but found ")"` in a generated chunk

**Symptom**: Vercel build errors out during `Building server entrypoints…`
with an esbuild parse error on a file like `_astro/client.!~{006}~.js:72:156`.
Local `npm run build` on Windows succeeds.

**Root cause**: esbuild's Linux x64 binary in the 0.27.x line has a
parser bug that the Windows binary doesn't hit. Same esbuild version,
different OS — different behavior.

**Fix**: pin `esbuild: "^0.28.0"` as a direct devDep AND add an npm
`overrides` block so nested copies (e.g. `@astrojs/preact/node_modules/esbuild`
at 0.25.x) also upgrade. Both parts are necessary.

```json
{
  "devDependencies": { "esbuild": "^0.28.0" },
  "overrides": { "esbuild": "^0.28.0" }
}
```

**Obvious wrong fix that failed**: switching Vite's minifier to terser.
Terser replaces only the *minify* step; esbuild is still used for *transform*
and parsing intermediate chunks. Error still fired. Worse: terser
introduced a silent SIGKILL mid-build, making the error *harder* to
diagnose.

---

## 2. Astro 6 `vite.build.minify` doesn't apply to the client build

**Symptom**: Setting `vite: { build: { minify: false } }` in
`astro.config.mjs` doesn't disable client-bundle minification — client
chunks come out minified anyway.

**Root cause**: Astro 6 migrated to Vite's per-environment config. The
top-level `vite.build.*` path applies to SSR only. Client build config
lives under `vite.environments.client.build.*`.

**Fix**:

```js
vite: {
  environments: {
    client: { build: { minify: false } },
  },
}
```

**Reference**: [Astro 6 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v6).

---

## 3. Zod 4 deprecated `z.string().email()` and `error.flatten()`

**Symptom**: `astro check` reports ts(6385) deprecations on lines like
`z.string().email()` and `parsed.error.flatten()`.

**Root cause**: Zod 4 promoted format validators to top-level factory
functions and replaced `.flatten()` with a free function.

**Fix**:

```ts
// ❌ Zod 3 style (deprecated in 4)
z.string().email();
parsed.error.flatten();

// ✅ Zod 4 style
z.email();
z.flattenError(parsed.error);
```

---

## 4. Preact `JSX.TargetedEvent` is deprecated

**Symptom**: ts(6385) deprecation on `JSX.TargetedEvent<HTMLFormElement, Event>`.

**Root cause**: Preact's JSX namespace types were renamed. The rename
chain itself ended up touching multiple type names that were deprecated
in sequence.

**Fix**: use the native DOM event type + a cast for `currentTarget`:

```tsx
async function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  // …
}
```

---

## 5. `tseslint.config(...configs)` rest-args signature is deprecated

**Symptom**: ts(6387) on `tseslint.config(...)` in `eslint.config.js`.

**Root cause**: typescript-eslint 8.58+ deprecated the rest-args form in
favor of a single-object `extends` style.

**Fix**: drop the helper entirely and export a plain array. ESLint v9
accepts flat-config arrays natively.

```js
export default [
  { ignores: ["dist/**", ".astro/**", ".vercel/**", "node_modules/**"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  { rules: { /* your overrides */ } },
];
```

---

## 6a. Tailwind v4.2.3+ breaks Astro 6 builds with `Missing field 'tsconfigPaths'`

**Symptom**: `npm run build` fails immediately at `Building server entrypoints…` with
`[@tailwindcss/vite:generate:build] Missing field 'tsconfigPaths' on BindingViteResolvePluginConfig.resolveOptions`.
The error stack traces through `oxcResolvePlugin` in Vite's internal rolldown path.

**Root cause**: `@tailwindcss/vite` 4.2.3 and 4.2.4 call into Astro 6's rolldown-based Vite resolver with a config object that's missing the `tsconfigPaths` field rolldown expects. 4.2.2 didn't call that path. The resolver returns the cryptic error from a low-level binding check rather than a readable message.

**Fix**: pin both `tailwindcss` and `@tailwindcss/vite` to `4.2.2` (no caret) in `package.json` until a fixed release ships:

```json
{
  "devDependencies": {
    "@tailwindcss/vite": "4.2.2",
    "tailwindcss": "4.2.2"
  }
}
```

**Obvious wrong fix that failed**: reverting the `@plugin "@tailwindcss/typography"` directive. The plugin isn't the trigger — any valid `global.css` fails at 4.2.4 regardless of directives.

---

## 6. Tailwind v4 plugin trips a Rollup-vs-Rolldown type clash on Vite 7

**Symptom**: `astro check` error at `plugins: [tailwindcss()]` in
`astro.config.mjs` — type mismatch between `rolldown`'s
`MinimalPluginContext` and `rollup`'s.

**Root cause**: Vite 7 ships both Rollup (current) and Rolldown (future)
plugin types. Some plugins type themselves against Rollup; Vite 7
expects Rolldown-compatible types in some slots.

**Fix**: cast the plugin. It works fine at runtime.

```js
vite: {
  plugins: [/** @type {any} */ (tailwindcss())],
}
```

---

## 7. Content collections — import `z` from `zod`, NOT from `astro:content`

**Symptom**: Warnings/errors about deprecated `z` import in
`src/content.config.ts`.

**Root cause**: In Astro 6 the `z` re-export from `astro:content` is
deprecated. Use the original `zod` package.

**Fix**:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";  // ← not "astro:content"
```

---

## 8. Vercel fresh-project gotchas after migrating / renaming a repo

**Symptom**: First deploy on a newly-created Vercel project errors
in weird ways: wrong build command, wrong Node version, missing env vars.

**Root cause**: Vercel auto-detection is usually right but not always.
Env vars don't auto-copy from old projects. Node version selector in the
UI can silently override `.nvmrc`.

**Fix**: in Project Settings → General, confirm:

- **Framework Preset**: Astro
- **Node.js Version**: 22.x
- **Root Directory**: blank (repo root)
- **Build Command**: `npm run build` (default)
- **Output Directory**: blank (adapter handles it)

And in **Environment Variables**, copy every key from your old project
(or from `.env.example` + your secret manager).

---

## 9. GitHub repo transfers redirect silently — local `origin` may point at old URL

**Symptom**: After transferring a repo to a new org, pushes still work
but emit `remote: This repository moved. Please use the new location:…`

**Root cause**: GitHub HTTP-redirects both clones and pushes after a
transfer, so you don't notice the mismatch.

**Fix**: update the remote URL (optional, just silences the hint):

```sh
git remote set-url origin https://github.com/<new-org>/<repo>.git
```

---

## 10. Vercel Elastic (8 GB) builder can OOM on Astro prerender

**Symptom**: Build crashes under 1 minute with no error output, right
after the client Vite build completes. Happens on Elastic; Turbo
(60 GB) succeeds.

**Root cause**: Prerendering many pages + running the Vercel adapter's
bundling step can blow past 8 GB on non-trivial sites.

**Fix**: switch to the Turbo builder in Vercel Project Settings, OR add
`NODE_OPTIONS=--max-old-space-size=6144` to bound Node's heap within the
8 GB container.

---

## 11. Pre-commit hook hygiene — never `--no-verify`

**Symptom**: Pre-commit hook blocks your commit; tempting to bypass.

**Root cause**: The hook runs `check`, `lint`, and `validate:schema`.
If any fails, your code has a real problem that CI will catch anyway.

**Fix**: read the error, fix the cause, re-stage, commit.

**Obvious wrong fix**: `git commit --no-verify`. It gets broken code
onto `main`, fails the CI run, blocks the deploy, and now you have to
fix the same thing in a rush. Just fix it up front.

---

## 12. Commit pattern — feature branch → PR → merge

**Symptom**: "I pushed straight to main and now Vercel is broken."

**Root cause**: Main deploys to production. Pushing untested work to it
breaks the live site for everyone.

**Fix**: for any non-trivial change, work on a feature branch, open a
PR, let Vercel's preview URL confirm the build passes, then merge. Pull
requests are free; broken production is not.

---

## 13. `@astrojs/vercel` import path — no `/serverless` suffix

**Symptom**: Build errors trying to import `@astrojs/vercel/serverless`.

**Root cause**: That path was the convention in older Astro versions.
In current Astro 6, the adapter is just `@astrojs/vercel`.

**Fix**:

```js
// ❌ old
import vercel from "@astrojs/vercel/serverless";

// ✅ current
import vercel from "@astrojs/vercel";
```

---

## 14. No `postcss.config.mjs` on Tailwind v4

**Symptom**: Tailwind not picking up theme changes, or the build
complaining about a plugin conflict.

**Root cause**: Tailwind v4 uses `@tailwindcss/vite` which REPLACES the
old PostCSS-based integration. Adding a `postcss.config.mjs` conflicts
with it.

**Fix**: don't add one. All theme tokens live in
`src/styles/global.css` `@theme {}`. No `tailwind.config.js` either.

---

## 15. Hydration directive selection matters for bundle size

**Symptom**: First paint is slow; island JS loads eagerly on pages
where it's not visible.

**Root cause**: Using `client:load` for every island means every
island's JS loads on every page, regardless of visibility.

**Fix**: pick the right directive per island:

| Directive | Use when |
|---|---|
| `client:load` | Component needed immediately (above the fold, auth state) |
| `client:visible` | Component hydrates when scrolled into view (carousels, below-fold widgets) |
| `client:media="(max-width: 768px)"` | Only needed on certain viewports (mobile menu) |
| `client:idle` | Hydrate during browser idle time (low priority) |

---

## 16. SSR initial paint — islands render once on the server with default state

**Symptom**: Island shows as blank / empty for a split second before
hydration completes.

**Root cause**: `useState(0)` on the server renders the t=0 state.
If that state renders nothing meaningful, users see a blank frame until
hydration completes (sometimes ~200ms on cold loads).

**Fix**: pick a meaningful default so the first paint is coherent.

```tsx
// Animation that cycles every 8 seconds. First paint shows "blank" unless:
const [t, setT] = useState(REST_T);  // ← end-of-cycle state, everything visible
```

---

## 17. `npm run build` runs Pagefind AFTER `astro build`

**Symptom**: Vercel build log shows Astro completing, then fails during
`pagefind`.

**Root cause**: Build script is `astro build && pagefind --site dist/client`.
If `astro build` succeeds but produces bad HTML or wrong output path,
Pagefind fails at the second stage.

**Fix**: read both halves of the log. The `pagefind` failure usually
points at `Could not find directory dist/client` (wrong adapter output
path) or malformed HTML.

---

## 18. `.vercel/` is build output, not config — stays gitignored

**Symptom**: Accidentally committing a large `.vercel/output/` folder.

**Root cause**: `.vercel/` contains both `project.json` (config — small)
and `output/` (build artifacts — large). The whole directory should
stay out of git.

**Fix**: `.gitignore` already excludes `.vercel/`. If you've committed
it by accident, `git rm -r --cached .vercel` then commit.

---

## Quick reference: the "what changed in this project" map

These were the concrete fixes applied after the gotchas surfaced:

| File | Change |
|---|---|
| `package.json` | Pinned `esbuild ^0.28.0`, added `overrides` block |
| `astro.config.mjs` | `any` cast on `tailwindcss()` plugin |
| `eslint.config.js` | Array export instead of `tseslint.config(...)` |
| `src/lib/env.ts` | `z.email()` instead of `z.string().email()` |
| `src/lib/contact-schema.ts` | Same |
| `src/pages/api/contact.ts` | `z.flattenError()` instead of `error.flatten()` |
| `src/components/islands/ContactFormIsland.tsx` | `SubmitEvent` native type |

All six are baked into this template out of the box.