export type ProjectImage = {
  src: string;
  caption?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  full_description: string;
  category?: "perso" | "ecole";
  /**
   * "soon" : projet en cours, affiché comme un dossier scellé, sans page dédiée.
   * "beta" : première version jouable, encore en test (badge + encart sur la page).
   */
  status?: "soon" | "beta";
  /** Accroche des projets "soon". Les passages entre [[ ]] sont caviardés. */
  teaser?: string;
  role?: string;
  period?: string;
  highlights?: string[];
  /** Image de couverture (liste + haut de la page projet). Par défaut : 1re image de la galerie. */
  cover?: string;
  /** Toutes les captures du projet, affichées dans la galerie de la page dédiée. */
  gallery: ProjectImage[];
  github_url?: string | null;
  live_url?: string | null;
  featured?: boolean;
  order_index?: number;
  technologies: string[];
};
