import Image from "next/image";

export default function VintageFlowerLampsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
        <Image
          className="dark:invert"
          src="/lamps/1.png"
          alt="Simona Barboiu"
          width={500}
          height={200}
          priority
        />
    </div>
  );
}
