# Section Library & Page Blueprints

A catalog of reusable page stacks and section patterns. When the user hands over a design reference and a page list during the kickoff (see [AGENTS.md § Session opening](../../AGENTS.md)), Claude composes pages by picking from this library.

**How to use this file**:

- **Part A** — Seven page blueprints. Each names a recommended stack of sections.
- **Part B** — Section pattern catalog. ~25 section types with props, grid, and motion notes.
- **Part C** — Reuse policy. Where sections live, when to extend vs. create.

The patterns are stack-aware: every one maps to a file under [src/components/sections/](../../src/components/sections/), uses tokens from [src/styles/global.css](../../src/styles/global.css), and reads content from a collection in [src/data/](../../src/data/) when appropriate. Spatial grammar comes from [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

---

## Part A — Page blueprints

### 1. Homepage

**Purpose**: establish voice, show what you do, route to deeper pages.

**Layout wrapper**: [PageLayout.astro](../../src/layouts/PageLayout.astro)

**Content source**: [src/data/home/home.mdx](../../src/data/home) frontmatter (`heroTagline`, `heroSubtitle`, `ctaLabel`, `ctaHref`) + the collections referenced by individual sections (testimonials, FAQs, etc.).

**Recommended stack** (pick a subset — 41 sections is cosplay):

```text
Hero
 → Logo Marquee
 → Big Statement
 → Stats
 → Services Grid (preview)
 → Editorial Split (about)
 → Case Study (featured)
 → Process Timeline
 → Testimonials
 → FAQ
 → CTA Banner
```

---

### 2. Services

**Purpose**: explain what you offer, who it's for, how it's priced.

**Layout wrapper**: [PageLayout.astro](../../src/layouts/PageLayout.astro)

**Content source**: new `services` collection recommended — add to [src/content.config.ts](../../src/content.config.ts) with fields `title`, `tagline`, `deliverables[]`, `image`, `order`.

**Recommended stack**:

```text
Hero (service overview)
 → Services Grid (all services, each linking to detail)
 → Editorial Split × N (alternating layout per service)
 → Pricing
 → Process Timeline
 → FAQ
 → CTA Banner
```

---

### 3. Work / Portfolio

**Purpose**: prove you can execute. Every visitor on this page is evaluating you.

**Layout wrapper**: [PageLayout.astro](../../src/layouts/PageLayout.astro)

**Content source**: new `work` collection recommended — fields `title`, `client`, `year`, `tags[]`, `summary`, `heroImage`, `metrics[]`.

**Recommended stack**:

```text
Hero (filterable project grid)
 → Case Study (featured, full-bleed)
 → Image Grid (remaining projects)
 → Stats (outcomes bar)
 → Testimonials
 → CTA Banner
```

---

### 4. About

**Purpose**: who you are, why you exist, who works here.

**Layout wrapper**: [PageLayout.astro](../../src/layouts/PageLayout.astro)

**Content source**: [src/data/pages/about.mdx](../../src/data/pages/about.mdx) + new `team` collection (fields `name`, `role`, `bio`, `image`, `order`).

**Recommended stack**:

```text
Hero (origin statement)
 → Image Reveal (full-width hero image)
 → Editorial Split (founding story)
 → Big Statement (values as one bold sentence)
 → Team (grid with hover bio reveals)
 → Timeline (company history)
 → CTA Banner
```

---

### 5. Journal / Blog index

**Purpose**: route readers to articles; signal what you think about.

**Layout wrapper**: [PageLayout.astro](../../src/layouts/PageLayout.astro)

**Content source**: existing `blog` collection in [src/content.config.ts](../../src/content.config.ts) — fields already include `pubDate`, `author`, `tags`, `draft`.

**Recommended stack**:

```text
Hero (index heading + category filter)
 → Case Study (featured article, full-width)
 → Image Grid (remaining articles)
 → Newsletter
 → CTA Banner
```

---

### 6. Blog post

**Purpose**: the article itself. Every other section exists to support the reading experience.

**Layout wrapper**: [BlogLayout.astro](../../src/layouts/BlogLayout.astro) — renders MDX body between a hero and a footer.

**Content source**: entries in the `blog` collection. MDX body handles its own headings, code blocks, pull quotes, and inline images.

**Recommended stack** (the layout already wires most of these):

```text
Hero (article title, author, date)
 → [MDX body]
 → Newsletter
 → Case Study (related articles)
```

---

### 7. Contact

**Purpose**: remove friction to reach you.

**Layout wrapper**: [PageLayout.astro](../../src/layouts/PageLayout.astro)

**Content source**: [src/data/pages/contact.mdx](../../src/data/pages/contact.mdx) + [ContactFormIsland](../../src/components/islands/) wired to [/api/contact](../../src/pages/api/contact.ts).

**Recommended stack**:

```text
Hero (addressable heading)
 → Editorial Split (contact info left, form right)
 → FAQ (pre-empt common asks)
 → CTA Banner
```

---

## Part B — Section pattern catalog

Each entry lists: purpose, where it lives, inputs (props or content fields), grid/tokens, and motion. "Where it lives" with a `[NEW]` tag means the file doesn't exist yet and needs to be created.

### Hero

- **Purpose**: first impression. Tagline, subhead, primary CTA.
- **File**: [src/components/sections/Hero.astro](../../src/components/sections/Hero.astro) *(ships)*
- **Inputs**: `tagline`, `subtitle`, `ctaLabel`, `ctaHref`, optional `eyebrow`
- **Grid / tokens**: `.grid-hero` (40/1fr/1fr/1fr) · `text-display` for heading · `text-body` for subhead · `--spacing-section-fluid` for vertical padding
- **Motion**: headline uses mask reveal (principle 7); subhead and CTA use `[data-reveal]` with `--stagger-normal`

### Marquee

- **Purpose**: kinetic horizontal ticker — logos, statements, or tags looping continuously.
- **File**: `src/components/sections/Marquee.astro` `[NEW]`
- **Inputs**: `items[]` (strings or `{ label, href }`), `speed` (seconds per cycle), `reverse` (boolean)
- **Grid / tokens**: CSS `animation: marquee Xs linear infinite` · `--text-h2` for statement marquees · content duplicated for seamless loop
- **Motion**: continuous CSS keyframe (no scroll trigger)

### Stats

- **Purpose**: numeric proof points.
- **File**: `src/components/sections/Stats.astro` `[NEW]`
- **Inputs**: `stats[]` with `{ value, label, suffix? }`
- **Grid / tokens**: CSS Grid `repeat(auto-fit, minmax(12rem, 1fr))` · `text-display` for numbers · `text-small` for labels
- **Motion**: count-up on reveal via `IntersectionObserver` + small island; fallback: show final number instantly

### Image Reveal

- **Purpose**: full-width image that uncovers as it enters the viewport.
- **File**: `src/components/sections/ImageReveal.astro` `[NEW]`
- **Inputs**: `src`, `alt`, `aspectRatio` (e.g. `"16 / 9"`)
- **Grid / tokens**: single-column · height controlled by `aspect-ratio` · uses `.image-reveal` class from DESIGN-SYSTEM.md § Principle 5
- **Motion**: clip-path polygon + scale 1.15→1, wired via `[data-reveal]`

### Services Grid

- **Purpose**: overview of services or capabilities as cards.
- **File**: `src/components/sections/ServicesGrid.astro` `[NEW]`
- **Inputs**: reads `services` collection; optional `limit` to show N
- **Grid / tokens**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with `gap-s5` · each card uses [Card.astro](../../src/components/ui/Card.astro)
- **Motion**: staggered `[data-reveal]` on each card using `--stagger-normal`

### Process Timeline

- **Purpose**: how-we-work in N steps.
- **File**: `src/components/sections/Process.astro` `[NEW]`
- **Inputs**: `steps[]` with `{ number, title, description }`
- **Grid / tokens**: vertical line connector · `.grid-editorial` per step (number/title left, description right)
- **Motion**: each step reveals as the line reaches it (scroll-driven); fallback is per-step `[data-reveal]`

### Editorial Split

- **Purpose**: two-column layout with intentional weight asymmetry (image+text, text+stats, etc.).
- **File**: `src/components/sections/EditorialSplit.astro` `[NEW]`
- **Inputs**: `leftSlot`, `rightSlot` (Astro slots), `reverse` (swaps order at desktop)
- **Grid / tokens**: `.grid-editorial` · `--spacing-section-gutter` between columns
- **Motion**: both columns `[data-reveal]` with `--stagger-luxe` delay between them

### Case Study (featured)

- **Purpose**: hero-treatment for a single project or article.
- **File**: `src/components/sections/FeaturedCaseStudy.astro` `[NEW]`
- **Inputs**: `title`, `client`, `summary`, `heroImage`, `href`, optional `metrics[]`
- **Grid / tokens**: full-bleed image + overlaid text at `--spacing-s6` inset · `text-h1` for title
- **Motion**: image uses image-reveal; text uses mask reveal

### Logo Marquee

- **Purpose**: social proof via client logos.
- **File**: `src/components/sections/LogoMarquee.astro` `[NEW]`
- **Inputs**: `logos[]` with `{ src, alt, href? }`
- **Grid / tokens**: reuses Marquee mechanics at slower speed · monochrome logos via `filter: grayscale(1)` with `opacity: 0.6` and full color on hover
- **Motion**: infinite horizontal scroll

### Image Grid

- **Purpose**: portfolio tile wall or article previews.
- **File**: `src/components/sections/ImageGrid.astro` `[NEW]`
- **Inputs**: `items[]` with `{ image, title, tag?, href }`; optional `featured` indices for 2-cell-wide tiles
- **Grid / tokens**: CSS Grid `repeat(12, 1fr)` with named tiles spanning 3/4/6 columns
- **Motion**: tiles `[data-reveal]` with `--stagger-tight`

### Testimonials

- **Purpose**: reader voice; social proof.
- **File**: [src/components/sections/Testimonials.astro](../../src/components/sections/Testimonials.astro) *(ships)*
- **Inputs**: `testimonials[]` with `{ quote, author, role, company?, image? }`
- **Grid / tokens**: 1–3 cards depending on count · `text-h3` for quotes · quote mark as decorative SVG
- **Motion**: quote text uses mask reveal; attribution fades

### Team

- **Purpose**: the humans behind the brand.
- **File**: `src/components/sections/Team.astro` `[NEW]`
- **Inputs**: reads `team` collection
- **Grid / tokens**: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-s4` · square portraits with hover-reveal of bio
- **Motion**: card hover triggers bio slide-up via CSS transition

### Comparison Slider

- **Purpose**: before/after image drag.
- **File**: `src/components/islands/ComparisonSlider.tsx` `[NEW]` (Preact — needs state)
- **Inputs**: `beforeImage`, `afterImage`, `alt`, `initialPosition` (0–100)
- **Grid / tokens**: positioned container · draggable handle at 50%
- **Motion**: handle updates CSS `clip-path` on after image in real-time

### Timeline

- **Purpose**: company or project history, step-by-step.
- **File**: `src/components/sections/Timeline.astro` `[NEW]`
- **Inputs**: `entries[]` with `{ year, title, description }`
- **Grid / tokens**: vertical timeline · `.grid-section-header` per entry · years in `text-h2`, titles in `text-h4`
- **Motion**: staggered `[data-reveal]` with luxe timing

### Awards

- **Purpose**: industry recognition.
- **File**: `src/components/sections/Awards.astro` `[NEW]`
- **Inputs**: `awards[]` with `{ name, category, year, organization }`
- **Grid / tokens**: simple `grid-cols-1 md:grid-cols-2` list · each row uses `.grid-section-header` internal split
- **Motion**: none — awards stand on their own

### FAQ

- **Purpose**: pre-empt the questions users would email about.
- **File**: [src/components/sections/FAQ.astro](../../src/components/sections/FAQ.astro) *(ships)*
- **Inputs**: reads `faqs` collection
- **Grid / tokens**: full-width accordion · `text-h4` for questions · transition on `max-height`
- **Motion**: CSS-only accordion via `<details>` element, or island with animated height

### Carousel / Drag Carousel

- **Purpose**: horizontal scroll through cards (culture photos, tweets, partners).
- **File**: `src/components/islands/DragCarousel.tsx` `[NEW]`
- **Inputs**: `items[]` with whatever shape the card renders
- **Grid / tokens**: flexbox row with `overflow-x: auto` and `scroll-snap-type: x mandatory` · on desktop, drag-to-scroll via pointer events
- **Motion**: native scroll-snap on touch; custom drag on desktop

### CTA Banner

- **Purpose**: final action before user leaves the page.
- **File**: [src/components/sections/CTABanner.astro](../../src/components/sections/CTABanner.astro) *(ships)*
- **Inputs**: `heading`, `description`, `ctaLabel`, `ctaHref`
- **Grid / tokens**: centered single column · `text-h1` for heading · `--spacing-section-fluid` padding · optional dark background via `bg-darker`
- **Motion**: heading mask reveal; CTA `[data-reveal]`

### Pricing

- **Purpose**: remove pricing ambiguity.
- **File**: `src/components/sections/Pricing.astro` `[NEW]`
- **Inputs**: `tiers[]` with `{ name, price, period, features[], ctaLabel, highlighted? }`
- **Grid / tokens**: `grid-cols-1 md:grid-cols-3 gap-s4` · highlighted tier scales 1.05x · each tier uses Card primitive
- **Motion**: tiers `[data-reveal]` with `--stagger-normal`

### Big Statement

- **Purpose**: one sentence that makes the page memorable. Used as a visual break between information-dense sections.
- **File**: `src/components/sections/BigStatement.astro` `[NEW]`
- **Inputs**: `text`, optional `attribution`
- **Grid / tokens**: centered single column at `--container-3xl` · `text-display` · `--spacing-section-fluid` top/bottom padding
- **Motion**: mask reveal on each line

### Manifesto

- **Purpose**: your beliefs, in prose.
- **File**: `src/components/sections/Manifesto.astro` `[NEW]`
- **Inputs**: `paragraphs[]` (each rendered in `text-h3`)
- **Grid / tokens**: centered at `--container-3xl` · generous line-height (1.6) · `--spacing-s7` between paragraphs
- **Motion**: each paragraph `[data-reveal]` sequentially with `--stagger-luxe`

### Pinned Philosophy

- **Purpose**: one image holds while a column of text scrolls past. Works well for value statements.
- **File**: `src/components/sections/PinnedPhilosophy.astro` `[NEW]`
- **Inputs**: `image`, `alt`, `entries[]` with `{ title, description }`
- **Grid / tokens**: `.grid-editorial` · image column uses `position: sticky; top: var(--spacing-s6)` · text column scrolls normally
- **Motion**: each text entry `[data-reveal]` as it enters; image stays put

### Outlined Text Fill

- **Purpose**: oversized word that starts outlined, fills in as user scrolls past.
- **File**: `src/components/sections/OutlinedFill.astro` `[NEW]`
- **Inputs**: `text` (typically one word)
- **Grid / tokens**: `text-display` at 2x size · `color: transparent; -webkit-text-stroke: 1px var(--color-dark);` at rest · on `[data-revealed]`, transitions `color` to `var(--color-dark)`
- **Motion**: CSS color transition triggered by scroll observer

### Newsletter

- **Purpose**: capture email for ongoing contact.
- **File**: `src/components/sections/Newsletter.astro` `[NEW]` — with a small `<form>` posting to [/api/contact](../../src/pages/api/contact.ts) or a new `/api/subscribe` endpoint
- **Inputs**: `heading`, `description`, `placeholder`, `ctaLabel`
- **Grid / tokens**: centered · `.grid-editorial` (heading left, form right) on desktop · stacks on mobile
- **Motion**: heading reveal; form fades in

### Footer

- **Purpose**: exit pattern — wayfinding, contact, legal, socials.
- **File**: [src/components/global/Footer.astro](../../src/components/global/Footer.astro) *(ships)*
- **Inputs**: reads `FOOTER_LINKS` and `SOCIAL_LINKS` from [src/lib/constants.ts](../../src/lib/constants.ts)
- **Grid / tokens**: `grid-cols-2 md:grid-cols-4` · `bg-darker` · `text-muted` for link labels
- **Motion**: none

---

## Part C — Reuse policy

**First, check what ships.** Four sections already exist as files under [src/components/sections/](../../src/components/sections/):

- [Hero.astro](../../src/components/sections/Hero.astro)
- [CTABanner.astro](../../src/components/sections/CTABanner.astro)
- [FAQ.astro](../../src/components/sections/FAQ.astro)
- [Testimonials.astro](../../src/components/sections/Testimonials.astro)

Use these as-is unless the user explicitly wants a variant. When they do, extend the existing file with a prop rather than creating a parallel component.

**New sections**: create a new `.astro` file in [src/components/sections/](../../src/components/sections/). Compose from UI primitives already in [src/components/ui/](../../src/components/ui/) (Button, Card, Badge, Container, SectionHeading, IconList, etc.) — don't reinvent primitives.

**Interactive sections** (needing state, event listeners, client logic): create a Preact island in [src/components/islands/](../../src/components/islands/) and hydrate with `client:visible` or `client:media` so JS ships only where needed. Examples from this catalog: Comparison Slider, Drag Carousel, Stats (count-up).

**Never inline a section's markup in a page.** If a page needs a one-off structure, that structure is a section and belongs in a file under `sections/`. Pages stay thin — they import sections and pass props/content.

**Grid and spacing decisions**: always reach through the token classes (`grid-hero`, `text-display`, `--spacing-section-fluid`) rather than typing raw values. If a section needs spacing not covered by the scale, that's a signal to add a token to `@theme {}`, not to hardcode.

**Motion defaults**: use `[data-reveal]` for entry animations unless there's a reason not to. This keeps the reveal observer logic centralized and `prefers-reduced-motion` handling automatic.

---

## Reference

- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) — the spatial grammar each section uses.
- [brand-tokens-TEMPLATE.md](brand-tokens-TEMPLATE.md) — color, type, spacing slots the user fills in.
- [voice-and-tone-TEMPLATE.md](voice-and-tone-TEMPLATE.md) — how the copy inside each section should read.
- [AGENTS.md § Session opening](../../AGENTS.md) — the kickoff flow that feeds this catalog.
