/**
 * Skill groups for the project filter. A technology used by a project but missing
 * here falls into "other" (Flutter, Unreal Engine, Pygame…).
 */
export type SkillGroupKey = "front" | "lang" | "back" | "other";

export const skillGroups: { key: SkillGroupKey; skills: string[] }[] = [
  {
    key: "front",
    skills: ["React", "Next.js", "Tailwind CSS", "SCSS", "Framer Motion", "Three.js", "Pyodide"],
  },
  {
    key: "lang",
    skills: ["TypeScript", "JavaScript", "Python", "Kotlin", "Dart", "C++"],
  },
  {
    key: "back",
    skills: ["Node.js", "REST API", "PHP Symfony", "Flask", "Django", "PostgreSQL", "SQLite", "Docker"],
  },
];
