import Link from "next/link";
import HomeProjectThumbnail from "@/components/HomeProjectThumbnail";
import LightImage from "@/components/LightImage";

const projects = [
  {
    href: "/projects/viz/vintage-flower-lamps",
    imageSrc: "/lamps/1.webp",
    imageAlt: "Vintage Flower Lamps product visualization",
    summary:
      "Product visualization with a refined studio look and Unreal-ready presentation.",
    spanClassName: "md:col-span-7",
    aspectClassName: "aspect-[16/10]",
  },
  {
    href: "/projects/illustration",
    imageSrc: "/illustration/prpls.webp",
    imageAlt: "Illustration portfolio thumbnail",
    summary: "Color-driven illustration work with a softer, expressive finish.",
    spanClassName: "md:col-span-5",
    aspectClassName: "aspect-[4/5]",
  },
  {
    href: "/projects/environments/greek-house",
    imageSrc: "/greek/01.webp",
    imageAlt: "Greek House environment thumbnail",
    summary: "A warm environment study focused on structure, light and mood.",
    spanClassName: "md:col-span-6",
    aspectClassName: "aspect-[5/6]",
  },
  {
    href: "/projects/viz/flower-alley",
    imageSrc: "/alley/01.webp",
    imageAlt: "Flower Alley environment thumbnail",
    summary: "Stylized scenery with layered botanical detail and atmosphere.",
    spanClassName: "md:col-span-6",
    aspectClassName: "aspect-[16/10]",
  },
  {
    href: "/projects/interactive/paxvr",
    imageSrc: "/lamps/Unreal.webp",
    imageAlt: "Pax VR interactive project thumbnail",
    summary:
      "Interactive product work and Unreal integration for the lamp pack.",
    spanClassName: "md:col-span-12",
    aspectClassName: "aspect-[21/9]",
  },
];

export default function Home() {
  return (
    <main className="relative mx-auto overflow-hidden px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <section className="grid items-end gap-8 pb-16 lg:grid-cols-[1fr_1.05fr] lg:pb-20">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.45em] text-white/55">
            Simona Barboiu portfolio
          </p>
          <h1 className="max-w-xl text-5xl font-semibold leading-[0.92] sm:text-6xl lg:text-7xl">
            3D artist specializing in stylized environments and digital fashion
          </h1>
          <p className="max-w-xl text-base leading-7 text-white/72 sm:text-lg">
            Hi, I&apos;m Simona Barboiu, a 2D and 3D artist specializing in
            stylized environments, product visualization and illustration. Based
            in Portugal, with a background in Game Art and a passion for
            creating engaging visuals across various media. Please enjoy
            exploring my portfolio and feel free to reach out for collaborations
            or inquiries.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.02]"
            >
              Jump to projects
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/90 transition-colors duration-300 hover:border-white/35 hover:bg-white/5"
            >
              About &amp; contact
            </Link>
          </div>
        </div>

        <div className="relative aspect-16/10 overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0 bg-linear-to-tr from-black/30 via-transparent to-black/40 " />
          <LightImage
            className="absolute inset-0 h-full w-full object-cover hover:scale-[1.09] transition-transform duration-500"
            src="/greek/overallmovie_AS.mp4"
            alt="Simona Barboiu showreel thumbnail"
            type="video"
            fill
          />
        </div>
      </section>

      <section id="projects" className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-white/55">
              Featured projects
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              A selection of projects showcasing a range of styles and subjects
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {projects.map((project, index) => (
            <HomeProjectThumbnail
              key={project.href}
              href={project.href}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              summary={project.summary}
              spanClassName={project.spanClassName}
              aspectClassName={project.aspectClassName}
              delay={index * 110}
              priority={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
