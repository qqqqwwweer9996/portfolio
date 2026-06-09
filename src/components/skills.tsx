"use client";

import { motion } from "framer-motion";
import { CodeXml, Server, Wrench } from "lucide-react";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const categoryIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: CodeXml,
  Backend: Server,
  Tools: Wrench,
};

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-20 bg-background-soft/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Skills"
          title="기술 스택"
          subtitle="매일 쓰는 도구들과 숙련도입니다."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = categoryIcon[group.category] ?? CodeXml;
            return (
              <Reveal key={group.category} delay={gi}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold">{group.category}</h3>
                  </div>

                  <div className="space-y-4">
                    {group.items.map((item) => (
                      <div key={item.name}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-medium">{item.name}</span>
                          <span className="font-mono text-xs text-muted">
                            {item.level}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
