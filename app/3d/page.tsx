import LightImage from "@/components/LightImage";
import Image from "next/image";

export default function ThreeDPage() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row justify-center items-center mx-auto object-contain mt-4 bg-white/5 px-4">
        <div>
          <h1 id="viz">Product Viz</h1>
          <div className="flex flex-col lg:flex-row justify-center items-center mx-auto object-contain mt-4">
            <a href="/3d/viz/vintage-flower-lamps">
              <Image
                src="/lamps/1.webp"
                alt="Simona Barboiu"
                width={2000}
                height={2000}
                draggable={false}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-2"
              />
              <h3>Vintage Flower Lamps</h3>
            </a>

            <a href="/3d/viz/vintage-flower-lamps">
              <Image
                src="/lamps/1.webp"
                alt="Simona Barboiu"
                width={2000}
                height={2000}
                draggable={false}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-2"
              />
              <h3>Vintage Flower Lamps</h3>
            </a>

            <a href="/3d/viz/vintage-flower-lamps">
              <Image
                src="/lamps/1.webp"
                alt="Simona Barboiu"
                width={2000}
                height={2000}
                draggable={false}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-2"
              />
              <h3>Vintage Flower Lamps</h3>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center mx-auto gap-4 object-contain mt-4 bg-white/5 px-4">
        <div>
          <h1 id="games">Games & Interactive Apps</h1>
          <div className="flex flex-col lg:flex-row justify-center items-center mx-auto object-contain">
            <a href="/3d/viz/vintage-flower-lamps">
              <Image
                src="/lamps/1.webp"
                alt="Simona Barboiu"
                width={2000}
                height={2000}
                draggable={false}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-2"
              />
              <h3>Vintage Flower Lamps</h3>
            </a>

            <a href="/3d/viz/vintage-flower-lamps">
              <Image
                src="/lamps/1.webp"
                alt="Simona Barboiu"
                width={2000}
                height={2000}
                draggable={false}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-2"
              />
              <h3>Vintage Flower Lamps</h3>
            </a>

            <a href="/3d/viz/vintage-flower-lamps">
              <Image
                src="/lamps/1.webp"
                alt="Simona Barboiu"
                width={2000}
                height={2000}
                draggable={false}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-2"
              />
              <h3>Vintage Flower Lamps</h3>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center mx-auto gap-4 object-contain mt-4 bg-white/5 px-4">
        <div>
          <h1 id="environments">Environments</h1>
          <div className="flex flex-col lg:flex-row justify-center items-center mx-auto object-contain">
            <div>
              <a href="/3d/environments/greek-house">
                <Image
                  src="/greek/01.webp"
                  alt="Simona Barboiu"
                  width={800}
                  height={128}
                  draggable={false}
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-2"
                />
                <h3>Greek House</h3>
              </a>

              <a href="/3d/games/paxvr">
                <Image
                  src="/alley/environment_flower_deco.webp"
                  alt="Simona Barboiu"
                  width={800}
                  height={128}
                  draggable={false}
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-2"
                />
                <h3>Pax VR</h3>
              </a>
            </div>

            <a href="/3d/viz/flower-alley">
              <Image
                src="/alley/01.webp"
                alt="Simona Barboiu"
                width={800}
                height={128}
                draggable={false}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-80 hover:opacity-100 crop-center mb-2"
              />
              <h3>Flower Alley</h3>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
