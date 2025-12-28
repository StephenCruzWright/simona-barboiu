import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="sticky top-0 flex items-center justify-between p-5 bg-background z-999 shadow-md">
            <nav className="flex gap-8 text-sm md:text-lg lg:text-xl xl:text-2xl">
                <Link href="/">
                    <Image
                        className="dark:invert"
                        src="/LogoOffWhite.png"
                        alt="Simona Barboiu"
                        width={160}
                        height={200}
                        priority />
                </Link>

                <div className="flex flex-col">
                    <Link href="/3D">3D</Link>
                    <Link href="/3D/#ProductViz">Product viz</Link>
                    <Link href="/3D/#Games">Games & Interactive apps</Link>
                </div>
                <div className="flex flex-col">
                    <Link href="/2D">2D</Link>
                    <Link href="/2D/#Illustration">Illustration</Link>
                </div>
                <Link href="/work">Work Experience</Link>
                <Link href="/about">About & Contact</Link>
            </nav>
        </header>
    );
}
