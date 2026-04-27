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
| --- | --- | --- |
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
| --- | --- | --- |
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
| --- | --- | --- |
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

## Roadmap — make the site look as good as possible

This roadmap is the source of truth for ongoing work. Phases are sequenced so each is independently shippable and later ones depend on earlier ones (especially Phase 0 — motion infrastructure underpins almost everything else).

**Brand discipline:** colour palette (`#222222` / `#f1f0ec` / `#eb742a`) and Inter font are preserved across every phase. What changes is composition, motion, depth, and interaction — borrowing the *general style* of [cognisearch](../cognisearch) (editorial premium, motion-rich, type-forward) without lifting its red/yellow palette. Curated components from [reactbits.dev](https://reactbits.dev) supply set-piece moments (galleries, hero text effects, ambient backgrounds).

### Phase 0 — Motion infrastructure (foundation)

Everything that follows leans on this. Without smooth scroll + scroll-triggered animation, the rest feels like utility-class polish.

- Install **Lenis** (smooth scroll), **GSAP** + **ScrollTrigger** (scroll-driven animation), **Split-Type** (line-by-line text splits).
- Build `components/motion/MotionProvider.tsx` (client component mounted in [app/layout.tsx](app/layout.tsx)). Mirrors cognisearch's pattern at `cognisearch/src/components/motion/MotionProvider.tsx`:
  - Initialise Lenis (lerp `0.05`) and sync to GSAP ticker.
  - Scan for `data-reveal`, `data-reveal-clip`, `data-parallax`, `data-stagger-in`, `data-hscroll`, `data-magnetic-wrap` on mount and wire ScrollTrigger animations.
  - Mount a custom cursor (lerped white dot, `mix-blend-mode: difference`, grows on link/button hover) — hidden on coarse pointers.
  - Mount a top-edge scroll progress bar (`scaleX 0 → 1`, accent orange).
  - Honour `prefers-reduced-motion`: skip Lenis, hide cursor, set animation durations to `0.01ms`, reveal content immediately.
- Add a film-grain SVG overlay (low opacity, `feTurbulence`-based) at the body level for editorial texture — matches cognisearch's signature finish.

**Files**: `components/motion/MotionProvider.tsx`, `components/motion/Cursor.tsx`, `components/motion/ScrollProgress.tsx`, `components/motion/GrainOverlay.tsx`. Add deps to [package.json](package.json): `lenis`, `gsap`, `split-type`.

### Phase 1 — Design system extension (tokens, type, layout)

Pull the structural tokens from cognisearch's `@theme` block (NOT the colour palette) into [styles/globals.css](styles/globals.css):

- **Fluid type scale**: `--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-h4`, `--text-body`, `--text-small` (clamp-based, no media queries). Wire to Tailwind utilities `text-display`, `text-h1`, etc.
- **Fluid spacing**: `--space-section-y: clamp(5rem, 12vh, 14rem)` for vertical section padding; `--space-section-x: clamp(1.25rem, 5vw, 6rem)` for horizontal gutters. 8-point scale `--spacing-1` to `--spacing-9`.
- **Asymmetric grid utilities**: `.grid-hero` (`40% 1fr 1fr 1fr`), `.grid-editorial` (`1fr 1fr`), `.grid-section-header` (`55% 1fr`), all collapsing to single column below 768px. Lifts straight from cognisearch.
- **Reveal primitive**: the `[data-reveal]` / `[data-reveal][data-revealed]` CSS hook from cognisearch and web-starter-claude. Pairs with the MotionProvider scanner.
- Keep existing colour tokens untouched.

### Phase 2 — Project content schema (was Phase A)

Foundation for proper project detail pages. Without typed data, every later phase has to reach into component props.

- Create `lib/projects.ts` with this type:

  ```ts
  type Project = {
    slug: string;
    title: string;
    summary: string;
    category: '3d-viz' | '3d-environment' | 'illustration' | 'interactive';
    heroImage: { src: string; alt: string; aspectRatio?: string };
    description: string;
    renders: { src: string; alt: string }[];
    process: { src: string; alt: string; caption?: string }[];
    software: string[]; // keys into lib/software.ts
  };
  ```

- Move the inline `projects` array from [app/page.tsx](app/page.tsx#L5-L48) into this file.
- Create `lib/software.ts` with `{ key, label, logoSrc }[]` — Blender, Substance Painter, Unreal Engine, Photoshop, Procreate, Maya, ZBrush, Marvelous Designer.

### Phase 3 — Header & navigation

Make the chrome feel premium without changing the wordmark.

- **Mix-blend-mode header** ([components/Header.tsx](components/Header.tsx)): apply `mix-blend-mode: difference` to header text + logo. Per-pixel inversion against any backdrop. Render `NavDropdown` panels in a sibling element so the panel content is unaffected by the blend (cognisearch's escape pattern at `Header.astro` + `.site-header-panels`).
- **Section nav dots** (right rail): port `cognisearch/src/components/motion/SectionNavDots.astro` to a React equivalent. Shows on `md+`, one dot per `[data-nav-section]`, active dot scales `1.6x` and fills with accent orange. Click to scroll-to-section via Lenis. Apply to long pages (project details).
- **Magnetic primary CTAs**: any button with `data-magnetic-wrap` translates `15%` toward the cursor on hover, springs back `elastic.out` on leave. Wire automatically to `.btn` / primary CTAs.

### Phase 4 — Home page rework

The hero and grid are the first impression — invest here.

- **Hero text**: replace the current `text-5xl/6xl/7xl` heading with React Bits **SplitText** (line-by-line `yPercent: 100 → 0` reveal, `power4.out`, 0.14s stagger), or use cognisearch's MotionProvider `data-reveal` directly. Wrap the eyebrow ("Simona Barboiu portfolio") with React Bits **ShinyText** for a subtle shimmer.
- **Showreel video**: keep [LightImage](components/LightImage.tsx) but add `data-reveal-clip` so the video reveals via clip-path polygon + scale `1.2 → 1` over 3.2s as it enters the viewport.
- **Featured grid**: enhance [HomeProjectThumbnail](components/HomeProjectThumbnail.tsx) with React Bits **SpotlightCard** hover (radial gradient follows cursor). Use `data-stagger-in` on the grid container for choreographed entry. Add `data-parallax` on alternating cards (`yPercent: 0 → 25`) for subtle depth on scroll.
- **Background ambience**: optional, dialled to ~10–15% opacity behind the hero — pick **one** of (recommended in order): React Bits **Grainient** (gradient + grain, on-brand for the dark theme), **SoftAurora** (gentle moving gradient), **Threads** (flowing thread lines), or **DarkVeil** (moody dark overlay). Avoid Particles/Galaxy/Hyperspeed — too literal for a moody artist site.

### Phase 5 — 3D project detail pages (was Phase B, expanded)

Bring the thinner pages up to the lamps-page bar, then add cognisearch-grade polish.

- **Reusable `<ProjectLayout>`** consuming the schema from Phase 2: hero render → BigStatement title (clamp 3.5–12rem, SplitText reveal) → description (`data-reveal` line-by-line) → renders gallery → process scroll → software badges.
- **Multi-render gallery**: pick per project — React Bits **DomeGallery** (curved 3D-feeling carousel — perfect for showcasing multi-angle 3D renders), **CircularGallery** (orbital), or **Carousel** (classic). Default to DomeGallery for hero environments and CircularGallery for product viz.
- **Process section**: cognisearch's pinned **horizontal scroll** pattern (`data-hscroll`) — section pins to viewport, track scrubs across N process slides, each `100vw`. Captions sit beside images. Or for less-aggressive motion, React Bits **ScrollStack** (cards stack as you scroll). Pick per project; horizontal scroll for narrative process, ScrollStack for static beats.
- **Software badges**: React Bits **LogoLoop** (auto-scrolling logo strip) at the bottom, populated from `lib/software.ts`. Falls back to a simple grid if reduced motion is set.
- **Keep**: existing [ScrollModel](components/ScrollModel.tsx) (lamps rotator), [BeforeAndAfter](components/BeforeAndAfter.tsx). Integrate them into the new layout.

### Phase 6 — Illustration gallery transformation (was Phase C, expanded)

The gallery is half-built. Finish the brief and elevate the presentation.

- **Replace [FlexGrid](components/FlexGrid.tsx) with React Bits Masonry**: true masonry packing (the brief shows mixed aspect ratios). FlexGrid stays for backwards compat if anything else uses it.
- **Click-to-zoom + process scroll**: extend [LightImage](components/LightImage.tsx). When an illustration's data has `process: Image[]`, the lightbox becomes a vertical scroller — hero illustration first, process pics stacked below, scroll-to-explore. Without process images, falls back to today's zoom + pan. **Direct match to the client brief.**
- **Hover treatment**: React Bits **GlareHover** on each thumbnail — light glare passes across the image on hover. Subtle, premium.
- **Optional alternate view**: a "stack mode" using React Bits **FlyingPosters** or **BounceCards** — flick through illustrations like physical prints. Toggleable, not default.

### Phase 7 — About / Experience / Contact

Combine experience + contact into one rich page (the brief explicitly allows it), or keep separate — decide once Phase 4 ships and we see the site's rhythm.

- **About page** ([app/about/page.tsx](app/about/page.tsx)): React Bits **ProfileCard** (tilted, with gloss + avatar) for the bio block. Bio copy with `data-reveal` line splits.
- **Experience timeline** ([app/work/page.tsx](app/work/page.tsx)): existing [Timeline](components/Timeline.tsx) gets `data-stagger-in` so entries cascade in as the user scrolls. Year markers grow on activation. Optional: React Bits **CountUp** for any "X years experience" stats.
- **Software section**: same **LogoLoop** as Phase 5, but full-width and slower.
- **Contact form** (was Phase D): adapt cognisearch's `src/lib/contact-schema.ts` (Zod) + form state machine into a Next.js Route Handler at `app/api/contact/route.ts`. Keep mailto fallback. Resend integration if the client opts in. **ClickSpark** on the submit button for delight.

### Phase 8 — Micro-interactions sweep

Site-wide pass to make every hover/click feel intentional.

- **Magnet** on every primary CTA (already from Phase 3).
- **ClickSpark** on submit and major CTAs.
- **ShinyText** on eyebrow labels and one-word emphasis.
- **GradualBlur** reveal on long body copy below the fold.
- **Hover glow** for nav links: keep accent-orange colour shift, add `text-shadow: 0 0 8px var(--accent)/40%` on `:hover` — the literal "glow on hover" the client asked for. Apply via a single utility class so it's consistent.
- **Audit transitions**: replace every ad-hoc `transition-all duration-300` with the `--ease-smooth` / `--duration-normal` tokens added in the previous CLAUDE.md update.

### Phase 9 — Quality, performance, ship

The "looks as good as possible" bar fails if it loads slowly or breaks accessibility.

- **Reduced motion**: confirm Lenis off, cursor hidden, all `data-reveal` content visible at rest, no animation under `prefers-reduced-motion: reduce`.
- **Image pipeline**: every `<Image>` has explicit `sizes`, lazy-loads below the fold, AVIF/WebP variants generated by Next.js automatically. Run `npm run test:media` after content moves.
- **Lighthouse**: target ≥ 95 on Performance, 100 on Accessibility/Best-Practices/SEO. Animation work tends to hurt Performance — measure and adjust.
- **Husky + CI** (was Phase F): pre-commit running `lint` + `tsc --noEmit`; minimal GitHub Actions workflow mirroring it.
- **SEO**: per-route `metadata` exports with proper Open Graph + Twitter cards. Each project page should have a unique title/description.

## Curated React Bits picks (with rationale)

The full library has 110+ components; this is the shortlist that fits the brand. Skip the rest unless a specific need surfaces.

**Backgrounds — use sparingly, dialled to low opacity:**

- `Grainient` — gradient + grain. **Top pick** for hero ambient.
- `SoftAurora` — gentle moving gradient.
- `Threads` — flowing thread lines, very artistic.
- `DarkVeil` — moody dark overlay, good behind text-heavy sections.
- `LightRays` — single beam, hero accent.
- `Noise` — pure grain (alternative to the SVG film-grain in Phase 0).

**Text animations — for headings only, not body:**

- `SplitText` — line-by-line reveal. Workhorse.
- `ShinyText` — subtle shimmer, perfect for eyebrow labels.
- `BlurText` — blur-in reveal, alternative to SplitText.
- `DecryptedText` / `ScrambledText` — scramble effect for one-word emphasis (cognisearch uses this).
- `RotatingText` — cycle through phrases (e.g. "3D artist / Illustrator / Visualizer").
- `CountUp` — for stats on About page.

**Animations — interaction polish:**

- `Magnet` / `MagnetLines` — magnetic CTA buttons.
- `ClickSpark` — sparks on click for delight.
- `GlareHover` — light glare on hover, gallery thumbnails.
- `GradualBlur` — body-copy reveal.
- `ImageTrail` — image trail follows cursor (use **only** on the gallery page, optional toggle).
- `LogoLoop` — software badge carousel.
- `AnimatedContent` / `FadeContent` — generic wrappers for non-text reveals.

**Components — set pieces:**

- `Masonry` — illustration gallery. Replaces FlexGrid.
- `DomeGallery` / `CircularGallery` — multi-render galleries on 3D project pages. **Showcase moments.**
- `SpotlightCard` — radial-gradient hover for project thumbnails.
- `TiltedCard` — alternative tilt-on-hover for thumbnails.
- `ScrollStack` — process section cards on 3D pages (alternative to horizontal scroll).
- `ProfileCard` — About page bio block.
- `FlyingPosters` / `BounceCards` — optional gallery alt view.
- `ModelViewer` — only if Three.js scope grows; currently `ScrollModel` covers this.

**Explicitly skipped**: Hyperspeed, Galaxy, Particles, Iridescence, Plasma, Lightning, Balatro, GlitchText, FaultyTerminal, LiquidChrome, MetaBalls, Cubes — too gaming/sci-fi/literal for a moody artist portfolio.

## Reference sources

- **`cognisearch`** at [`../cognisearch`](../cognisearch) — primary style reference. Lift: `MotionProvider.tsx`, `global.css` `@theme` (motion + spacing + type, NOT colours), `Header.astro` mix-blend pattern, `SectionNavDots.astro`, `BigStatement.astro`, `AutoScrollColumns.astro`, `HorizontalScroll` pin pattern.
- **`web-starter-claude`** at `c:\Users\Stephen\GithubRepos\web-starter-claude` — workflow/tooling reference. Lift: `AGENTS.md` conventions, `contact-schema.ts` (Phase 7), `.husky/` + `.github/workflows/ci.yml` (Phase 9).
- **[React Bits](https://reactbits.dev)** — copy-paste component source. Each component has JS-CSS / JS-TW / TS-CSS / TS-TW variants; pick **TS-TW** to match this project (TypeScript + Tailwind).
