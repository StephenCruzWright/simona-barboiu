# Simona Barboiu Portfolio — Project Context

## Project at a glance

A portfolio website for **Simona Barboiu**, a 2D and 3D artist based in Portugal specialising in stylized environments, product visualization, and illustration. The site is the public showcase for potential clients and employers — it needs to feel modern and impressive while letting the artwork lead.

Live: simonabarboiu.com (Vercel).

> **Status note (2026-06):** the codebase is **ahead of older roadmap framing**. The motion infrastructure, design-system tokens, and typed content schema that earlier drafts list as "future phases" are **built**. See [Current status](#current-status-2026-06) and the research-driven redesign reference at [docs/design-research.md](docs/design-research.md). The remaining work is elevating the *inner* pages (project details, gallery, about/work, contact) to the home page's bar.

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

**Do not change colours, font, or layout primitives without asking the developer.** The brand below is established and the client likes it. (Confirmed locked for the current redesign.)

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#222222` | Body background — warm near-black neutral |
| `--foreground` | `#f1f0ec` | Primary text — warm off-white |
| `--accent` | `#eb742a` | Hover colour for links + brand orange |
| `--footer-background` | `#171717` | Footer fill |
| `--footer-foreground` | `#6D6D6D` | Footer text — low-emphasis grey |
| `--grey-button` | `#585858` | Default button fill |

- **Font**: Inter (variable, self-hosted) via `next/font/local` in [app/layout.tsx](app/layout.tsx).
- **Hover convention**: links go to accent orange; buttons scale `1.05`. Honour the client's "simple text, glow on hover" — accent-orange hover + the `.link-glow` utility are the expression of "glow."
- **Theme**: dark-first (the commented-out light-mode block in `globals.css` is intentional; do not enable without a design pass).
- **Depth comes from luminance + texture, never a second colour** — warm surface ramp, film grain, and a dithered ambient gradient (≤15%). Accent orange is confined to glow/hover/focus-ring/active-nav-dot/scroll-progress.

Source: [styles/globals.css](styles/globals.css).

## Stack

- **Next.js 16.1.6** (App Router, React 19.2.3)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `globals.css` — no `tailwind.config.js`)
- **TypeScript 5.9** (strict)
- **Three.js 0.182** (used in `HeaderGradient` WebGL hero + `ScrollModel`; room to grow)
- **Motion**: GSAP 3.15 + ScrollTrigger, Lenis 1.3 (smooth scroll), Split-Type 0.3 — all installed and wired via `MotionProvider`.
- **ESLint 9** (`eslint-config-next`)
- Package manager: pnpm-friendly (also works with npm). Scripts: `dev`, `build`, `start`, `lint`, `test:media`.

Hosted on Vercel; auto-deploy from `main`. CI: [.github/workflows/quality-checks.yml](.github/workflows/quality-checks.yml) runs `test:media` + `build` on push/PR. No pre-commit hooks yet (Husky not installed).

## Current status (2026-06)

What's **built and working** (do not re-scaffold — extend it):

- **Motion infrastructure** — [components/motion/MotionProvider.tsx](components/motion/MotionProvider.tsx) (Lenis + GSAP + Split-Type, reduced-motion aware, data-attribute scanner), [Cursor.tsx](components/motion/Cursor.tsx) (dual-layer follower), [ScrollProgress.tsx](components/motion/ScrollProgress.tsx), [GrainOverlay.tsx](components/motion/GrainOverlay.tsx), [SectionNavDots.tsx](components/motion/SectionNavDots.tsx). All mounted in [app/layout.tsx](app/layout.tsx).
- **Design-system tokens** — fluid type scale (`--text-display`…`--text-small`), fluid spacing, motion easing/duration/stagger, z-index scale, and asymmetric grid utilities (`.grid-hero`, `.grid-editorial`, `.grid-section-header`) all live in [styles/globals.css](styles/globals.css).
- **Content schema** — [lib/projects.ts](lib/projects.ts), [lib/software.ts](lib/software.ts), [lib/timeline.ts](lib/timeline.ts) exist and are typed. ⚠️ Projects are **stubbed**: only `heroImage` is populated; `renders`/`process`/`description` are mostly empty.
- **Home page** — choreographed and polished: WebGL shader hero ([HeaderGradient.tsx](components/HeaderGradient.tsx)), `CategoryShowcase` + `ThumbnailMarquee` + `CategoryGallery`, `ShinyText`, `Marquee`, `ScrollIndicator`. `SpotlightCard` exists **but is not wired in anywhere yet**.

What's **weak / remaining** (the redesign target):

- **3D project detail pages** are flat image-dumps that never touch the motion system — biggest gap.
- **About / Work** are static; **illustration gallery** is plain CSS columns (`FlexGrid`); **footer** is a minimal link grid (wasted conversion moment); there is **no contact form** and **no page transitions**.

The execution plan and rationale live in [docs/design-research.md](docs/design-research.md) (research) and the [Redesign roadmap](#redesign-roadmap--remaining-work) below.

## Routing & pages

| Route | File | Purpose |
| --- | --- | --- |
| `/` | [app/page.tsx](app/page.tsx) | Hero (WebGL gradient) + showreel + category showcases — **polished** |
| `/about` | [app/about/page.tsx](app/about/page.tsx) | Bio + email contact — **static, needs rework** |
| `/work` | [app/work/page.tsx](app/work/page.tsx) | CV-style timeline — **static, needs rework** |
| `/projects/viz/vintage-flower-lamps` | [app/projects/viz/vintage-flower-lamps/page.tsx](app/projects/viz/vintage-flower-lamps/page.tsx) | Most-developed 3D detail page — template for `ProjectLayout` |
| `/projects/viz/flower-alley` | [app/projects/viz/flower-alley/page.tsx](app/projects/viz/flower-alley/page.tsx) | 3D environment (thin) |
| `/projects/environments/greek-house` | [app/projects/environments/greek-house/page.tsx](app/projects/environments/greek-house/page.tsx) | 3D environment (thin) |
| `/projects/illustration` | [app/projects/illustration/page.tsx](app/projects/illustration/page.tsx) | 2D gallery — `FlexGrid` + lightbox |
| `/projects/interactive/paxvr` | [app/projects/interactive/paxvr/page.tsx](app/projects/interactive/paxvr/page.tsx) | Interactive/VR detail |

Project media lives in [public/](public/), grouped by project (`/lamps` incl. a 30-frame `/array`, `/greek`, `/alley`, `/illustration`, `/misc`).

## Key components

| Component | Path | What it does |
| --- | --- | --- |
| `MotionProvider` | [components/motion/MotionProvider.tsx](components/motion/MotionProvider.tsx) | Lenis+GSAP+Split-Type orchestrator. Scans `data-reveal`, `data-reveal-clip`, `data-reveal-split`, `data-stagger-in`, `data-parallax`, `data-magnetic-wrap`. Reduced-motion aware. |
| `Cursor` | [components/motion/Cursor.tsx](components/motion/Cursor.tsx) | Dual-layer follower (dot + ring), grows/accent on interactive hover. Fine-pointer only. |
| `ScrollProgress` / `GrainOverlay` / `SectionNavDots` | [components/motion/](components/motion/) | Top progress bar; SVG film grain; right-rail section dots (IntersectionObserver). |
| `HeaderGradient` | [components/HeaderGradient.tsx](components/HeaderGradient.tsx) | 550-line WebGL/GLSL interactive gradient hero backdrop (mouse/touch reactive). The home showpiece. |
| `Header` / `NavDropdown` | [components/](components/) | Sticky nav (`useHideOnScroll`); keyboard-accessible, click-outside-aware dropdown. |
| `CategoryShowcase` / `ThumbnailMarquee` / `CategoryGallery` | [components/home/](components/home/) | Home category sections: hero + software pills + carousel/gallery toggle; pause-on-hover marquee. |
| `ShinyText` / `Marquee` / `ScrollIndicator` / `SpotlightCard` | [components/home/](components/home/) | Eyebrow shimmer; keyword ribbon; scroll cue; cursor-follow radial glow (**built but unused — wire it in**). |
| `LightImage` | [components/LightImage.tsx](components/LightImage.tsx) | Image/video viewer with click-to-open lightbox + zoom/pan + Esc-to-close. Extend for the process-scroller. |
| `ScrollModel` | [components/ScrollModel.tsx](components/ScrollModel.tsx) | 30-frame rotatable model viewer (wheel or slider). |
| `BeforeAndAfter` | [components/BeforeAndAfter.tsx](components/BeforeAndAfter.tsx) | Pointer-drag image comparison slider. |
| `FlexGrid` | [components/FlexGrid.tsx](components/FlexGrid.tsx) | CSS-columns masonry for the gallery — **to be replaced by a true `Masonry`**. |
| `Timeline` | [components/Timeline.tsx](components/Timeline.tsx) | CV timeline; data from [lib/timeline.ts](lib/timeline.ts). |
| `Footer` / `RoutingNav` / `ScrollToTop` / `SideTitle` | [components/](components/) | Footer (minimal — upgrade to contact end-card); breadcrumbs; back-to-top; rotated page title. |

## Conventions

These are adapted from `web-starter-claude/AGENTS.md` and tuned to this Next.js project:

- **Strict TypeScript.** No `any`. Prefer narrow types; use `unknown` and refine.
- **Edit existing components before creating new ones.** Most patterns the brief asks for already have a near-relative in the codebase (`LightImage` for zoom, the `MotionProvider` data-attribute scanner for reveals, `SpotlightCard` for hover glow, etc.). Extend before duplicating.
- **One motion vocabulary.** Reuse the `MotionProvider` reveal primitives (`data-reveal`, `data-reveal-clip`, `data-stagger-in`, `data-parallax`) rather than writing per-page bespoke animation. One set-piece per page, maximum.
- **Project metadata belongs in the content schema** ([lib/projects.ts](lib/projects.ts)), not component props.
- **Run `npm run lint` and `npx tsc --noEmit` before committing.** No pre-commit gate yet, so this is on the developer. Run `npm run test:media` if you've added or moved files in `public/`.
- **Brand stays.** The colour palette and font are not up for refresh without explicit sign-off. Visual polish goes into composition, motion, depth (luminance/texture), and interaction — not colour.
- **Reduced-motion + performance are first-class, not a final phase.** Transform/opacity-only animation; one `priority` LCP per route; poster-first showreel; every reveal visible at rest under `prefers-reduced-motion`.
- **Copy:** keep existing real copy; use lorem ipsum only as a temporary scaffold for genuinely net-new sections. Replace with real copy before launch (placeholder copy is an Awwwards disqualifier and process captions are the top hiring signal).

## Redesign roadmap — remaining work

The full research and per-surface recommendations are in [docs/design-research.md](docs/design-research.md). The phases below are kept for continuity; status markers reflect reality. **Brand discipline:** palette (`#222222` / `#f1f0ec` / `#eb742a`) and Inter are preserved across every phase — what changes is composition, motion, depth, and interaction, borrowing the *general style* of [cognisearch](../cognisearch) (editorial-premium, motion-rich, type-forward) without its colours. Curated [reactbits.dev](https://reactbits.dev) components supply set-piece moments.

- ✅ **Phase 0 — Motion infrastructure.** `MotionProvider`, `Cursor`, `ScrollProgress`, `GrainOverlay` built and mounted.
- ✅ **Phase 1 — Design-system tokens.** Fluid type/spacing, motion easing/duration/stagger, z-index scale, asymmetric grid utilities in [styles/globals.css](styles/globals.css). *Remaining additions:* warm surface ramp `--surface-0..3`, gradient dithering, `.link-glow` utility, WCAG audit of type clamps.
- ✅ **Phase 2 — Content schema.** `lib/projects.ts` / `software.ts` / `timeline.ts` exist. *Remaining:* populate `renders`/`process`(+`caption`)/`description`, add per-image intrinsic aspect ratios, add `logoSrc` to software.
- 🟡 **Phase 3 — Header & navigation.** `SectionNavDots` + magnetic `data-magnetic-wrap` done. *Remaining:* mix-blend-mode header (NavDropdown panels as a sibling outside the blend), active-page indicator + `.link-glow`, context-label cursor (`data-cursor-label`).
- 🟡 **Phase 4 — Home page.** Largely done (WebGL hero, showcases, ShinyText, ScrollIndicator). *Remaining:* wire `SpotlightCard` into the grid; confirm one ambient background ≤15%; verify `data-stagger-in`/`data-parallax` choreography.
- ⬜ **Phase 5 — 3D project detail pages (biggest gap).** Build reusable `<ProjectLayout>` from the schema: hero render → BigStatement title (SplitText) → description (`data-reveal` lines) → multi-render gallery → ONE pinned process sequence (captions) → `LogoLoop` software strip. Bring `flower-alley`/`greek-house`/`paxvr` up to the lamps bar. Keep `ScrollModel` + `BeforeAndAfter`. Multi-render gallery: non-WebGL carousel baseline (orbital for product-viz, depth-stacked for environments); Three.js depth gallery as progressive enhancement gated behind reduced-motion.
- ⬜ **Phase 6 — Illustration gallery.** Replace `FlexGrid` with true `Masonry` (JS-driven, CSS-Grid + `aspect-ratio` fallback; store intrinsic ratios for SSR; never center-crop). Extend `LightImage` into a vertical process-scroller when `process[]` exists (real focus-trapped `role="dialog"`, Esc + arrow nav). `GlareHover` on thumbnails. **Direct brief match.**
- ⬜ **Phase 7 — About / Experience / Contact.** Combine experience + contact. `ProfileCard` bio with `data-reveal`; `Timeline` gets `data-stagger-in`; optional `CountUp`; full-width slower `LogoLoop`. Contact form: adapt cognisearch `contact-schema.ts` (Zod) into `app/api/contact/route.ts`, mailto fallback, `ClickSpark` on submit. Upgrade `Footer` into a display-scale contact end-card.
- ⬜ **Phase 8 — Micro-interactions & page transitions.** Native View Transitions (Next 16 `experimental.viewTransition` + `<ViewTransition>`): morph thumbnail → project hero, anchor the sticky header out of the transition. Standardize hover timings on `--duration-normal`/`--ease-smooth`; `ShinyText` on eyebrows only; `GradualBlur` on below-fold copy. **Do not** add barba.js / next-view-transitions (they fight the App Router).
- ⬜ **Phase 9 — Quality, performance, ship.** Explicit `<Image>` `sizes`; one `priority` LCP/route; AVIF/WebP; code-split GSAP/Three.js; Vercel Speed Insights (field INP); Lighthouse per route (home / a 3D page / gallery each have a different LCP). Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, ≥95 perf / 100 a11y. Optional: Husky pre-commit (`lint` + `tsc`). Per-route `metadata` with OG/Twitter cards.

## Curated React Bits picks (with rationale)

The full library has 110+ components; this is the shortlist that fits the brand. Pick the **TS-TW** variant (TypeScript + Tailwind). Skip the rest unless a specific need surfaces.

**Backgrounds — use sparingly, dialled to low opacity (pick ONE behind the hero):**

- `Grainient` — gradient + grain. On-brand for the dark theme.
- `SoftAurora` — gentle moving gradient.
- `Threads` — flowing thread lines, very artistic.
- `DarkVeil` — moody dark overlay, good behind text-heavy sections.
- `Noise` — pure grain (alternative to the SVG film-grain).
- *(Research note: a static warm CSS radial, or the Codrops Bayer-dither canvas which also fixes banding, is the cheapest depth-for-cost option.)*

**Text animations — for headings only, not body:**

- `SplitText` — line-by-line reveal. Workhorse. (Height-lock + `document.fonts.ready` before split to kill CLS.)
- `ShinyText` — subtle shimmer, perfect for eyebrow labels.
- `BlurText` — blur-in reveal, alternative to SplitText.
- `RotatingText` — cycle through phrases (e.g. "3D artist / Illustrator / Visualizer").
- `CountUp` — for stats on the About page.
- *(Skip `DecryptedText`/`ScrambledText` here — too "dev-y" for this soft brand.)*

**Animations — interaction polish:**

- `Magnet` / `MagnetLines` — magnetic CTA buttons (primary CTAs only).
- `ClickSpark` — sparks on the ONE conversion action (contact submit).
- `GlareHover` — light glare on hover, gallery thumbnails (compositor-only).
- `GradualBlur` — body-copy reveal below the fold.
- `LogoLoop` — software badge carousel (static-grid fallback under reduced-motion).
- `AnimatedContent` / `FadeContent` — generic wrappers for non-text reveals.

**Components — set pieces:**

- `Masonry` — illustration gallery. Replaces FlexGrid.
- `DomeGallery` / `CircularGallery` — multi-render galleries on 3D project pages. **Showcase moments.**
- `SpotlightCard` — radial-gradient hover for project thumbnails (already in repo — wire it in).
- `TiltedCard` — alternative tilt-on-hover for thumbnails.
- `ScrollStack` — lower-motion alternative to the pinned process scroll.
- `ProfileCard` — About page bio block.
- `FlyingPosters` / `BounceCards` — optional gallery alt view.

**Explicitly skipped**: Hyperspeed, Galaxy, Particles, Iridescence, Plasma, Lightning, Balatro, GlitchText, FaultyTerminal, LiquidChrome, MetaBalls, Cubes — too gaming/sci-fi/literal for a moody artist portfolio. Also avoid the Bruno-Simon "3D-world / scene-as-navigation" tier — off-brand, fragile, buries the artwork.

## Reference sources

- **[docs/design-research.md](docs/design-research.md)** — the verified research synthesis (12 dimensions, curated reference shortlist, redesign principles, per-surface recommendations, pitfalls). **Read this first** for the "why" behind the redesign.
- **`cognisearch`** at [`../cognisearch`](../cognisearch) — primary style reference. Lift: `MotionProvider.tsx`, `global.css` `@theme` (motion + spacing + type, NOT colours), `Header.astro` mix-blend pattern, `SectionNavDots.astro`, `BigStatement.astro`, `AutoScrollColumns.astro`, `HorizontalScroll` pin pattern, `contact-schema.ts`.
- **`web-starter-claude`** at `c:\Users\Stephen\GithubRepos\web-starter-claude` — workflow/tooling reference (Astro starter — reference only, not this stack). Lift: `AGENTS.md` conventions, `contact-schema.ts`, `.husky/` + `.github/workflows/ci.yml`.
- **[React Bits](https://reactbits.dev)** — copy-paste component source. Pick the **TS-TW** variant.
