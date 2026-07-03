import { projects } from "@/data/project";
import ProjectDetailClient from "../clientView/ProjectDetailClient";
import { Project } from "@/type/project";

export default function ProjectDetail({ projectId }: { projectId: string }) {
  const project: Project | null =
    projects.find((p) => p.id === projectId) ?? null;

  console.log(projectId);

  return <ProjectDetailClient project={project} />;
}
