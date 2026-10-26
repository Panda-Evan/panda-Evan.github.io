import { sortedProjects } from "@/lib/projects";
import ProjectsClient from "../clientView/ProjectClient";

export default function Projects() {
  return <ProjectsClient projects={sortedProjects} />;
}
