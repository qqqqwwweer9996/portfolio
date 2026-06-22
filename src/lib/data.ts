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
  tagline: "필요한 웹 서비스와 API를 처음부터 끝까지 만들어 드립니다",
  bio: "REST API와 풀스택 웹 서비스를 기획부터 개발·배포까지 직접 만듭니다. 보안과 데이터 검증을 꼼꼼히 챙겨, 믿고 맡길 수 있는 결과물로 완성해 드립니다.",
  location: "Busan, South Korea",
  available: true, // shows the "available for work" badge
  // 크몽 의뢰 페이지 URL을 넣으면 Services 섹션에 '크몽에서 상담하기' 버튼이 자동으로 나타납니다. 비워두면 버튼이 숨겨집니다.
  kmongUrl: "https://kmong.com/gig/780004",
};

export type SocialKey = "github" | "linkedin" | "twitter" | "mail";

export const socials: { key: SocialKey; label: string; href: string }[] = [
  { key: "github", label: "GitHub", href: "https://github.com/qqqqwwweer9996" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

// Honest, project-derived numbers — no inflated claims.
export const stats = [
  { value: 2, suffix: "", label: "완성한 프로젝트" },
  { value: 10, suffix: "+", label: "구현한 API 엔드포인트" },
  { value: 7, suffix: "", label: "직접 만든 화면" },
  { value: 100, suffix: "%", label: "직접 개발" },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "반응형 UI"],
  },
  {
    category: "Backend",
    items: ["Node.js", "REST API 설계", "Supabase / PostgreSQL", "SQLite"],
  },
  {
    category: "Tools",
    items: ["Git / GitHub", "Vercel / Render 배포", "Zod 입력 검증", "Swagger 문서화"],
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
  category: "Web App" | "API" | "Website";
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
      "회원가입·로그인, 글 작성, 이미지 업로드, 실시간 검색까지 갖춘 풀스택 웹 서비스입니다. 회원만 글을 쓰고 본인 글만 수정·삭제하도록 권한과 보안을 직접 설계했습니다. 커뮤니티·예약·리뷰형 사이트에 그대로 응용할 수 있습니다.",
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
      "상품·메뉴 데이터를 다루는 REST API입니다. 검색·필터·정렬·페이지네이션과 입력값 검증을 갖췄고, 바로 테스트해볼 수 있는 문서(Swagger)까지 제공합니다. 앱·웹 서비스의 백엔드나 외부 연동용 API가 필요할 때 만들어 드립니다.",
    tags: ["Node.js", "Next.js", "SQLite", "Zod", "Swagger"],
    category: "API",
    year: "2026",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    emoji: "☕",
    demoUrl: "https://cafe-menu-api-lchp.onrender.com/api-docs",
    repoUrl: "https://github.com/qqqqwwweer9996/cafe-menu-api",
    featured: true,
  },
  {
    title: "Wave Coffee — 카페 원페이지",
    description:
      "가상의 광안리 카페를 위해 만든 반응형 원페이지 샘플입니다. 메뉴·매장 소개·오시는 길·문의까지 소상공인 매장에 필요한 구성을 한 페이지에 담았습니다. 카페·음식점·공방 등 업종에 맞춰 제작해 드립니다.",
    tags: ["HTML", "CSS", "반응형", "샘플"],
    category: "Website",
    year: "2026",
    gradient: "from-amber-700 via-amber-600 to-stone-700",
    emoji: "🌊",
    demoUrl: "https://qqqqwwweer9996.github.io/cafe-example/",
    repoUrl: "https://github.com/qqqqwwweer9996/cafe-example",
    featured: false,
  },
];

export const projectCategories = ["All", "Web App", "API", "Website"] as const;

export type Service = {
  key: "web" | "api" | "improve";
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    key: "web",
    title: "풀스택 웹 · 웹앱 제작",
    description:
      "회원·게시판·예약·리뷰처럼 데이터가 오가는 웹 서비스를 화면부터 데이터베이스까지 통째로 만들어 드립니다.",
  },
  {
    key: "api",
    title: "REST API 개발",
    description:
      "앱·웹의 백엔드나 외부 연동용 API를 입력값 검증과 문서(Swagger)까지 갖춰 제대로 만들어 드립니다.",
  },
  {
    key: "improve",
    title: "기능 추가 · 개선 · 버그 수정",
    description:
      "이미 운영 중인 서비스에 기능을 더하거나, 느리고 불안정한 부분을 찾아 손봐 드립니다.",
  },
];

export type ProcessStep = { title: string; description: string };

export const processSteps: ProcessStep[] = [
  { title: "요구사항 정리", description: "원하시는 기능과 범위를 함께 정확히 맞춰요." },
  { title: "개발", description: "진행 상황을 중간중간 공유하며 만듭니다." },
  { title: "검토 · 수정", description: "확인 후 요청하신 수정 사항을 반영해요." },
  { title: "납품 · 이관", description: "소스코드와 사용법을 함께 전달드립니다." },
];
