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
      "Développeur front-end en alternance dans une équipe de 3 développeurs, sur un parc de sites marchands en Next.js (rendu côté serveur), React et TypeScript.",
    desc_en:
      "Work-study front-end developer in a team of 3 developers, on a fleet of e-commerce sites built with Next.js (server-side rendering), React and TypeScript.",
    highlights_fr: [
      "Livraison de 5 à 6 sites complets sur la dernière année, tous en production : environ 1 semaine pour un nouveau site, 1 à 2 jours pour une déclinaison.",
      "123 demandes traitées en un an (environ 3 par semaine), de la maquette à la mise en production.",
      "Maintenance d'un parc de 17 sites, d'environ 200 sites de l'ancienne génération et d'une centaine de pages de paiement, déclinés en 10 locales.",
      "Travail sur deux générations d'architecture : un générateur automatisé à composants partagés (environ 1 700 sites produits), puis une architecture à composants propres à chaque site.",
      "Intégration fidèle aux maquettes, vérifiée sur toutes les tailles d'écran.",
      "Évolutions du tunnel de paiement : saisie assistée, homogénéisation des formulaires.",
      "Refactorisation d'un composant codé en dur pour le rendre réutilisable par les autres sites, au-delà du périmètre du ticket.",
      "Revue de code des autres développeurs, déploiements en préproduction et en production.",
      "Usage encadré d'outils de génération de code par IA : relecture et mise aux conventions de l'équipe.",
    ],
    highlights_en: [
      "Shipped 5 to 6 complete sites over the last year, all in production: about 1 week for a new site, 1 to 2 days for a variant.",
      "123 requests handled in a year (about 3 a week), from mockup to production.",
      "Maintained a fleet of 17 sites, around 200 legacy-generation sites and about a hundred payment pages, across 10 locales.",
      "Worked on two architecture generations: an automated generator with shared components (around 1,700 sites produced), then an architecture with per-site components.",
      "Faithful implementation of the mockups, checked on every screen size.",
      "Checkout funnel improvements: assisted input, consistent forms.",
      "Refactored a hard-coded component so other sites could reuse it, beyond the ticket's scope.",
      "Code reviews for the other developers, staging and production deployments.",
      "Supervised use of AI code-generation tools: reviewing output and aligning it with team conventions.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GitHub", "Jira", "AWS S3"],
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
