import Link from "next/link";
import LightImage from "@/components/LightImage";
import HeaderGradient from "@/components/HeaderGradient";
import ShinyText from "@/components/home/ShinyText";
import Marquee from "@/components/home/Marquee";
import ScrollIndicator from "@/components/home/ScrollIndicator";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import { getCategoryShowcase, type ProjectCategory } from "@/lib/projects";

/**
 * Home page renders one CategoryShowcase per category. Each showcase pulls
 * its hero project + carousel thumbnails from `lib/projects.ts`. Section
 * label, description, hero alignment, marquee direction, and view-all
 * visibility are configured here. Illustration intentionally omits the
 * view-all button (its carousel already enumerates standalone works).
 */
const CATEGORY_SECTIONS: {
  category: ProjectCategory;
  label: string;
  description: string;
  heroAlign: "left" | "right";
  reverse: boolean;
  showViewAll: boolean;
}[] = [
  {
    category: "product-viz",
    label: "Product Viz",
    description: "Studio renders and real-time integration for products that earn their keep on shelf and on screen.",
    heroAlign: "left",
    reverse: false,
    showViewAll: true,
  },
  {
    category: "environments",
    label: "Environments",
    description: "Stylized environment work focused on mood, structure and light.",
    heroAlign: "right",
    reverse: true,
    showViewAll: true,
  },
  {
    category: "illustration",
    label: "Illustration",
    description: "Color-driven illustration with a soft, expressive finish.",
    heroAlign: "left",
    reverse: false,
    showViewAll: false,
  },
];

const keywords = [
  "3D Environments",
  "Digital Fashion",
  "Illustration",
  "Stylized",
  "Product Viz",
  "Real-Time",
  "Concept Art",
];

export default function Home() {
  return (
    <main className="relative">
      {/* HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        data-nav-section="Intro"
        className="relative isolate overflow-hidden px-4 sm:px-6 lg:px-8"
      >
        {/* HeaderGradient — interactive WebGL gradient as the hero backdrop. */}
        <HeaderGradient />

        <div className="relative mx-auto grid max-w-screen-2xl items-end gap-12 pt-16 pb-24 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-24 lg:pb-32">
          <div className="space-y-7">
            <p className="text-xs uppercase tracking-[0.45em]">
              <ShinyText>Simona Barboiu — Portfolio</ShinyText>
            </p>
            <h1
              data-reveal-split
              className="max-w-xl text-5xl font-semibold leading-[0.94] sm:text-6xl lg:text-7xl"
            >
              3D artist sculpting stylized worlds and digital fashion.
            </h1>
            <p
              data-reveal
              className="max-w-xl text-base leading-7 text-white/72 sm:text-lg"
            >
              Hi, I&apos;m Simona — a 2D and 3D artist based in Portugal. Game
              Art trained, image-led, with a soft spot for stylized
              environments, product visualization and illustration. Have a
              wander, then drop me a line.
            </p>
            <div data-reveal className="flex flex-wrap gap-4 pt-2">
              <span data-magnetic-wrap className="inline-block">
                <Link
                  href="/#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-(--accent) px-6 py-3 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
                >
                  Jump to projects
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </span>
              <span data-magnetic-wrap className="inline-block">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/90 transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
                >
                  About &amp; contact
                </Link>
              </span>
            </div>

            <div
              data-reveal
              className="flex items-center gap-6 pt-6 text-[10px] uppercase tracking-[0.4em] text-white/45"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-(--accent) animate-pulse" />
                Available for collaborations
              </span>
              <span className="hidden sm:inline">Portugal · Worldwide</span>
            </div>
          </div>

          <div
            data-reveal-clip
            className="relative aspect-16/10 overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
          >
            <div className="pointer-events-none absolute inset-0 z-3 bg-linear-to-tr from-black/40 via-transparent to-black/30" />
            <div className="pointer-events-none absolute inset-0 z-3 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            <LightImage
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.06]"
              src="/greek/overallmovie_AS.mp4"
              alt="Simona Barboiu showreel thumbnail"
              type="video"
              fill
            />
          </div>
        </div>
      </section>

      {/* MARQUEE ──────────────────────────────────────────────────────── */}
      <Marquee items={keywords} speed={55} />

      {/* CATEGORY SHOWCASES ───────────────────────────────────────────── */}
      <div id="projects" className="pt-24 pb-24 lg:pt-32">
        {CATEGORY_SECTIONS.map(
          (
            { category, label, description, heroAlign, reverse, showViewAll },
            index
          ) => {
            const showcase = getCategoryShowcase(category);
            if (!showcase) return null;
            return (
              <CategoryShowcase
                key={category}
                label={label}
                description={description}
                software={showcase.software}
                hero={showcase.hero}
                thumbnails={showcase.thumbnails}
                heroAlign={heroAlign}
                reverse={reverse}
                showViewAll={showViewAll && showcase.thumbnails.length > 2}
                isFirst={index === 0}
              />
            );
          }
        )}
      </div>

      {/* CTA ──────────────────────────────────────────────────────────── */}
      <section
        id="contact-cta"
        data-nav-section="Contact"
        className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8 lg:py-40"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
        >
          <div className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--accent)/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-white/55">
            <ShinyText speed="5s">Let&apos;s create</ShinyText>
          </p>
          <h2
            data-reveal-split
            className="text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Have a project in mind? Let&apos;s make something memorable.
          </h2>
          <p data-reveal className="mx-auto max-w-xl text-white/65">
            Open to commissions, collaborations and full project work — from
            concept and asset creation to product visualization and final
            delivery.
          </p>
          <div data-reveal className="flex justify-center pt-4">
            <span data-magnetic-wrap className="inline-block">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-full bg-(--accent) px-8 py-4 text-base font-medium text-black transition-transform duration-300 hover:scale-[1.04]"
              >
                Get in touch
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </span>
          </div>
        </div>
      </section>

      <ScrollIndicator />
    </main>
  );
}