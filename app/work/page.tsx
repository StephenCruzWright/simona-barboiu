import type { Metadata } from "next";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Experience — Simona Barboiu",
  description:
    "Professional experience across 3D design, technical art, and rigging — real-time projects, product visualization, and interactive environments.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen flex flex-col gap-10">
      <header
        data-nav-section="Experience"
        className="flex flex-col gap-3 max-w-4xl mx-auto w-full"
      >
        <p className="text-small uppercase tracking-[0.18em] text-(--footer-foreground)">
          Curriculum Vitae
        </p>
        <h1 data-reveal-split className="text-h1 font-bold leading-[0.95]">
          Experience
        </h1>
      </header>
      <Timeline />
    </main>
  );
}
