import type { SoftwareKey } from "./software";

/**
 * Project content schema — single source of truth for portfolio entries.
 * The home page groups projects by category and renders one CategoryShowcase
 * per category (hero asset overlaid on a thumbnail carousel).
 */

export type ProjectCategory =
  | "product-viz"
  | "environments"
  | "illustration";

export type ProjectImage = {
  src: string;
  alt: string;
  /** Optional href — when set, the carousel/gallery thumbnail becomes a link. */
  href?: string;
};

export type ProjectHeroImage = ProjectImage & {
  /**
   * Tailwind aspect-ratio utility, e.g. `aspect-[16/9]`. Stored as a literal
   * string here so Tailwind's JIT scanner can see it at build time — do NOT
   * construct dynamically with template literals.
   */
  aspectClass: string;
};

export type ProjectProcessStep = ProjectImage & {
  caption?: string;
};

export type Project = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  heroImage: ProjectHeroImage;
  /**
   * Software used on this project. Aggregated across the category to power
   * the per-section software-pill row on the home page.
   */
  software: SoftwareKey[];
  /**
   * For categories where each "work" is a standalone artwork rather than a
   * full project page (illustration), `gallery` lists the individual works
   * that should appear as thumbnails in the carousel. Other categories
   * leave this undefined; their carousel uses sibling project heroImages
   * only.
   */
  gallery?: ProjectImage[];
  description?: string;
  renders?: ProjectImage[];
  process?: ProjectProcessStep[];
};

export const PROJECTS: Project[] = [
  {
    slug: "vintage-flower-lamps",
    href: "/projects/viz/vintage-flower-lamps",
    title: "Vintage Flower Lamps",
    summary:
      "Product visualization with a refined studio look and Unreal-ready presentation.",
    category: "product-viz",
    heroImage: {
      src: "/lamps/1.webp",
      alt: "Vintage Flower Lamps product visualization",
      aspectClass: "aspect-[2100/2874]",
    },
    software: ["blender", "substance", "unreal", "photoshop"],
  },
  {
    slug: "illustration",
    href: "/projects/illustration",
    title: "Illustration",
    summary:
      "Color-driven illustration work with a softer, expressive finish.",
    category: "illustration",
    heroImage: {
      src: "/illustration/prpls.webp",
      alt: "Illustration portfolio thumbnail",
      aspectClass: "aspect-[4961/2695]",
    },
    software: ["procreate", "photoshop"],
    gallery: [
      { src: "/illustration/simonabarboiu001.webp", alt: "Illustration", href: "/projects/illustration" },
      { src: "/illustration/simonabarboiu002.webp", alt: "Illustration", href: "/projects/illustration" },
      { src: "/illustration/simonabarboiu003.webp", alt: "Illustration", href: "/projects/illustration" },
      { src: "/illustration/lakelady.webp", alt: "Lake Lady",  href: "/projects/illustration" },
      { src: "/illustration/flames.webp",   alt: "Flames",      href: "/projects/illustration" },
      { src: "/illustration/car.webp",      alt: "Car",         href: "/projects/illustration" },
    ],
  },
  {
    slug: "greek-house",
    href: "/projects/environments/greek-house",
    title: "Greek House",
    summary: "A warm environment study focused on structure, light and mood.",
    category: "environments",
    heroImage: {
      src: "/greek/01.webp",
      alt: "Greek House environment thumbnail",
      aspectClass: "aspect-[16/9]",
    },
    software: ["blender", "substance", "photoshop"],
  },
  {
    slug: "flower-alley",
    href: "/projects/viz/flower-alley",
    title: "Flower Alley",
    summary:
      "Stylized scenery with layered botanical detail and atmosphere.",
    category: "product-viz",
    heroImage: {
      src: "/alley/01.webp",
      alt: "Flower Alley environment thumbnail",
      aspectClass: "aspect-[1677/2160]",
    },
    software: ["blender", "substance", "photoshop"],
  },
  {
    slug: "paxvr",
    href: "/projects/interactive/paxvr",
    title: "Pax VR",
    summary:
      "Interactive product work and Unreal integration for the lamp pack.",
    category: "product-viz",
    heroImage: {
      src: "/lamps/Unreal.webp",
      alt: "Pax VR interactive project thumbnail",
      aspectClass: "aspect-[2065/1406]",
    },
    software: ["blender", "unreal", "substance"],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return PROJECTS.filter((p) => p.category === category);
}

export type CategoryShowcase = {
  hero: Project;
  thumbnails: ProjectImage[];
  software: SoftwareKey[];
};

/**
 * For a given category, return the hero project + carousel thumbnails +
 * aggregated software list.
 *
 * Carousel rules:
 * - Default: thumbnails are project heroImages of every project in the
 *   category (the hero project's heroImage included so the carousel always
 *   has something to scroll, even with one project).
 * - Illustration is special: each gallery item in the illustration project
 *   is a standalone artwork, so we expand the gallery list as carousel
 *   thumbnails instead of repeating the single project heroImage.
 */
export function getCategoryShowcase(
  category: ProjectCategory
): CategoryShowcase | null {
  const projects = getProjectsByCategory(category);
  if (projects.length === 0) return null;
  const hero = projects[0];

  const thumbnails: ProjectImage[] =
    category === "illustration"
      ? projects.flatMap((p) => p.gallery ?? [])
      : projects.map((p) => ({
          src: p.heroImage.src,
          alt: p.heroImage.alt,
          href: p.href,
        }));

  // Dedupe + preserve insertion order for software keys.
  const seen = new Set<SoftwareKey>();
  const software: SoftwareKey[] = [];
  for (const p of projects) {
    for (const s of p.software) {
      if (!seen.has(s)) {
        seen.add(s);
        software.push(s);
      }
    }
  }

  return { hero, thumbnails, software };
}