import type { Metadata } from "next";
import ProjectLayout from "@/components/ProjectLayout";
import { getProject } from "@/lib/projects";

const project = getProject("flower-alley")!;

export const metadata: Metadata = {
  title: `${project.title} — Simona Barboiu`,
  description: project.summary,
};

export default function FlowerAlleyPage() {
  return <ProjectLayout project={project} />;
}
