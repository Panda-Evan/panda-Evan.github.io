import { projects } from "@/data/project";
import ProjectsClient from "../clientView/ProjectClient";

export default function Projects() {
  const sorted = [...projects].sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );
  return <ProjectsClient projects={sorted} />;
}
