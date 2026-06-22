import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

const CONTACT_EMAIL = "simonab518@gmail.com";

export const metadata: Metadata = {
  title: "About & Contact — Simona Barboiu",
  description:
    "3D / 2D artist with several years of professional experience across real-time projects, product visualization, and interactive environments. Open to freelance and contract work.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col gap-(--space-section-y) pb-(--space-section-y)">
      {/* ── About ──────────────────────────────────────────────────── */}
      <section
        data-nav-section="About"
        className="grid-editorial max-w-7xl mx-auto items-start gap-8"
      >
        <figure data-reveal-clip className="art-frame">
          <Image
            src="/misc/phone.webp"
            alt="Simona Barboiu"
            width={1252}
            height={1872}
            sizes="(min-width:768px) 50vw, 100vw"
            draggable={false}
            className="h-auto w-full"
            priority
          />
        </figure>

        <div className="flex flex-col gap-6 md:pt-2">
          <p className="text-small uppercase tracking-[0.18em] text-(--footer-foreground)">
            About
          </p>
          <h1 data-reveal-split className="text-h2 font-bold leading-[0.95]">
            Simona Barboiu
          </h1>
          <p
            data-reveal
            className="text-body max-w-prose text-[color-mix(in_srgb,var(--foreground)_85%,transparent)]"
          >
            Hi, I&apos;m Simona, a 3D / 2D artist with several years of
            professional experience working across real-time projects, product
            visualization, and interactive environments. I enjoy building worlds
            and assets that tell stories, whether that&apos;s environments,
            props, characters, or clothing work. I work mainly in Blender,
            Substance, Unreal and Clo 3D, although most of my experience is in
            Maya and Unity. I&apos;m comfortable taking things from blockout and
            concept all the way to clean, production-ready assets in engine. I
            also have a strong 2D background (traditional art, illustration,
            storyboards, environment concepts), which helps me think about
            composition, lighting, and visual storytelling early on. I like
            projects where art and problem-solving overlap: figuring out how
            something should look, how it should behave, and how to make it run
            well in real time. I&apos;m currently open to freelance and contract
            work.
          </p>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────── */}
      <section
        data-nav-section="Contact"
        className="grid-editorial max-w-7xl mx-auto items-start gap-8"
      >
        <div className="flex flex-col gap-4">
          <p className="text-small uppercase tracking-[0.18em] text-(--footer-foreground)">
            Contact
          </p>
          <h2 data-reveal-split className="text-h3 font-semibold">
            Let&apos;s work together
          </h2>
          <p
            data-reveal
            className="text-body text-[color-mix(in_srgb,var(--foreground)_85%,transparent)]"
          >
            I&apos;m always happy to talk about new projects, collaborations, or
            interesting ideas. The easiest way to reach me is by email:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="link-glow">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <ContactForm to={CONTACT_EMAIL} />
      </section>
    </main>
  );
}
