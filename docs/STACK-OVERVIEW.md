# Stack Overview

Why each layer is here. This is a **Next.js** app (not Astro — ignore any older Astro-era docs).

## Framework — Next.js 16 (App Router) + React 19

Server Components by default, file-based routing under `app/`, first-class image optimization (`next/image` → AVIF/WebP), and native View Transitions support (`experimental.viewTransition`) for seamless page morphs. Deploys to Vercel with zero config.

## Styling — Tailwind CSS v4 (CSS-first)

No `tailwind.config.js`. The design system lives in an `@theme` block in [styles/globals.css](../styles/globals.css): brand colours, a fluid `clamp()` type scale (`--text-display`…`--text-small`), fluid spacing, motion easing/duration/stagger tokens, a z-index scale, and asymmetric grid utilities. PostCSS plugin: `@tailwindcss/postcss`.

## Language — TypeScript 5.9 (strict)

No `any`. Content schemas in `lib/` are fully typed and shared between pages and components.

## Motion — GSAP + ScrollTrigger, Lenis, Split-Type

Orchestrated by [components/motion/MotionProvider.tsx](../components/motion/MotionProvider.tsx): one Lenis instance synced to the single GSAP ticker, a declarative `data-*` reveal scanner (`data-reveal`, `data-reveal-clip`, `data-stagger-in`, `data-parallax`, `data-magnetic-wrap`), a custom cursor, a scroll-progress bar, and a film-grain overlay — all reduced-motion aware. **Reuse these primitives instead of writing per-component animation.**

## 3D — Three.js 0.182

Powers the WebGL hero gradient ([components/HeaderGradient.tsx](../components/HeaderGradient.tsx)) and the frame-based `ScrollModel` rotator. Kept contained — in service of the art, never scene-as-navigation. Code-split so it doesn't block hydration on pages that don't use it.

## Tooling

- **ESLint 9** (`eslint-config-next`, flat config).
- **CI**: [.github/workflows/quality-checks.yml](../.github/workflows/quality-checks.yml) runs `test:media` + `build` on push/PR.
- **Media validation**: [scripts/validate-media.mjs](../scripts/validate-media.mjs) via `npm run test:media`.
- No pre-commit hooks yet (Husky not installed); run `npm run lint` + `npx tsc --noEmit` manually before committing.

## Hosting — Vercel

Auto-deploy from `main` → simonabarboiu.com. See [DEPLOYMENT.md](DEPLOYMENT.md).
