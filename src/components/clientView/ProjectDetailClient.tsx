"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Project } from "@/type/project";

export default function ProjectDetailClient({
  project,
  onClose,
}: {
  project: Project | null;
  onClose?: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    project?.image_url ?? null
  );

  const allImages = useMemo(
    () =>
      project
        ? ([project.image_url, ...(project.gallery_urls || [])].filter(
            Boolean
          ) as string[])
        : [],
    [project]
  );

  const handleClose = () => {
    if (onClose) onClose();
    else window.location.hash = "#projects";
  };

  if (!project) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-xl mb-6">Projet non trouvé</p>
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="min-h-screen">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour aux projets
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                {project.featured && (
                  <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-semibold">
                    Projet Featured
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    <Github className="w-5 h-5" />
                    Code source
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Voir le site
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                {selectedImage ? (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={selectedImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <span className="text-6xl font-bold text-gray-400">
                      {project.title[0]}
                    </span>
                  </div>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-4 transition-all ${
                        selectedImage === image
                          ? "border-blue-600 shadow-lg"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  À propos du projet
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="whitespace-pre-wrap">
                    {project.full_description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Technologies utilisées
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Informations
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">
                      Créé le:
                    </span>
                    <p className="text-gray-600">
                      {new Date(project.created_at).toLocaleDateString(
                        "fr-FR",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                  </div>

                  {project.updated_at !== project.created_at && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Mis à jour le:
                      </span>
                      <p className="text-gray-600">
                        {new Date(project.updated_at).toLocaleDateString(
                          "fr-FR",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
