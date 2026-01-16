import FlexGrid from "@/components/FlexGrid";
import LightImage from "@/components/LightImage";
import Image from "next/image";
import Link from "next/link";

export default function IllustrationsPage() {
  return (
    <main className="min-h-screen">
      <FlexGrid className="mb-4 break-inside-avoid opacity-0 animate-fade-in">
        <h1 id="illustration">Illustration</h1>
        <LightImage
          className="pb-4"
          src="/illustration/flames.webp"
          alt="Flamees"
          altsrc="/illustration/fflamesprocess.webp"
          width={2000}
          height={2000}
        />
        <LightImage
          className="pb-4"
          src="/illustration/lakelady.webp"
          alt="Lady of the Lake"
          altsrc="/illustration/Process.webp"
          width={2000}
          height={2000}
        />
        <LightImage
          className="pb-4"
          src="/illustration/prpls.webp"
          alt="Storm Eater"
          altsrc="/illustration/pprocess.webp"
          width={2000}
          height={2000}
        />
        <LightImage
          className="pb-4"
          src="/illustration/2.webp"
          alt="Untitled"
          width={2000}
          height={2000}
        />
        <LightImage
          className="pb-4"
          src="/illustration/car.webp"
          alt="Mirage"
          width={2000}
          height={2000}
        />
      </FlexGrid>

      <div className="flex flex-col lg:flex-row justify-center items-center mx-auto object-contain lg:max-w-[25vw]">
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