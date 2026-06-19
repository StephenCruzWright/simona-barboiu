# WordPress site → Astro port prompt

This document is a reusable, self-contained recipe for porting an
arbitrary WordPress site into the `web-starter-claude` Astro stack as
a 1:1 visual clone. Hand it to Claude (or any capable coding agent)
along with the target site URL and let it work largely autonomously.

The output is **Astro code**, not a static HTML mirror — content lives
in MDX collections, images are optimized via Astro `<Image>`, layout
uses the starter's Section Library where it fits and one-off
components where it doesn't. The source WP/Elementor CSS is **never
copied**; design tokens (color palette, typography scale, spacing) are
extracted and rebuilt via the starter's `@theme {}` block.

---

## How this fits the Cognisearch workflow library

This prompt is a **migration utility**, not a delivery workflow. Use
it when the engagement starts with an existing WordPress site that
needs to become an Astro site on the sanctioned stack — typically as
the *first step* of a Cognisearch SOP-driven rebuild (Phase 0 / pre-
Phase-1), or standalone when the migration itself is the deliverable.

**When to use which prompt:**

- New site, no legacy → [`kickoff-prompt.md`](kickoff-prompt.md) (the
  9-phase SOP wrap)
- Specific ad-hoc task inside an existing project →
  [`RECOMMENDED-PROMPTS.md`](RECOMMENDED-PROMPTS.md) (the prompt library)
- **Port an existing WP site into this starter → this file**

**Run inside a freshly-cloned `web-starter-claude` repo.** This prompt
assumes the starter is already cloned and renamed per
[`RECOMMENDED-PROMPTS.md` § "Renaming the template"](RECOMMENDED-PROMPTS.md).
Output writes into the existing `src/` tree — no separate project.

---

## Prerequisites

- A `web-starter-claude` clone, renamed for your project, with `npm install` done
- Node.js 22+ (the starter's pinned version)
- Outbound HTTPS access to the target WP site
- That's it. Cheerio + native `fetch` + `sharp` (already in deps) cover
  the crawl, parse, and image pipeline. No headless browser, no Python.

---

## 1. The prompt

> Port the WordPress site at **`{{TARGET_SITE}}`** into this Astro
> `web-starter-claude` clone as a 1:1 visual clone, following the
> methodology in `docs/wordpress-clone-setup-prompt.md`. Output:
>
> - Per-page MDX in `src/data/pages/<slug>.mdx` (frontmatter +
>   body) — one entry per WP page
> - Images downloaded into `src/assets/<source-slug>/` and referenced
>   via Astro `<Image>` with explicit width/height
> - Section components: map to existing files in
>   `src/components/sections/` (Hero, FAQ, Testimonials, CTABanner)
>   where they fit; create new files there for unique sections
> - Design tokens (color palette, typography scale, spacing) extracted
>   from the source and written into `src/styles/global.css` `@theme {}`
> - Navigation → `NAV_ITEMS` in `src/lib/constants.ts`. Footer → `FOOTER_LINKS`. Social → `SOCIAL_LINKS`
> - SEO/Schema rebuilt via `src/lib/schema.ts` builders and rendered
>   through `src/components/schema/SchemaScript.astro`
> - WP forms ported to the existing `ContactFormIsland` + Resend pattern
> - A short `scripts/wp-import.mjs` (Node, ESM) that drives the crawl
>   and emits the MDX + assets. Discardable after the port — not
>   committed to long-term scripts.
>
> Do not copy any WP / Elementor / Gutenberg CSS classes. Do not use
> raw `<img>` — use Astro `<Image>` everywhere. Use Tailwind utility
> classes (resolved through `@theme {}`) for all layout.
>
> Run `node scripts/wp-import.mjs` to populate MDX + assets, then
> `npm run check && npm run build && npm run validate:schema && npm run check:seo`.
> Iterate until all gates pass and a visual spot-check of 5
> representative pages (home, about, contact, one service/blog, one
> deep page) matches the source.
>
> Do not ask me clarifying questions about defaults already specified
> here — only ask if the source site has features outside scope
> (auth-walled content, dynamic search, multi-step forms, custom
> WordPress plugins with no Astro equivalent).

(The "no clarifying questions on specified defaults" stance is
deliberate — WP-to-Astro port has hundreds of small decisions, and
the design parameters in this prompt cover the vast majority. The
agent should pick sensible defaults for anything not explicitly
addressed.)

---

## 2. Methodology

### 2.1 Discovery

Find the sitemap. Try in order:

1. `{{TARGET_SITE}}/wp-sitemap.xml` (WP 5.5+ built-in)
2. `{{TARGET_SITE}}/sitemap_index.xml` (Yoast, Rank Math, AIOSEO)
3. `{{TARGET_SITE}}/sitemap.xml` (fallback)
4. `{{TARGET_SITE}}/robots.txt` — grep for `Sitemap:` lines

Walk sitemap-of-sitemaps recursively. Filter out URLs ending in
asset extensions. Always seed the homepage explicitly.

### 2.2 Per-page extraction

For each page URL:

1. `fetch` the rendered HTML with a real-browser `User-Agent`.
2. Parse with Cheerio (`cheerio.load(html)`).
3. Extract:
   - `<title>` → `frontmatter.title`
   - `<meta name="description">` → `frontmatter.description`
   - `<meta property="og:image">` → `frontmatter.ogImage` (also queue for download)
   - Canonical URL, hreflang alternates → `frontmatter.canonical`
   - Yoast/Rank Math JSON-LD → parse and pipe into `frontmatter.schema` for the SchemaScript.astro renderer
   - Main content area (`main`, `article`, `.entry-content`, `#content` — try in order) → strip to semantic HTML → convert to MDX body
   - Hero section (first `<section>` or banner before main content) → extract `eyebrow`, `title`, `subtitle`, `actions` → store as frontmatter fields if it maps to the starter's `<Hero>`
4. Write to `src/data/pages/<slug>.mdx`. Slug = source URL path with leading/trailing slashes stripped, `/` replaced with `-`. Homepage → `home.mdx` (already exists in starter — overwrite).
5. The Astro page (`src/pages/<slug>.astro`) renders via `getEntry("pages", "<slug>")` + `PageLayout`. Create the .astro file alongside if it doesn't exist for that route.

### 2.3 Section identification + Section Library mapping

For each major `<section>` in a page:

1. Detect pattern:
   - Hero (above-fold, large heading + subtitle + CTA) → use `src/components/sections/Hero.astro`
   - FAQ accordion (repeated `<details>`/`<summary>` or `.accordion`/`.faq-item`) → use `FAQ.astro` + extract entries to `src/data/faqs/<page-slug>.mdx`
   - Testimonials carousel/grid → use `Testimonials.astro` + extract entries to `src/data/testimonials/<page-slug>.mdx`
   - CTA strip (dark band, centered heading, single button) → use `CTABanner.astro` via PageLayout's `ctaTitle/ctaSubtitle/ctaLabel/ctaHref` props
2. If no clear match: create a new section file `src/components/sections/<PascalName>.astro`. Use Tailwind utilities + starter components (`Container`, `Button`, `Card`, `SectionHeading`) — never raw Elementor markup.
3. Compose the page from sections in `src/pages/<slug>.astro`. Don't inline section markup — keep each section a discrete file.

### 2.4 Image pipeline

For every `<img>` / `<source>` / inline `background-image: url(...)` on a saved page:

1. Resolve absolute URL. Skip data URIs.
2. Download to `src/assets/<source-slug>/<basename>` (sanitize basename, preserve extension).
3. Read the image's intrinsic dimensions (Cheerio reads `width`/`height` attributes from the source; if missing, use `sharp().metadata()` after download).
4. Rewrite the reference in the generated MDX to use Astro `<Image>`:
   ```astro
   import heroBg from "@/assets/<source-slug>/<basename>";
   <Image src={heroBg} width={W} height={H} alt="..." />
   ```
5. For `srcset` (responsive images): pick the largest variant; Astro's `<Image>` generates AVIF/WebP responsive variants automatically. Don't carry over the source's hand-coded srcset.
6. Concurrency cap: 4 workers for image downloads (same Hostinger-style edge-cache reason as the old prompt's pitfalls). Retry serially on transient 404s.

### 2.5 Design token extraction

The goal: extract the *intent* (colors, type, spacing rhythm) — NOT the implementation (Elementor classes).

1. **Colors**: fetch the homepage + 2 representative inner pages. Use Cheerio to collect all `style="..."` color values + `<link>`-loaded CSS files. Run a frequency analysis to identify the brand palette (top 3–5 colors by usage, excluding white/black/grays). Map to the starter's token names: `--color-primary`, `--color-accent`, `--color-dark`. Write to `src/styles/global.css` `@theme {}`.
2. **Typography**: extract the `font-family` used on `<h1>` and `<body>`. If self-hosted, mirror the woff2 files into `public/fonts/` and add an `@font-face` block. If Google Fonts, add the import URL in `BaseLayout.astro` `<head>`.
3. **Type scale**: read computed `font-size` on `<h1>`, `<h2>`, `<h3>`, `<p>` (sampled via Cheerio's `attr("style")` parsing — fall back to defaults if not inlined). The starter already ships a fluid scale via `--text-h1`/`--text-h2`/`--text-body` clamps; only override if the source has a strong design statement.
4. **Spacing**: read section padding (`--spacing-section`) and container width (`--container-3xl`). Map to existing tokens.
5. **Border radius / shadows**: extract from prominent CTA buttons and cards. Adjust `--radius-sm/md/lg/xl` and `--shadow-sm/md/lg` if they differ meaningfully from defaults.

**Do NOT copy** any Elementor/Gutenberg CSS classes or selectors. Style every section using Tailwind utilities resolved through the `@theme {}` tokens.

### 2.6 Navigation, footer, social

From the source's `<header>` + `<footer>`:

1. Primary nav items → `NAV_ITEMS` in `src/lib/constants.ts`. Rewrite hrefs from absolute (`https://example.com/about`) to root-relative (`/about`).
2. Footer links → `FOOTER_LINKS`.
3. Social icon links (LinkedIn, X, Instagram, GitHub, etc.) → `SOCIAL_LINKS`. Match icon names to the starter's existing keys.
4. Logo: download from `<header>` to `public/logo-light.svg` (and `logo-dark.svg` if a dark variant exists). Update `SITE_META.logo` paths.

### 2.7 SEO / Schema rebuild

Don't copy WP/Yoast/Rank Math JSON-LD blocks verbatim. Re-emit via the starter's builders:

1. Parse the source's `<script type="application/ld+json">` blocks.
2. Identify the `@type` of each block.
3. For each block, call the corresponding builder in `src/lib/schema.ts`:
   - `Organization` → `buildOrganization()` (uses `SITE_META`)
   - `WebPage` → `buildWebPage({ name, description, url })`
   - `Article` / `BlogPosting` → `buildArticle(...)`
   - `BreadcrumbList` → `buildBreadcrumbs([...])`
   - `FAQPage` → `buildFAQPage(...)` with entries from the FAQ collection
   - `LocalBusiness` → `buildLocalBusiness(...)` (if the source has address + hours)
4. The page passes `schema={...}` to `PageLayout`, which renders via `SchemaScript.astro`.

Sitemap: `@astrojs/sitemap` (already wired) generates from prerendered routes. **Do not** copy the source's `sitemap.xml` as a static asset.

### 2.8 Forms

For each WP form (Contact Form 7, Elementor Forms, Gravity Forms, Ninja Forms):

1. Extract field names, labels, required flags, validation rules.
2. Add to the existing Zod schema in `src/lib/contact-schema.ts` — extend, don't replace. If the form has fields not in the current schema (phone, company, custom fields), add them.
3. Reuse `src/components/islands/ContactFormIsland.tsx` + `src/pages/api/contact.ts` (Resend backend, honeypot, rate limit). Don't create per-form duplicates unless the form has a fundamentally different submission target (e.g., a Mailchimp-only newsletter form — flag for manual review).
4. Multi-step forms, conditional fields, file uploads → flag for manual review. Don't auto-port these.

---

## 3. Known pitfalls

### #1 — Elementor's nested widget structure

**Symptom**: the extracted MDX body contains 4+ levels of nested `<div>` with class names like `elementor-element elementor-widget elementor-widget-text-editor`.

**Fix**: in Cheerio extraction, strip all `class` attributes from divs before MDX conversion. The starter's Tailwind utility classes replace all of them. Keep semantic tags (`<h1>`, `<h2>`, `<p>`, `<ul>`, `<a>`, `<strong>`, `<em>`) intact.

### #2 — Gutenberg block comments

**Symptom**: HTML output contains `<!-- wp:paragraph -->...<!-- /wp:paragraph -->` comments interspersed.

**Fix**: strip all HTML comments before MDX conversion (Cheerio: `.contents().filter((_, n) => n.type === "comment").remove()`).

### #3 — Hostinger 404 on cache-busted assets

**Symptom**: occasional 404 on `style.css?ver=1.2.3` URLs.

**Fix**: cap image-download concurrency at 4 workers. Add a serial retry pass for any URL that 404'd under load. Same lesson as the prior static-mirror prompt.

### #4 — Inline `style="..."` on every element

**Symptom**: extracted body contains thousands of inline styles.

**Fix**: strip all `style` attributes after extracting design tokens (§2.5). The Tailwind utility approach replaces them.

### #5 — Mixed-host CDN images

**Symptom**: some images load from `https://i0.wp.com/...` (Jetpack) or `secure.gravatar.com`.

**Fix**: download these too (the goal is self-contained Astro output). The agent should NOT leave external URLs in `<Image>` `src` attributes.

### #6 — Pages with `noindex`

**Symptom**: WP marks some pages with `<meta name="robots" content="noindex">` (often `/thank-you/`, `/cart/`, etc.).

**Fix**: port them but propagate the `robots` value into the MDX frontmatter, then into `PageLayout`'s `robots` prop. Don't strip the noindex.

### #7 — WP redirects

**Symptom**: some source URLs 301 to other URLs (trailing slash, http→https, renamed pages).

**Fix**: follow redirects, port the final URL. Add 301s for old paths to `astro.config.mjs` `redirects:` if the SEO team wants link equity preserved.

---

## 4. Verification expectations

Run all gates after `node scripts/wp-import.mjs` finishes:

```sh
npm run check          # astro check — 0 errors
npx biome ci .         # 0 errors
npm run knip           # 0 unused
npm run build          # all routes prerender + Pagefind index
npm run validate:schema # all JSON-LD blocks valid
npm run check:seo      # all pages have title + meta + canonical
```

Then a **visual spot-check**: open `npm run preview` and compare 5 pages side-by-side against the source in the browser:

1. Homepage
2. About (or equivalent foundational page)
3. Contact (form behavior)
4. One representative deep page (a service, blog post, or work item)
5. One outlier page (404, privacy, terms, or any page with non-standard sections)

For each: do hierarchy, copy, imagery, and design tokens match? If not, surface specifically what diverges and decide per-case (re-port that section, or accept the divergence).

This corresponds to Cognisearch SOP Phases 6 (Code Integrity) and 9 (Audit) for migration projects.

---

## 5. Customization points

Most WP sites work with zero changes. Edit `scripts/wp-import.mjs` when the target needs:

- **Different sitemap location** — extend the seed list in the discovery phase
- **Allowlist a CDN** — add `i0.wp.com`, `secure.gravatar.com`, the client's CDN, etc., to the same-origin check
- **Skip pages** — filter the page URL list before extraction (auth-walled, member-only, cart/checkout)
- **Custom content selectors** — if the source uses non-standard markup (`.builder-content` instead of `.entry-content`), adjust the main-content selector list
- **Custom Section Library mappings** — if a recurring section pattern doesn't fit the starter's library, add a mapping rule

---

## 6. What this approach does NOT clone

By design:

- The WordPress admin (`/wp-admin/`) — that's a dynamic PHP application
- Search functionality (if the source uses dynamic WP search) — Pagefind takes over (already built into `npm run build`)
- Logged-in views, member-only content, auth-walled pages
- Comment submission (display works if comments are in the HTML; submission requires backend)
- The XML-RPC, REST API, or feed endpoints — those are server-side WP features
- WooCommerce / Easy Digital Downloads / membership plugin functionality — port these manually or migrate to a different platform
- Multi-step forms with conditional logic — flag for manual review

---

## 7. Estimated effort

Rough rules of thumb:

| Site type | Pages | Agent run | Manual review |
| --- | --- | --- | --- |
| Small brochure / 5–10pg | 5–10 | ~5 min | ~30 min |
| Mid-size service site | 20–50 | ~15 min | ~60 min |
| Blog with 100 posts | 150+ | ~45 min | ~2–3 hr |
| Heavy magazine | 1000+ | ~3 hr | ~1 day |

Manual review = design-token tuning, Section Library mapping QA, form-port verification, visual spot-check, copy proofreading.

---

## 8. Incident logging

If a new pitfall surfaces during a run (something not covered in §3), log it immediately:

- **Standalone-migration mode** (the clone *is* the deliverable) → append to a local `NOTES.md` in the project. After the run, decide whether the lesson is generic enough to PR back into this prompt's §3.
- **Embedded mode** (this prompt run as Phase 0 of a SOP rebuild) → append to `docs/lessons/draft.md` of the clone. At Phase 9 close, recurring lessons earn promotion into this prompt's §3 or into [`docs/LESSONS-LEARNED.md`](LESSONS-LEARNED.md).

Don't wait until project end — root causes get fuzzy fast.

---

## See also

- [`docs/kickoff-prompt.md`](kickoff-prompt.md) — the SOP-driven rebuild prompt to run *after* the port lands
- [`docs/RECOMMENDED-PROMPTS.md`](RECOMMENDED-PROMPTS.md) — ad-hoc prompt library
- [`docs/LESSONS-LEARNED.md`](LESSONS-LEARNED.md) — stack-wide gotchas from prior projects
- [`docs/CONTENT-GUIDE.md`](CONTENT-GUIDE.md) — how content collections work post-port
