// app/3d/viz/vintage-flower-lamps/page.tsx

import BeforeAndAfter from "@/components/BeforeAndAfter";
import LightImage from "@/components/LightImage";
import ScrollModel from "@/components/ScrollModel";

export default function VintageFlowerLampsPage() {
  return (
    <div className="flex flex-col gap-8 min-w-0">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row justify-center mx-auto lg:max-w-xl object-contain">
          <LightImage
            src="/lamps/1.webp"
            alt="Simona Barboiu"
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

      <div className="flex flex-col lg:flex-row justify-center mx-auto lg:max-w-[23vw] object-contain">
        <LightImage
          src="/lamps/2.webp"
          alt="Simona Barboiu"
          draggable={false}
        />
        <LightImage
          src="/lamps/3.webp"
          alt="Simona Barboiu"
          draggable={false}
        />
        <LightImage
          src="/lamps/4.webp"
          alt="Simona Barboiu"
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
          width={1000}
          height={1000}
          draggable={false}
        />
      </div>

      <div className="flex felx-col md:flex-row justify-center gap-4 columns-1 md:columns-2">
        <div className=" flex flex-col gap-4 items-start">
          <h2 className="text-2xl md:text-4xl font-bold whitespace-nowrap" id="unreal">
            Unreal Engine Integration
          </h2>

          <p className="max-w-lg py-4 flex flex-col items-center justify-center">
            The Unreal Integration allows for an easy drag and drop Unreal Package or Fab download. 
            The Blueprint includes an on/off toggle for the light and an intensity adjustement.
          </p>

          <LightImage
            src="/lamps/Unreal.webp"
            alt="Simona Barboiu"
            width={600}
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
          <a href="https://www.cgtrader.com/3d-models/interior/house-interior/retro-lamp-pack" className="w-full flex justify-center" target="_blank" rel="noopener noreferrer">
            <button className="btn">
              Go to Product Page ↪
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
