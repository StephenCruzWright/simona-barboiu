import FlexGrid from "@/components/FlexGrid";
import LightImage from "@/components/LightImage";
import Image from "next/image";
import Link from "next/link";

export default function IllustrationsPage() {
  return (
    <main className="min-h-screen">
      
      <FlexGrid>
        <h1>Illustrations</h1>
        <LightImage className="pb-4" src="/illustration/flames.webp" alt="Flamees" width={2000} height={2000} />
        <LightImage className="pb-4" src="/illustration/prpls.webp" alt="Storm Eater" width={2000} height={2000} />
        <LightImage className="pb-4" src="/illustration/lakelady.webp" alt="Lady of the Lake" width={2000} height={2000} />
        <LightImage className="pb-4" src="/illustration/2.webp" alt="Untitled" width={2000} height={2000} />
        <LightImage className="pb-4" src="/illustration/car.webp" alt="Mirage" width={2000} height={2000} />
      </FlexGrid>
      <div className="flex flex-col md:flex-row py-4 md:py-8mx-auto items-start md:items-center">
        <LightImage
          src="/illustration/simonabarboiu001.webp"
          alt="Ink Sketch 1"
          width={400}
          height={800}
          draggable={false}
        />
        <LightImage
          src="/illustration/simonabarboiu002.webp"
          alt="Ink Sketch 2"
          width={400}
          height={800}
          draggable={false}
        />
        <LightImage
          src="/illustration/simonabarboiu003.webp"
          alt="Ink Sketch 3"
          width={400}
          height={800}
          draggable={false}
        />
      </div>
    </main>
  );
}