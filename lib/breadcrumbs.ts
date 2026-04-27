// lib/breadcrumbs.ts
export type Crumb = {
  href?: string;
  label: string;
  active: boolean;
};

// Segment label overrides
export const SEGMENT_LABELS: Record<string, string> = {
  "projects": "Projects",
  interactive: "Interactive",
  illustration: "Illustration",
  viz: "viz",
  environments: "Environments",
  work: "Work",
  about: "About",
};

// Full path overrides (for special cases/projects)
export const PATH_LABELS: Record<string, string> = {
  "/projects/interactive/paxvr": "Pax VR",
  "/projects/viz/vintage-flower-lamps": "Vintage Flower Lamps",
  "/projects/environments/greek-house": "Greek House",
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

// Routes that actually resolve to a page. Anything else that appears as an
// intermediate crumb (e.g. /projects, /projects/viz) is rendered as plain text.
const VALID_ROUTES = new Set<string>([
  "/",
  "/work",
  "/about",
  "/projects/illustration",
  "/projects/viz/vintage-flower-lamps",
  "/projects/viz/flower-alley",
  "/projects/environments/greek-house",
  "/projects/interactive/paxvr",
]);

export function buildCrumbs(pathname: string): Crumb[] {
  const clean = pathname.split("?")[0].split("#")[0];
  const parts = clean.split("/").filter(Boolean);

  const crumbs: Crumb[] = [];

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
      href: VALID_ROUTES.has(currentHref) ? currentHref : undefined,
      label,
      active: isLast,
    });
  }

  return crumbs;
}
