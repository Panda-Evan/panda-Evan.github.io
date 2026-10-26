import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedProjects } from "@/lib/projects";
import ProjectDetailClient from "@/components/clientView/ProjectDetailClient";

type Params = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = publishedProjects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} - Evan Quinchon`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { id } = await params;
  const index = publishedProjects.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const project = publishedProjects[index];
  const next = publishedProjects[(index + 1) % publishedProjects.length];

  return (
    <ProjectDetailClient
      project={project}
      next={next}
      position={index + 1}
      total={publishedProjects.length}
    />
  );
}
