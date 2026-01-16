// app/3d/viz/vintage-flower-lamps/page.tsx

import BeforeAndAfter from "@/components/BeforeAndAfter";
import LightImage from "@/components/LightImage";
import ScrollModel from "@/components/ScrollModel";
import Image from "next/image";

export default function VintageFlowerLampsPage() {
  return (
    <div className="flex flex-col gap-8 min-w-0">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <LightImage
            src="/lamps/1.webp"
            alt="Simona Barboiu"
            width={600}
            height={300}
            draggable={false}
          />
          <ScrollModel path="/lamps/array"/>
        </div>

        <p>
          Inspired by 1980s ornamental decoration, this lamp pack includes
          four floral-motif models. I modeled them in Blender, rendered in
          Blender and Twinmotion, textured by hand in Substance Painter,
          and integrated into Unreal Engine with Blueprints.
          Uses a consistent two-material workflow (opaque + transparent)
          across all assets.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-1 py-4 md:py-8 max-w-4xl mx-auto">
        <LightImage
          src="/lamps/2.webp"
          alt="Simona Barboiu"
          width={300}
          height={300}
          draggable={false}
        />
        <LightImage
          src="/lamps/3.webp"
          alt="Simona Barboiu"
          width={300}
          height={300}
          draggable={false}
        />
        <LightImage
          src="/lamps/4.webp"
          alt="Simona Barboiu"
          width={300}
          height={300}
          draggable={false}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-center">
        <BeforeAndAfter
          beforeSrc="/lamps/StudioSetupA01.webp"
          afterSrc="/lamps/StudioSetupA02.webp" />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-1 py-4 md:py-8">
        <LightImage
          src="/lamps/wireframe.webp"
          alt="Simona Barboiu"
          altsrc="/lamps/Unreal.webp"
          width={800}
          height={400}
          draggable={false}
        />
      </div>

      <div className="flex justify-center gap-4">
        <div className=" flex flex-col gap-4 items-start">
          <h2 className="text-2xl md:text-4xl font-bold">
            Unreal Engine Integration
          </h2>

          <p className="max-w-md py-4 flex flex-col items-center justify-center">
            The Unreal Integration allows for an easy drag and drop Unreal Package or Fab download. The Blueprint includes an on/off toggle for the light and an intensity adjustement.
          </p>

          <LightImage
            src="/lamps/Unreal.webp"
            alt="Simona Barboiu"
            width={400}
            height={400}
            draggable={false}
          />
        </div>

        <div className="flex flex-col gap-4 justify-center items-start">
          <LightImage
            src="/lamps/Animation.gif"
            alt="Simona Barboiu"
            width={500}
            height={400}
            draggable={false}
          />
          <a href="https://www.cgtrader.com/3d-models/interior/house-interior/retro-lamp-pack" className="w-full flex justify-end">
            <button className="btn">
              Go to Product Page ↪
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
