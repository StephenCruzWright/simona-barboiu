import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header>
            <Image
                className="dark:invert"
                src="/favicon.ico"
                alt="Simona Barboiu"
                width={1600}
                height={200}
                priority
            />
            <nav>
                <Link href="/">Home</Link>
                <Link href="/3D">3D</Link>
                <Link href="/2D">2D</Link>
                <Link href="/work">Work</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    );
}
