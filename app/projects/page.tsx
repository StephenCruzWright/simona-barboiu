import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/components/home/SpotlightCard";
import { PROJECTS, type ProjectCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Simona Barboiu",
  description:
    "Selected work — 3D product visualization, stylized environments, and 2D illustration.",
};

const CATEGORY_ORDER: { key: ProjectCategory; label: string }[] = [
  { key: "product-viz", label: "Product Visualization" },
  { key: "environments", label: "Environments" },
  { key: "illustration", label: "Illustration" },
];

export default function ProjectsIndexPage() {
  return (
    <main className="min-h-screen flex flex-col gap-(--space-section-y) pb-(--space-section-y)">
      <header data-nav-section="Projects" className="flex flex-col gap-3">
        <p className="text-small uppercase tracking-[0.18em] text-(--footer-foreground)">
          Selected work
        </p>
        <h1 data-reveal-split className="text-h1 font-bold leading-[0.95]">
          Projects
        </h1>
      </header>

      {CATEGORY_ORDER.map(({ key, label }) => {
        const items = PROJECTS.filter((p) => p.category === key);
        if (items.length === 0) return null;
        return (
          <section key={key} data-nav-section={label} className="flex flex-col gap-6">
            <h2 className="text-h3 font-semibold">{label}</h2>
            <div
              data-stagger-in
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  data-cursor-label="View"
                  className="group block"
                >
                  <SpotlightCard className="art-frame h-72 overflow-hidden">
                    <Image
                      src={p.heroImage.src}
                      alt={p.heroImage.alt}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      draggable={false}
                    />
                    <div className="absolute inset-x-0 bottom-0 z-3 bg-linear-to-t from-black/75 to-transparent p-4">
                      <h3 className="font-medium">{p.title}</h3>
                      <p className="text-small opacity-80">{p.summary}</p>
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
