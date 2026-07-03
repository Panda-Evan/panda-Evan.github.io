"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NotFound() {
  const [path] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "..."
  );

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-violet-500/8 dark:bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-fuchsia-500/8 dark:bg-fuchsia-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-xl mx-auto">
        {/* 404 */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          className="select-none"
        >
          <span className="font-black text-[140px] md:text-[180px] leading-none bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        {/* Terminal block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="font-mono text-sm text-left bg-slate-900 rounded-xl p-5 mb-8 border border-slate-700/60 shadow-xl"
        >
          <p className="text-red-400">
            <span className="text-slate-600">$ </span>
            SegmentationFault: page not found at{" "}
            <span className="text-red-300">0x404</span>
          </p>
          <p className="text-slate-500 mt-1.5">
            <span className="text-slate-600">$ </span>
            trace: <span className="text-slate-400">{path}</span>
          </p>
          <p className="text-green-400 mt-1.5">
            <span className="text-slate-600">$ </span>
            suggestion: cd /home
            <span className="inline-block w-1.5 h-3.5 bg-green-400 ml-1 mb-[-2px] animate-pulse" />
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
