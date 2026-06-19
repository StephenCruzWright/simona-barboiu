import type { Metadata } from "next";
import ProjectLayout from "@/components/ProjectLayout";
import { getProject } from "@/lib/projects";

const project = getProject("greek-house")!;

export const metadata: Metadata = {
  title: `${project.title} — Simona Barboiu`,
  description: project.summary,
};

export default function GreekHousePage() {
  return <ProjectLayout project={project} />;
}
