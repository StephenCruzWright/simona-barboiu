import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center font-sans">
      <main className="flex w-full flex-col items-center py-10 px-16 mx-auto max-w-6xl ">
        Vintage Flower Lamps
        <a href="/projects/viz/vintage-flower-lamps">
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
        <a href="/projects/illustration">
          <Image
            src="/illustration/prpls.webp"
            alt="Simona Barboiu"
            width={500}
            height={128}
            draggable={false}
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-10"
          />
        </a>

        Greek House
        <a href="/projects/environments/greek-house">
          <Image
            src="/greek/01.webp"
            alt="Simona Barboiu"
            width={500}
            height={128}
            draggable={false}
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-10"
          />
        </a>
        
        Flower Alley
        <a href="/projects/viz/flower-alley">
          <Image
            src="/alley/08.webp"
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
