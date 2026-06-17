"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { BadgeCheck, Code, Server, ShieldCheck } from "lucide-react";
import { profile, stats } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const highlights = [
  { icon: ShieldCheck, title: "보안 · 권한 설계", text: "허가된 사용자만 접근하도록" },
  { icon: BadgeCheck, title: "입력값 검증", text: "잘못된 데이터로 안 깨지게" },
  { icon: Server, title: "REST API 개발", text: "검색 · 정렬 · 페이지네이션" },
  { icon: Code, title: "끝까지 책임", text: "기획부터 납품 · 수정까지" },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="About"
        title="저는 이런 사람이에요"
        subtitle="기술로 문제를 끝까지 해결하는 데 진심입니다."
      />

      <div className="grid items-start gap-10 lg:grid-cols-2">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted">
          <p>
            저는 화면(프론트엔드)부터 데이터베이스(백엔드)까지,{" "}
            <span className="font-semibold text-foreground">
              하나의 서비스를 처음부터 끝까지
            </span>{" "}
            직접 만듭니다. 외주를 맡기실 때 가장 중요한, 제대로 동작하고 끝까지
            책임지는 결과물을 지향합니다.
          </p>
          <p>
            특히{" "}
            <span className="font-semibold text-foreground">보안과 데이터 검증</span>
            에 신경 씁니다. 허가받지 않은 접근을 막고, 잘못된 입력으로 서비스가
            깨지지 않도록 꼼꼼하게 처리해 안심하고 맡길 수 있는 코드를 만듭니다.
          </p>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent">
                  <h.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{h.title}</p>
                  <p className="text-xs text-muted">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Code card */}
        <Reveal delay={1} className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-background-soft shadow-2xl shadow-black/10">
            <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-2 font-mono text-xs text-muted">developer.ts</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
              <code>
                <span className="text-fuchsia-400">const</span>{" "}
                <span className="text-sky-400">developer</span>{" "}
                <span className="text-muted">=</span>{" "}
                <span className="text-muted">{"{"}</span>
                {"\n  "}
                <span className="text-emerald-400">name</span>
                <span className="text-muted">:</span>{" "}
                <span className="text-amber-300">{`'${profile.nameEn}'`}</span>
                <span className="text-muted">,</span>
                {"\n  "}
                <span className="text-emerald-400">role</span>
                <span className="text-muted">:</span>{" "}
                <span className="text-amber-300">{`'${profile.roles[0]}'`}</span>
                <span className="text-muted">,</span>
                {"\n  "}
                <span className="text-emerald-400">location</span>
                <span className="text-muted">:</span>{" "}
                <span className="text-amber-300">{`'${profile.location}'`}</span>
                <span className="text-muted">,</span>
                {"\n  "}
                <span className="text-emerald-400">stack</span>
                <span className="text-muted">:</span>{" "}
                <span className="text-muted">[</span>
                <span className="text-amber-300">{`'Next.js'`}</span>
                <span className="text-muted">, </span>
                <span className="text-amber-300">{`'Supabase'`}</span>
                <span className="text-muted">, </span>
                <span className="text-amber-300">{`'Node'`}</span>
                <span className="text-muted">],</span>
                {"\n  "}
                <span className="text-emerald-400">available</span>
                <span className="text-muted">:</span>{" "}
                <span className="text-fuchsia-400">true</span>
                <span className="text-muted">,</span>
                {"\n  "}
                <span className="text-emerald-400">coffee</span>
                <span className="text-muted">:</span>{" "}
                <span className="text-fuchsia-400">Infinity</span>
                <span className="text-muted">,</span>
                {"\n"}
                <span className="text-muted">{"}"}</span>
              </code>
            </pre>
          </div>
          <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-accent/20 to-accent-2/20 blur-2xl" />
        </Reveal>
      </div>

      {/* Stats band */}
      <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i}>
            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="text-3xl font-bold text-gradient sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-1 text-xs text-muted sm:text-sm">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
