import Image from "next/image";
import Link from "next/link";

export default function ModellingPage() {
  return (
    <main >
      <h1 id="3d">3D</h1>
      <p>...</p>
      <div className="mb-8 flex flex-col gap-4">
        <Link href="/3d/viz/vintage-flower-lamps">Vintage Flower Lamps</Link>
        <Link href="/3d/games/paxvr">PaxVR</Link>
      </div>
    </main>
  );
}
