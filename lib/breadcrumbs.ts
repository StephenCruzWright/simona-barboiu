// lib/breadcrumbs.ts
export type Crumb = {
  href: string;
  label: string;
  active: boolean;
};

// Segment label overrides (for nicer casing / naming)
export const SEGMENT_LABELS: Record<string, string> = {
  "2d": "2D",
  "3d": "3D",
  games: "Games",
  illustration: "Illustration",
  viz: "viz",
  environments: "Environments",
  work: "Work",
  about: "About",
};

// Full path overrides (useful for special cases/projects)
export const PATH_LABELS: Record<string, string> = {
  "/3d/games/paxvr": "PaxVR",
  "/3d/viz/vintage-flower-lamps": "Vintage Flower Lamps",
};

export function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function titleCaseFromCamelCase(camel: string) {
  return camel
    .replace(/([A-Z])/g, " $1")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function toHashId(segment: string) {
  return segment
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}


export function buildCrumbs(pathname: string): Crumb[] {
  const clean = pathname.split("?")[0].split("#")[0];
  const parts = clean.split("/").filter(Boolean);

  const crumbs: Crumb[] = [
    // { href: "/", label: "Home", active: parts.length === 0 } //keep this to include home link
  ];

  let currentHref = "";
  for (let i = 0; i < parts.length; i++) {
    const segRaw = decodeURIComponent(parts[i] ?? "");
    currentHref += `/${segRaw}`;
    const isLast = i === parts.length - 1;

    const segKey = segRaw.toLowerCase();

    const caseChecker = segRaw.includes(".")
      ? titleCaseFromSlug(segRaw)
      : titleCaseFromCamelCase(segRaw);
    const label =
      PATH_LABELS[currentHref.toLowerCase()] ??
      SEGMENT_LABELS[segKey] ??
      caseChecker;

    crumbs.push({
      href: currentHref,
      label,
      active: isLast,
    });
  }

  if (crumbs.length >= 2) {
    const firstHref = crumbs[0]?.href ?? "/";   // first crumb route (e.g. "/3d")
    const second = crumbs[1];

    crumbs[1] = {
      ...second,
      href: `${firstHref}#${toHashId(second.label)}`,
    };
  }

  return crumbs;
}
