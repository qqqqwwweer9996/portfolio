"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  CornerDownLeft,
  Copy,
  FileText,
  Hash,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { navLinks, profile, socials } from "@/lib/data";
import { SocialIcon } from "./social-icons";

type Item = {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items: Item[] = useMemo(() => {
    const goTo = (href: string) => () => {
      setOpen(false);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    const nav: Item[] = navLinks.map((l) => ({
      id: "nav-" + l.href,
      label: l.label,
      group: "이동",
      icon: <Hash className="h-4 w-4" />,
      run: goTo(l.href),
    }));

    const actions: Item[] = [
      {
        id: "theme",
        label: "테마 전환 (라이트 / 다크)",
        group: "액션",
        icon:
          resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          ),
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "copy-email",
        label: "이메일 주소 복사",
        group: "액션",
        icon: <Copy className="h-4 w-4" />,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setOpen(false);
        },
      },
      {
        id: "resume",
        label: "이력서 보기",
        group: "액션",
        icon: <FileText className="h-4 w-4" />,
        run: () => {
          window.open(profile.resumeUrl, "_blank");
          setOpen(false);
        },
      },
    ];

    const social: Item[] = socials.map((s) => ({
      id: "social-" + s.key,
      label: s.label,
      group: "링크",
      icon: <SocialIcon k={s.key} className="h-4 w-4" />,
      run: () => {
        window.open(s.href, "_blank");
        setOpen(false);
      },
    }));

    return [...nav, ...actions, ...social];
  }, [resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q),
    );
  }, [items, query]);

  // Group while preserving each item's flat index (used for keyboard navigation).
  const groups = useMemo(() => {
    const map = new Map<string, { item: Item; index: number }[]>();
    filtered.forEach((item, index) => {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push({ item, index });
    });
    return [...map.entries()];
  }, [filtered]);

  // Global open/close shortcuts + custom event from the navbar button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "";
  }, [open]);

  useEffect(() => setActive(0), [query]);

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh]"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background-soft shadow-2xl"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="이동할 섹션이나 명령을 검색…"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted"
              />
              <kbd className="rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-muted">
                  &quot;{query}&quot;에 대한 결과가 없어요
                </p>
              )}

              {groups.map(([groupName, entries]) => (
                <div key={groupName} className="mb-1">
                  <p className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                    {groupName}
                  </p>
                  {entries.map(({ item, index }) => (
                    <button
                      key={item.id}
                      data-index={index}
                      type="button"
                      onMouseEnter={() => setActive(index)}
                      onClick={() => item.run()}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        active === index
                          ? "bg-gradient-to-r from-accent/15 to-accent-2/15 text-accent"
                          : "text-foreground"
                      }`}
                    >
                      <span
                        className={
                          active === index ? "text-accent" : "text-muted"
                        }
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {active === index && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-muted" />
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-card px-1">↑</kbd>
                <kbd className="rounded border border-border bg-card px-1">↓</kbd>
                이동
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-card px-1">↵</kbd>
                선택
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
