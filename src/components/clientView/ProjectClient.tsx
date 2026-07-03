"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import Image from "next/image";
import { Project } from "@/type/project";
import { useLanguage } from "@/lib/LanguageContext";
import AnimatedSection from "@/components/ui/AnimatedSection";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ImageCarousel({ project }: { project: Project }) {
  const images = project.gallery_urls.length > 0
    ? project.gallery_urls
    : project.image_url
    ? [project.image_url]
    : [];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-7xl font-black bg-gradient-to-br from-violet-600 to-fuchsia-500 bg-clip-text text-transparent opacity-50">
          {project.title[0]}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={images[index]}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[index]}
            alt={`${project.title} ${index + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setDirection(i > index ? 1 : -1); setIndex(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-medium bg-black/40 text-white rounded-md z-10">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}

type Props = { projects: Project[] };

export default function ProjectsClient({ projects }: Props) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const categories = useMemo(() => [
    { key: "all",   label: t.projects.all },
    { key: "perso", label: t.projects.cat_perso },
    { key: "ecole", label: t.projects.cat_ecole },
  ], [t]);

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter, projects]
  );

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-3">
            {t.projects.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 mx-auto rounded-full" />
        </AnimatedSection>

        {/* Category filter */}
        <AnimatedSection className="flex justify-center gap-2 mb-12">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-5 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                activeFilter === key
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400"
              }`}
            >
              {label}
            </button>
          ))}
        </AnimatedSection>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-slate-500 dark:text-slate-400 py-12"
            >
              {t.projects.noProjects}
            </motion.p>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-700/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelected(project)}
                >
                  {/* Image / Placeholder */}
                  <div className="relative aspect-video bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 overflow-hidden">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-black bg-gradient-to-br from-violet-600 to-fuchsia-500 bg-clip-text text-transparent opacity-60">
                          {project.title[0]}
                        </span>
                      </div>
                    )}
                    {project.featured && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-lg">
                        {t.projects.featured}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-md bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(project);
                        }}
                        className="flex-1 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                      >
                        {t.projects.viewDetails}
                      </button>
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all"
                          aria-label="GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all"
                          aria-label="Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal carousel */}
              <div className="relative aspect-video bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 overflow-hidden rounded-t-2xl">
                <ImageCarousel project={selected} />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/30 hover:bg-black/50 text-white transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                  {selected.title}
                </h3>

                {/* Role + period badges */}
                {(selected.role || selected.period) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selected.role && (
                      <span className="px-3 py-1 text-xs font-semibold bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50 rounded-full">
                        {selected.role}
                      </span>
                    )}
                    {selected.period && (
                      <span className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-full">
                        {selected.period}
                      </span>
                    )}
                  </div>
                )}

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {selected.full_description || selected.description}
                </p>

                {/* Highlights */}
                {selected.highlights && selected.highlights.length > 0 && (
                  <ul className="space-y-2 mb-5">
                    {selected.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {selected.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-lg bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {selected.github_url && (
                    <a
                      href={selected.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 font-medium text-sm transition-all"
                    >
                      <GithubIcon className="w-4 h-4" />
                      {t.projects.viewGithub}
                    </a>
                  )}
                  {selected.live_url && (
                    <a
                      href={selected.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.projects.viewLive}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
