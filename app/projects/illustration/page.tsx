import type { Metadata } from "next";
import IllustrationGallery from "@/components/IllustrationGallery";
import { getProject } from "@/lib/projects";

const project = getProject("illustration")!;

export const metadata: Metadata = {
  title: "Illustration — Simona Barboiu",
  description: project.summary,
};

export default function IllustrationsPage() {
  return (
    <main className="min-h-screen flex flex-col gap-10">
      <header data-nav-section="Illustration" className="flex flex-col gap-3">
        <p className="text-small uppercase tracking-[0.18em] text-(--footer-foreground)">
          2D
        </p>
        <h1 data-reveal-split className="text-h1 font-bold leading-[0.95]">
          Illustration
        </h1>
        <p
          data-reveal
          className="text-body max-w-2xl text-[color-mix(in_srgb,var(--foreground)_82%,transparent)]"
        >
          {project.summary} Click any piece to enlarge it — works with process
          imagery open into a scrollable behind-the-scenes view.
        </p>
      </header>

      <IllustrationGallery items={project.gallery ?? []} />
    </main>
  );
}
