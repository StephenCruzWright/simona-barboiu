import FlexGrid from "@/components/FlexGrid";
import LightImage from "@/components/LightImage";

export default function IllustrationsPage() {
  return (
    <main className="min-h-screen">
      <FlexGrid className="opacity-0 animate-fade-in ">
        <h1 id="illustration">Illustration</h1>
        <LightImage
          className="mb-4"
          src="/illustration/flames.webp"
          alt="Flamees"
          altsrc="/illustration/fflamesprocess.webp"
        />
        <LightImage
          className="mb-4"
          src="/illustration/prpls.webp"
          alt="Storm Eater"
          altsrc="/illustration/pprocess.webp"
        />
        <LightImage
          className="mb-4"
          src="/illustration/2.webp"
          alt="Untitled"
        />
        <LightImage
          className="mb-4"
          src="/illustration/lakelady.webp"
          alt="Lady of the Lake"
          altsrc="/illustration/process.webp"
        />
        <LightImage
          className="mb-4"
          src="/illustration/car.webp"
          alt="Mirage"
        />
      </FlexGrid>

      <div className="flex flex-col lg:flex-row justify-center items-center mx-auto object-contain lg:max-w-[23vw]">
        <LightImage
          src="/illustration/simonabarboiu001.webp"
          alt="Ink Sketch 1"
          width={2000}
          height={2000}
          draggable={false}
        />
        <LightImage
          src="/illustration/simonabarboiu002.webp"
          alt="Ink Sketch 2"
          width={2000}
          height={2000}
          draggable={false}
        />
        <LightImage
          src="/illustration/simonabarboiu003.webp"
          alt="Ink Sketch 3"
          width={2000}
          height={2000}
          draggable={false}
        />
      </div>
    </main>
  );
}