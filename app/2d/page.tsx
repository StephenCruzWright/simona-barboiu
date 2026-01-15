import LightImage from "@/components/LightImage";
import Image from "next/image";
import Link from "next/link";

export default function IllustrationsPage() {
  return (
    <main className="min-h-screen">
      <h1>Illustrations</h1>
      <p>...</p>
      <LightImage
        src="/lamps/1.webp"
        alt="Lamp"
        width={600}
        height={400}
        draggable={false}
      />

      <Link href="/2d/illustration/mirage"> Go to Mirage</Link>
    </main>
  );
}