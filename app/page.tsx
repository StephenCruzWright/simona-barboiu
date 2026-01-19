import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center py-10 px-16 mx-auto max-w-6xl px-6 sm:px-16">
        Vintage Flower Lamps
        <a href="/3d/viz/vintage-flower-lamps">
          <Image
            src="/lamps/wireframe.webp"
            alt="Simona Barboiu"
            width={500}
            height={128}
            draggable={false}
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 mb-10"
          />
        </a>

        Illustrations
        <a href="/2d">
          <Image
            src="/lamps/StudioSetupA02.webp"
            alt="Simona Barboiu"
            width={500}
            height={128}
            draggable={false}
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-10"
          />
        </a>

        Greek House
        <a href="/3d/environments/greek-house">
          <Image
            src="/lamps/unreal.webp"
            alt="Simona Barboiu"
            width={500}
            height={128}
            draggable={false}
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-10"
          />
        </a>
        
        Pax VR
        <a href="/3d/games/paxvr">
          <Image
            src="/lamps/StudioSetupA01.webp"
            alt="Simona Barboiu"
            width={500}
            height={128}
            draggable={false}
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-10"
          />
        </a>
      </main>
    </div>
  );
}
