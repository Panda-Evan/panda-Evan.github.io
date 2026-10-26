/**
 * Regroupement des technologies pour le filtre de la section Projets.
 * Une techno utilisée dans un projet mais absente d'ici tombe dans "other"
 * (affiché "Mobile & jeu" : Flutter, Unreal Engine...).
 */
export type SkillGroupKey = "front" | "lang" | "back" | "other";

export const skillGroups: { key: SkillGroupKey; skills: string[] }[] = [
  {
    key: "front",
    skills: ["React", "Next.js", "Tailwind CSS", "SCSS", "Framer Motion", "Pyodide"],
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
