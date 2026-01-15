import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background position-fixed bottom-0">
      <div className="max-w-6xl flex items-center p-8 text-sm md:text-lg justify-between mx-auto">
        <nav className="flex flex-row justify-between text-sm md:text-md">
          <div className="flex flex-row gap-12 mr-8">
            <div className="flex flex-col">
              <Link href="/3d/#product">Product viz</Link>
              <Link href="/3d/#games">Games & Interactive apps</Link>
              <Link href="/2d/#illustration">Illustration</Link>
            </div>
            
            <div className="flex flex-col">
              <Link href="/work">Work Experience</Link>
              <Link href="/about">About & Contact</Link>
            </div>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center ml-auto">
          <Link href="/">
            <Image
              className="opacity-70 hover:opacity-100 transition-opacity duration-910"
              src="/LogoOffWhite.png"
              alt="Simona Barboiu"
              width={160}
              height={200}
              draggable={false}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
