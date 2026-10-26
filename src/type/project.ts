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
   * - "soon": work in progress, shown as a sealed file without a detail page.
   * - "beta": first playable version, still being tested (badge + notice on its page).
   */
  status?: "soon" | "beta";
  /** Teaser of a "soon" project; `[[...]]` passages are redacted. */
  teaser?: string;
  role?: string;
  period?: string;
  highlights?: string[];
  /** Cover image for the card and page header. Defaults to the first gallery image. */
  cover?: string;
  /** Screenshots shown in the project page gallery. */
  gallery: ProjectImage[];
  github_url?: string | null;
  live_url?: string | null;
  featured?: boolean;
  order_index?: number;
  technologies: string[];
};
