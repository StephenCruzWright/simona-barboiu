# Glossary

Every term used in this repo, defined in one sentence.

## Core stack

- **Astro** — a web framework that builds pages from Markdown, JSX, and Astro-specific `.astro` files; ships almost no JavaScript by default.
- **Tailwind CSS** — a styling system where you write utility classes (`bg-primary`, `p-4`) directly in your HTML instead of separate CSS files.
- **Preact** — a tiny (3 KB) alternative to React with the same API; used here for the interactive "islands" (forms, menus).
- **TypeScript** — JavaScript with type annotations; catches `foo.bar is undefined` bugs before the browser sees them.
- **Vercel** — a hosting platform that auto-deploys your site when you push to GitHub.
- **Node.js** — the program that runs your JavaScript code during the build (not in the browser).
- **Resend** — an email-sending service used by the contact form.
- **Pagefind** — a client-side search tool that indexes your built HTML into tiny JSON files the browser can search.

## Build concepts

- **SSR (Server-Side Rendering)** — the page HTML is generated on a server each time someone visits; lets pages use fresh data or user auth.
- **SSG (Static Site Generation)** — the page HTML is generated once at build time and served as a plain file; faster + cheaper than SSR.
- **Prerender** — Astro's opt-in SSG mode; add `export const prerender = true` to a page's frontmatter to bake it into HTML at build time.
- **Hybrid rendering** — some pages prerendered, others SSR — what this template uses (Astro's default when `output: "server"`).
- **Hydration** — when the browser receives server-rendered HTML and "attaches" JavaScript behavior to it; only Preact islands hydrate in Astro, not whole pages.
- **Island** — a Preact component in `src/components/islands/` that runs in the browser; everything else is static HTML.
- **Client directive** — `client:load`, `client:visible`, `client:media`, `client:idle` — tells Astro WHEN to hydrate an island.
- **Bundler** — the tool that stitches your source files into a deployable bundle (Astro uses Vite, which uses Rollup + esbuild internally).
- **Vite** — the build tool Astro is built on top of; you mostly never interact with it directly.
- **esbuild** — a very fast Go-based JS/TS compiler that Vite uses for transforms and minification.
- **Rollup** — the module bundler Vite uses; chunks your code into optimized files.
- **Minify** — remove whitespace + shorten variable names in built code to make it smaller; done automatically by the bundler.

## File types

- **`.astro`** — Astro's own file format; looks like HTML with a frontmatter block for imports + TypeScript, and supports JSX-style expressions in the template.
- **`.tsx`** — TypeScript file containing JSX (Preact components here).
- **`.ts`** — plain TypeScript file, no JSX.
- **`.mdx`** — Markdown with optional JSX components mixed in; used for blog posts and page copy.
- **`.mjs`** — JavaScript file that uses ES module syntax (`import`/`export`) — what Astro uses for config.

## Content

- **Content collection** — a folder of content files (like `src/data/blog/`) whose shape is defined in `src/content.config.ts` via a Zod schema.
- **Zod** — a TypeScript validation library; defines what frontmatter fields a content file must have.
- **Frontmatter** — the YAML block at the top of an `.mdx` file (between `---` lines) with metadata like title/description/date.
- **Glob pattern** — `**/*.mdx` etc.; a pattern that matches multiple files, used by Astro's content loader.

## SEO + metadata

- **Meta tag** — `<meta>` tags in `<head>` that tell browsers/search engines about the page (description, OG tags, etc.).
- **Open Graph (OG)** — Facebook-originated set of meta tags that power the preview card when someone shares your URL on social media.
- **JSON-LD** — structured data embedded in a `<script>` tag that tells Google about the page's content ("this is an article by X published on Y").
- **Schema.org** — the vocabulary JSON-LD uses (`Organization`, `Article`, `BreadcrumbList`, etc.).
- **Canonical URL** — the "official" URL for a page; helps search engines avoid counting `/foo` and `/foo/` as duplicate pages.
- **Sitemap** — an XML file listing every URL on your site, used by search engines.

## Git + deployment

- **Git** — the version-control system that tracks every change to the code.
- **Commit** — a snapshot of changes with a message describing them.
- **Branch** — a parallel line of commits; `main` is the "live" branch, feature branches are where you work.
- **PR (pull request)** — a proposed merge of a feature branch into main; reviewable before it goes live.
- **Pre-commit hook** — a script that runs before every commit; blocks the commit if it fails.
- **CI (continuous integration)** — GitHub Actions automatically running tests on every push/PR.
- **Deploy** — making a new version of the site live on Vercel.
- **Build output** — the `dist/` folder containing the built static HTML/CSS/JS; gitignored because it's regenerated.

## Environment + config

- **Environment variable (env var)** — a config value set outside the code (API keys, feature flags); stored in `.env` locally or Vercel's UI in production.
- **`.env.local`** — your local-only env file; git-ignored, never committed.
- **`import.meta.env`** — how Astro exposes env vars to TypeScript code.
- **`PUBLIC_*` prefix** — env vars that start with `PUBLIC_` are exposed to browser code; others stay server-only.
- **CSP (Content Security Policy)** — a `Content-Security-Policy` header that tells the browser what scripts/styles/images/etc. are allowed to load.

## Tooling

- **Linter** — a program that flags code-style and common-bug patterns (ESLint here).
- **Formatter** — auto-fixes spacing, quotes, line length, etc. (Prettier here).
- **TypeScript strict mode** — the most-restrictive type-checking setting; catches `any` leaks, null issues, etc.
- **npm script** — a shortcut in `package.json` under `"scripts"`; run with `npm run <name>`.
- **devDependency** — a package needed only to build/test (not to run the site in production).
- **Lockfile** (`package-lock.json`) — pins exact versions of every dep + transitive dep; commit it to git.

## Security

- **CSRF (Cross-Site Request Forgery)** — attack where site B tricks your browser into submitting to site A; the contact form checks the `Origin` header to prevent this.
- **Honeypot** — a hidden form field that real users never see; bots fill it, so "non-empty honeypot" = "block."
- **Rate limit** — "max N submissions per IP per hour"; prevents spam flooding.

## Accessibility

- **WCAG** — Web Content Accessibility Guidelines; "AA" is the compliance level most commercial sites target.
- **ARIA** — extra HTML attributes (`aria-label`, `aria-expanded`) that describe UI for screen readers.
- **Focus-visible** — a CSS selector that styles only keyboard-focused elements (not mouse-clicked); respects user preference.
- **Skip link** — the "Skip to main content" link at the top of every page for screen-reader users.

## Claude Code

- **AGENTS.md** — this repo's orientation file for AI agents; tech stack, commands, conventions.
- **CLAUDE.md** — alias that Claude Code checks first; points to AGENTS.md.
- **Subagent** — a nested Claude session launched for a specific subtask (exploration, planning, etc.).