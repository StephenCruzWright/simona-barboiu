# Simona Barboiu Portfolio — Project Context

## Project at a glance

A portfolio website for **Simona Barboiu**, a 2D and 3D artist based in Portugal specialising in stylized environments, product visualization, and illustration. The site is the public showcase for potential clients and employers — it needs to feel modern and impressive while letting the artwork lead.

Live: simonabarboiu.com (Vercel).

## Client brief (verbatim)

> A portfolio website for art divided into two main sections: 3D art and 2D illustration.
>
> It has to have at least the following pages: home page, displaying a showreel and artworks; contact page; experience page (such as in a CV, showcasing experience, skills and known software). You can combine experience and contact together if you think it is better.
>
> The style should be modern and the purpose is to create an impressive space to display artwork, for potential clients and employers. Visual elements should have complexity as interaction but simplicity in design, for example the text for different sections can look simple but glow when hovered over. Open to interpretation or changes.
>
> Each 3D project has multiple high quality visuals, usually in the form of images, and a few descriptions and pictures of the process. The average composition of a 3D project is: a few renders, a small description of what the project represents, then process pictures (wireframe, timelapses etc) along with descriptions of this process, and the software that was used to create it (perhaps with logos).
>
> Each 2D illustration is only a picture and maybe two more showcasing the process. I do not think they need separate pages, and can rather be in the form of a gallery where you see all the illustrations, and if you click on them you can zoom in and scroll to see the process pictures.

## Brand & visual identity

**Do not change colours, font, or layout primitives without asking the developer.** The brand below is established and the client likes it.

| Token | Value | Use |
|---|---|---|
| `--background` | `#222222` | Body background — near-black neutral |
| `--foreground` | `#f1f0ec` | Primary text — warm off-white |
| `--accent` | `#eb742a` | Hover colour for links + brand orange |
| `--footer-background` | `#171717` | Footer fill |
| `--footer-foreground` | `#6D6D6D` | Footer text — low-emphasis grey |
| `--grey-button` | `#585858` | Default button fill |

- **Font**: Inter (variable, self-hosted) via `next/font/local` in [app/layout.tsx](app/layout.tsx).
- **Hover convention**: links go to accent orange; buttons scale `1.05`. Honour the client's "simple text, glow on hover" — accent-orange hover is the current expression of "glow."
- **Theme**: dark-first (the commented-out light-mode block in `globals.css` is intentional; do not enable without a design pass).

Source: [styles/globals.css](styles/globals.css).

## Stack

- **Next.js 16.1.6** (App Router, React 19.2.3)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `globals.css` — no `tailwind.config.js`)
- **TypeScript 5.9** (strict)
- **Three.js 0.182** (installed; lightly used, room to grow)
- **ESLint 9** (`eslint-config-next`)
- Package manager: pnpm-friendly (also works with npm). Scripts: `dev`, `build`, `start`, `lint`, `test:media`.

Hosted on Vercel; auto-deploy from `main`.

## Routing & pages

| Route | File | Purpose |
|---|---|---|
| `/` | [app/page.tsx](app/page.tsx) | Hero copy + showreel video + featured projects grid |
| `/about` | [app/about/page.tsx](app/about/page.tsx) | Bio + email contact |
| `/work` | [app/work/page.tsx](app/work/page.tsx) | CV-style timeline (years + bullets) |
| `/projects/viz/vintage-flower-lamps` | [app/projects/viz/vintage-flower-lamps/page.tsx](app/projects/viz/vintage-flower-lamps/page.tsx) | Most-developed 3D detail page — template for others |
| `/projects/viz/flower-alley` | [app/projects/viz/flower-alley/page.tsx](app/projects/viz/flower-alley/page.tsx) | 3D environment (lighter) |
| `/projects/environments/greek-house` | [app/projects/environments/greek-house/page.tsx](app/projects/environments/greek-house/page.tsx) | 3D environment (lighter) |
| `/projects/illustration` | [app/projects/illustration/page.tsx](app/projects/illustration/page.tsx) | 2D gallery — `FlexGrid` + lightbox |
| `/projects/interactive/paxvr` | [app/projects/interactive/paxvr/page.tsx](app/projects/interactive/paxvr/page.tsx) | Interactive/VR detail |

Project media lives in [public/](public/), grouped by project (`/lamps`, `/greek`, `/alley`, `/illustration`, `/misc`).

## Key components

| Component | Path | What it does |
|---|---|---|
| `Header` | [components/Header.tsx](components/Header.tsx) | Sticky nav; uses `useHideOnScroll` to collapse on scroll |
| `NavDropdown` | [components/NavDropdown.tsx](components/NavDropdown.tsx) | Projects dropdown — keyboard accessible, click-outside-aware |
| `LightImage` | [components/LightImage.tsx](components/LightImage.tsx) | Image/video viewer with click-to-open lightbox + zoom + Esc-to-close |
| `HomeProjectThumbnail` | [components/HomeProjectThumbnail.tsx](components/HomeProjectThumbnail.tsx) | Home grid card — IntersectionObserver staggered fade-in, breadcrumbs, gradient overlays |
| `ScrollModel` | [components/ScrollModel.tsx](components/ScrollModel.tsx) | 30-frame rotatable 3D model viewer (mousewheel or slider) — currently used in lamps |
| `FlexGrid` | [components/FlexGrid.tsx](components/FlexGrid.tsx) | Masonry-style flex grid for the illustration gallery |
| `Timeline` | [components/Timeline.tsx](components/Timeline.tsx) | CV timeline; data from [lib/timeline.ts](lib/timeline.ts) |
| `BeforeAndAfter` | [components/BeforeAndAfter.tsx](components/BeforeAndAfter.tsx) | Image comparison slider |
| `Footer`, `RoutingNav`, `ScrollToTop`, `SideTitle`, `HeaderGradient` | [components/](components/) | Various UI helpers |

## Conventions

These are adapted from `web-starter-claude/AGENTS.md` and tuned to this Next.js project:

- **Strict TypeScript.** No `any`. Prefer narrow types; use `unknown` and refine.
- **Edit existing components before creating new ones.** Most patterns the brief asks for already have a near-relative in the codebase (`LightImage` for zoom, `HomeProjectThumbnail` for reveals, etc.). Extend before duplicating.
- **Project metadata belongs in a content schema, not component props.** The current inline `projects` array in [app/page.tsx](app/page.tsx#L5-L48) is a Phase A target — see roadmap.
- **Run `npm run lint` and `npx tsc --noEmit` before committing.** No CI gate yet, so this is on the developer.
- **Brand stays.** The colour palette and font are not up for refresh without explicit sign-off. Visual polish goes into motion/interaction tokens, not colour.
- **Media validation.** [scripts/validate-media.mjs](scripts/validate-media.mjs) exists — run `npm run test:media` if you've added or moved files in `public/`.

## Roadmap (phased)

Each phase is independently shippable. Tackle in order; later phases depend on earlier ones.

### Phase A — Project content schema (foundation)
- Move the inline `projects` array out of [app/page.tsx](app/page.tsx) into a typed file at `lib/projects.ts`.
- Define `Project = { slug; title; summary; category: '3d' | 'illustration' | 'interactive'; heroImage; software: string[]; renders: Image[]; process: ProcessStep[] }`.
- Refactor home + project pages to read from this single source. Unlocks Phases B and C.

### Phase B — Flesh out 3D project detail pages
- Use the lamps page structure as the canonical template: **renders → description → process (wireframes/timelapses with captions) → software badges**.
- Build a reusable `<ProjectLayout>` and `<ProcessSection>`. Apply to flower-alley, greek-house, paxvr.
- Add software/logo badges (Blender, Substance, Unreal, Photoshop, etc.) — single source list in `lib/software.ts`.

### Phase C — Illustration gallery: zoom + process scroll
- Extend `LightImage` so an illustration with `process: Image[]` opens a vertical scroller in the lightbox: hero illustration first, process pics below.
- Falls back to current zoom for illustrations without process images.
- Matches the brief: "click to zoom and scroll to see the process pictures."

### Phase D — Contact form (optional)
- Adapt the Zod schema from `web-starter-claude/src/lib/contact-schema.ts` and the state-machine pattern from `ContactFormIsland.tsx` into a Next.js Route Handler at `app/api/contact/route.ts`.
- Keep the existing email link as a fallback.
- Integrate Resend if the client wants real delivery; otherwise mailto stays.

### Phase E — Interaction polish
- Sweep nav items, project cards, and buttons for consistent "simple-text + accent-orange-on-hover" treatment.
- Replace ad-hoc `transition-*` durations with the new `--ease-*` / `--duration-*` tokens (see [styles/globals.css](styles/globals.css) — added alongside this file).
- Wire `HomeProjectThumbnail`'s existing IntersectionObserver to `--stagger-*` delays for choreographed reveals.

### Phase F — Quality guardrails (optional)
- Add husky pre-commit running `lint` + `tsc --noEmit` (copy from `web-starter-claude/.husky/pre-commit`).
- Add a minimal GitHub Actions CI mirroring those checks.

## Reference: useful artifacts in `web-starter-claude`

For browse-only reference. The template is at `c:\Users\Stephen\GithubRepos\web-starter-claude`.

- `AGENTS.md` — broader workflow conventions; cherry-pick what fits Next.js.
- `docs/PHASE-PLAN-TEMPLATE.md` — scaffold for future feature plans.
- `docs/LESSONS-LEARNED.md` — Tailwind v4 / build gotchas (some apply here, e.g., Tailwind v4 `@theme` syntax).
- `src/lib/contact-schema.ts` — Zod contact-form pattern (Phase D).
- `src/components/islands/ContactFormIsland.tsx` — form state-machine (idle/submitting/success/error) (Phase D).
- `.husky/pre-commit` and `.github/workflows/ci.yml` — copy when ready (Phase F).
- `src/styles/global.css` — has a richer design-token system; **only the motion tokens were ported** (easing curves, durations, stagger delays, z-index scale). Colour, type, and spacing tokens were intentionally NOT ported to preserve the existing brand.
