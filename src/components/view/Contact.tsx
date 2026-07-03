"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const contactCards = [
    {
      icon: Mail,
      label: t.contact.email_label,
      value: t.contact.info_email,
      href: `mailto:${t.contact.info_email}`,
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: Phone,
      label: t.contact.phone_label,
      value: t.contact.info_phone,
      href: `tel:+33${t.contact.info_phone.replace(/\s/g, "").slice(1)}`,
      color: "from-fuchsia-500 to-pink-600",
    },
    {
      icon: MapPin,
      label: t.contact.location_label,
      value: t.contact.info_location,
      href: null,
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey);
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-slate-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-3">
            {t.contact.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {t.contact.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 mx-auto rounded-full" />
        </AnimatedSection>

        {/* Contact info cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {contactCards.map(({ icon: Icon, label, value, href, color }, i) => (
            <AnimatedSection key={label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-700/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {value}
                  </span>
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Form */}
        <AnimatedSection>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-10 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {t.contact.success}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 px-6 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 transition-all"
                >
                  ← Nouveau message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                      placeholder="Evan Quinchon"
                    />
                  </div>
                  <div>
                    <label htmlFor="from_email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                      placeholder="vous@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t.contact.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    placeholder="Opportunité, collaboration..."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                    placeholder="Bonjour Evan, je souhaite..."
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {t.contact.error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: status === "sending" ? 1 : 1.01 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-violet-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.contact.send}
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
