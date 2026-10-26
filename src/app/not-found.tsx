"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [path, setPath] = useState("...");

  useEffect(() => {
    queueMicrotask(() => setPath(window.location.pathname));
  }, []);

  return (
    <main className="min-h-[100svh] px-5 md:px-10 max-w-[1400px] mx-auto pt-28 pb-16 flex flex-col">
      <p className="label text-muted border-b border-line pb-3">Erreur 404</p>

      <h1 className="display text-[clamp(6rem,30vw,26rem)] mt-8">
        404<span className="text-accent">.</span>
      </h1>

      <div className="mt-auto grid grid-cols-12 gap-6 border-t border-ink pt-6">
        <div className="col-span-12 md:col-span-6 font-mono text-sm space-y-1.5">
          <p>
            <span className="text-muted">$ </span>cd {path}
          </p>
          <p className="text-accent">
            <span className="text-muted">$ </span>no such file or directory
          </p>
        </div>
        <div className="col-span-12 md:col-span-6 md:text-right">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-ink text-paper px-5 py-3 font-medium hover:bg-accent hover:text-accent-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
