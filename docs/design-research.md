<!-- Generated from a 12-dimension deep-research workflow (87 sources verified, 13 corrected/dropped). Captured 2026-06-19. See CLAUDE.md and the redesign plan for how this maps to implementation. -->

# Design Research — Simona Barboiu Portfolio

> Reference document for the redesign. Brand is locked: dark-first, `#222222` background, `#f1f0ec` warm off-white, `#eb742a` accent orange, Inter variable. The artwork leads; motion is restraint-first; reduced-motion and performance are first-class, not final-phase. Verified-only references below (sites flagged in verification notes have been corrected or dropped).

## Executive summary

The 8–12 highest-leverage takeaways for *this* portfolio:

1. **Match the Awwwards rubric, don't fight it.** Scoring is Design 40% / Usability 30% / Creativity 20% / Content 10%. A restrained dark site with real artwork, real process captions, and zero usability friction out-scores a flashier, jankier one. The biggest scoring risk is skipping reduced-motion / keyboard support — not lacking a second effect.

2. **Continuity is the single biggest "winner" signal.** Use the native View Transitions API (Baseline as of Oct 2025; first-party in Next 16's `<ViewTransition>`) to morph a clicked thumbnail into the project hero. This is ~5 lines and is the cheapest path to feeling like one continuous gallery rather than a stack of pages.

3. **Build ONE reusable motion vocabulary, not a grab-bag.** Define 3–4 reveal primitives (line-split heading, staggered grid, clip-path media reveal, parallax) in `MotionProvider` and reuse them everywhere. Resist per-page bespoke React Bits effects. One signature text reveal across every page title reads as crafted; five different ones read as a template.

4. **One set-piece per page, maximum.** Home: SplitText hero. 3D page: orbital render gallery + one pinned process sequence. Gallery: masonry + lightbox. Everything else stays quiet `data-reveal` fades. This is the literal "complexity in interaction, simplicity in design" the client asked for, and it matches the project's "visual restraint" memory.

5. **The brand is already textbook moody-premium.** `#222222` is a warm near-black (not `#000`), `#f1f0ec` is warm off-white, `#eb742a` is a single warm accent. Don't deepen to black, don't add a second accent. Spend effort on depth (luminance-elevation surfaces, grain, dither) and motion, never on colour.

6. **The case-study spine matches the brief exactly:** hero render → big-statement title (SplitText) → short description → multi-render gallery → captioned process section → software strip. Build it once as `<ProjectLayout>` driven by typed `lib/projects.ts`, and bring the thin pages (flower-alley, greek-house, paxvr) up to the lamps bar.

7. **Process documentation is the 3D artist's true differentiator.** Wireframes, clay/UV sheets, timelapses, before/after sliders — treated with the same care as final renders, each *captioned*. This is the hiring signal recruiters scan for. Make `process[].caption` effectively required.

8. **The illustration gallery is a direct brief match:** justified/masonry grid preserving native aspect ratios (never crop) + in-place lightbox that becomes a vertical process-scroller when `process[]` exists. No per-illustration pages.

9. **The footer is the conversion set-piece.** Upgrade the low-emphasis grey footer into a display-scale contact end-card with the accent-orange glow-on-hover. The end-of-scroll is the moment to land the client/employer.

10. **Performance discipline, not effect-avoidance, wins CWV.** Animate transform/opacity only; one `priority` LCP hero with correct `sizes`; poster-first showreel; `next/font` size-adjust to kill font CLS; code-split GSAP/Three.js; sync Lenis to the single GSAP ticker. Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, Lighthouse ≥95 perf / 100 a11y.

11. **Reduced-motion is a parallel design language, not a kill switch.** Skip Lenis, hide the cursor, pause looping ambience (LogoLoop/aurora), reveal all content at rest — and the page must still look intentional and complete.

12. **Do NOT build a 3D-world / scene-as-navigation site.** That tier (Bruno Simon et al.) wins on novelty, costs months, breaks reduced-motion, and competes with the artwork. Use Three.js only in service of the art (the existing ScrollModel rotator is the right, contained use).

## Research findings by dimension

### 1. Anatomy of award-winning portfolio/studio sites

**Summary.** The winning anatomy is consistent and about *craft and choreography*, not novelty: a coherent motion system applied consistently, seamless page/section transitions, real sharp content (no lorem ipsum), and one or two genuine set-piece moments. The achievable target for a solo artist is the Stefan Vitasović / Arnaud Rocca / Cyd Stumpel editorial-motion tier — not a full WebGL world. Every documented winner ships a genuine reduced-motion / no-JS fallback.

**Strongest insights.** Winners weight craft+content over gimmicks (match the rubric); seamless transitions make the site feel like one space; a small *reusable* motion system beats scattered effects; asymmetric Swiss-grid project index with strong hover affordance; case-study layout is a fixed vertical narrative arc that matches the brief; illustration galleries win with masonry + in-place lightbox; lightweight intro + near-invisible nav (heavy loaders are out); frame-rate-independent motion with real fallbacks; the footer is the contact set-piece.

**Verified references.**
- Cyd Stumpel — Portfolio 2025 (Awwwards SOTD): `https://www.awwwards.com/sites/cyd-stumpel-portfolio-2025` — *Correction: actual jury ~7.29, SOTD 7.22, dev 7.74; community 8.47 is correct (NOT "jury 8.1"). Palette is two-color (#8082F8/#FFF5EE), not purple-only.* Study: View Transitions + CSS scroll-driven animations carrying a premium feel with no GSAP/WebGL.
- Stefan Vitasović — Portfolio 2025 (Codrops): `https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/` — most transferable; Next.js/Vercel stack mirror, asymmetric Swiss grid, reusable text reveal, WebGL→HTML5-video mobile fallback.
- Arnaud Rocca — Portfolio (Codrops): `https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/` — best maintainable solo-dev motion-system reference; complete a11y story.
- Roman Jean-Elie — WebGL Portfolio (Codrops): `https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/` — "one continuous space" + ruthless removal of non-serving effects.
- Awwwards Evaluation System: `https://www.awwwards.com/about-evaluation/` — the authoritative rubric.
- Awwwards Portfolio winners gallery: `https://www.awwwards.com/websites/winner_category_portfolio/` — living index.

*Dropped/qualified:* the booooooom illustrator article is real but sponsored Format content (vendor showcase, biographical blurbs not design critique) — keep as a click-through source, not analysis.

### 2. Scroll-driven storytelling & motion design

**Summary.** A two-layer system: Lenis (de-facto smooth-scroll standard) driven by the GSAP ticker, plus GSAP ScrollTrigger for reveals/pins/scrubs. Premium feel comes from disciplined timing (lerp ~0.08–0.1, numeric scrub 0.5–1, ease-out entrances, short staggers). For a single-artist site: use motion to *reveal and frame* the artwork, never to hijack navigation. CSS scroll-driven animations now cover the cheap reveals; reserve GSAP for set-pieces.

**Strongest insights.** Lenis on the GSAP ticker (single rAF, `lagSmoothing(0)`) — the lerp value *is* the feel; numeric `scrub` (never boolean); pin the *wrapper* and animate children + `anticipatePin:1` + `ScrollTrigger.refresh()` after media load; ease-out + short staggers as the premium grammar; CSS `view()`/`scroll()` timelines for cheap reveals (offload from JS); `gsap.matchMedia()` for reduced-motion (auto-reverts) + disable Lenis outright; scoped horizontal scroll is a legitimate set-piece (not site-wide).

**Verified references.**
- Patrick Heng: `https://patrickheng.com/` — scoped horizontal scroll + microinteractions.
- Codrops Sticky Grid Scroll: `https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/` — near-exact pin+scrub process blueprint.
- GSAP ScrollTrigger docs: `https://gsap.com/docs/v3/Plugins/ScrollTrigger/`
- Lenis (darkroom.engineering): `https://github.com/darkroomengineering/lenis` — canonical defaults + GSAP-ticker snippet + `lenis/react`.
- Josh W. Comeau — Scroll-Driven Animations: `https://www.joshwcomeau.com/animation/scroll-driven-animations/`
- NN/g — Scrolljacking 101: `https://www.nngroup.com/articles/scrolljacking-101/`

*Dropped/qualified:* the Awwwards "horizontal scrolling portfolios collection" link resolves to a single Webflow inspiration page (Dept. of Culture & Tech), NOT a curated set — Justine Soulié / Eva Sánchez are not on it. The general pattern is real; don't cite the link as a named-site collection.

### 3. WebGL / 3D & shader experiences

**Summary.** For this site WebGL is a garnish, not a foundation. Self-host a single hero GLB per page via `model-viewer` (Draco + KTX2 compressed, poster-first, lazy, AR optional), keep `frameloop="demand"`, cap DPR ~1.75. One shader effect maximum, frozen under reduced-motion, with a poster keeping LCP. The canvas must never be the LCP element.

**Strongest insights.** `model-viewer` + Draco/KTX2; render-on-demand + DPR cap; one shader effect as garnish; viewers beat turntable videos for wireframes; self-host hero, Sketchfab for back-catalogue.

**Verified references.**
- `model-viewer` (the lightweight single-GLB embed) and curtains.js (gallery shader).
- Codrops 2025 transitions / GLSL garnish (SDF circles, progress uniform).
- Aimee "Papercraft World" — 2D illustration on 3D, scroll-driven (tone reference).
- *Bruno Simon — cited explicitly as a cost cautionary tale, not a target.*

*Pitfalls:* no free-roam world; canvas not LCP (poster first); no continuous loop; always compress (Draco, KTX2).

### 4. Page transitions & SPA-feel navigation

**Summary.** Decisively shifted to the native View Transitions API — same-document/SPA transitions hit Baseline 2025-10-14 (Chrome/Edge, Safari 18, Firefox 144), and Next 16 exposes React's `<ViewTransition>` behind `experimental.viewTransition`. The highest-value move — morphing a grid thumbnail into the project hero — is now declarative. Progressive-enhancement by design (no support = instant swap), so it's low-risk for a solo dev. Reserve barba.js+GSAP only for choreography native VT can't express (it does NOT belong in a Next App Router app).

**Strongest insights.** Shared-element morph (thumbnail→hero) via matching `<ViewTransition name>` + `share="morph"` blur keyframe ~360–420ms; native VT is Baseline + degrades gracefully; encode direction with `transitionTypes` (`nav-forward`/`nav-back`) and anchor the sticky header (`viewTransitionName:'site-header'` + `animation:none`); Suspense-reveal for async data + keyed crossfade for same-route swaps (always `default="none"` to prevent cross-talk); reserve barba/GSAP for persistent-canvas/multi-container cases only; Cyd Stumpel proves native VT alone reaches award level; keep intros short, content-gated, skippable.

**Verified references.**
- Next.js — Designing view transitions (+ live Frames/photo-gallery demo): `https://nextjs.org/docs/app/guides/view-transitions`
- web.dev — Same-document view transitions are Baseline: `https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available`
- Chrome for Developers — Cross-document view transitions: `https://developer.chrome.com/docs/web-platform/view-transitions/cross-document`
- Codrops — Page transitions in Astro with Barba.js & GSAP: `https://tympanus.net/codrops/2026/04/08/creating-custom-page-transitions-in-astro-with-barba-js-and-gsap/` (the "reserve tool," explicitly not the default)
- next-view-transitions (shuding): `https://github.com/shuding/next-view-transitions` (superseded; included to justify NOT adding it)
- Awwwards — Page Transitions collection: `https://www.awwwards.com/awwwards/collections/transitions/`

### 5. Editorial typography & layout systems

**Summary.** One expressive display family carried to oversized extremes against generous whitespace, on a fluid `clamp()` modular scale. Layout has moved to asymmetric/"broken" CSS Grid (unequal `fr`, named areas, deliberate overlap + z-index). Motion is type-led (line-by-line SplitText reveals with line-masking). Hard constraints: WCAG 1.4.4 (keep max ≤~2.5× min, keep a rem term in the clamp) and reduced-motion. Type is the brand carrier *precisely because the artwork must lead* — near-silent chrome, one oversized type set-piece per page.

**Strongest insights.** Fluid modular scale via Utopia (two ratios, paste clamp values); keep clamp WCAG-safe (≤2.5×, rem term); line-by-line reveals with `type:'chars, lines'` + `mask:'lines'`, stagger objects, `power4.out`, await `document.fonts.ready` before splitting; Inter's variable axes as a quiet brand signature (animate `wght` on inline links only — avoids button reflow; use a GRAD axis if available); asymmetric/broken grids with margin-hung process captions; whitespace + vertical rhythm = "editorial premium"; type near-silent, loud exactly once per view.

**Verified references.**
- Utopia: `https://utopia.fyi/type/calculator/` — generate `--text-*` and `--space-*` tokens for Phase 1.
- Smashing — Accessibility Concerns With Fluid Type: `https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/`
- Codrops — 7 Must-Know GSAP Tips: `https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/`
- CSS In Real Life — Variable Font Animation: `https://css-irl.info/variable-font-animation-with-css-and-splitting-js/`

*Dropped/qualified:* the Awwwards "editorial-layout" and "animated-typography" inspiration pages resolve but are dynamic tag feeds anchored on a single element, not fixed curated collections — treat as live feeds. Kim Kneipp (`https://kimkneipp.com`) is a real, on-aesthetic editorial-restraint mood reference but is an **interior-design studio**, not a solo illustrator — use for tone only, not as a same-domain analog; the cited `/about` path 404s (use the homepage). For the actual broken-grid code recipes, prefer a code-focused source (CSS-Tricks/Smashing on CSS Grid) over the HTML Burger listicle, which is inspiration-only.

### 6. Dark, moody, art-forward aesthetics & texture

**Summary.** Premium dark is a deliberate stack: a warm near-black base (not `#000`), a *luminance-elevation* hierarchy (surfaces get lighter to come forward — shadows don't read on dark), a low-opacity film-grain overlay, very subtle ambient gradients (5–15%), and accent used almost exclusively as glow/hover. The two highest-leverage, lowest-risk additions: a global `feTurbulence` grain overlay (~3–5%, warm-tinted) and proper *dithering* on any dark gradient (naive noise doesn't fix banding on `#222`).

**Strongest insights.** Luminance-elevation (4-step warm surface ramp from `#222222`), not shadows; global SVG `feTurbulence` grain (~3.5–5%, `numOctaves` 3, `mix-blend-mode:overlay/soft-light`, static, off under reduced-motion); dither every dark gradient (Interleaved Gradient Noise in a shader, OR let the grain overlay double as dither); ONE ambient background at 5–15% (cheapest that works — static CSS radial or the Codrops Bayer-dither canvas); accent as glow/hover only (layered low-opacity shadows; Chrome renders blur ~half); cursor-following spotlight on cards ("dark room, lit artwork"); frame the artwork (L1 surface + hairline border + inner vignette) so dark-edged work doesn't dissolve; prefer cheap fixed-layer techniques and gate everything on reduced-motion.

**Verified references.**
- Isabel Moranta — Portfolio (Awwwards SOTD): `https://www.awwwards.com/sites/isabel-moranta-portfolio` — canonical "museum in the dark."
- Dylan Brouwer: `https://dylanbrouwer.design`
- Cosmos Studio: `https://www.cosmos.studio/`
- Codrops — Bayer Dithering WebGL Background: `https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/`
- Frost.kiwi — GLSL noise & radial gradient (banding): `https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/`
- CSS-Tricks — Grainy Gradients: `https://css-tricks.com/grainy-gradients/`
- Frontend Masters — Grainy Gradients: `https://frontendmasters.com/blog/grainy-gradients/`
- Uxcel — Mastering Elevation for Dark UI: `https://uxcel.com/blog/mastering-elevation-for-dark-ui-a-comprehensive-guide-342`
- Muz.li — Dark Mode Design Systems: `https://muz.li/blog/dark-mode-design-systems-a-complete-guide-to-patterns-tokens-and-hierarchy/`
- UI-Layouts / Cruip — Spotlight Cards: `https://www.ui-layouts.com/components/spotlight-cards`

### 7. Image & gallery presentation for visual artists

**Summary.** The gallery layer *is* the product. Split by medium: justified/aspect-ratio-preserving grid for 2D illustration (mixed ratios, never crop), deliberate editorial layout for 3D hero renders. Native CSS masonry is still flag-only in mid-2026 — keep masonry JS-driven with a CSS-Grid+`aspect-ratio` fallback. Recurring premium signals (all solo-dev achievable): rigorous aspect-ratio reservation (kill CLS), blur-up/LQIP, restrained hover, a zoom+pan+keyboard lightbox, and *process-image storytelling*.

**Strongest insights.** Justified (Flickr) layout for illustration, not generic masonry; native CSS masonry NOT production-ready — JS + aspect-ratio fallback, store intrinsic ratios in `lib/projects.ts` for correct SSR; reserve aspect ratio + `next/image` `sizes`/blur (sizes is the most overlooked knob); process images as first-class captioned renders (wireframe/clay/UV/timelapse, before/after slider); lightbox = zoom+pan+keyboard+swipe baseline, extended into a vertical process scroller; quiet hover (caption fade + faint glare/glow); reduced-motion + lazy-loading are gates, not polish.

**Verified references.**
- Flickr Justified Layout: `https://flickr.github.io/justified-layout/` + `https://github.com/flickr/justified-layout`
- Codrops — Infinite Canvas (cautionary upper bound): `https://tympanus.net/codrops/2026/01/07/infinite-canvas-building-a-seamless-pan-anywhere-image-space/`
- Sirma Karaguiozova — amris-art.com: `https://amris-art.com` — restrained illustrator gallery.
- WebKit — Help us invent Masonry (Grid L3): `https://webkit.org/blog/15269/help-us-invent-masonry-layouts-for-css-grid-level-3/`
- DebugBear — Next.js Image Optimization: `https://www.debugbear.com/blog/nextjs-image-optimization`
- ArtStation — Technical Art channel: `https://www.artstation.com/channels/technical_art` — recruiter-expected 3D process vocabulary.
- WebAIM — Carousels/accessibility: `https://webaim.org/techniques/carousels/`

*Dropped/qualified:* "Neli Boyavana" is misspelled — it's **Neli Boyanova** (`nells.work`), an Art Director & Illustrator for B2B tech; the "separate sketchbook/process teaser" claim was not evident — weaker analog than stated. Keep `nells.work` only as a grid→detail reference.

### 8. Navigation & Information Architecture

**Summary.** Invisible, content-first IA: a persistent minimal top nav (Work / About / Contact), artwork leading, chrome out of the way. The editorial-premium camp (not the WebGL-world camp) is correct for this brand. Central decision: handle the two bodies of work as two *shapes* of content, not two filters over one grid. With a small set, build almost no taxonomy.

**Strongest insights.** Quiet persistent top nav beats hamburger-only on desktop; match the content threshold (≤6 projects = no categories; 7–12 = ≤3 filters; 13+ = consolidate; tabs only for 5–7 equal peers) — don't over-engineer; treat 3D and 2D as different shapes (routed detail pages vs in-place lightbox); invest in "you are here" wayfinding on deep project pages (breadcrumbs + active state + readable URLs + unique titles — the most-neglected layer); avoid scene-as-navigation; grid index as the front-loaded, hover-rich workhorse; reserve in-place filter buttons (keep URL-shareable) for when the gallery grows; keep Contact ever-present and put process/software *inside* the project page.

**Verified references.**
- NN/g — Navigation: You Are Here: `https://www.nngroup.com/articles/navigation-you-are-here/`
- The Crit — Portfolio Navigation Best Practices: `https://thecrit.co/resources/portfolio-navigation-best-practices`
- Fast.io — 3D Artist Portfolio Guide: `https://fast.io/resources/3d-artist-portfolio/`
- LogRocket — Tabbed navigation UX: `https://blog.logrocket.com/ux-design/tabs-ux-best-practices/`
- Awwwards Portfolio gallery: `https://www.awwwards.com/websites/portfolio/`
- Bruno Simon / Samsy / JReyes (instructive anti-pattern): `https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025`

### 9. Micro-interactions, cursors, hover & magnetic elements

**Summary.** Converges on a small disciplined set: a single lerped `mix-blend-mode:difference` follower cursor; magnetic CTAs (~15%, `elastic.out`); context-aware cursors that pick up a label ("View"/"Drag"/"Zoom"); restrained card hover (glare sweep) + animated underlines. All framed feedback-first, 200–400ms, ease-out, collapsing under reduced-motion and on coarse pointers. The risk is *volume*, not technique.

**Strongest insights.** Single `difference`-blend follower cursor (lerp ~0.08; do NOT tint orange — let difference do the work; orange only on click/active); magnetic CTAs via center-offset vector + `gsap.quickTo` `elastic.out(1,0.3)` at ~15%, primary CTAs only; context label cursor ("View"/"Zoom"/"View process"/"Drag") driven by `data-cursor-label` — the most valuable cursor behavior for this image-grid portfolio; the brief's literal "glow on hover" = pure-CSS animated underline + accent `text-shadow` at ~40%; glare/sheen sweep on thumbnails (compositor-only) beats heavy tilt; click sparks for the ONE conversion action only; standardize timings on `--duration-normal`/`--ease-smooth`; optional sticky/elastic cursor as the single flourish.

**Verified references.**
- Awwwards — Hovers, Cursors and Cute Interactions: `https://www.awwwards.com/awwwards/collections/hovers-cursors-and-cute-interactions/`
- Olivier Larose — Magnetic Button: `https://blog.olivierlarose.com/tutorials/magnetic-button`
- Olivier Larose — Blend-mode Cursor: `https://blog.olivierlarose.com/tutorials/blend-mode-cursor`
- Olivier Larose — Sticky/Elastic Cursor: `https://blog.olivierlarose.com/tutorials/sticky-cursor`
- React Bits — Glare Hover: `https://reactbits.dev/animations/glare-hover`
- Squarestylist — Custom Drag Cursor: `https://www.squarestylist.com/squarespace/custom-drag-cursor-carousels`
- Modern CSS Link Effects: `https://veebilehed24.ee/en/blog/css-effects/modern-css-link-effects/`
- Montana Banana — Microinteractions & Accessibility: `https://montanab.com/2025/03/how-microinteractions-affect-accessibility-and-usability/`

### 10. Performance, Core Web Vitals & accessibility for motion-heavy sites

**Summary.** Award-tier motion sites hit good CWV by being disciplined about *what* animates and *when* heavy code loads. Animate transform/opacity only; keep LCP fast (priority hero + fonts as critical path); defer the motion stack; break long JS tasks for INP; build reduced-motion in as the safe default with keyboard-operable controls + visible `:focus-visible`. Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.

**Strongest insights.** Transform/opacity only, read-then-write (no layout thrash), sparing `will-change` cleared after; LCP pipeline (one `priority` hero, correct `sizes`, AVIF/WebP, everything else lazy); showreel video poster-first + `muted/loop/playsinline` + IntersectionObserver-gated + WebM/MP4 + facade for embeds; `next/font` local with size-adjust kills font CLS (critical for animated SplitText headings); protect INP (single Lenis↔GSAP ticker, code-split GSAP/Three.js, `startTransition`, yield long tasks); reduced-motion as safe default via `no-preference` gate — *reduce, don't strip*; custom cursor + lightbox must stay keyboard-operable (real `<dialog>`/`role=dialog`, focus trap + restore, Esc); measure lab *and* field (INP only surfaces in field — add Vercel Speed Insights).

**Verified references.**
- web.dev — Accessibility: Animation and motion: `https://web.dev/learn/accessibility/motion`
- web.dev — Video performance: `https://web.dev/learn/performance/video-performance`
- web.dev — Optimize long tasks: `https://web.dev/articles/optimize-long-tasks` — *Correction: drop `isInputPending` (the current article explicitly no longer recommends it); use `scheduler.yield()`.*
- web.dev — Optimize LCP: `https://web.dev/articles/optimize-lcp`
- Codrops — Horizontal Parallax Gallery (DOM→WebGL): `https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/`
- perfplanet — React 19.2 INP: `https://calendar.perfplanet.com/2025/react-19-2-further-advances-inp-optimization/` — *Correction: covers DevTools Performance Tracks, cascading re-renders, Activity component; it does NOT cover `startTransition`/`useDeferredValue` (those are general React APIs, valid but not from this source).*
- DebugBear — Next.js Image Optimization: `https://www.debugbear.com/blog/nextjs-image-optimization`
- Sara Soueidan — Accessible focus indicators: `https://www.sarasoueidan.com/blog/focus-indicators/`
- DevDreaming — Next.js + Lenis + GSAP: `https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap` — *Note: core single-rAF + reduced-motion gating accurate; for `lagSmoothing(0)` and `ScrollTrigger.update()` on Lenis scroll, the canonical source is the Lenis README.*

### 11. 3D-artist / archviz / illustrator portfolio references (individual sites)

**Summary.** The strongest individual portfolios fit the brief almost exactly and split by discipline. 3D = scroll-driven case study (hero render → statement → multi-render gallery → annotated process → software strip). 2D = true masonry + click-to-enlarge lightbox, plus ONE immersive layer. The highest-awarded solo sites win on *one* restrained set-piece over a quiet type-forward dark base. You do not need a WebGL world; you need a typed schema → reusable layout, one showcase gallery per render set, annotated process, a software strip, and disciplined scroll-reveal with a real reduced-motion fallback.

**Strongest insights.** Each 3D project as a vertical case-study narrative; curved/orbital or depth-stacked render gallery (not flat grid); ONE restrained set-piece over a quiet base; illustration = true masonry + lightbox + one immersive differentiator; software/credits as a slim late-page strip (static-grid fallback under reduced-motion, monochrome logos so orange stays for hover); performance + reduced-motion non-negotiable even for media-heavy sites (images are the payload); quiet categorized nav + "fewer, better" curation (~8–12 strong projects).

**Verified references.**
- Joseph Santamaria (Codrops case study): `https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/` — most applicable solo-3D breakdown (GSAP Observer, snap-scroll, KTX2/Draco, instancing).
- Codrops Depth Gallery: `https://tympanus.net/Tutorials/DepthGallery/` — reusable Z-stacked render showcase.
- Ana Gil — `https://anagillustrations.com` — horizontal "sketchbook" (one immersive layer).
- Deshi Deng — `https://deshi-deng.com` — per-category grids + parallax + page transitions (no WebGL).
- Awwwards Portfolio winners: `https://www.awwwards.com/websites/winner_category_portfolio/`
- MaverickFrame — Best 3D Visualization Portfolios: `https://maverickframe.com/blog/best-3d-visualization-portfolios/`

*Dropped:* **Max Shkret — shkret.com is a DEAD/HIJACKED link** (now 301s to a gambling site). The work is real and notable, but do NOT use that URL; reference the Awwwards/FWA case-study pages instead, or drop entirely.

### 12. Hero / landing patterns & first impressions

**Summary.** World-class creative heroes converge on a calm, type-forward above-the-fold where ONE motion idea leads and the artwork talks. Dominant moves: line-by-line SplitText headline reveals; clip-path + scale "wipe" on hero media; muted/looping/poster-backed showreel with a play affordance; a short branded intro (~1–1.5s, used to preload the LCP asset); a quiet scroll cue. Dated: literal 3D-particle/galaxy heroes, gratuitous cursors/smooth-scroll, long preloaders, pastel "AI-safe" palettes, rigid centered 12-col blocks.

**Strongest insights.** SplitText line reveal (clip-path mask + stagger, height-locked before split to kill CLS; skip scramble for this soft brand); clip-path + scale media wipe; showreel muted+loop+poster+LCP-safe (poster IS the LCP lever — Chrome can't preload the video file); short branded functional intro (skippable, absent for repeat visitors/reduced-motion); oversized type-as-layout + asymmetric/broken grid + dark-first + quiet scroll cue; execution discipline (Lenis↔ticker sync, DOM-direct writes not React state at 120Hz, one motion idea); reduced-motion as a parallel design language.

**Verified references.**
- Thibault Guignand (+ Codrops breakdown): `https://www.thibaultguignand.com/` — the single most useful hero recipe.
- Codrops — Shader Uniforms to Clip-Path Wipes: `https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/`
- Bastian Gasser: `https://www.gasser-bastian.at/` — "one motion idea, type as hero."
- Carl Gordon Media: `https://www.carlgordonmedia.com/` — *Correction: the site is actually DARK and restrained with selective accents (a closer palette match than originally flagged) — borrow structure AND note the on-brand palette.*
- Cyd Stumpel: `https://www.awwwards.com/sites/cyd-stumpel-portfolio-2025`
- DebugBear — Optimize LCP for video: `https://www.debugbear.com/blog/optimize-video-lcp`
- web.dev — Optimize LCP: `https://web.dev/articles/optimize-lcp`

## Reference sites — curated shortlist

| Site / Source | URL | Why it matters | Techniques to study |
| --- | --- | --- | --- |
| Cyd Stumpel — Portfolio 2025 | `https://www.awwwards.com/sites/cyd-stumpel-portfolio-2025` | Closest analog; proves native VT + CSS scroll-driven wins SOTD with minimal JS | View Transitions API, scroll-driven CSS, named transition variants, restraint |
| Stefan Vitasović — Portfolio 2025 | `https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/` | Most transferable (Next.js/Vercel); editorial-motion tier | Asymmetric Swiss grid, reusable text reveal, shared layout + 1 scroll controller, WebGL→video mobile fallback |
| Arnaud Rocca — Portfolio | `https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/` | Best maintainable solo-dev motion system + complete a11y story | Composable GSAP effect library, reduced-motion cross-fade, keyboard parity, deltaTime-normalized motion, per-project accent |
| Joseph Santamaria | `https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/` | Most applicable solo-3D engineering breakdown | GSAP Observer, snap-scroll beats, KTX2/Draco, instancing/culling, SplitText |
| Thibault Guignand | `https://www.thibaultguignand.com/` | Self-documented award hero recipe | SplitText + clip-path wipe (height-locked, zero CLS), staged preloader + VT handoff, Lenis↔ticker, DOM-direct writes |
| Isabel Moranta | `https://www.awwwards.com/sites/isabel-moranta-portfolio` | Canonical "museum in the dark" | Near-black base, high-contrast image framing, desaturated chrome |
| Roman Jean-Elie | `https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/` | "One continuous space" + ruthless restraint | Hash-routed single-load, crossfade sections, cut non-serving effects |
| Patrick Heng | `https://patrickheng.com/` | Tasteful scoped horizontal scroll | Pinned translateX track, GSAP, hover microinteractions |
| Deshi Deng | `https://deshi-deng.com` | Illustrator: premium without WebGL | Per-category grids, parallax, smooth page transitions, sticky header |
| Ana Gil | `https://anagillustrations.com` | One immersive layer over a simple gallery | Horizontal "sketchbook," full-bleed, single signature interaction |
| Sirma Karaguiozova | `https://amris-art.com` | Restrained illustrator gallery baseline | Minimalist grid, quiet hover, lightbox slideshow |
| Carl Gordon Media | `https://www.carlgordonmedia.com/` | Dark, restrained scroll-driven narrative (on-brand palette) | Scroll reveals, stacking project cards, animated stats/bio |
| Codrops — Sticky Grid Scroll | `https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/` | Pin+scrub process blueprint | Sticky wrapper, scroll-mapped timeline, Lenis sync, stagger 0.06 |
| Codrops — Depth Gallery | `https://tympanus.net/Tutorials/DepthGallery/` | Reusable multi-render showcase | Z-stacked images, velocity smoothing, palette-blend shader |
| Codrops — Bayer Dithering BG | `https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/` | Best depth-for-cost ambient (solves banding) | Single-pass shader, ordered dithering, <0.2ms |
| Flickr Justified Layout | `https://flickr.github.io/justified-layout/` | Crop-free illustration grid engine | Row-based justification, target-row-height lever, aspect preservation |
| Next.js — View Transitions guide | `https://nextjs.org/docs/app/guides/view-transitions` | Copy-pasteable patterns for the exact stack | `<ViewTransition>` morph, `transitionTypes`, Suspense reveal, header anchoring, `default="none"` |
| GSAP ScrollTrigger docs | `https://gsap.com/docs/v3/Plugins/ScrollTrigger/` | Premium-vs-janky settings | Numeric scrub, pin wrapper + `anticipatePin`, `refresh()`, transform-only |
| Lenis (GitHub) | `https://github.com/darkroomengineering/lenis` | Smooth-scroll standard | lerp tuning, GSAP-ticker sync, `lagSmoothing(0)`, `lenis/react` |
| Utopia | `https://utopia.fyi/type/calculator/` | Generate Phase 1 type + space tokens | Two-ratio fluid modular scale, paired clamp type/space |
| Olivier Larose — tutorials | `https://blog.olivierlarose.com/tutorials/blend-mode-cursor` | Copy-ready cursor + magnetic code | difference-blend lerp cursor, magnetic `quickTo` elastic.out, sticky cursor |
| DebugBear — Next.js Image | `https://www.debugbear.com/blog/nextjs-image-optimization` | Gallery LCP/CLS playbook | `priority` on LCP only, layout-matched `sizes`, blur placeholder, AVIF/WebP |
| web.dev — Accessibility: Motion | `https://web.dev/learn/accessibility/motion` | The reduced-motion bar | `prefers-reduced-motion` default, WCAG 2.2.2/2.3.3, reduce-don't-remove |
| NN/g — You Are Here | `https://www.nngroup.com/articles/navigation-you-are-here/` | Wayfinding for deep project pages | Breadcrumbs, active state, readable URLs, unique titles |
| ArtStation — Technical Art | `https://www.artstation.com/channels/technical_art` | Recruiter-expected 3D process vocabulary | Wireframe/clay/UV sheets, turntables, pipeline notes |

## Redesign principles

Durable principles, tailored to a moody dark single-artist portfolio:

1. **The artwork is the only loud thing.** Keep all chrome near-silent off-white Inter on `#222222`; the only saturated, high-contrast pixels on screen belong to Simona's work. Frame dark-edged art (L1 surface + hairline border + inner vignette) so nothing dissolves into the void.

2. **One set-piece per view; one motion vocabulary site-wide.** Define 3–4 reveal primitives once in `MotionProvider` and reuse them. Pick one signature text reveal and at most one ambient background. Stop. Five effects read as a tech demo.

3. **Continuity over hard cuts.** Native View Transitions for route changes; morph thumbnail→hero; anchor the sticky header. The site should feel like one continuous gallery space.

4. **Type carries the brand by being near-silent, then loud exactly once per page.** Oversized fluid display type as layout (asymmetric grid), quiet body, accent-orange/weight "glow" hover as the literal brand cue.

5. **Depth from luminance and texture, never from a second colour.** Warm 4-step surface ramp, low-opacity grain overlay, dithered ambient gradient dialled <15%. Accent orange confined to glow, hover, focus ring, active nav dot, scroll-progress bar.

6. **Process is a first-class deliverable.** Captioned wireframes/clay/UV/timelapses and before/after sliders earn the hire. `process[].caption` is effectively required; never ship unannotated contact sheets.

7. **Two bodies of work are two shapes, not two filters.** 3D → routed case-study detail pages; 2D → in-place lightbox gallery. Make each card's click affordance legible (detail page vs lightbox). Curate to ~8–12 strong projects.

8. **Reduced-motion is a designed state, not an absence.** Skip Lenis, hide cursor, reveal content at rest, pause looping ambience — and the page still looks intentional and complete. Build it into the motion system from day one.

9. **Performance is a craft signal.** Transform/opacity only; one `priority` LCP hero with correct `sizes`; poster-first showreel; size-adjusted fonts; code-split GSAP/Three.js; single Lenis↔GSAP ticker. A stuttering portfolio undermines the craft it shows.

10. **Cursor and hover are wayfinding, not decoration.** A context-label cursor ("View"/"Zoom"/"View process"/"Drag") tells the visitor what each image does before the click. Magnetism on primary CTAs only.

11. **The footer is the conversion moment.** Display-scale contact end-card with glow-on-hover. Contact reachable from header, footer, and after every 3D project.

12. **WebGL only in service of the art.** No scene-as-navigation, no free-roam world. Contained uses (ScrollModel rotator, optional depth gallery) with a non-WebGL fallback.

## Recommendations mapped to the site

### Global / system
- **Reinforces roadmap:** Build `MotionProvider` (Lenis + GSAP, single rAF ticker, `lagSmoothing(0)`, `ScrollTrigger.update` on Lenis scroll). Wrap all ScrollTrigger setup in one `gsap.matchMedia()` with a `reduceMotion` condition; under reduced-motion don't init Lenis at all.
- **Reinforces roadmap:** Phase 1 fluid type + space tokens via Utopia (base ~17→20px, ratios ~1.2→1.30) into the `@theme` block; cap reading-level type at ≤2.5× min with a rem term in every clamp; one genuinely oversized `--text-display` reserved for one element per page.
- **Reinforces roadmap:** `GrainOverlay` (fixed, `pointer-events:none`, `feTurbulence` `fractalNoise` baseFreq 0.65 `numOctaves` 3, `mix-blend-mode:soft-light`, opacity ~0.035–0.05, warm-tinted, static, off under reduced-motion).
- **Adds:** Warm surface ramp `--surface-0..3` derived from `#222222` (e.g. `#222222` / `#2A2826` / `#322F2C` / `#3A3633`); assign cards→L1, hover→L2, lightbox→L3. Dither any ambient gradient (let grain double as dither, or use the Bayer shader).
- **Adds:** Field measurement — Vercel Speed Insights for real INP/LCP/CLS. Ensure cursor, scroll-progress bar, grain are `position:fixed/absolute` (zero CLS).
- **Revises roadmap:** Re-evaluate Lenis `lerp 0.05` vs `0.08` by feel — for a moody weighty site, `0.08` reads more premium; the spec's `0.05` is on the snappy end (defensible for type-forward, worth A/B-feeling).

### Hero / home
- **Reinforces roadmap:** SplitText hero — split `type:'chars, lines'`, `mask:'lines'`, `yPercent 100→0`, stagger ~0.14, `power4.out`; await `document.fonts.ready` and height-lock before split (zero CLS). Skip the scramble pass (too dev-y for this soft brand).
- **Reinforces roadmap:** Showreel via `data-reveal-clip` (clip-path inset + scale 1.15→1, scrub-tied). Poster is the real LCP element — `priority`/`<link rel=preload as=image fetchpriority=high>`; `muted/loop/playsinline`, IntersectionObserver-gated, WebM+MP4; under reduced-motion show poster + play button.
- **Reinforces roadmap:** Featured grid with `data-stagger-in` (0.08–0.1), SpotlightCard hover (warm-white/faint-accent radial via CSS vars), `data-parallax` on alternating cards.
- **Adds:** Compose hero as oversized type-as-layout on `.grid-hero` (off-center name/role + asymmetric showreel region), not a centered headline over full-bleed video. Quiet scroll cue (thin drawn line/"scroll" word with glow-hover).
- **Revises roadmap:** Background ambience — pick exactly ONE behind the hero only (recommend static warm CSS radial, or the Bayer-dither canvas which also solves banding), dialled <15%. Avoid stacking Grainient + grain + spotlight + parallax on the same screen.

### 3D project case-study pages
- **Reinforces roadmap:** `<ProjectLayout>` from `lib/projects.ts`, regions mapping 1:1: hero render → BigStatement title (SplitText) → description (`data-reveal` lines) → renders gallery → process section → software strip. Bring flower-alley/greek-house/paxvr to this spine.
- **Reinforces roadmap:** Multi-render gallery — orbital/CircularGallery for product-viz (lamps), depth/Dome-style for environments; ship the non-WebGL React Bits carousel as baseline, the Three.js depth gallery as progressive enhancement gated behind reduced-motion. Keep ScrollModel + BeforeAndAfter.
- **Reinforces roadmap:** Process section as ONE pinned scrubbed sequence (outer ~300–400vh, sticky inner stage, `anticipatePin:1`, `ScrollTrigger.refresh()` on image load), captions beside each image. Cap at one pin per page. ScrollStack as the lower-motion alternative.
- **Reinforces roadmap:** Software as a slim late-page LogoLoop from `lib/software.ts`, monochrome/foreground-tinted, with a static-grid fallback under reduced-motion.
- **Adds:** Breadcrumb (Work › [category] › [project]) + unique per-route `metadata`. Add a contact CTA at the end of every project page. SectionNavDots right-rail for intra-page wayfinding.

### 2D illustration gallery
- **Reinforces roadmap:** Replace FlexGrid with true masonry (React Bits Masonry, JS-driven; CSS-Grid + `aspect-ratio` row-span fallback). Store intrinsic ratios in `lib/projects.ts` for correct SSR. Consider the Flickr justified algorithm for crop-free full-width rows (target row height ~280–360px desktop).
- **Reinforces roadmap (direct brief match):** Extend `LightImage` — when an illustration has `process[]`, the lightbox becomes a vertical scroller (hero first, process stacked below); without it, falls back to zoom+pan. Make it a real focus-trapped `role=dialog`: focus close on open, restore focus on close, Esc, arrow-key nav.
- **Reinforces roadmap:** GlareHover sweep on thumbnails (low-opacity, ~600–700ms, single sweep, compositor-only). Never center-crop a thumbnail.
- **Adds:** Defer any filter chrome until the set exceeds ~12–24; if added, in-place URL-shareable filter buttons, not separate routes. Optional Ana-Gil-style horizontal "sketchbook" as a non-default alternate view.

### Navigation / header
- **Reinforces roadmap:** Keep the sticky `Header` (`useHideOnScroll`) as primary desktop nav with standard labels; reserve a full-screen overlay for mobile only. NavDropdown acceptable as mega-menu-lite if top-level items are also directly clickable.
- **Reinforces roadmap:** Phase 3 mix-blend-mode header (render NavDropdown panels in a sibling element outside the blend). Magnetic primary CTAs (`data-magnetic-wrap`, ~15%, `elastic.out(1,0.3)`) — CTAs only, not nav links or thumbnails.
- **Adds:** Active-page indicator + "glow on hover" (`.link-glow` utility: accent color shift + gradient underline wipe + `text-shadow 0 0 8px` accent/40%). Anchor the header out of View Transitions (`viewTransitionName:'site-header'` + `animation:none`).
- **Adds:** Context-label cursor driven by `data-cursor-label` ("View" on 3D cards, "Zoom"/"View process" on illustrations, "Drag" on carousels).

### About / experience / contact
- **Reinforces roadmap:** Combine experience + contact (brief allows it). ProfileCard for bio with `data-reveal` line splits. Timeline gets `data-stagger-in`; optional CountUp for stats. Full-width slower LogoLoop for the software section.
- **Reinforces roadmap:** Phase 7 contact — adapt a Zod schema + form state machine into `app/api/contact/route.ts`, mailto fallback, ClickSpark on submit only.
- **Adds:** Upgrade `Footer` into a display-scale contact end-card (oversized "Let's work together" wordmark + accent glow-hover + social/CV links) — the conversion set-piece.

### Micro-interactions
- **Reinforces roadmap:** Single `difference`-blend follower cursor (lerp ~0.08; NOT tinted orange; orange only on click/active); hidden on coarse pointers and reduced-motion. ClickSpark on contact submit / one hero CTA only.
- **Reinforces roadmap:** Phase 8 — standardize all hover/microtransition timings on `--duration-normal`/`--ease-smooth`; replace ad-hoc `transition-all duration-300`. ShinyText on eyebrow only; GradualBlur on long body copy below the fold.
- **Adds:** Optional sticky/elastic cursor flourish (small amplitude) — ship the plain dot first, evaluate after.

### Performance & accessibility
- **Reinforces roadmap:** Phase 9 — every `<Image>` explicit `sizes` matched to grid columns; `priority` on exactly one LCP element per route; AVIF/WebP confirmed in `next.config`; tiny `blurDataURL`. Confirm `next/font` `adjustFallback`/`fallback` metric (critical so SplitText headings don't reflow mid-reveal).
- **Adds:** Code-split GSAP / Three.js / ScrollModel / DomeGallery (dynamic import) so they don't block hydration on pages that don't use them. Wrap gallery filtering in `startTransition`; yield long tasks with `scheduler.yield()` (NOT `isInputPending`).
- **Adds:** `:focus-visible` rings (accent orange as high-contrast focus colour, paired with a non-color cue); never `cursor:none` globally without a robust replacement; run Lighthouse per route (home, a 3D page, the gallery — each has a different LCP element). Run `npm run test:media` after any `public/` moves.

## Pitfalls & anti-patterns to avoid

- **Chasing the Bruno-Simon 3D-world / scene-as-navigation tier** — months of work, fragile on mobile, breaks reduced-motion, buries the artwork. Off-brand for restraint-first.
- **Effect-stacking** — custom cursor + magnetic everything + sparks everywhere + glare on every card + multiple ambient backgrounds reads as a tech demo. One signature each, then stop.
- **Heavy blocking preloader** — long intros hurt LCP/usability. Keep any intro sub-1.5s, functional (preload the LCP asset), skippable, absent under reduced-motion; never gate the LCP hero behind animation.
- **Placeholder copy / empty captions** — Content is an explicit Awwwards criterion; lorem ipsum is a disqualifier. Process captions and descriptions must be real and feel designed.
- **Boolean `scrub:true`** — exposes every wheel notch as a stutter. Always numeric (0.5–1). Heavy eases on scrubbed motion fight the smoothing — use `ease:'none'`.
- **Animating the pinned element / layout properties** — breaks ScrollTrigger measurements and forces reflow. Pin a wrapper, animate children, transform/opacity only. Forgetting `ScrollTrigger.refresh()` after image load fires reveals at the wrong position.
- **Lenis on its own rAF while GSAP runs a separate ticker** — the #1 cause of scroll-jank / stale reads → poor INP.
- **Native CSS masonry as the only path** — flag-only in mid-2026, unsettled syntax. Keep masonry JS-driven with a CSS-Grid + `aspect-ratio` fallback.
- **Center-cropping illustration thumbnails** — destroys composition. Preserve native aspect ratios; never crop.
- **Omitting `next/image` `sizes`** — 33vw thumbnails download full-res files, tanking Performance.
- **Un-dithered dark gradients** — any CSS radial on `#222` bands visibly. Always overlay grain/dither or render in a shader.
- **Grain opacity too high / animated site-wide** — keep ~3–6% behind content, static globally; reserve any motion for the hero, off under reduced-motion.
- **Neon glow / accent as large fills** — the brief rejects the gamer look. Layered low-opacity shadows only; confine `#eb742a` to glow/hover/focus/active-dot/progress-bar.
- **Hard page cuts between index and detail** — the clearest "template" tell. Use View Transitions / shared-element morph. (And don't add barba.js / next-view-transitions to a Next 16 App Router app — they fight the router or are superseded.)
- **Per-illustration routes** — adds friction and breaks the immersive browse. Masonry index + in-place lightbox.
- **Custom cursor that suppresses native focus / coarse-pointer handling** — leaves keyboard/touch users with no affordance. Gate behind `@media (pointer:fine)` + reduced-motion; keep native cursor as fallback. Don't tint the difference-blend cursor (it disappears over similar tones).
- **Lightbox/carousel without keyboard + focus trap + focus restore + visible focus ring** — violates WCAG 2.1.1/2.1.2/2.4.7.
- **Shipping GSAP/Three.js in the initial bundle** — blocks hydration on every page. Code-split.
- **Unannotated process contact sheets** — the hiring signal is the what/why/how beside each step.
- **Reduced-motion as a thin override** — must skip Lenis, hide cursor, pause looping ambience (LogoLoop/aurora — also a WCAG 2.2.2 violation if auto-animating >5s without a pause control), reveal content at rest. Not a final-phase checkbox.
- **Measuring only in Lighthouse** — INP is interaction-driven and only surfaces in field data. Add Speed Insights / web-vitals.
- **Weak grey footer** — wastes the conversion moment. Make it a display-scale contact set-piece.