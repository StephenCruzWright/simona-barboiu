import Image from "next/image";
import Link from "next/link";

export default function ModellingPage() {
  return (
    <main >
      <h1>3D</h1>
      <p>...</p>
      <div className="mb-8 flex flex-col gap-4">
        <Link href="/3D/viz/vintageFlowerLamps">Vintage Flower Lamps</Link>
        <Link href="/3D/games/paxvr">PaxVR</Link>
      </div>
    </main>
  );
}
