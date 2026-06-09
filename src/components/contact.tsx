"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Loader2, Mail, MapPin, Send } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { SocialIcon } from "./social-icons";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "전송에 실패했어요. 잠시 후 다시 시도해주세요.");
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "전송에 실패했어요.");
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6"
    >
      <SectionHeading
        eyebrow="Contact"
        title="함께 만들어요"
        subtitle="새로운 기회, 협업, 또는 그냥 인사도 환영합니다."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal className="space-y-6 lg:col-span-2">
          <p className="text-base leading-relaxed text-muted">
            프로젝트 의뢰나 채용 관련 문의는 아래 폼이나 이메일로 보내주세요.
            보통 <span className="font-semibold text-foreground">24시간 이내</span>에
            답장드립니다.
          </p>

          <button
            type="button"
            onClick={copyEmail}
            className="group flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-accent/50"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white">
              <Mail className="h-5 w-5" />
            </span>
            <span className="flex-1">
              <span className="block text-xs text-muted">Email</span>
              <span className="block text-sm font-medium">{profile.email}</span>
            </span>
            <span className="text-muted transition-colors group-hover:text-accent">
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </span>
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white">
              <MapPin className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs text-muted">Location</span>
              <span className="block text-sm font-medium">{profile.location}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:-translate-y-0.5 hover:text-accent"
              >
                <SocialIcon k={s.key} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={1} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-border bg-card p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="name">
                  이름
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="email">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="message">
                메시지
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${field} resize-none`}
                placeholder="어떤 프로젝트를 구상 중이신가요?"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-opacity disabled:opacity-80"
            >
              {status === "loading" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> 보내는 중…
                </>
              )}
              {status === "success" && (
                <>
                  <Check className="h-4 w-4" /> 전송 완료! 곧 답장드릴게요
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  <Send className="h-4 w-4" /> 메시지 보내기
                </>
              )}
            </motion.button>

            {status === "error" && (
              <p className="text-center text-sm text-red-500">{errorMsg}</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
