import { ExperienceItem } from "@/type/experience";

export const experienceItems: ExperienceItem[] = [
  {
    id: "cliq",
    type: "work",
    title_fr: "Développeur Front-End - Alternance",
    title_en: "Front-End Developer - Work-study",
    org: "Cliq Digital",
    location: "Paris, France",
    period_start: "2023",
    period_end: "2026",
    desc_fr:
      "Développement d'interfaces sur-mesure et mise en place du design system sur deux produits. Blank : sites vitrines multi-marchés en Next.js SSR (pixel-perfect + responsive), ~2 sites toutes les 2 semaines pour l'Europe et les États-Unis. Cliq Analytics : dashboard interne de centralisation KPI, exports PDF/Excel et édition de campagnes.",
    desc_en:
      "Custom interface development and design system setup across two main products. Blank: multi-market showcase sites in Next.js SSR (pixel-perfect + responsive), ~2 sites every two weeks for Europe and the US. Cliq Analytics: internal KPI dashboard, PDF/Excel exports and campaign editing features.",
    tags: ["TypeScript", "Next.js", "React", "Tailwind CSS", "MUI", "Figma"],
  },
  {
    id: "etna",
    type: "education",
    title_fr: "Diplômé - Architecte de Systèmes d'Information",
    title_en: "Graduate - Information Systems Architect",
    org: "L'ETNA",
    location: "Ivry-sur-Seine, France",
    period_start: "2022",
    period_end: "2026",
    desc_fr:
      "Titre d'Architecte de Systèmes d'Information validé en octobre 2026 : certification professionnelle de niveau 7 (Bac+5), RNCP 38114. Formation en alternance spécialisée en développement web, architecture d'applications et administration système. Projet de fin d'études : Kollexo, plateforme de gestion de collections (team lead front, équipe de 4).",
    desc_en:
      "Information Systems Architect title obtained in October 2026: level 7 professional certification (Master's level, EQF 7), RNCP 38114. Work-study programme specialising in web development, application architecture and system administration. Final project: Kollexo, a collection management platform (front-end team lead, team of 4).",
    tags: ["Diplômé", "Bac+5", "RNCP 38114"],
  },
  {
    id: "bac",
    type: "education",
    title_fr: "Baccalauréat Général",
    title_en: "General Baccalaureate",
    org: "Lycée Claude Nicolas Ledoux",
    location: "Paris, France",
    period_start: "2020",
    period_end: "2022",
    desc_fr:
      "Baccalauréat obtenu avec les spécialités NSI (Numérique et Sciences Informatiques) et Mathématiques.",
    desc_en:
      "Baccalaureate obtained with specializations in Computer Science (NSI) and Mathematics.",
    tags: ["NSI", "Mathématiques"],
  },
];
