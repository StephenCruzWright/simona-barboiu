# Brand tokens — fill this in for your project

A one-stop reference for your project's colors, typography, and spacing.
When you hand this file to Claude ("use these tokens"), it has enough to
style consistently without you re-specifying per prompt.

Copy this file to `brand-tokens.md` (drop the `-TEMPLATE` suffix), fill
it in, and reference it in prompts:

> "Apply the brand tokens from `docs/reference/brand-tokens.md` to
> `src/styles/global.css` `@theme {}`."

---

## Palette

| Token | Purpose | Hex | Notes |
|---|---|---|---|
| `--color-primary` | Main CTA color, active states | `#______` | TODO — pick something with ≥3:1 contrast on white |
| `--color-primary-light` | Hover state for primary | `#______` | TODO — usually +10% lightness |
| `--color-dark` | Headings, body text | `#______` | TODO — ≥7:1 on white for AAA |
| `--color-darker` | Footer, dark sections | `#______` | TODO |
| `--color-darkest` | Hero overlays, highest contrast dark | `#______` | TODO |
| `--color-accent` | Badges, callout backgrounds | `#______` | TODO — warm or cool; pick a highlight |
| `--color-accent-strong` | Emphasized accent | `#______` | TODO |
| `--color-bg` | Primary page background | `#FFFFFF` | Usually white — change only if intentional |
| `--color-bg-muted` | Alternating sections, cards | `#______` | TODO — usually primary bg with 2-3% darkness |
| `--color-border` | Dividers, card borders | `#______` | TODO — subtle, usually 5-10% darker than bg-muted |
| `--color-faint` | Low-emphasis labels | `#______` | TODO |
| `--color-muted` | Default secondary text | `#______` | TODO — gray-500ish |
| `--color-muted-strong` | Emphasized body text | `#______` | TODO — gray-600ish |

**Contrast requirements** (WCAG 2.1 AA, minimum):
- Body text on bg: ≥4.5:1
- Large text (18pt+/14pt bold+) on bg: ≥3:1
- UI components/CTAs on bg: ≥3:1

Use the [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
to verify every pair before committing.

---

## Typography

| Token | Family | Source | Weights needed |
|---|---|---|---|
| `--font-sans` | `{{Font Name}}` | Google Fonts / Fontsource / self-hosted | `{{400, 500, 700}}` |
| `--font-serif` (optional) | `{{Font Name}}` | — | — |
| `--font-mono` (optional) | `{{Font Name}}` | — | — |

**Font sources**:
- Self-hosted (recommended): download woff2 files, drop into
  `public/fonts/`, declare with `@font-face` in `global.css`
- Google Fonts: `<link rel="stylesheet" href="https://fonts.googleapis.com/...">`
  in `BaseLayout.astro` (adds a third-party dependency)
- [Fontsource](https://fontsource.org): npm-installable self-hosting

**Why self-hosted**: one less third-party dependency, no FOIT/FOUT
flashes from Google's CDN, better CSP story.

---

## Type scale

Match the defaults in `src/styles/global.css`:

| Element | Size | Line height | Weight |
|---|---|---|---|
| `h1` | `text-4xl md:text-5xl lg:text-6xl` | `leading-tight` | `font-bold` |
| `h2` | `text-3xl md:text-4xl` | `leading-tight` | `font-bold` |
| `h3` | `text-2xl md:text-3xl` | `leading-tight` | `font-bold` |
| `h4` | `text-xl md:text-2xl` | `leading-tight` | `font-bold` |
| body | `text-lg` (desktop) / `text-base` (mobile) | `leading-relaxed` | normal |

Adjust in `global.css` if your brand wants tighter/looser.

---

## Spacing rhythm

Astro + Tailwind v4 picks these up from `@theme {}`:

| Token | Value | Purpose |
|---|---|---|
| `--spacing-section` | `5rem` | Vertical padding between sections |
| `--spacing-section-lg` | `7rem` | Hero / major break |

Standard sizes still come from Tailwind (`p-4`, `gap-6`, `space-y-8`).

---

## Radius + shadow

| Token | Value | Where |
|---|---|---|
| `--radius-sm` | `0.375rem` | Badges, tags |
| `--radius-md` | `0.5rem` | Buttons, inputs |
| `--radius-lg` | `0.75rem` | Cards |
| `--radius-xl` | `1rem` | Large cards, sections |
| `--shadow-sm` | subtle | Cards at rest |
| `--shadow-md` | medium | Elevated components |
| `--shadow-lg` | prominent | Modals, tooltips |

---

## Logo + identity assets

Drop into `public/`:

- `favicon.svg` — 64×64 canonical SVG (template ships a placeholder)
- `favicon-32x32.png`, `favicon-16x16.png` — PNG fallbacks
- `apple-touch-icon.png` — 180×180 for iOS home screens
- `og-default.png` — 1200×630 default social share image
- `logo-light.svg`, `logo-dark.svg` — header usage
- `site.webmanifest` — PWA manifest (optional)

---

## Motion

Animation tokens in `global.css`:

| Token | Value | Meaning |
|---|---|---|
| `--duration-fast` | `150ms` | Hover states, small transitions |
| `--duration-normal` | `300ms` | Tab switches, dropdowns |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default easing |

Respect `prefers-reduced-motion` — islands should skip or freeze
animations when it's active.