import Link from "next/link";
import HomeProjectThumbnail from "@/components/HomeProjectThumbnail";
import LightImage from "@/components/LightImage";
import ShinyText from "@/components/home/ShinyText";
import Marquee from "@/components/home/Marquee";
import ScrollIndicator from "@/components/home/ScrollIndicator";

const projects = [
  {
    href: "/projects/viz/vintage-flower-lamps",
    imageSrc: "/lamps/1.webp",
    imageAlt: "Vintage Flower Lamps product visualization",
    summary:
      "Product visualization with a refined studio look and Unreal-ready presentation.",
    spanClassName: "md:col-span-7",
    aspectClassName: "aspect-[2100/2874]",
    parallax: 14,
  },
  {
    href: "/projects/illustration",
    imageSrc: "/illustration/prpls.webp",
    imageAlt: "Illustration portfolio thumbnail",
    summary: "Color-driven illustration work with a softer, expressive finish.",
    spanClassName: "md:col-span-5",
    aspectClassName: "aspect-[4961/2695]",
    parallax: -10,
  },
  {
    href: "/projects/environments/greek-house",
    imageSrc: "/greek/01.webp",
    imageAlt: "Greek House environment thumbnail",
    summary: "A warm environment study focused on structure, light and mood.",
    spanClassName: "md:col-span-6",
    aspectClassName: "aspect-[16/9]",
    parallax: 16,
  },
  {
    href: "/projects/viz/flower-alley",
    imageSrc: "/alley/01.webp",
    imageAlt: "Flower Alley environment thumbnail",
    summary: "Stylized scenery with layered botanical detail and atmosphere.",
    spanClassName: "md:col-span-6",
    aspectClassName: "aspect-[1677/2160]",
    parallax: -12,
  },
  {
    href: "/projects/interactive/paxvr",
    imageSrc: "/lamps/Unreal.webp",
    imageAlt: "Pax VR interactive project thumbnail",
    summary:
      "Interactive product work and Unreal integration for the lamp pack.",
    spanClassName: "md:col-span-12",
    aspectClassName: "aspect-[2065/1406]",
    parallax: 8,
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
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Ambient glow backdrop — single source of warmth, very subtle */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
        >
          <div className="absolute top-[-20%] left-[-10%] h-[70vh] w-[70vh] rounded-full bg-[var(--accent)]/15 blur-[120px]" />
          <div className="absolute top-[10%] right-[-15%] h-[55vh] w-[55vh] rounded-full bg-orange-700/10 blur-[120px]" />
        </div>

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

      {/* SECTION HEADER ───────────────────────────────────────────────── */}
      <section
        id="projects"
        className="px-4 pt-24 pb-10 sm:px-6 lg:px-8 lg:pt-32"
      >
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid items-end gap-6 sm:grid-cols-[55%_1fr] sm:gap-12">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.45em] text-white/55">
                Featured work
              </p>
              <h2
                data-reveal-split
                className="text-3xl font-semibold sm:text-4xl lg:text-5xl"
              >
                A selection spanning style, subject, and software.
              </h2>
            </div>
            <p
              data-reveal
              className="text-sm leading-7 text-white/60 sm:text-base"
            >
              Each project below is a short story — a few hero renders, a note
              on the idea, and the process behind it. Click anywhere on a card
              to step inside.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID ────────────────────────────────────────────────── */}
      <section className="px-4 pb-32 sm:px-6 lg:px-8">
        <div
          data-stagger-in
          className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-5 md:grid-cols-12"
        >
          {projects.map((project, index) => (
            <div
              key={project.href}
              data-parallax={project.parallax}
              className={project.spanClassName}
            >
              <HomeProjectThumbnail
                href={project.href}
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                summary={project.summary}
                spanClassName=""
                aspectClassName={project.aspectClassName}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8 lg:py-40">
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