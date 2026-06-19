# Design System — the spatial grammar this template ships with

A menu of transferable design principles. Each one is either:

- **Wired** — already encoded in [src/styles/global.css](../../src/styles/global.css) as a token or utility class; reach for it by name.
- **Optional** — a pattern you can opt into via a Preact island or small `<script>`, without adding dependencies.
- **Out of scope** — requires a library this template doesn't ship; listed at the end with install notes.

The principles are stack-agnostic. The implementation notes are Astro 6 + Tailwind v4 + Preact + CSS-native. No GSAP, no Lenis, no SplitType — every reveal and motion below works with `IntersectionObserver`, CSS transitions, `@starting-style`, or `animation-timeline: scroll()`.

---

## Principle 0: Design-first philosophy

**Spatial architecture comes first. Brand colors and copy come second.**

The grids, typography scale, spacing rhythm, and motion choreography are designed independently of the brand. Colors and copy are adapted to fit the system, not the other way around. If the brand's existing palette conflicts with the design's needs, the design wins.

**Why**: most agency sites compose brand guidelines → template → copy fill, and end up reading as template sites with a coat of paint. Designing the spatial grammar first makes the site feel bespoke even when the brand palette is conservative.

**How this shows up in the template**:

- `@theme {}` tokens in [global.css](../../src/styles/global.css) are the grammar. The user provides brand tokens (hex values, fonts) that swap *into* the existing slots.
- The [Section Library](PROJECT.md) names sections by spatial role (Hero, Editorial Split, Big Statement) not by brand content.
- The kickoff flow in [AGENTS.md](../../AGENTS.md) asks for the **design reference** before anything else.

---

## How the template encodes these principles

| Principle | Token / utility | Lives in |
|---|---|---|
| 8-point spacing | `--spacing-s1`…`--spacing-s9` | [global.css](../../src/styles/global.css) `@theme {}` |
| Fluid macro spacing | `--spacing-section-fluid`, `--spacing-section-gutter` | [global.css](../../src/styles/global.css) `@theme {}` |
| Fluid typography | `--text-display`, `--text-h1`…`--text-h4`, `--text-body`, `--text-small` | [global.css](../../src/styles/global.css) `@theme {}` |
| Asymmetric grids | `.grid-hero`, `.grid-editorial`, `.grid-section-header` | [global.css](../../src/styles/global.css) |
| Reveal-on-scroll primitive | `[data-reveal]` / `[data-revealed]` | [global.css](../../src/styles/global.css) |
| Motion tokens | `--duration-fast/normal/slow`, `--ease-smooth`, `--ease-out-expo` | [global.css](../../src/styles/global.css) `@theme {}` |
| Stagger timings | `--stagger-tight/normal/luxe` | [global.css](../../src/styles/global.css) `@theme {}` |

Tailwind v4 exposes the `@theme {}` tokens automatically as utilities (`text-display`, `p-s4`, `duration-slow`, etc.). The grid utilities and reveal primitive are plain CSS classes since named grids don't map cleanly to utility names.

---

## Principle 1: 8-point spacing grid

**Use multiples of 8px for every margin, padding, and gap. Keep internal padding ≤ external margins.**

8 divides cleanly into 4 and 2, aligning with modern screen pixel ratios. Removing arbitrary spacing values (13px, 22px) removes the dozens of micro-decisions that make a layout feel off.

The **internal ≤ external** rule is rooted in Gestalt's law of proximity: components feel composed when their inner padding is smaller than the space separating them from neighbors. Break it and layouts feel cramped.

**Wired as**: `--spacing-s1` (4px) through `--spacing-s9` (128px). Use directly:

```astro
<section style="padding: var(--spacing-s8) var(--spacing-s5)">
  …
</section>
```

Or reach for Tailwind's `p-*` / `gap-*` utilities — Tailwind v4's default spacing scale is already on the 8-point progression, so `p-4` (16px), `gap-8` (32px), `py-16` (64px) all land on the grid.

For macro section padding, use `--spacing-section-fluid` (clamp: 5rem → 14rem) — it breathes with the viewport so sections don't feel cramped on tall screens or stretched on short ones.

---

## Principle 2: Fluid typography via `clamp()`

**Zero media queries for font sizing. Each heading and body size scales linearly between a viewport min and max.**

`clamp(min, preferred, max)` takes three values. The preferred value is a linear equation between two viewport widths:

```text
slope     = 100 × (maxSize − minSize) / (maxViewport − minViewport)
intercept = (minViewport × maxSize − maxViewport × minSize) / (minViewport − maxViewport)

preferred = intercept_rem + slope_vw
```

Pair fluid type with an **inverse line-height relationship**: display headings tight (0.85–1.0), body text relaxed (1.5–1.7). Negative letter-spacing on display type (`-0.04em`) sharpens the silhouette; neutral spacing on body.

**Wired as**:

```css
--text-display: clamp(3.5rem, 1.09rem + 9.55vw, 9rem);
--text-h1: clamp(2.5rem, 0.95rem + 6.8vw, 6rem);
--text-h2: clamp(2rem, 0.91rem + 5.45vw, 5rem);
--text-h3: clamp(1.5rem, 0.5rem + 3vw, 2.5rem);
--text-h4: clamp(1.25rem, 0.75rem + 1.5vw, 1.75rem);
--text-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-small: clamp(0.8rem, 0.75rem + 0.1vw, 0.875rem);
```

Use via Tailwind v4 utilities: `text-display`, `text-h1`, …, `text-body`. Opt-in per section — the existing `h1`…`h6` declarations in [global.css](../../src/styles/global.css) keep the static scale for components that don't want fluidity.

> **Gotcha** — `clamp()` requires spaces around `+` and `−` inside `calc()`. `1.09rem+9.55vw` is invalid CSS and silently fails. Never hand-minify math expressions.

---

## Principle 3: Asymmetric fractional grids

**Reject 12-column symmetry. Use fractional grids with deliberate asymmetry to create visual tension and focal hierarchy.**

A massive heading in one fraction of the screen, against a small paragraph in the opposite corner, creates negative space that pulls the eye across it. The void between them is not empty — it's the loudest element.

**Wired as** three utility classes in [global.css](../../src/styles/global.css):

| Class | Columns | Use for |
|---|---|---|
| `.grid-hero` | `40% 1fr 1fr 1fr` | Hero sections: heading in tracks 1–3, editorial body in track 4 |
| `.grid-section-header` | `55% 1fr` | Section titles: heading left, subtitle/metadata right |
| `.grid-editorial` | `1fr 1fr` | Two-column content with intentional weight asymmetry |

All three collapse to single-column at `max-width: 768px`. Override the breakpoint locally if a section needs different stacking behavior.

```astro
<section class="grid-hero">
  <h1 class="col-span-3 text-display">{tagline}</h1>
  <p class="text-body text-muted">{subhead}</p>
</section>
```

---

## Principle 4: Scroll-driven reveals

**Content animates in as it enters the viewport. Cascaded, not synchronized — each element arrives on its own rhythm.**

This template ships a **stack-native reveal primitive**:

```css
[data-reveal]              { opacity: 0; transform: translateY(1.5rem); transition: … }
[data-reveal][data-revealed] { opacity: 1; transform: none; }
```

Pair with a tiny `IntersectionObserver` at the top of [BaseLayout.astro](../../src/layouts/BaseLayout.astro) or in a scoped Preact island:

```ts
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-revealed", "true");
        io.unobserve(entry.target);
      }
    }
  },
  { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
);
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
```

**Staggering children**: apply a CSS `transition-delay` based on `:nth-child(n)` and a stagger token:

```css
.stagger-normal > [data-reveal]:nth-child(1) { transition-delay: calc(var(--stagger-normal) * 0); }
.stagger-normal > [data-reveal]:nth-child(2) { transition-delay: calc(var(--stagger-normal) * 1); }
/* … or generate with a SCSS / Astro loop */
```

Three stagger speeds encode psychology: `--stagger-tight` (20ms) = urgency, `--stagger-normal` (50ms) = balanced, `--stagger-luxe` (100ms) = luxury.

`prefers-reduced-motion: reduce` short-circuits the entire primitive — content appears instantly with no transition.

---

## Principle 5: Clip-path image reveals

**Images arrive by uncovering, not fading in. A polygon clips the image from bottom to top, often combined with a subtle scale-down.**

```css
.image-reveal {
  clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
  transform: scale(1.15);
  transition:
    clip-path var(--duration-slow) var(--ease-out-expo),
    transform var(--duration-slow) var(--ease-out-expo);
}

.image-reveal[data-revealed] {
  clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%);
  transform: scale(1);
}
```

Wire to the same `IntersectionObserver` as Principle 4 — add `data-reveal` alongside the `image-reveal` class. `prefers-reduced-motion` opts out.

---

## Principle 6: Parallax via scroll-driven animations

**Oversized imagery translates more slowly than its container, creating depth without a scroll hijack.**

Native CSS-only, supported in Chromium 115+ and Firefox behind a flag — use progressive enhancement:

```css
.parallax {
  overflow: hidden;
}

.parallax > img {
  height: 130%;
  width: 100%;
  object-fit: cover;
}

@supports (animation-timeline: scroll()) {
  .parallax > img {
    animation: parallax-shift linear both;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
  }

  @keyframes parallax-shift {
    from { transform: translateY(0); }
    to   { transform: translateY(-30%); }
  }
}
```

Browsers without scroll-driven animations just show a static image — no layout shift, no broken state.

---

## Principle 7: Text masking and line-by-line reveals

**Lines of text arrive one at a time, translating up from beneath a mask. No SplitType library required.**

Stack-native approach using `@starting-style` + `transition-behavior: allow-discrete` (Baseline 2024):

```css
.mask-reveal {
  display: block;
  overflow: hidden;
  padding-bottom: 0.15em; /* prevents descenders from clipping on tight line-heights */
}

.mask-reveal > span {
  display: inline-block;
  transform: translateY(110%);
  transition: transform var(--duration-slow) var(--ease-out-expo);
}

.mask-reveal[data-revealed] > span {
  transform: translateY(0);
}
```

For per-line staggering (where each line of wrapped text reveals separately), a small Preact island can use `Range.getClientRects()` to split the rendered text by line at runtime. This stays in the islands directory and still adds zero npm dependencies.

> **Gotcha** — `overflow: hidden` combined with `line-height: 0.9` or similar tight values will clip the bottom of descenders (g, y, p). Always add `padding-bottom: 0.15em` to the mask wrapper.

---

## Principle 8: Magnetic buttons (optional)

**CTAs pull subtly toward the cursor within a magnetic hit area, snapping back on leave.**

Ship as a Preact island in [src/components/islands/](../../src/components/islands/) — inline vector math, no dependency. Sketch:

```tsx
export function MagneticButton({ children, strength = 0.3, label }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      class="inline-block p-10"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <button ref={ref} aria-label={label} class="transition-transform">
        {children}
      </button>
    </div>
  );
}
```

Wrapper needs padding (~40px) to extend the magnetic field past the button's visual edge. Disable on touch via `@media (pointer: coarse) { transform: none !important; }`. Hydrate with `client:media="(pointer: fine)"`.

---

## Principle 9: Custom cursor (optional)

**Replace the OS cursor with a small shape that uses `mix-blend-mode: difference` to invert against whatever's underneath.**

Preact island; disable on coarse pointers:

```css
.cursor {
  position: fixed;
  top: 0; left: 0;
  width: 1.25rem; height: 1.25rem;
  background: white;
  border-radius: 50%;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: var(--z-overlay);
  transition: transform 100ms linear;
}

@media (pointer: coarse) {
  .cursor { display: none; }
}
```

A linear interpolation (`x * (1 - 0.1) + targetX * 0.1` per frame) on mouse coordinates creates a slight trailing weight. Implementation fits in ~30 lines of island code.

---

## Out of scope for this template

Patterns that need a library this template doesn't ship. Add the dep yourself if you want them:

- **Horizontal scroll hijacking** — pinning a full-viewport container and translating it horizontally as the user scrolls vertically. Needs GSAP ScrollTrigger (or a hand-rolled `scroll-snap` + `:has()` trick that's still fragile). `npm i gsap`.
- **SVG gooey filters** — `feGaussianBlur` + `feColorMatrix` for liquid merging between intersecting elements. Pure SVG, no dep — but fiddly enough that it isn't wired by default.
- **WebGL liquid distortion** — loading images as textures on a plane geometry with a custom fragment shader (GLSL). Needs Three.js. `npm i three`. This is a full mini-pipeline, not a snippet.

If you add any of these, wire them through a Preact island so they stay opt-in per page.

---

## Reference

- [Section Library & Page Blueprints](PROJECT.md) — what to build with these principles.
- [brand-tokens-TEMPLATE.md](brand-tokens-TEMPLATE.md) — slots for the user's brand-specific values.
- [voice-and-tone-TEMPLATE.md](voice-and-tone-TEMPLATE.md) — copy voice brief.
- [global.css](../../src/styles/global.css) — the actual token + utility source of truth.
