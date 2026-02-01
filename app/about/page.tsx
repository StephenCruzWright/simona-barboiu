import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto justify-center items-center">
        <Image
          src="/misc/phone.webp"
          alt="Simona Barboiu"
          width={2000}
          height={2000}
          draggable={false}
          className="shadow-lg crop-center mb-2"
        />
        <div>
          <p>
            I’m always happy to talk about new projects, collaborations, or interesting ideas. 
            The easiest way to reach me is by email: <a href="mailto:simonab@gmail.com">simonab@gmail.com</a>
          </p>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <p>
            About me <br/>
            Hi, I’m Simona, a 3D / 2D artist with several years of professional experience working across real-time projects, product visualization, and interactive environments. 
            
            I enjoy building worlds and assets that tell stories, whether that’s environments, props, characters, or clothing work.
            
            I work mainly in Blender, Substance, Unreal and Clo 3D, although most of my experience is in Maya and Unity. 
            
            I’m comfortable taking things from blockout and concept all the way to clean, production-ready assets in engine. 
            
            I also have a strong 2D background (traditional art, illustration, storyboards, environment concepts), which helps me think about composition, lighting, and visual storytelling early on.
            
            I like projects where art and problem-solving overlap: figuring out how something should look, how it should behave, and how to make it run well in real time. 
            
            I’m currently open to freelance and contract work.
          </p>
        </div>
      </div>
    </main>
  );
}
