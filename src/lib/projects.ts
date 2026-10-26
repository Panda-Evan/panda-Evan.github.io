import { projects } from "@/data/project";
import { skillGroups, SkillGroupKey } from "@/data/skills";
import { Project } from "@/type/project";

export const sortedProjects: Project[] = [...projects].sort(
  (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
);

export const isSealed = (project: Project) => project.status === "soon";

/** Projects that have a detail page ("soon" projects don't yet). */
export const publishedProjects: Project[] = sortedProjects.filter((p) => !isSealed(p));

export function getProjectCover(project: Project): string | null {
  return project.cover ?? project.gallery[0]?.src ?? null;
}

/** 1-based position of a project in the sorted list, formatted as "01". */
export function projectNumber(project: Project): string {
  const i = sortedProjects.findIndex((p) => p.id === project.id);
  return String(i + 1).padStart(2, "0");
}

export const allSkills: string[] = Array.from(
  new Set(sortedProjects.flatMap((p) => p.technologies))
);

/** Skill groups, restricted to skills used by at least one project. */
export function groupedSkills(): { key: SkillGroupKey; skills: string[] }[] {
  const known = new Set(skillGroups.flatMap((g) => g.skills));
  const groups = skillGroups
    .map((g) => ({ key: g.key, skills: g.skills.filter((s) => allSkills.includes(s)) }))
    .filter((g) => g.skills.length > 0);
  const other = allSkills.filter((s) => !known.has(s));
  if (other.length > 0) groups.push({ key: "other", skills: other });
  return groups;
}

/** URL-safe skill id used in `?skills=`, e.g. "Tailwind CSS" -> "tailwind-css". */
export function skillSlug(skill: string): string {
  return skill.toLowerCase().replace(/[^a-z0-9+#]+/g, "-").replace(/^-|-$/g, "");
}
