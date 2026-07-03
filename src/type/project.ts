export type Project = {
  id: string;
  title: string;
  description: string;
  full_description: string;
  category?: "perso" | "ecole";
  role?: string;
  period?: string;
  highlights?: string[];
  image_url?: string | null;
  gallery_urls: string[];
  github_url?: string | null;
  live_url?: string | null;
  featured?: boolean;
  order_index?: number;
  technologies: string[];
  created_at: string;
  updated_at: string;
};
