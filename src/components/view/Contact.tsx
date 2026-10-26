"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle, AlertCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/lib/LanguageContext";
import { GithubIcon, LinkedinIcon, SOCIALS } from "@/components/ui/icons";
import RollText from "@/components/motion/RollText";
import Magnetic from "@/components/motion/Magnetic";
import Glitch from "@/components/motion/Glitch";
import { EASE } from "@/lib/motion";

const inputClass =
  "w-full bg-transparent border-0 border-b border-dashed border-line py-2.5 font-mono text-base text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent focus:border-solid transition-colors";

function Prompt({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label text-accent">
        &gt; {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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

  const details = [
    { label: t.contact.phone_label, value: t.contact.info_phone, href: `tel:${t.contact.info_phone.replace(/\s/g, "")}` },
    { label: t.contact.location_label, value: t.contact.info_location, href: null },
  ];

  return (
    <section id="contact" className="px-5 md:px-10 max-w-[1400px] mx-auto pt-24 md:pt-40 pb-24">
      <SectionHeader index="04" title={t.contact.title} jp="通信" lead={t.contact.lead} />

      <motion.a
        href={SOCIALS.email}
        className="group relative block chamfer bg-accent text-accent-ink p-5 md:p-8 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="label flex items-center gap-2">
          <span className="w-2 h-2 bg-accent-ink animate-[blink_1s_steps(1)_infinite]" />
          {t.cyber.channel} {"//"} {t.contact.email_label}
        </span>
        <span className="mt-4 flex items-end justify-between gap-6">
          {/* From md up, the size is computed from the space left (paddings + arrow) so the email fits on one line */}
          <span className="display text-[clamp(1.4rem,5vw,5rem)] md:text-[min(5rem,calc((100vw-17rem)/13.5))] leading-none break-all md:break-normal md:whitespace-nowrap">
            <Glitch text={t.contact.info_email} />
          </span>
          <Magnetic strength={0.5}>
            <span className="flex items-center justify-center w-14 h-14 md:w-24 md:h-24 bg-accent-ink text-accent chamfer-sm">
              <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10 transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </Magnetic>
        </span>
      </motion.a>

      <div className="grid grid-cols-12 gap-x-6 gap-y-8 mt-6">
        <dl className="col-span-12 md:col-span-4 chamfer bg-surface p-5 md:p-6 space-y-5 self-start">
          {details.map(({ label, value, href }) => (
            <div key={label}>
              <dt className="label text-muted">{label}</dt>
              <dd className="mt-1 font-mono">
                {href ? (
                  <a href={href} className="link-underline hover:text-accent">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
          <div className="flex gap-4 pt-1">
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </dl>

        <div className="col-span-12 md:col-span-8 chamfer bg-surface overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-ink label">
            <span className="w-2.5 h-2.5 bg-red" />
            <span className="w-2.5 h-2.5 bg-accent-ink" />
            <span className="w-2.5 h-2.5 bg-cyan" />
            <span className="ml-3 normal-case tracking-normal opacity-70">evan@netrunner:~/contact — {t.cyber.open_channel}</span>
          </div>

          <div className="p-5 md:p-7">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-4 py-8 font-mono"
              >
                <CheckCircle className="w-10 h-10 text-accent" />
                <p className="text-xl">&gt; {t.contact.success}</p>
                <button onClick={() => setStatus("idle")} className="btn-ghost px-4 py-2 text-sm">
                  {t.contact.new_message}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <Prompt id="from_name" label={t.contact.name}>
                  <input type="text" id="from_name" name="from_name" required autoComplete="name" placeholder="_" className={inputClass} />
                </Prompt>
                <Prompt id="from_email" label={t.contact.email}>
                  <input type="email" id="from_email" name="from_email" required autoComplete="email" placeholder="_" className={inputClass} />
                </Prompt>
                <div className="md:col-span-2">
                  <Prompt id="subject" label={t.contact.subject}>
                    <input type="text" id="subject" name="subject" required placeholder="_" className={inputClass} />
                  </Prompt>
                </div>
                <div className="md:col-span-2">
                  <Prompt id="message" label={t.contact.message}>
                    <textarea id="message" name="message" rows={5} required placeholder="_" className={`${inputClass} resize-none`} />
                  </Prompt>
                </div>

                {status === "error" && (
                  <p className="md:col-span-2 flex items-center gap-2 text-red font-mono text-sm" role="alert">
                    <AlertCircle className="w-4 h-4" />
                    ERR // {t.contact.error}
                  </p>
                )}

                <div className="md:col-span-2 flex items-center justify-between gap-4">
                  <span className="label text-muted caret">{status === "sending" ? t.contact.sending : "ready"}</span>
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group btn-cyber inline-flex items-center gap-3 px-6 py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                      <RollText text={status === "sending" ? t.contact.sending : t.contact.send} />
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
