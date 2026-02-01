// app/3d/viz/vintage-flower-lamps/page.tsx

import LightImage from "@/components/LightImage";

export default function FlowerAlleyPage() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto justify-center items-center">
        <LightImage
          src="/alley/01.webp"
          alt="Simona Barboiu"
          draggable={false}
        />

        <LightImage
          src="/alley/02.mp4"
          alt="Simona Barboiu"
          draggable={false}
          type="video"
        />
      </div>

      
        <p className="py-4 flex flex-col items-center justify-center">
          The assets from this project were modelled in Blender and textured
          using both Blender and Substance Painter. The scene was assembled and
          rendered in Unreal Engine.
        </p>

      <LightImage src="/alley/03.webp" alt="Simona Barboiu" draggable={false} />

      <LightImage src="/alley/04.webp" alt="Simona Barboiu" draggable={false} />

      <p>
        The plant textures are based on pictures of real plants, upscaled and
        refined in Photoshop, then arranged in one image to create a texture.
        All the plants share one shader, which uses a base color map, simple
        wind for movement, and SSS. The tree has a particle system for falling
        leaves.
      </p>

      <LightImage src="/alley/05.webp" alt="Simona Barboiu" draggable={false} />

      <LightImage src="/alley/05b.webp" alt="Simona Barboiu" draggable={false} />

      <p className=" py-4 flex flex-col items-center justify-center">
        Here is a quick environment, for a different perspective of the plants.
        I created modular assets for the architecture, including various wall
        sizes, corners, and decorative trims. Decals from Quixel were used to
        add subtle wear and tear — all other assets were made by me.
      </p>

      <LightImage
        src="/alley/05b.webp"
        alt="Simona Barboiu"
        draggable={false}
      />

      <LightImage src="/alley/06.webp" alt="Simona Barboiu" draggable={false} />

      <LightImage src="/alley/08.webp" alt="Simona Barboiu" draggable={false} />

      <LightImage
        src="/alley/09.mp4"
        alt="Simona Barboiu"
        draggable={false}
        type="video"
      />

      <LightImage src="/alley/environment_flower_deco.webp" alt="Simona Barboiu" draggable={false} />
    </div>
  );
}
