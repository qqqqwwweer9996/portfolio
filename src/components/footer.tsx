import { navLinks, profile, socials } from "@/lib/data";
import { SocialIcon } from "./social-icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-white">
              {profile.initials}
            </span>
            <span>
              <span className="block font-semibold">{profile.nameEn}</span>
              <span className="block text-sm text-muted">{profile.roles[0]}</span>
            </span>
          </a>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted transition-colors hover:text-accent"
              >
                <SocialIcon k={s.key} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {year} {profile.nameEn}. All rights reserved.
          </p>
          <p className="font-mono text-xs">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
