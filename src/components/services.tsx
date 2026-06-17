"use client";

import { ArrowUpRight, LayoutGrid, Server, Wrench } from "lucide-react";
import { profile, processSteps, services } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const serviceIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  web: LayoutGrid,
  api: Server,
  improve: Wrench,
};

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 bg-background-soft/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="이렇게 도와드립니다"
          subtitle="필요한 서비스를 처음부터 끝까지 책임지고 만들어 드립니다."
        />

        {/* 제공 서비스 */}
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcon[s.key] ?? LayoutGrid;
            return (
              <Reveal key={s.key} delay={i}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* 진행 방식 */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
              진행 방식
            </h3>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="font-mono text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-2 font-semibold">{step.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 견적 · 상담 안내 */}
        <Reveal>
          <div className="mt-16 flex flex-col items-center gap-5 rounded-2xl border border-border bg-card px-6 py-10 text-center">
            <p className="max-w-xl text-base leading-relaxed text-muted">
              프로젝트 규모에 따라 일정과 견적이 달라집니다. 원하시는 기능을
              알려주시면 예상 일정과 범위를 맞춰 드려요.
            </p>
            {profile.kmongUrl ? (
              <a
                href={profile.kmongUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.03]"
              >
                크몽에서 상담하기
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-soft px-5 py-2.5 text-sm font-medium text-muted">
                크몽 메시지로 편하게 문의해 주세요
              </span>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
