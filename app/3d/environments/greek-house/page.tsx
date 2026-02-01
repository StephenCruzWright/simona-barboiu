// app/3d/viz/vintage-flower-lamps/page.tsx

import LightImage from "@/components/LightImage";

export default function GreekPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col lg:flex-row justify-center mx-auto object-contain ">
          <LightImage
            src="/greek/01.webp"
            alt="Simona Barboiu"
            draggable={false}
          />
        </div>

        <p className="max-w-5xl py-4 flex flex-col items-center justify-center">
          I started this project as an opportunity to focus on creating
          high-poly plants, inspired by the pretty bougainvilleas in Greece.
          These plants were my main focus in this scene.
        </p>
      </div>

      <LightImage
        src="/greek/closeupmovie_AS.mp4"
        alt="Simona Barboiu"
        draggable={false}
        type="video"
      />

      <div className="flex flex-col lg:flex-row justify-center mx-auto lg:max-w-7xl object-contain gap-8 lg:gap-4">
        <div className=" flex flex-col gap-4 items-start justify-space-between ">
          <p className="max-w-lg py-4 flex flex-col items-center justify-center">
            The bougainvillea plants were created using L-systems in Houdini -
            one system for the branches and one for each trunk. The flowers and
            leaves are modeled in Maya, and hand-painted in Substance Painter.
            The other plants were created using the same workflow. In Unreal,
            they have a material with subsurface scattering.
          </p>

          <LightImage
            src="/greek/02.webp"
            alt="Simona Barboiu"
            width={800}
            height={400}
            draggable={false}
          />
        </div>

        <div className="flex flex-col gap-4 justify-center items-start ">
          <LightImage
            src="/greek/03.webp"
            alt="Simona Barboiu"
            draggable={false}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center mx-auto lg:max-w-7xl object-contain gap-8 lg:gap-4">
        <div className="flex flex-col gap-4 justify-center items-start ">
          <LightImage
            src="/greek/04.webp"
            alt="Simona Barboiu"
            draggable={false}
          />
        </div>

        <div className=" flex flex-col gap-4 items-start ">
          <p className="max-w-lg py-4 flex flex-col items-center justify-center">
            The house and door decoration are sculpted in ZBrush. All the other
            assets are modeled in Maya and mostly painted in Substance. I also
            created the water shader, falling leaf particles, and did the
            lighting (using a HDRI and volumetric clouds) and post-processing,
            directly in Unreal. For reference, I used photos I took myself. A
            few materials and assets, such as the roof tiles, ground textures,
            sand, and some table objects, were sourced from Quixel to complement
            the scene.
          </p>
        </div>
      </div>

      <LightImage
        src="/greek/overallmovie_AS.mp4"
        alt="Simona Barboiu"
        draggable={false}
        type="video"
      />

      <LightImage src="/greek/05.webp" alt="Simona Barboiu" draggable={false} />

      <LightImage src="/greek/06.webp" alt="Simona Barboiu" draggable={false} />

      <LightImage
        src="/greek/07a.webp"
        alt="Simona Barboiu"
        draggable={false}
      />

      <LightImage
        src="/greek/07b.webp"
        alt="Simona Barboiu"
        draggable={false}
      />

      <LightImage
        src="/greek/07c.webp"
        alt="Simona Barboiu"
        draggable={false}
      />

      <LightImage src="/greek/08.webp" alt="Simona Barboiu" draggable={false} />

      <LightImage
        src="/greek/08b.webp"
        alt="Simona Barboiu"
        draggable={false}
      />

      <LightImage src="/greek/09.webp" alt="Simona Barboiu" draggable={false} />

      <LightImage src="/greek/10.webp" alt="Simona Barboiu" draggable={false} />

      <LightImage src="/greek/11.webp" alt="Simona Barboiu" draggable={false} />

      <LightImage src="/greek/12.webp" alt="Simona Barboiu" draggable={false} />
    </div>
  );
}
