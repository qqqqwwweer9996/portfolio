"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "./social-icons";
import { projects, projectCategories } from "@/lib/data";
import { SectionHeading } from "./section-heading";

type Category = (typeof projectCategories)[number];

export function Projects() {
  const [filter, setFilter] = useState<Category>("All");
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6"
    >
      <SectionHeading
        eyebrow="Work"
        title="프로젝트"
        subtitle="제가 만들고 다듬은 작업물 일부입니다."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
          >
            {filter === cat && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 ${
                filter === cat ? "text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {cat}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent/50"
            >
              <div
                className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${p.gradient}`}
              >
                <span className="text-5xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                  {p.emoji}
                </span>

                <span className="absolute right-3 top-3 rounded-full bg-black/25 px-2 py-0.5 font-mono text-[11px] text-white backdrop-blur-sm">
                  {p.year}
                </span>
                {p.featured && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/25 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-current" /> Featured
                  </span>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-black transition-transform hover:scale-105"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live
                  </a>
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105"
                  >
                    <GithubIcon className="h-3.5 w-3.5" /> Code
                  </a>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-background-soft px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
