export type Lang = "fr" | "en";

export type Translations = {
  nav: {
    home: string;
    projects: string;
    experience: string;
    about: string;
    contact: string;
  };
  hero: {
    role: string;
    location: string;
    available: string;
    local_time: string;
    statement: string;
    cta_projects: string;
    cta_contact: string;
    download_cv: string;
    facts: {
      years: string;
      cadence: string;
      projects: string;
      techs: string;
    };
  };
  cyber: {
    ticker: string[];
    boot: string[];
    online: string;
    channel: string;
    open_channel: string;
    dossier: string;
    clearance: string;
    log: string;
    contracts: string;
  };
  anatomy: {
    layers: { grid: string; box: string; components: string; content: string };
    cta: string;
    cta_long: string;
    fig: string;
    caption: (elements: number) => string;
  };
  xray: {
    lens: string;
    skeleton: string;
    active: string;
    quit: string;
    source: string;
    depth: string;
    anatomy_kicker: string;
    anatomy_title: string;
    anatomy_desc: string;
    elements: string;
    max_depth: string;
    height: string;
    sections: string;
    hint: string;
    close: string;
  };
  hobbies: {
    title: string;
    items: { title: string; desc: string; tags: string[] }[];
  };
  about: {
    title: string;
    lead: string;
    bio1: string;
    bio2: string;
    bio3: string;
    values_title: string;
    values: string[];
  };
  experience: {
    title: string;
    lead: string;
    work: string;
    education: string;
    present: string;
  };
  projects: {
    title: string;
    lead: string;
    filter_label: string;
    filter_hint: string;
    groups: { front: string; lang: string; back: string; other: string };
    reset: string;
    count: (n: number) => string;
    matching: string;
    cat_perso: string;
    cat_ecole: string;
    featured: string;
    noProjects: string;
    view: string;
    beta: string;
    sealed: {
      title: string;
      hint: string;
      tape: string[];
      stamp: string;
      evidence: string;
      redacted: string;
      locked: string;
      eta: string;
    };
  };
  project: {
    back: string;
    role: string;
    period: string;
    type: string;
    links: string;
    about: string;
    highlights: string;
    stack: string;
    stack_hint: string;
    gallery: string;
    no_visuals: string;
    next: string;
    viewGithub: string;
    viewLive: string;
    no_links: string;
    beta_title: string;
    beta_text: string;
    close: string;
    previous_image: string;
    next_image: string;
    not_found: string;
  };
  contact: {
    title: string;
    lead: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    new_message: string;
    info_email: string;
    info_phone: string;
    info_location: string;
    email_label: string;
    phone_label: string;
    location_label: string;
    or_form: string;
  };
  footer: {
    rights: string;
    built_with: string;
    shortcuts: string;
  };
};

export const translations: Record<Lang, Translations> = {
  fr: {
    nav: {
      home: "Accueil",
      projects: "Projets",
      experience: "Parcours",
      about: "À propos",
      contact: "Contact",
    },
    hero: {
      role: "Développeur front-end",
      location: "Paris, FR",
      available: "Disponible immédiatement",
      local_time: "Heure locale",
      statement:
        "Je construis des interfaces précises, rapides et maintenables en React, Next.js et TypeScript. Diplômé Bac+5 de L'ETNA, avec trois ans d'expérience chez Cliq Digital à livrer des sites pour l'Europe et les États-Unis, au rythme de deux toutes les deux semaines.",
      cta_projects: "Voir les projets",
      cta_contact: "Me contacter",
      download_cv: "CV (PDF)",
      facts: {
        years: "ans d'expérience",
        cadence: "sites livrés / 2 semaines",
        projects: "projets documentés",
        techs: "technologies utilisées",
      },
    },
    cyber: {
      ticker: [
        "Disponible immédiatement",
        "Netrunner front-end",
        "React",
        "Next.js",
        "TypeScript",
        "Design systems",
        "Pixel-perfect",
        "Paris 75",
      ],
      boot: [
        "init kernel.portfolio ............ ok",
        "mount /dev/react@19 .............. ok",
        "load chrome.typography(tektur) .... ok",
        "calibrate scanner.xray ........... ok",
        "handshake evan.quinchon .......... ok",
      ],
      online: "En ligne",
      channel: "Canal ouvert",
      open_channel: "Ouvrir un canal",
      dossier: "Dossier",
      clearance: "Habilitation",
      log: "Journal",
      contracts: "Contrats",
    },
    anatomy: {
      layers: {
        grid: "L0 · grille 12 col / 24 px",
        box: "L1 · box model",
        components: "L2 · composants",
        content: "L3 · contenu",
      },
      cta: "Voir le squelette",
      cta_long: "Explorer le squelette en 3D",
      fig: "Fig. 00 — Anatomie de cette page",
      caption: (n) =>
        `La page que tu viens de voir, démontée en 4 calques. Chaque cadre est mesuré en direct sur le vrai DOM — ${n.toLocaleString("fr-FR")} éléments en ce moment, zéro template.`,
    },
    xray: {
      lens: "Scanner",
      skeleton: "Squelette 3D",
      active: "Scanner actif",
      quit: "quitter",
      source: "Source réelle",
      depth: "profondeur",
      anatomy_kicker: "// Jack-in · Le Net",
      anatomy_title: "Plongée dans le Net",
      anatomy_desc:
        "Chaque dalle est un vrai élément HTML de cette page, posé à la hauteur de sa profondeur dans l'arbre. Plus c'est lumineux, plus c'est imbriqué — comme une radio.",
      elements: "éléments",
      max_depth: "profondeur max",
      height: "hauteur du document",
      sections: "sections",
      hint: "Glisser pour tourner · molette pour zoomer · clic sur un élément pour y aller",
      close: "Revenir au site",
    },
    hobbies: {
      title: "En dehors du code",
      items: [
        {
          title: "Jeux vidéo",
          desc: "Compétition et speedrun. Optimiser une route au frame près, c'est le même plaisir qu'optimiser un rendu.",
          tags: ["Compétition", "Speedrun"],
        },
        {
          title: "Cosplay",
          desc: "Je modélise et imprime mes props en 3D : de la conception à la finition, rien n'est acheté tout fait.",
          tags: ["Impression 3D", "Fabrication"],
        },
        {
          title: "Projets perso",
          desc: "Des side projects pour tester les nouvelles API du navigateur et garder la main sur l'écosystème front.",
          tags: ["Veille UI", "Expérimentations"],
        },
      ],
    },
    about: {
      title: "À propos",
      lead: "Je ne lâche pas un écran tant qu'il n'est pas juste.",
      bio1: "Je suis Evan Quinchon, développeur front-end React / Next.js / TypeScript. Je viens d'obtenir mon titre d'Architecte de Systèmes d'Information à L'ETNA (Bac+5, certification RNCP de niveau 7), après trois ans d'alternance chez Cliq Digital.",
      bio2: "Chez Cliq Digital, j'ai livré des sites vitrines en Next.js SSR à un rythme de ~2 sites toutes les 2 semaines, conçu des composants réutilisables et participé au design system. J'ai aussi développé Cliq Analytics, un dashboard interne KPI avec exports PDF et Excel.",
      bio3: "Ce portfolio est codé à la main, sans template : chaque espacement, chaque transition et chaque état de survol a été pensé et ajusté.",
      values_title: "Ma façon de travailler",
      values: [
        "Pixel-perfect sans sacrifier la maintenabilité",
        "Accessibilité et performance dès le premier commit",
        "Composants réutilisables, design system d'abord",
        "Communication claire avec le design et le back",
      ],
    },
    experience: {
      title: "Parcours",
      lead: "Trois ans à mener de front l'entreprise et l'école, jusqu'au diplôme.",
      work: "Expérience",
      education: "Formation",
      present: "Aujourd'hui",
    },
    projects: {
      title: "Projets",
      lead: "Écoles, alternance, projets perso. Filtre par compétence pour voir où je l'ai utilisée.",
      filter_label: "Filtrer par compétence",
      filter_hint: "Plusieurs choix possibles",
      groups: {
        front: "Front-end",
        lang: "Langages",
        back: "Back-end & data",
        other: "Mobile, jeu & desktop",
      },
      reset: "Tout afficher",
      count: (n) => `${n} projet${n > 1 ? "s" : ""}`,
      matching: "utilisant",
      cat_perso: "Perso",
      cat_ecole: "École",
      featured: "À la une",
      noProjects: "Aucun projet ne combine toutes ces compétences.",
      view: "Voir le projet",
      beta: "V1 · En test",
      sealed: {
        title: "Dossiers scellés",
        hint: "Enquête en cours, déclassification prochaine",
        tape: ["Bientôt", "Ne pas franchir", "Scène de crime", "Accès restreint"],
        stamp: "Bientôt",
        evidence: "Pièce à conviction",
        redacted: "passage caviardé",
        locked: "Dossier scellé",
        eta: "Ouverture",
      },
    },
    project: {
      back: "Tous les projets",
      role: "Rôle",
      period: "Période",
      type: "Type",
      links: "Liens",
      about: "Le projet",
      highlights: "Points clés",
      stack: "Compétences mobilisées",
      stack_hint: "Clique sur une compétence pour voir les autres projets qui l'utilisent.",
      gallery: "Captures",
      no_visuals: "Visuels à venir",
      next: "Projet suivant",
      viewGithub: "Code source",
      viewLive: "Voir le site",
      no_links: "Code privé",
      beta_title: "Version 1 · en phase de test",
      beta_text: "Ce projet est jouable de bout en bout, mais il est encore en test : équilibrage, bugs et contenu évoluent.",
      close: "Fermer",
      previous_image: "Image précédente",
      next_image: "Image suivante",
      not_found: "Projet introuvable",
    },
    contact: {
      title: "Contact",
      lead: "Un poste, une mission, une question ? Écris-moi.",
      name: "Nom complet",
      email: "Adresse email",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      success: "Message envoyé. Je te réponds très vite.",
      error: "Une erreur est survenue. Réessaie ou écris-moi directement par email.",
      new_message: "Nouveau message",
      info_email: "evan.quinchon@outlook.fr",
      info_phone: "+33 7 86 64 28 94",
      info_location: "Paris, France",
      email_label: "Email",
      phone_label: "Téléphone",
      location_label: "Localisation",
      or_form: "Ou via le formulaire",
    },
    footer: {
      rights: "Tous droits réservés.",
      built_with: "Conçu et codé à la main avec Next.js, Tailwind CSS et Framer Motion.",
      shortcuts: "Raccourcis clavier",
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      experience: "Journey",
      about: "About",
      contact: "Contact",
    },
    hero: {
      role: "Front-end developer",
      location: "Paris, FR",
      available: "Available now",
      local_time: "Local time",
      statement:
        "I build precise, fast and maintainable interfaces with React, Next.js and TypeScript. Master's-level graduate from L'ETNA, with three years at Cliq Digital shipping sites for Europe and the US, at a pace of two every two weeks.",
      cta_projects: "See the projects",
      cta_contact: "Get in touch",
      download_cv: "Resume (PDF)",
      facts: {
        years: "years of experience",
        cadence: "sites shipped / 2 weeks",
        projects: "documented projects",
        techs: "technologies used",
      },
    },
    cyber: {
      ticker: [
        "Available now",
        "Front-end netrunner",
        "React",
        "Next.js",
        "TypeScript",
        "Design systems",
        "Pixel-perfect",
        "Paris 75",
      ],
      boot: [
        "init kernel.portfolio ............ ok",
        "mount /dev/react@19 .............. ok",
        "load chrome.typography(tektur) .... ok",
        "calibrate scanner.xray ........... ok",
        "handshake evan.quinchon .......... ok",
      ],
      online: "Online",
      channel: "Channel open",
      open_channel: "Open a channel",
      dossier: "Dossier",
      clearance: "Clearance",
      log: "Log",
      contracts: "Contracts",
    },
    anatomy: {
      layers: {
        grid: "L0 · 12 col grid / 24 px",
        box: "L1 · box model",
        components: "L2 · components",
        content: "L3 · content",
      },
      cta: "See the skeleton",
      cta_long: "Explore the 3D skeleton",
      fig: "Fig. 00 — Anatomy of this page",
      caption: (n) =>
        `The page you just saw, taken apart into 4 layers. Every frame is measured live on the real DOM — ${n.toLocaleString("en-US")} elements right now, zero template.`,
    },
    xray: {
      lens: "Scanner",
      skeleton: "3D skeleton",
      active: "Scanner on",
      quit: "exit",
      source: "Real source",
      depth: "depth",
      anatomy_kicker: "// Jack-in · The Net",
      anatomy_title: "Jack into the Net",
      anatomy_desc:
        "Each slab is a real HTML element of this page, raised to its depth in the tree. The brighter it glows, the deeper it's nested — just like an X-ray.",
      elements: "elements",
      max_depth: "max depth",
      height: "document height",
      sections: "sections",
      hint: "Drag to orbit · scroll to zoom · click an element to jump to it",
      close: "Back to the site",
    },
    hobbies: {
      title: "Beyond the code",
      items: [
        {
          title: "Gaming",
          desc: "Competitive play and speedrunning. Optimising a route frame by frame feels just like optimising a render.",
          tags: ["Competitive", "Speedrun"],
        },
        {
          title: "Cosplay",
          desc: "I model and 3D-print my own props: from design to finish, nothing is bought ready-made.",
          tags: ["3D Printing", "Fabrication"],
        },
        {
          title: "Side projects",
          desc: "Side projects to try new browser APIs and stay hands-on with the front-end ecosystem.",
          tags: ["UI Watch", "Experiments"],
        },
      ],
    },
    about: {
      title: "About",
      lead: "I don't let go of a screen until it's right.",
      bio1: "I'm Evan Quinchon, a React / Next.js / TypeScript front-end developer. I've just earned my Information Systems Architect title from L'ETNA (Master's level, RNCP level 7 certification), after three years of work-study at Cliq Digital.",
      bio2: "At Cliq Digital, I shipped Next.js SSR showcase sites at ~2 sites every 2 weeks, designed reusable components and contributed to the design system. I also built Cliq Analytics, an internal KPI dashboard with PDF and Excel exports.",
      bio3: "This portfolio is hand-coded, no template: every spacing, transition and hover state has been thought through and tuned.",
      values_title: "How I work",
      values: [
        "Pixel-perfect without trading off maintainability",
        "Accessibility and performance from the first commit",
        "Reusable components, design system first",
        "Clear communication with design and back-end",
      ],
    },
    experience: {
      title: "Journey",
      lead: "Three years juggling a company and a school, all the way to graduation.",
      work: "Experience",
      education: "Education",
      present: "Present",
    },
    projects: {
      title: "Projects",
      lead: "School, work-study and personal projects. Filter by skill to see where I used it.",
      filter_label: "Filter by skill",
      filter_hint: "Multiple choices allowed",
      groups: {
        front: "Front-end",
        lang: "Languages",
        back: "Back-end & data",
        other: "Mobile, games & desktop",
      },
      reset: "Show all",
      count: (n) => `${n} project${n > 1 ? "s" : ""}`,
      matching: "using",
      cat_perso: "Personal",
      cat_ecole: "School",
      featured: "Featured",
      noProjects: "No project combines all of these skills.",
      view: "View project",
      beta: "V1 · Testing",
      sealed: {
        title: "Sealed files",
        hint: "Investigation ongoing, declassified soon",
        tape: ["Coming soon", "Do not cross", "Crime scene", "Restricted area"],
        stamp: "Soon",
        evidence: "Evidence",
        redacted: "redacted passage",
        locked: "Sealed file",
        eta: "Opening",
      },
    },
    project: {
      back: "All projects",
      role: "Role",
      period: "Period",
      type: "Type",
      links: "Links",
      about: "The project",
      highlights: "Key points",
      stack: "Skills used",
      stack_hint: "Click a skill to see the other projects using it.",
      gallery: "Screenshots",
      no_visuals: "Visuals coming soon",
      next: "Next project",
      viewGithub: "Source code",
      viewLive: "Visit site",
      no_links: "Private code",
      beta_title: "Version 1 · in testing",
      beta_text: "This project is playable from start to finish, but it is still being tested: balance, bugs and content are evolving.",
      close: "Close",
      previous_image: "Previous image",
      next_image: "Next image",
      not_found: "Project not found",
    },
    contact: {
      title: "Contact",
      lead: "A role, a mission, a question? Drop me a line.",
      name: "Full name",
      email: "Email address",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent. I'll get back to you soon.",
      error: "Something went wrong. Try again or email me directly.",
      new_message: "New message",
      info_email: "evan.quinchon@outlook.fr",
      info_phone: "+33 7 86 64 28 94",
      info_location: "Paris, France",
      email_label: "Email",
      phone_label: "Phone",
      location_label: "Location",
      or_form: "Or use the form",
    },
    footer: {
      rights: "All rights reserved.",
      built_with: "Designed and hand-coded with Next.js, Tailwind CSS and Framer Motion.",
      shortcuts: "Keyboard shortcuts",
    },
  },
};
