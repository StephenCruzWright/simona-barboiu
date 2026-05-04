"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThumbnailMarquee from "./ThumbnailMarquee";
import CategoryGallery from "./CategoryGallery";
import type { Project, ProjectImage } from "@/lib/projects";
import { getSoftware, type SoftwareKey } from "@/lib/software";

type Props = {
  /** Big section title (e.g. "Product Viz") — about the section, not the hero. */
  label: string;
  /** Short blurb describing the section. */
  description: string;
  /** Aggregated software keys across all projects in this category. */
  software: SoftwareKey[];
  /** The featured project whose heroImage is rendered as the static foreground asset. */
  hero: Project;
  /** Items shown in both the carousel and the view-all gallery. */
  thumbnails: ProjectImage[];
  /** Side the hero asset sits on. Alternate per section for rhythm. */
  heroAlign?: "left" | "right";
  /** Reverse the marquee direction. */
  reverse?: boolean;
  /** Show the "view all" toggle. Hidden for illustration per spec, also hidden when too few thumbnails to justify a gallery. */
  showViewAll?: boolean;
  /** First section on the page — gets `priority` on its hero image to optimise LCP. */
  isFirst?: boolean;
};

export default function CategoryShowcase({
  label,
  description,
  software,
  hero,
  thumbnails,
  heroAlign = "left",
  reverse = false,
  showViewAll = false,
  isFirst = false,
}: Props) {
  const [galleryOpen, setGalleryOpen] = useState(false);

  const heroSideClass =
    heroAlign === "left"
      ? "left-4 sm:left-10 lg:left-20"
      : "right-4 sm:right-10 lg:right-20";

  return (
    <section
      data-nav-section={label}
      className="relative px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
    >
      <div className="mx-auto max-w-screen-2xl">
        {/* Section header */}
        <div className="mb-8 grid gap-6 sm:mb-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="space-y-4">
            <h3
              data-reveal
              className="text-3xl font-semibold leading-[0.95] sm:text-4xl lg:text-5xl"
            >
              {label}
            </h3>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <p
                data-reveal
                className="max-w-md text-sm leading-6 text-white/65 sm:text-base"
              >
                {description}
              </p>
              {software.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {software.map((key) => {
                    const sw = getSoftware(key);
                    return (
                      <span
                        key={key}
                        title={sw.label}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-white/75"
                      >
                        {sw.logoSrc && (
                          <span className="relative inline-block h-3.5 w-3.5">
                            <Image
                              src={sw.logoSrc}
                              alt=""
                              fill
                              sizes="14px"
                              className="object-contain"
                            />
                          </span>
                        )}
                        {sw.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {showViewAll && (
            <button
              type="button"
              onClick={() => setGalleryOpen((v) => !v)}
              aria-expanded={galleryOpen}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 transition-colors duration-[var(--duration-normal)] ease-[var(--ease-smooth)] hover:border-(--accent) hover:text-(--accent) sm:self-end"
            >
              {galleryOpen ? "Show carousel" : "View all"}
              <span aria-hidden>{galleryOpen ? "↺" : "→"}</span>
            </button>
          )}
        </div>

        {/* Composition: hero overlaid on carousel/gallery.
            Wrapper height defines the hero's vertical envelope. The carousel
            (or gallery, when toggled) sits at the bottom; the hero spans the
            full height and visibly extends above it. */}
        <div className="relative h-[440px] sm:h-[520px] lg:h-[600px]">
          {/* Carousel / gallery — bottom-anchored, shorter than wrapper.
              Rounded clipped frame with a subtle inner gradient to provide
              contrast against the hero's drop-shadow. */}
          <div className="absolute inset-x-0 bottom-0 h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/[0.04] to-white/[0.01] sm:h-[320px] lg:h-[380px]">
            {galleryOpen ? (
              <CategoryGallery items={thumbnails} />
            ) : (
              <ThumbnailMarquee items={thumbnails} reverse={reverse} />
            )}
          </div>

          {/* Hero — full wrapper height, anchored to bottom, content extends up.
              Heavy drop-shadow + subtle ambient blur ground the hero against
              the carousel and create the "pops out" separation. */}
          <Link
            href={hero.href}
            aria-label={`Open ${hero.title}`}
            className={`group/hero absolute bottom-0 z-10 block h-full w-[240px] transition-transform duration-500 ease-[var(--ease-smooth)] hover:scale-[1.02] sm:w-[320px] lg:w-[420px] ${heroSideClass}`}
          >
            {/* Soft accent halo behind the hero — subtle contrast against the carousel below. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-4 bottom-0 h-[55%] rounded-full bg-(--accent)/15 blur-3xl opacity-60 transition-opacity duration-500 group-hover/hero:opacity-90"
            />
            <Image
              src={hero.heroImage.src}
              alt={hero.heroImage.alt}
              fill
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 420px"
              className="relative object-cover object-bottom filter-[drop-shadow(0_40px_60px_rgba(0,0,0,0.7))_drop-shadow(0_12px_22px_rgba(0,0,0,0.45))]"
              priority={isFirst}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}