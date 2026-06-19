import Image from "next/image";
import Link from "next/link";

const CONTACT_EMAIL = "simonab@gmail.com";

export default function Footer() {
  return (
    <footer className="mt-(--space-section-y)">
      <div className="mx-auto max-w-screen-2xl px-8 py-16 flex flex-col gap-12">
        {/* Conversion CTA — the end-of-scroll moment to land a client. */}
        <div className="flex flex-col gap-4">
          <p className="text-small uppercase tracking-[0.18em]">Get in touch</p>
          <span data-magnetic-wrap className="inline-block self-start">
            <Link
              href="/about"
              className="link-glow text-h2 font-bold leading-[0.95] text-foreground"
            >
              Let&apos;s work together ↪
            </Link>
          </span>
        </div>

        {/* Links + logo */}
        <div className="flex flex-col gap-8 border-t border-white/10 pt-8 text-sm md:flex-row md:items-end md:justify-between">
          <nav className="flex flex-row flex-wrap gap-12">
            <div className="flex flex-col gap-2">
              <Link href="/#projects" className="link-glow w-fit">
                Projects
              </Link>
              <Link href="/projects/illustration" className="link-glow w-fit">
                Illustration
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/work" className="link-glow w-fit">
                Work Experience
              </Link>
              <Link href="/about" className="link-glow w-fit">
                About &amp; Contact
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="link-glow w-fit"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </nav>

          <Link
            href="/"
            className="opacity-70 transition-opacity hover:opacity-100"
            aria-label="Home"
          >
            <Image
              src="/LogoOffWhite.png"
              alt="Simona Barboiu"
              width={140}
              height={175}
              draggable={false}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
