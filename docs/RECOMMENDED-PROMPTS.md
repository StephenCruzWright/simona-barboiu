# Recommended prompts for Claude Code

Ready-to-paste prompts tuned to this template's architecture. Copy one,
fill any `{{placeholders}}`, paste into a fresh Claude session with this
repo open.

**General tip**: prompts that ask Claude to **plan before coding** and
**explain before fixing** consistently produce better results than
"just do X." The prompts here reflect that.

> **For SOP-driven delivery projects** (the Cognisearch 9-phase Web
> Project Delivery wrap), use [docs/kickoff-prompt.md](kickoff-prompt.md)
> instead — it bundles the creative kickoff with the 9-phase delivery
> context and the lessons-loop ritual. The prompts below are for
> ad-hoc tasks within any project.

---

## On first turn with a fresh clone

Use this the moment you open a new Claude session in the repo. It orients
Claude on the stack without needing further context.

> Read `AGENTS.md` and `docs/GETTING-STARTED.md`, then confirm you
> understand the stack. After that, tell me what I need to do before
> running `npm run dev` for the first time. Don't write any code yet.

---

## Porting an existing WordPress site

Use when an engagement starts with an existing WP site that needs to
become an Astro site on this starter — typically as Phase 0 of a
Cognisearch rebuild, or standalone when the migration *is* the
deliverable. Distinct from the rest of this library: it produces full
Astro code (per-page MDX, optimized images, extracted design tokens),
NOT a static HTML mirror or copied Elementor markup.

> Read [`docs/wordpress-clone-setup-prompt.md`](wordpress-clone-setup-prompt.md)
> in full, then run the prompt in §1 against `{{TARGET_SITE}}` (e.g.
> `https://example.com`). The agent picks defaults for anything not
> explicit in the prompt; it only asks about features outside scope
> (auth-walled content, multi-step forms, custom plugins).

Verify with the full gate suite (`npm run check && npx biome ci . && npm run build && npm run validate:schema && npm run check:seo`) plus a visual spot-check of 5 representative pages.

---

## Design kickoff

The structured intake for a new project. Typing `hi` in a fresh
session triggers the same flow via the directive in `AGENTS.md` —
this prompt is for when you want to drive it explicitly or re-run it
later.

> Run the design kickoff. Read in this order:
>
> 1. `docs/reference/DESIGN-SYSTEM.md` — the spatial grammar (grids,
>    fluid typography, spacing, motion) already wired into
>    `src/styles/global.css`
> 2. `docs/reference/PROJECT.md` — the Section Library & Page
>    Blueprints catalog
> 3. `docs/reference/brand-tokens-TEMPLATE.md` — the brand token slots
> 4. `docs/reference/voice-and-tone-TEMPLATE.md` — the voice brief
>
> Then ask me for the five inputs: design reference, brand tokens,
> voice & tone, copy, and page list. Don't write code until I've
> handed over at least one input. When I have, compose pages by
> picking from the Section Library, apply brand tokens to
> `src/styles/global.css` `@theme {}`, and populate copy into
> `src/data/` collections — not hardcoded in components.

---

## Renaming the template to your project

Use right after cloning the template for a real project.

> This is a fresh clone of the web-starter-claude template. Rename it
> to `{{my-project}}`. Update:
>
> - `package.json` → `"name"`
> - `astro.config.mjs` → `site:`
> - `src/lib/constants.ts` → `SITE_META`, `NAV_ITEMS`, `SOCIAL_LINKS`
> - any other file with `{{PLACEHOLDER}}` or `TODO` markers
>
> Use this info:
>
> - Site name: `{{name}}`
> - Production URL: `{{https://example.com}}`
> - Description: `{{one sentence}}`
> - Contact email: `{{you@example.com}}`
>
> Report a punch list of what you changed. Don't edit brand colors yet
> — I'll do that next.

---

## Establishing brand (colors, font, tone)

> My brand values:
>
> - **Primary color**: `{{#HEX}}` (main CTA color)
> - **Accent color**: `{{#HEX}}` (highlights, badges)
> - **Dark text**: `{{#HEX}}` (headings, body)
> - **Font**: `{{Font Name}}` (self-hosted in `public/fonts/` as woff2)
> - **Voice**: `{{2-3 adjectives — e.g. "direct, warm, technical"}}`
>
> Update:
>
> - `src/styles/global.css` `@theme {}` tokens with the hex values
> - `@font-face` blocks in `global.css` to point at the woff2 files (I'll
>   drop the files into `public/fonts/` separately)
> - `docs/reference/voice-and-tone-TEMPLATE.md` → `voice-and-tone.md`
>   with my tone described in 100-200 words so future prompts can
>   reference it
>
> Before changing colors on any existing component, confirm the tokens
> themselves still produce ≥4.5:1 contrast for body text on bg.

---

## Adding a new page

> Add a page at `/{{path}}`. Use `PageLayout`. Include:
>
> - A hero (eyebrow, H1, subtitle)
> - `{{describe the body: e.g., "a two-column bio + a stats strip"}}`
> - Link from the main nav (update `NAV_ITEMS` in `src/lib/constants.ts`)
>
> Don't invent copy — use placeholders marked `TODO` so I can fill them
> in. After you're done, run `npm run check` to confirm no type errors.

---

## Diagnosing a build failure

Use this when the Vercel (or local) build fails. The "explain first"
framing produces sharper fixes than "just make it work."

> My `{{local / Vercel}}` build failed. Here's the relevant log:
>
> ```
> {{paste 30 lines of log including the error and stack trace}}
> ```
>
> Before changing any code:
>
> 1. Explain in plain English what the error means
> 2. Give your top 3 hypotheses for the root cause, ranked
> 3. For each, say what you'd check to confirm or rule it out
>
> Then wait for me to tell you which to pursue. Don't edit yet.

---

## Adding a form that sends email

> I want a form on `/{{path}}` that emails me on submit. Use the
> existing `ContactFormIsland` pattern:
>
> - Shared Zod schema in `src/lib/{{name}}-schema.ts`
> - Preact island in `src/components/islands/{{Name}}Island.tsx`
> - Server route at `src/pages/api/{{name}}.ts` using Resend
> - Honeypot + rate limit same as the contact form
>
> Fields I need: `{{list them + any validation rules}}`.
>
> Point me at the env vars I need to set in Vercel before it'll work,
> and any steps I need to take in the Resend dashboard.

---

## Before merging to main

Use this as a pre-merge sanity check on any PR branch.

> Summarize every commit on this branch vs. `main`:
>
> - What got added/changed/removed
> - What could break if I merge now (half-done features, TODO'd copy,
>   missing env vars, pre-commit hook warnings)
> - Anything that should be in a follow-up PR instead
>
> Under 400 words. Don't propose fixes yet — just describe the state.

---

## Planning any non-trivial feature

This mimics the successful "plan first, code second" pattern.

> I want to add `{{feature description}}`.
>
> **Don't code yet.** First:
>
> 1. Explore the codebase to find existing patterns I could reuse
> 2. Propose a plan:
>    - Files to change (with reasons)
>    - New files (with rough purpose)
>    - Anything tricky, ambiguous, or risky
> 3. Any questions you have for me before implementing
>
> Wait for my approval before writing code.

---

## Code review

> Review the last `{{N}}` commits. Flag:
>
> - Anything drifting from `AGENTS.md` conventions
> - New deprecated API usage (Zod `.email()`, old Preact event types,
>   deprecated `tseslint.config()`, etc.)
> - Content that should live in `src/data/` but is hardcoded in code
> - Uses of `any` where a real type would fit
> - Accessibility regressions (missing aria, focus-visible, contrast)
> - Any case-sensitivity gotchas (imports that would break on Linux but
>   not Windows)
>
> Don't fix anything; just report. Structure as: file → line → concern.

---

## Deploying to Vercel for the first time

> Walk me through deploying this to Vercel for the first time. Assume:
>
> - I have a GitHub account and this repo is already pushed
> - I do NOT have a Vercel account yet
> - I have (or will buy) a domain at `{{registrar}}`
>
> Do not skip steps. Include every click. Point out any place where the
> defaults might be wrong.
>
> After we're done, follow up with: what env vars do I need to set
> now vs. later, and in which scope (Production / Preview / Development).

---

## Reading the content guide

> I want to add a new type of content (`{{e.g. case studies,
> testimonials, services}}`). Read `docs/CONTENT-GUIDE.md` and then:
>
> 1. Add a collection definition in `src/content.config.ts` with a Zod
>    schema covering `{{list the fields you need}}`
> 2. Create `src/data/{{collection}}/example.mdx` with realistic
>    placeholder values
> 3. Run `npm run check` and confirm it passes
>
> Don't create pages to render the collection yet — I'll do that next.

---

## Tips for working with Claude on this stack

- **Attach AGENTS.md-style context up front**. When you open a session,
  ask Claude to read `AGENTS.md` first. That file has the stack,
  commands, conventions — saving you from re-explaining per prompt.
- **Scope each prompt narrowly**. "Add one page" beats "build the whole
  company section" — Claude is better at focused changes than broad
  rewrites.
- **Ask for a plan before code** on anything touching more than 2-3
  files. The "plan, then wait for approval" pattern saves hours.
- **Run the verification suite** (`npm run check && npm run lint && npm
  run build`) after Claude finishes — before you commit. Claude should
  do this itself, but double-check.
- **Paste real errors verbatim**. Don't paraphrase. Claude diagnoses
  better with the exact stack trace than with "something went wrong."
- **Use `git status` to verify** that Claude actually did what it
  claimed. Agent summaries are descriptions of intent, not proof of
  execution.