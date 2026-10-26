export type ExperienceItem = {
  id: string;
  type: "work" | "education" | "project";
  title_fr: string;
  title_en: string;
  org: string;
  location?: string;
  period_start: string;
  period_end: string | null;
  desc_fr: string;
  desc_en: string;
  tags?: string[];
};
