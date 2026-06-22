import Link from "next/link";
import LightImage from "@/components/LightImage";
import { listSoftware } from "@/lib/software";
import type { Project, ProjectImage, ProjectProcessStep } from "@/lib/projects";

/**
 * Reusable 3D case-study layout, driven entirely by the typed project schema
 * (lib/projects.ts). Renders the brief's spine:
 *   hero render → big-statement title → description → renders gallery →
 *   captioned process → software strip → contact CTA.
 *
 * Server component. It only emits markup + the MotionProvider `data-*` hooks
 * (data-reveal / data-reveal-split / data-reveal-clip / data-stagger-in) and
 * `data-nav-section` for the right-rail dots — no per-page animation code.
 * Sections degrade gracefully: anything the project doesn't populate is
 * skipped. An optional `interactive` slot carries project-specific set-pieces
 * (ScrollModel, BeforeAndAfter, product link).
 */

const CATEGORY_LABEL: Record<Project["category"], string> = {
  "product-viz": "Product Visualization",
  environments: "Environment",
  illustration: "Illustration",
};

/** Parse a `aspect-[W/H]` literal into intrinsic dimensions for next/image. */
function aspectToSize(aspectClass: string): { width: number; height: number } {
  const m = aspectClass.match(/aspect-\[(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)\]/);
  if (!m) return { width: 1600, height: 1000 };
  return { width: Math.round(Number(m[1])), height: Math.round(Number(m[2])) };
}

function MediaCard({
  image,
  className,
}: {
  image: ProjectImage;
  className?: string;
}) {
  return (
    <figure className={`art-frame ${className ?? ""}`}>
      <LightImage
        src={image.src}
        alt={image.alt}
        type={image.type ?? "image"}
        width={image.width}
        height={image.height}
        draggable={false}
      />
    </figure>
  );
}

export default function ProjectLayout({
  project,
  interactive,
}: {
  project: Project;
  interactive?: React.ReactNode;
}) {
  const hero = aspectToSize(project.heroImage.aspectClass);
  const software = listSoftware(project.software);
  const renders = project.renders ?? [];
  const process = project.process ?? [];

  return (
    <article className="flex flex-col gap-(--space-section-y) min-w-0 pb-(--space-section-y)">
      {/* ── Overview: hero render → title → description ─────────────── */}
      <section
        data-nav-section="Overview"
        className="flex flex-col gap-8"
      >
        <div data-reveal-clip className="art-frame mx-auto w-full max-w-6xl">
          <LightImage
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            type={project.heroImage.type ?? "image"}
            width={hero.width}
            height={hero.height}
            priority
            draggable={false}
          />
        </div>

        <header className="mx-auto w-full max-w-6xl">
          <p className="text-small uppercase tracking-[0.18em] text-(--footer-foreground)">
            {CATEGORY_LABEL[project.category]}
          </p>
          <h1
            data-reveal-split
            className="text-h1 font-bold leading-[0.95] mt-2"
          >
            {project.title}
          </h1>
          {project.description && (
            <p
              data-reveal
              className="text-body max-w-2xl mt-6 text-[color-mix(in_srgb,var(--foreground)_82%,transparent)]"
            >
              {project.description}
            </p>
          )}
        </header>
      </section>

      {/* ── Project-specific interactive set-piece (optional) ───────── */}
      {interactive && (
        <section className="mx-auto w-full max-w-6xl">{interactive}</section>
      )}

      {/* ── Renders gallery ─────────────────────────────────────────── */}
      {renders.length > 0 && (
        <section
          data-nav-section="Renders"
          className="mx-auto w-full max-w-6xl flex flex-col gap-8"
        >
          <h2 className="text-h3 font-semibold">Renders</h2>
          <div
            data-stagger-in
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            {renders.map((image, i) => (
              <MediaCard
                key={`${image.src}-${i}`}
                image={image}
                className={`h-full ${image.type === "video" ? "md:col-span-2" : ""}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Captioned process ───────────────────────────────────────── */}
      {process.length > 0 && (
        <section
          data-nav-section="Process"
          className="mx-auto w-full max-w-6xl flex flex-col gap-(--space-gutter)"
        >
          <h2 className="text-h3 font-semibold">Process</h2>
          <div className="flex flex-col gap-16">
            {process.map((step: ProjectProcessStep, i) => (
              <div
                key={`${step.src}-${i}`}
                data-reveal
                className="grid-editorial items-center"
              >
                <MediaCard
                  image={step}
                  className={i % 2 === 1 ? "md:order-2" : ""}
                />
                {step.caption && (
                  <p className="text-body text-[color-mix(in_srgb,var(--foreground)_80%,transparent)] max-w-prose">
                    {step.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Software strip ──────────────────────────────────────────── */}
      {software.length > 0 && (
        <section className="mx-auto w-full max-w-6xl flex flex-col gap-5">
          <h2 className="text-small uppercase tracking-[0.18em] text-(--footer-foreground)">
            Software
          </h2>
          <ul className="flex flex-wrap gap-3" aria-label="Software used">
            {software.map((s) => (
              <li
                key={s.key}
                className="rounded-full border border-hairline bg-surface-1 px-4 py-2 text-small"
              >
                {s.label}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Contact CTA (every project ends on the conversion moment) ─ */}
      <section className="mx-auto w-full max-w-6xl flex flex-col items-start gap-4">
        <p className="text-h3 font-semibold">Interested in working together?</p>
        <span data-magnetic-wrap className="inline-block">
          <Link href="/about" className="btn inline-block">
            Get in touch ↪
          </Link>
        </span>
      </section>
    </article>
  );
}
