# Stack overview — why these choices

Each tech layer was picked with a reason. When you're considering
swapping one out, knowing *why* it's here helps you make the call.

---

## Astro (framework)

**Why it's here**: Astro ships almost no JavaScript by default. Pages are
mostly static HTML; interactive "islands" hydrate only where needed. That
makes sites fast on mobile, cheap to host, and resilient to JavaScript
being blocked/slow.

**What it's not great for**: heavy single-page-application UX like a
Figma-style editor or a real-time chat. Reach for Next/Remix/SolidStart
if "every page is a live web app" is the product.

**Swap it when**: your site starts feeling more like an app than a
content-first website with some interactivity.

---

## Tailwind CSS v4 (styling)

**Why it's here**: utility classes keep styling co-located with markup
(no CSS-file-to-component mental mapping), and v4 drops the
`tailwind.config.js` + PostCSS config — theme tokens live in one CSS file
via `@theme {}`. Production output is ~8 KB typical.

**What it's not great for**: complex component libraries that want
scoped, namespaced styles. (You can still use Tailwind there, but
something like CSS Modules or styled-components fits better.)

**Swap it when**: you need a design-system-in-a-box (Radix + CSS Vars)
or you already have a corporate CSS system in place.

---

## Preact (interactivity)

**Why it's here**: 3 KB alternative to React with the same API. For the
handful of interactive components any website needs (mobile menu,
contact form, a modal or two), React's 45 KB is overkill.

**What it's not great for**: apps that lean heavily on the React
ecosystem (React Query, complex state libraries, server components).
Preact's `compat` mode handles most library interop but isn't 100%.

**Swap it when**: you want Next.js-level React features (RSC, Actions)
or you're importing packages that only work in real React.

---

## TypeScript strict (language)

**Why it's here**: catches `foo.bar` when `foo` can be undefined, catches
misspelled props, catches wrong argument order — all before the browser
sees the code. Strict mode means "no `any` sneaking in unnoticed."

**What it's not great for**: when you need to prototype fast and type
errors slow you down. In those moments, use `// @ts-expect-error` with a
reason comment rather than turning strict off.

**Swap it when**: rarely. You might drop to non-strict for a hackathon
prototype. For any shipping project, keep strict.

---

## Vercel (hosting)

**Why it's here**: GitHub push → auto-deploy, preview URLs per PR, free
tier generous for small sites, integrated with Astro's adapter. The
Vercel-specific `@astrojs/vercel` adapter handles SSR function wrapping
without you thinking about it.

**What it's not great for**: cost once you start hitting paid tiers with
heavy function workloads. Or if you have strict data-residency rules
outside Vercel's regions.

**Swap it when**: self-hosting is cheaper and you have the ops capacity,
or Netlify/Cloudflare Pages fits better for your team.

---

## Node 22 (runtime)

**Why pinned**: Vercel honors `package.json` `engines` and the `.nvmrc`
file. Pinning avoids the "works on my machine" problem when different
devs have different Node versions. 22 is the current LTS.

**When to bump**: Node releases a new LTS every October. Upgrade once
the ecosystem catches up (usually 1–2 months after release).

---

## Zod 4 (validation)

**Why it's here**: validates content frontmatter (blog posts, home
copy) + form submissions + environment variables, all with a single
syntax and TypeScript inference. Catches a missing or wrong field at
`astro check` time instead of in production.

**What it's not great for**: schemas with very complex cross-field
rules. Works, but gets verbose.

**Swap it when**: you want a different validator (Yup, Valibot). Zod is
the ecosystem default right now.

---

## Resend (email)

**Why it's here**: contact-form delivery. Free tier is enough for a
small site; API is simple; has a test sender (`onboarding@resend.dev`)
that works before you verify a domain.

**What it's not great for**: transactional email at scale, or
complex template management. For that, Postmark or SendGrid's transactional
service is a better fit.

**Swap it when**: you need templates, scheduled sends, or compliance
features Resend doesn't offer.

---

## Pagefind (search)

**Why it's here**: builds a static search index from your HTML at build
time. No server needed, no third-party search service, no API key.
Generates a tiny WASM blob that the browser uses to search your whole
site offline-capable.

**What it's not great for**: very large sites (10k+ pages) where the
index gets unwieldy, or sites where you need search analytics.

**Swap it when**: you outgrow it — Algolia, Meilisearch, Typesense.

---

## Biome (code quality)

**Why it's here**: a single Rust-based binary that does what ESLint +
Prettier did before, ~10–25× faster, with one config file
(`biome.json`) instead of two. Used internally by Vercel for Next.js
tooling. Catches the same class of bugs ESLint did (unused vars, no
explicit `any`, a11y misuse, performance footguns) and formats code
consistently without arguing about style.

**Astro caveat**: Biome doesn't yet handle `.astro` files natively.
Hybrid setup: Biome owns `.ts` / `.tsx` / `.js` / `.json` / `.css`;
Prettier (with `prettier-plugin-astro`) is scoped to `.astro` only via
`.prettierignore`. One pre-commit job per file type. The split is
documented in [biome.json](../biome.json), [.prettierrc](../.prettierrc),
and [.prettierignore](../.prettierignore).

**When to tweak**: rarely. Defaults in `biome.json` already match
what most Cognisearch projects converge on. If you want to loosen a
rule, loosen it globally in the config, not per-file.

**Why we moved off ESLint+Prettier (2026-04-30)**: the two-tool setup
required two configs, two runs in CI, two pre-commit jobs, and noticeable
lag on big repos. Biome collapsed all of that into one binary. Trade-off
is the `.astro` gap — handled via the Prettier-scoped fallback above.

---

## Lefthook (pre-commit hooks)

**Why it's here**: a single Go binary that runs git hooks in parallel,
language-agnostic, with a clean YAML config (`lefthook.yml`).
Pre-commit runs Biome + Prettier (.astro) + `astro check` + gitleaks in
parallel; pre-push runs `biome ci` + `prettier --check` + `knip`.
Blocks commits that would break CI.

**Why we moved off Husky+lint-staged (2026-04-30)**: Husky required a
companion (lint-staged) for staged-file scoping, and the pre-commit
sequence ran serially. Lefthook does both natively, parallelizes
across cores, and ~30× faster pre-commit on the same workload.

**When to bypass**: never. If the hook is blocking you, fix the issue.
`--no-verify` is a footgun that lets broken code onto main.

**One-time install**: `npm i` runs the `prepare` script which calls
`lefthook install`. If hooks aren't firing, run `npx lefthook install`
manually. (Cabana 17 gotcha — fresh clones occasionally need this.)

---

## GitHub Actions (CI)

**Why it's here**: re-runs every guardrail on push and PR, so nothing
that slipped past local tooling sneaks through. Mirrors the pre-commit
hook but on fresh-install Node, which catches lockfile or environment
drift.

**When to tweak**: add new jobs when you add new tooling (e.g., visual
regression tests, Lighthouse CI).
