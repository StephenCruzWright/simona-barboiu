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
  /**
   * Intrinsic pixel dimensions. Stored so layouts (next/image, masonry, the
   * render gallery) can reserve the correct box and avoid layout shift (CLS).
   */
  width?: number;
  height?: number;
  /** Media kind. Defaults to "image". Use "video" for .mp4/.webm sources. */
  type?: "image" | "video";
  /**
   * Process images for this artwork. When a gallery item has these, its
   * lightbox becomes a vertical process-scroller (hero first, process below) —
   * the direct match to the client brief for the illustration gallery.
   */
  process?: ProjectImage[];
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
    description:
      "Inspired by 1980s ornamental decoration, this lamp pack includes four floral-motif models. I modeled them in Blender, rendered in Blender and Twinmotion, textured by hand in Substance Painter, and integrated into Unreal Engine with Blueprints. Uses a consistent two-material workflow (opaque + transparent) across all assets.",
    renders: [
      { src: "/lamps/1.webp", alt: "Vintage flower lamp — hero render", width: 2100, height: 2874 },
      { src: "/lamps/2.webp", alt: "Vintage flower lamp — second model render", width: 2100, height: 2874 },
      { src: "/lamps/3.webp", alt: "Vintage flower lamp — third model render", width: 2085, height: 2751 },
      { src: "/lamps/4.webp", alt: "Vintage flower lamp — fourth model render", width: 2012, height: 2740 },
    ],
    process: [
      { src: "/lamps/wireframe.webp", alt: "Lamp wireframe", width: 1920, height: 1080, caption: "Wireframe pass — consistent topology across the four floral-motif models." },
      { src: "/lamps/Unreal.webp", alt: "Unreal Engine integration", width: 2065, height: 1406, caption: "The Unreal integration allows for an easy drag-and-drop Unreal package or Fab download. The Blueprint includes an on/off toggle for the light and an intensity adjustment." },
    ],
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
      {
        src: "/illustration/prpls.webp", alt: "Storm Eater", href: "/projects/illustration", width: 4961, height: 2695,
        process: [{ src: "/illustration/pprocess.webp", alt: "Storm Eater — process", width: 1080, height: 1181 }],
      },
      {
        src: "/illustration/flames.webp", alt: "Flames", href: "/projects/illustration", width: 3508, height: 2480,
        process: [{ src: "/illustration/fflamesprocess.webp", alt: "Flames — process", width: 1080, height: 1181 }],
      },
      {
        src: "/illustration/lakelady.webp", alt: "Lady of the Lake", href: "/projects/illustration", width: 1900, height: 3508,
        process: [{ src: "/illustration/process.webp", alt: "Lady of the Lake — process", width: 1819, height: 1066 }],
      },
      { src: "/illustration/2.webp", alt: "Untitled", href: "/projects/illustration", width: 3200, height: 1600 },
      { src: "/illustration/car.webp", alt: "Mirage", href: "/projects/illustration", width: 3000, height: 1242 },
      { src: "/illustration/simonabarboiu001.webp", alt: "Ink Sketch I", href: "/projects/illustration", width: 1500, height: 2070 },
      { src: "/illustration/simonabarboiu002.webp", alt: "Ink Sketch II", href: "/projects/illustration", width: 1500, height: 2070 },
      { src: "/illustration/simonabarboiu003.webp", alt: "Ink Sketch III", href: "/projects/illustration", width: 1500, height: 2070 },
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
    software: ["unreal", "substance", "maya", "zbrush", "houdini"],
    description:
      "I started this project as an opportunity to focus on creating high-poly plants, inspired by the pretty bougainvilleas in Greece. These plants were my main focus in this scene.",
    renders: [
      { src: "/greek/01.webp", alt: "Greek House — establishing render", width: 1920, height: 1080 },
      { src: "/greek/closeupmovie_AS.mp4", alt: "Greek House — close-up flythrough", type: "video" },
      { src: "/greek/05.webp", alt: "Greek House — courtyard render", width: 1920, height: 1080 },
      { src: "/greek/06.webp", alt: "Greek House — render", width: 1920, height: 1080 },
      { src: "/greek/overallmovie_AS.mp4", alt: "Greek House — overall flythrough", type: "video" },
      { src: "/greek/09.webp", alt: "Greek House — wide render", width: 1920, height: 951 },
      { src: "/greek/10.webp", alt: "Greek House — render", width: 1920, height: 835 },
      { src: "/greek/11.webp", alt: "Greek House — render", width: 1920, height: 733 },
    ],
    process: [
      { src: "/greek/02.webp", alt: "Bougainvillea plant breakdown", width: 1920, height: 1080, caption: "The bougainvillea plants were created using L-systems in Houdini — one system for the branches and one for each trunk. The flowers and leaves are modeled in Maya and hand-painted in Substance Painter. The other plants were created using the same workflow. In Unreal, they have a material with subsurface scattering." },
      { src: "/greek/03.webp", alt: "Plant asset detail", width: 1920, height: 1080, caption: "Plant asset detail." },
      { src: "/greek/04.webp", alt: "House and decoration breakdown", width: 1920, height: 1080, caption: "The house and door decoration are sculpted in ZBrush. All the other assets are modeled in Maya and mostly painted in Substance. I also created the water shader, falling-leaf particles, and did the lighting (using an HDRI and volumetric clouds) and post-processing directly in Unreal. For reference, I used photos I took myself. A few materials and assets — roof tiles, ground textures, sand, and some table objects — were sourced from Quixel to complement the scene." },
      { src: "/greek/07a.webp", alt: "Lighting iteration", width: 1920, height: 1080, caption: "Lighting and material iterations." },
      { src: "/greek/07b.webp", alt: "Lighting iteration", width: 1920, height: 1080, caption: "Lighting and material iterations." },
      { src: "/greek/07c.webp", alt: "Lighting iteration", width: 1811, height: 1019, caption: "Lighting and material iterations." },
      { src: "/greek/08.webp", alt: "Composition study", width: 1920, height: 1080, caption: "Composition study." },
      { src: "/greek/08b.webp", alt: "Composition study", width: 1338, height: 716, caption: "Composition study." },
      { src: "/greek/12.webp", alt: "Detail study", width: 1472, height: 1041, caption: "Detail study." },
    ],
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
    software: ["blender", "substance", "unreal", "photoshop"],
    description:
      "The assets from this project were modelled in Blender and textured using both Blender and Substance Painter. The scene was assembled and rendered in Unreal Engine.",
    renders: [
      { src: "/alley/01.webp", alt: "Flower Alley — hero render", width: 1677, height: 2160 },
      { src: "/alley/02.mp4", alt: "Flower Alley — flythrough", type: "video" },
      { src: "/alley/05.webp", alt: "Flower Alley — render", width: 1920, height: 1004 },
      { src: "/alley/06.webp", alt: "Flower Alley — render", width: 1920, height: 1257 },
      { src: "/alley/08.webp", alt: "Flower Alley — render", width: 1920, height: 1080 },
      { src: "/alley/09.mp4", alt: "Flower Alley — flythrough", type: "video" },
    ],
    process: [
      { src: "/alley/03.webp", alt: "Plant texture breakdown", width: 1920, height: 836, caption: "The plant textures are based on pictures of real plants, upscaled and refined in Photoshop, then arranged into a single texture. All the plants share one shader, which uses a base-color map, simple wind for movement, and SSS. The tree has a particle system for falling leaves." },
      { src: "/alley/04.webp", alt: "Plant shader detail", width: 1920, height: 836, caption: "Shared plant shader detail." },
      { src: "/alley/05b.webp", alt: "Modular architecture", width: 1920, height: 1080, caption: "A quick environment for a different perspective of the plants. I created modular assets for the architecture — various wall sizes, corners, and decorative trims. Decals from Quixel added subtle wear and tear; all other assets were made by me." },
      { src: "/alley/environment_flower_deco.webp", alt: "Flower decoration detail", width: 1920, height: 451, caption: "Botanical decoration detail." },
    ],
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
    description:
      "Inspired by 1980s ornamental decoration, this lamp pack includes four floral-motif models. I modeled them in Blender, rendered in Blender and Twinmotion, textured by hand in Substance Painter, and integrated into Unreal Engine with Blueprints. Uses a consistent two-material workflow (opaque + transparent) across all assets.",
    renders: [
      { src: "/lamps/1.webp", alt: "Lamp render", width: 2100, height: 2874 },
      { src: "/lamps/2.webp", alt: "Lamp render", width: 2100, height: 2874 },
      { src: "/lamps/3.webp", alt: "Lamp render", width: 2085, height: 2751 },
      { src: "/lamps/4.webp", alt: "Lamp render", width: 2012, height: 2740 },
    ],
    process: [
      { src: "/lamps/wireframe.webp", alt: "Lamp wireframe", width: 1920, height: 1080, caption: "Wireframe pass." },
      { src: "/lamps/Unreal.webp", alt: "Unreal Engine integration", width: 2065, height: 1406, caption: "The Unreal integration allows for an easy drag-and-drop Unreal package or Fab download. The Blueprint includes an on/off toggle for the light and an intensity adjustment." },
    ],
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