// ───────────────────────────────────────────────────────────────────────────
// Edit everything about the portfolio from this single file.
// Names, copy, projects, skills, links — all live here.
// ───────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "김준영",
  nameEn: "Junyoung Kim",
  initials: "JK",
  // The hero cycles through these roles with a typing effect.
  roles: [
    "Backend Developer",
    "Full-Stack Developer",
    "Problem Solver",
  ],
  tagline: "기본기를 탄탄히 다지는 신입 백엔드 개발자",
  bio: "REST API와 풀스택 웹 서비스를 직접 설계하고 만들며 성장 중인 신입 개발자입니다. 보안, 데이터 검증, 그리고 의존성을 최소화한 깔끔한 코드를 지향합니다.",
  location: "Busan, South Korea",
  email: "sotk8045@gmail.com",
  available: true, // shows the "available for work" badge
  resumeUrl: "#",
};

export type SocialKey = "github" | "linkedin" | "twitter" | "mail";

export const socials: { key: SocialKey; label: string; href: string }[] = [
  { key: "github", label: "GitHub", href: "https://github.com/qqqqwwweer9996" },
  { key: "mail", label: "Email", href: "mailto:sotk8045@gmail.com" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Honest, project-derived numbers — no inflated claims.
export const stats = [
  { value: 2, suffix: "", label: "완성한 프로젝트" },
  { value: 10, suffix: "+", label: "구현한 API 엔드포인트" },
  { value: 7, suffix: "", label: "직접 만든 화면" },
  { value: 100, suffix: "%", label: "직접 구현 (의존성 최소화)" },
];

export type SkillGroup = {
  category: string;
  items: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React / Next.js", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Tailwind CSS", level: 80 },
      { name: "HTML / CSS", level: 85 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 78 },
      { name: "REST API 설계", level: 80 },
      { name: "Supabase / PostgreSQL", level: 72 },
      { name: "SQLite", level: 70 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git / GitHub", level: 78 },
      { name: "Vercel / Render", level: 75 },
      { name: "Zod 검증", level: 72 },
      { name: "Swagger / OpenAPI", level: 68 },
    ],
  },
];

// Quick badge cloud under the hero.
export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "SQLite",
  "Zod",
  "Swagger",
  "Vercel",
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  category: "Web App" | "API";
  year: string;
  gradient: string; // tailwind gradient classes for the cover
  emoji: string;
  demoUrl: string;
  repoUrl: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "강원도 소상공인 후기 게시판",
    description:
      "강원도 소상공인 리뷰를 작성·공유하는 풀스택 웹앱. 이메일 인증, 별점 리뷰 CRUD, 디바운스 실시간 검색, 이미지 업로드, 그리고 RLS 기반 권한 제어까지 직접 구현했습니다.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "Tailwind"],
    category: "Web App",
    year: "2026",
    gradient: "from-indigo-500 via-purple-500 to-fuchsia-500",
    emoji: "📝",
    demoUrl: "https://review-board-red.vercel.app/",
    repoUrl: "https://github.com/qqqqwwweer9996/review-board",
    featured: true,
  },
  {
    title: "Cafe Menu Management API",
    description:
      "카페 메뉴 관리를 위한 REST API. 필터·정렬·검색·페이지네이션, Zod 입력 검증, 통계 집계, 그리고 OpenAPI(Swagger) 문서까지 갖춘 백엔드입니다.",
    tags: ["Node.js", "Next.js", "SQLite", "Zod", "Swagger"],
    category: "API",
    year: "2026",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    emoji: "☕",
    demoUrl: "https://cafe-menu-api-lchp.onrender.com/api-docs",
    repoUrl: "https://github.com/qqqqwwweer9996/cafe-menu-api",
    featured: true,
  },
];

export const projectCategories = ["All", "Web App", "API"] as const;
