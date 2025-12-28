import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center p-8 text-sm md:text-lg lg:text-xl xl:text-2xl bg-background position-fixed bottom-0">
      <nav className="flex justify-space-between gap-18 text-sm md:text-lg lg:text-xl xl:text-2xl">
        <div className="flex flex-col">
          <Link href="/3D/#ProductViz">Product viz</Link>
          <Link href="/3D/#Games">Games & Interactive apps</Link>
          <Link href="/2D/#Illustration">Illustration</Link>
        </div>
        <div className="flex flex-col">
          <Link href="/work">Work Experience</Link>
          <Link href="/about">About & Contact</Link>
        </div>

        <Link href="/">
          <Image
            className="dark:invert opacity-70 hover:opacity-100 transition-opacity duration-910"
            src="/LogoOffWhite.png"
            alt="Simona Barboiu"
            width={160}
            height={200}
            priority />
        </Link>
      </nav>
    </footer>
  );
}
