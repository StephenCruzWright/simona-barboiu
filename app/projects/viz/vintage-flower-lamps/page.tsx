import type { Metadata } from "next";
import BeforeAndAfter from "@/components/BeforeAndAfter";
import ScrollModel from "@/components/ScrollModel";
import ProjectLayout from "@/components/ProjectLayout";
import { getProject } from "@/lib/projects";

const project = getProject("vintage-flower-lamps")!;

export const metadata: Metadata = {
  title: `${project.title} — Simona Barboiu`,
  description: project.summary,
};

export default function VintageFlowerLampsPage() {
  return (
    <ProjectLayout
      project={project}
      interactive={
        <div className="flex flex-col gap-10">
          <div className="art-frame p-2">
            <ScrollModel path="/lamps/array" />
          </div>
          <div className="art-frame overflow-hidden">
            <BeforeAndAfter
              beforeSrc="/lamps/StudioSetupA01.webp"
              afterSrc="/lamps/StudioSetupA02.webp"
            />
          </div>
          <a
            href="https://www.cgtrader.com/3d-models/interior/house-interior/retro-lamp-pack"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start"
          >
            <button className="btn">Go to Product Page ↪</button>
          </a>
        </div>
      }
    />
  );
}
