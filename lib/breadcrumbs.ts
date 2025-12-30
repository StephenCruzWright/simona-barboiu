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
  "viz": "viz",
  "work": "Work",
  "about": "About",
};

// Full path overrides (useful for special cases/projects)
export const PATH_LABELS: Record<string, string> = {
  // "/3d/viz/vintage-flower-lamps": "Vintage Flower Lamps",
};

export function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function titleCaseFromCamelCase(camel: string) {
  // "simonaBarboiu" -> "Simona Barboiu"
  const result = camel.replace(/([A-Z])/g, " $1");
  return result
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function buildCrumbs(pathname: string): Crumb[] {
  const clean = pathname.split("?")[0].split("#")[0];
  const parts = clean.split("/").filter(Boolean);

  const crumbs: Crumb[] = [
    // { href: "/", label: "Home", active: parts.length === 0 }
];

  let currentHref = "";
  for (let i = 0; i < parts.length; i++) {
    const segRaw = decodeURIComponent(parts[i] ?? "");
    currentHref += `/${segRaw}`;
    const isLast = i === parts.length - 1;

    const segKey = segRaw.toLowerCase();
    const label =
      PATH_LABELS[currentHref.toLowerCase()] ??
      SEGMENT_LABELS[segKey] ??
      titleCaseFromSlug(segRaw) ??
      titleCaseFromCamelCase(segRaw);

    crumbs.push({
      href: currentHref,
      label,
      active: isLast,
    });
  }

  return crumbs;
}
