"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, MapPin } from "lucide-react";
import { profile, socials, techStack } from "@/lib/data";
import { SocialIcon } from "./social-icons";

function useTypewriter(
  words: string[],
  { typeSpeed = 85, deleteSpeed = 40, pause = 1500 } = {},
) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && sub === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && sub === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setSub((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          );
        },
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [sub, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return sub;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function Hero() {
  const role = useTypewriter(profile.roles);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(450px circle at ${mx}px ${my}px, color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%)`;

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Backdrop layers */}
      <div className="absolute inset-0 bg-grid" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <div className="blob animate-blob left-[-10%] top-[5%] h-72 w-72 bg-accent/40" />
      <div
        className="blob animate-blob right-[-5%] top-[20%] h-80 w-80 bg-accent-2/40"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="blob animate-blob bottom-[-10%] left-[30%] h-72 w-72 bg-accent-3/30"
        style={{ animationDelay: "-9s" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        {profile.available && (
          <motion.div variants={item} className="mb-6 flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              새로운 프로젝트 환영합니다
            </span>
          </motion.div>
        )}

        <motion.p
          variants={item}
          className="mb-3 flex items-center gap-2 font-mono text-sm text-accent"
        >
          <MapPin className="h-4 w-4" /> {profile.location}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          안녕하세요, <span className="text-gradient">{profile.name}</span>
          <span className="text-muted">입니다</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-4 flex h-10 items-center text-2xl font-semibold sm:text-4xl"
        >
          <span className="font-mono text-muted">&gt;_ </span>
          <span className="ml-2 text-foreground">{role}</span>
          <span className="ml-0.5 inline-block h-7 w-[3px] translate-y-0.5 bg-accent cursor-blink sm:h-9" />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {profile.bio}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.03]"
          >
            프로젝트 보기
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            연락하기
          </a>
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <FileText className="h-4 w-4" /> 이력서
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-7 flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted transition-all hover:-translate-y-0.5 hover:text-accent"
            >
              <SocialIcon k={s.key} className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-border bg-card px-2.5 py-1 font-mono text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </a>
    </section>
  );
}
