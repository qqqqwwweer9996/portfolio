"use client";

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
          subtitle="이런 기술로 직접 만듭니다."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = categoryIcon[group.category] ?? CodeXml;
            return (
              <Reveal key={group.category} delay={gi}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold">{group.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-border bg-background-soft px-3 py-1.5 text-sm text-foreground/80"
                      >
                        {item}
                      </span>
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
