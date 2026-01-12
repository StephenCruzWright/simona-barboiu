import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 sm:items-start">
        Home
        <a href="/3d/viz/vintage-flower-lamps" >
          <Image
            src="/lamps/wireframe.webp"
            alt="Simona Barboiu"
            width={500}
            height={128}
            draggable={false}
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100"
          />
        </a>
      </main>
    </div>
  );
}
