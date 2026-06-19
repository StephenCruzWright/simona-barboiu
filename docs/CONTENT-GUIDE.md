# Content Guide

How portfolio content is structured and where to edit it. This project has **no CMS** — content is typed TypeScript in `lib/`, consumed by the App Router pages and home-page components.

> This replaces the old Astro "content collections" guide. There are no `src/content/` collections, no MDX, and no frontmatter in this project.

## Where content lives

| File | Owns |
| --- | --- |
| [lib/projects.ts](../lib/projects.ts) | Every portfolio project/artwork — the single source of truth. |
| [lib/software.ts](../lib/software.ts) | The software/tools registry (label + logo) referenced by projects. |
| [lib/timeline.ts](../lib/timeline.ts) | CV / experience entries for `/work`. |
| [public/](../public/) | All media (images/video), grouped per project: `/lamps` (incl. a 30-frame `/array`), `/greek`, `/alley`, `/illustration`, `/misc`. |

## Project schema (`lib/projects.ts`)

```ts
type ProjectCategory = "product-viz" | "environments" | "illustration";

type ProjectImage = { src: string; alt: string; href?: string };

type ProjectHeroImage = ProjectImage & {
  // Tailwind aspect utility as a LITERAL string, e.g. "aspect-[16/9]".
  // Must be a literal so Tailwind's JIT scanner sees it — never build it
  // with a template literal.
  aspectClass: string;
};

type ProjectProcessStep = ProjectImage & { caption?: string };

type Project = {
  slug: string;            // unique id, e.g. "vintage-flower-lamps"
  href: string;            // route to the detail page
  title: string;
  summary: string;         // one line, used on cards
  category: ProjectCategory;
  heroImage: ProjectHeroImage;
  software: SoftwareKey[]; // keys into lib/software.ts
  gallery?: ProjectImage[];      // illustration only — standalone artworks
  description?: string;          // detail-page body
  renders?: ProjectImage[];      // detail-page render gallery
  process?: ProjectProcessStep[];// detail-page captioned process steps
};
```

### Field notes

- **`aspectClass`** must be a literal Tailwind class (`aspect-[2100/2874]`). The intrinsic ratio matters for zero-CLS layout — measure the real image and use its pixel ratio.
- **`software`** are keys, not labels — they index `SOFTWARE` in `lib/software.ts`. The home page aggregates them per category into the software-pill row.
- **`gallery`** is only used by the `illustration` project: each entry is a standalone artwork shown as a carousel thumbnail. Non-illustration categories leave it undefined and the carousel uses sibling project `heroImage`s.
- **`renders` / `process` / `description`** drive the project **detail** pages. As of this writing most projects only populate `heroImage` — filling these in (with real `process[].caption`s) is the main content task for the 3D case-study redesign.

### Helpers (already in the file — reuse them)

- `getProject(slug)` — look up one project.
- `getProjectsByCategory(category)` — all projects in a category.
- `getCategoryShowcase(category)` — `{ hero, thumbnails, software }` for the home-page `CategoryShowcase` (handles the illustration special-case and dedupes software keys).

## Software registry (`lib/software.ts`)

Each entry is `{ key, label, logoSrc }`. Add a tool here before referencing its `key` from a project. Use monochrome / foreground-tinted logos so the accent orange stays reserved for hover.

## Adding or editing content

1. **Add media** to the right `public/<project>/` folder. Prefer `.webp` (or `.avif`); use `.mp4`/`.webm` for video with a poster image.
2. **Add/extend the project** in `lib/projects.ts` (correct `aspectClass`, real `alt`, `software` keys, and — for 3D projects — `renders`/`process`/`description`).
3. **Register any new software** in `lib/software.ts`.
4. **Validate**: `npm run test:media` (checks referenced files exist), then `npx tsc --noEmit` and `npm run lint`.

## Copy policy

Keep existing real copy. Lorem ipsum is allowed **only** as a temporary scaffold for genuinely net-new sections, and must be replaced with real copy before launch — placeholder text and empty process captions read as unfinished (and are an awards/hiring red flag). See the brand + conventions in [CLAUDE.md](../CLAUDE.md).
