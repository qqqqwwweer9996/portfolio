import { MapPin } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { SocialIcon } from "./social-icons";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-4xl scroll-mt-20 px-4 py-24 sm:px-6"
    >
      <SectionHeading
        eyebrow="Contact"
        title="함께 만들어요"
        subtitle="새로운 기회, 협업, 또는 그냥 인사도 환영합니다."
      />

      <Reveal>
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center sm:p-10">
          <p className="text-base leading-relaxed text-muted">
            프로젝트 의뢰나 채용 관련 문의는 GitHub로 편하게 연락주세요.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.03]"
              >
                <SocialIcon k={s.key} className="h-4 w-4" />
                {s.label}
              </a>
            ))}
          </div>

          <p className="mt-7 flex items-center justify-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4" /> {profile.location}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
