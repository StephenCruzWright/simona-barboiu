import BeforeAndAfter from "@/components/BeforeAndAfter";
import ScrollModel from "@/components/ScrollModel";
import Image from "next/image";

export default function VintageFlowerLampsPage() {
  return (
    <div className="min-h-screen items-center justify-center flex flex-col gap-8 py-8">
      {/* Title Image + ScrollModel next to each other on desktop, but on top of each other on mobile */}
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 p-4 md:p-8">
        <Image
          className="dark:invert pointer-events-none"
          src="/lamps/1.webp"
          alt="Simona Barboiu"
          width={400}
          height={400}
          draggable={false}
          priority
        />
        <ScrollModel path="/lamps/array" />
      </div>
      {/* description of image, mobile friendly */}
      <div className="flex flex-fit">
        <p>
          Inspired by 1980s ornamental decoration, this lamp pack includes
          four floral-motif models. I modeled them in Blender, rendered in
          Blender and Twinmotion, textured by hand in Substance Painter,
          and integrated into Unreal Engine with Blueprints.
          Uses a consistent two-material workflow (opaque + transparent)
          across all assets.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-1 py-4 md:py-8">
        <Image
          className="dark:invert pointer-events-none"
          src="/lamps/2.webp"
          alt="Simona Barboiu"
          width={300}
          height={400}
          draggable={false}
          priority
        />
        <Image
          className="dark:invert pointer-events-none"
          src="/lamps/3.webp"
          alt="Simona Barboiu"
          width={300}
          height={400}
          draggable={false}
          priority
        />
        <Image
          className="dark:invert pointer-events-none"
          src="/lamps/4.webp"
          alt="Simona Barboiu"
          width={300}
          height={400}
          draggable={false}
          priority
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center">
        <BeforeAndAfter
          beforeSrc="/lamps/StudioSetupA01.webp"
          afterSrc="/lamps/StudioSetupA02.webp" />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-1 py-4 md:py-8">
        <Image
          className="dark:invert pointer-events-none"
          src="/lamps/wireframe.webp"
          alt="Simona Barboiu"
          width={800}
          height={400}
          draggable={false}
          priority
        />
      </div>
      {/* Title + 2 images + decription stacked artistically on desktop, but on top of each other on mobile */}
      <div className="flex justify-left gap-8">
        <div className="">
          <h2 className="text-2xl md:text-4xl font-bold">
            Unreal Engine Integration
          </h2>
          <p className="max-w-md py-4 flex flex-col items-center justify-center">
            The Unreal Integration allows for an easy drag and drop Unreal Package or Fab download. The Blueprint includes an on/off toggle for the light and an intensity adjustement.
          </p>
          <Image
            className="dark:invert pointer-events-none"
            src="/lamps/Unreal.webp"
            alt="Simona Barboiu"
            width={600}
            height={1400}
            draggable={false}
            priority
          />
          
        </div>
        <div className="lg:absolute mx-auto right-20 gap-4 md: absolute gap-16 p-4 md:p-8 flex flex-col z-10">
            <Image
              className="dark:invert pointer-events-none item-center"
              src="/lamps/Animation.gif"
              alt="Simona Barboiu"
              width={400}
              height={400}
              draggable={false}
              priority
            />
            <a href="https://www.cgtrader.com/3d-models/interior/house-interior/retro-lamp-pack">
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-orange-700 transition">
                Go to Product Page
              </button>
            </a>
          </div>
      </div>
    </div>
  );
}
