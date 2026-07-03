export type Lang = "fr" | "en";

export type Translations = {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    roles: string[];
    subtitle: string;
    cta_projects: string;
    cta_contact: string;
    download_cv: string;
    scroll: string;
    available: string;
  };
  stats: {
    title: string;
    subtitle: string;
    items: { value: string; label: string }[];
  };
  hobbies: {
    title: string;
    subtitle: string;
    items: { icon: string; title: string; desc: string; tags: string[] }[];
  };
  about: {
    title: string;
    subtitle: string;
    bio1: string;
    bio2: string;
    bio3: string;
    values_title: string;
    values: string[];
    highlights: {
      quality: { title: string; desc: string };
      design: { title: string; desc: string };
      perf: { title: string; desc: string };
    };
  };
  skills: {
    title: string;
    subtitle: string;
    languages: string;
    frameworks: string;
    tools: string;
    soft: string;
  };
  experience: {
    title: string;
    subtitle: string;
    work: string;
    education: string;
    project: string;
    present: string;
  };
  projects: {
    title: string;
    subtitle: string;
    all: string;
    cat_perso: string;
    cat_ecole: string;
    viewGithub: string;
    viewLive: string;
    viewDetails: string;
    featured: string;
    noProjects: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    info_email: string;
    info_phone: string;
    info_location: string;
    email_label: string;
    phone_label: string;
    location_label: string;
  };
  footer: {
    rights: string;
    made_with: string;
    nav_title: string;
    follow_title: string;
    desc: string;
  };
};

export const translations: Record<Lang, Translations> = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      experience: "Parcours",
      projects: "Projets",
      contact: "Contact",
    },
    hero: {
      greeting: "Bonjour, je suis",
      roles: [
        "Développeur Front-End",
        "React / Next.js / TypeScript",
        "Passionné UI & Performance",
      ],
      subtitle:
        "Développeur front-end React / Next.js / TypeScript, 3 ans d'expérience en alternance sur des projets multi-marchés. Je conçois des interfaces simples, performantes et maintenables.",
      cta_projects: "Voir mes projets",
      cta_contact: "Me contacter",
      download_cv: "Télécharger le CV",
      scroll: "Défiler vers le bas",
      available: "Disponible · Oct. 2026",
    },
    stats: {
      title: "En chiffres",
      subtitle: "Mon parcours résumé",
      items: [
        { value: "3", label: "ans d'alternance" },
        { value: "6", label: "projets réalisés" },
        { value: "15+", label: "technologies" },
        { value: "B1", label: "niveau anglais" },
      ],
    },
    hobbies: {
      title: "Passions",
      subtitle: "Au-delà du code",
      items: [
        {
          icon: "",
          title: "Jeux vidéo",
          desc: "Passionné de jeux compétitifs et de speedrun. J'aime autant optimiser une stratégie qu'optimiser du code.",
          tags: ["Compétition", "Speedrun"],
        },
        {
          icon: "",
          title: "Cosplay",
          desc: "Je conçois et fabrique des props en impression 3D, une façon de mêler créativité, design et fabrication numérique.",
          tags: ["Impression 3D", "Fabrication", "Design"],
        },
        {
          icon: "",
          title: "Développement",
          desc: "Des projets perso pour explorer les nouvelles technos UI, tester des concepts et rester en veille active sur l'écosystème front.",
          tags: ["Projets perso", "Veille UI", "Open source"],
        },
      ],
    },
    about: {
      title: "À propos de moi",
      subtitle: "Qui suis-je ?",
      bio1: "Je suis Evan Quinchon, développeur front-end React / Next.js / TypeScript en alternance chez Cliq Digital tout en finalisant mon master Architecte de Systèmes d'Information à L'ETNA. 3 ans d'expérience sur des projets multi-marchés (Europe & États-Unis).",
      bio2: "Chez Cliq Digital, j'ai livré des sites vitrines en Next.js SSR à un rythme de ~2 sites / 2 semaines, conçu des composants réutilisables et participé au design system. J'ai aussi développé Cliq Analytics, un dashboard interne KPI avec exports PDF et Excel.",
      bio3: "En dehors du code, je pratique le cosplay avec de l'impression 3D, je joue en compétition et je speedrun, et je monte des projets perso pour tester les dernières technos UI.",
      values_title: "Mes valeurs",
      values: [
        "Interfaces simples, performantes et maintenables",
        "Qualité et rigueur dans chaque livraison",
        "Collaboration et communication efficace",
        "Apprentissage continu et veille technologique",
      ],
      highlights: {
        quality: {
          title: "Code de qualité",
          desc: "Écriture de code propre, maintenable et bien structuré",
        },
        design: {
          title: "Design moderne",
          desc: "Création d'interfaces utilisateur intuitives et élégantes",
        },
        perf: {
          title: "Performance",
          desc: "Optimisation pour des expériences rapides et fluides",
        },
      },
    },
    skills: {
      title: "Compétences",
      subtitle: "Mes outils & technologies",
      languages: "Langages",
      frameworks: "Frameworks",
      tools: "Outils",
      soft: "Soft Skills",
    },
    experience: {
      title: "Parcours",
      subtitle: "Mon expérience & ma formation",
      work: "Expérience",
      education: "Formation",
      project: "Projet",
      present: "Aujourd'hui",
    },
    projects: {
      title: "Projets",
      subtitle: "Ce que j'ai réalisé",
      all: "Tous",
      cat_perso: "Personnel",
      cat_ecole: "École",
      viewGithub: "GitHub",
      viewLive: "Voir le site",
      viewDetails: "Voir détails",
      featured: "Mis en avant",
      noProjects: "Aucun projet dans cette catégorie",
    },
    contact: {
      title: "Contact",
      subtitle: "Parlons de votre projet",
      name: "Nom complet",
      email: "Adresse email",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès ! Je vous répondrai très vite.",
      error: "Une erreur est survenue. Veuillez réessayer.",
      info_email: "evan.quinchon@outlook.fr",
      info_phone: "+33 7 86 64 28 94",
      info_location: "Paris, France",
      email_label: "Email",
      phone_label: "Téléphone",
      location_label: "Localisation",
    },
    footer: {
      rights: "Tous droits réservés.",
      made_with: "Créé avec passion par",
      nav_title: "Navigation",
      follow_title: "Me suivre",
      desc: "Développeur front-end passionné par la création d'interfaces simples, performantes et maintenables.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Journey",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      roles: [
        "Front-End Developer",
        "React / Next.js / TypeScript",
        "UI & Performance Enthusiast",
      ],
      subtitle:
        "Front-end developer React / Next.js / TypeScript with 3 years of work-study experience on multi-market projects. I build simple, performant and maintainable interfaces.",
      cta_projects: "See my projects",
      cta_contact: "Contact me",
      download_cv: "Download CV",
      scroll: "Scroll down",
      available: "Available · Oct. 2026",
    },
    stats: {
      title: "By the numbers",
      subtitle: "My journey at a glance",
      items: [
        { value: "3", label: "years work-study" },
        { value: "6", label: "projects built" },
        { value: "15+", label: "technologies" },
        { value: "B1", label: "English level" },
      ],
    },
    hobbies: {
      title: "Passions",
      subtitle: "Beyond the code",
      items: [
        {
          icon: "",
          title: "Gaming",
          desc: "Passionate about competitive games and speedrunning. Optimising a run feels as satisfying as optimising code.",
          tags: ["Competitive", "Speedrun"],
        },
        {
          icon: "",
          title: "Cosplay",
          desc: "I design and build props through 3D printing, a way to blend creativity, design and digital fabrication.",
          tags: ["3D Printing", "Fabrication", "Design"],
        },
        {
          icon: "",
          title: "Front-end Dev",
          desc: "Personal projects to explore new UI technologies, test concepts and stay actively on top of the front-end ecosystem.",
          tags: ["Side Projects", "UI Watch", "Open Source"],
        },
      ],
    },
    about: {
      title: "About Me",
      subtitle: "Who am I?",
      bio1: "I'm Evan Quinchon, a front-end developer React / Next.js / TypeScript on a work-study contract at Cliq Digital while completing my Master's in Information Systems Architecture at L'ETNA. 3 years of experience on multi-market projects (Europe & USA).",
      bio2: "At Cliq Digital, I delivered Next.js SSR showcase sites at ~2 sites / 2 weeks, designed reusable components and contributed to the design system. I also built Cliq Analytics, an internal KPI dashboard with PDF and Excel exports.",
      bio3: "Outside of work, I do cosplay with 3D printing, play competitive games and speedrun, and build personal front-end projects to explore the latest UI technologies.",
      values_title: "My values",
      values: [
        "Simple, performant and maintainable interfaces",
        "Quality and rigour in every delivery",
        "Effective collaboration and communication",
        "Continuous learning and technology watch",
      ],
      highlights: {
        quality: {
          title: "Quality Code",
          desc: "Writing clean, maintainable and well-structured code",
        },
        design: {
          title: "Modern Design",
          desc: "Creating intuitive and elegant user interfaces",
        },
        perf: {
          title: "Performance",
          desc: "Optimizing for fast and smooth experiences",
        },
      },
    },
    skills: {
      title: "Skills",
      subtitle: "My tools & technologies",
      languages: "Languages",
      frameworks: "Frameworks",
      tools: "Tools",
      soft: "Soft Skills",
    },
    experience: {
      title: "Journey",
      subtitle: "My experience & education",
      work: "Experience",
      education: "Education",
      project: "Project",
      present: "Present",
    },
    projects: {
      title: "Projects",
      subtitle: "What I've built",
      all: "All",
      cat_perso: "Personal",
      cat_ecole: "School",
      viewGithub: "GitHub",
      viewLive: "View site",
      viewDetails: "View details",
      featured: "Featured",
      noProjects: "No projects in this category",
    },
    contact: {
      title: "Contact",
      subtitle: "Let's talk about your project",
      name: "Full name",
      email: "Email address",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent successfully! I'll get back to you soon.",
      error: "An error occurred. Please try again.",
      info_email: "evan.quinchon@outlook.fr",
      info_phone: "+33 7 86 64 28 94",
      info_location: "Paris, France",
      email_label: "Email",
      phone_label: "Phone",
      location_label: "Location",
    },
    footer: {
      rights: "All rights reserved.",
      made_with: "Made with passion by",
      nav_title: "Navigation",
      follow_title: "Follow me",
      desc: "Front-end developer passionate about building simple, performant and maintainable interfaces.",
    },
  },
};
