# 김준영 — 개발 포트폴리오

풀스택 웹 서비스와 REST API를 기획부터 배포까지 직접 만드는 개발자 김준영의 작업물 쇼케이스입니다.

**Live: [www.nalulus.com](https://www.nalulus.com)**

## 소개

실제로 동작하는 프로젝트들을 라이브 데모와 함께 소개합니다. 회원·게시판형 풀스택 웹앱, 문서화된 REST API, 인터랙션 중심 랜딩 페이지, 실시간 공공데이터 시각화까지 — 모든 작업물은 직접 설계하고 배포한 것들입니다.

## 기술 스택

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — 스크롤 인터랙션과 섹션 애니메이션
- **Vercel** — 배포 및 웹 분석

## 주요 기능

- 히어로 타이핑 이펙트, 스크롤 진행바, 카운트업 통계
- 프로젝트 카테고리 필터 (Web App / API / Website)
- 다크·라이트 테마 전환
- ⌘K 명령 팔레트 (섹션·프로젝트 바로가기)
- 완전 반응형 레이아웃

## 구조

사이트의 모든 콘텐츠(프로필, 프로젝트, 서비스, 기술 스택)는 [`src/lib/data.ts`](src/lib/data.ts) 한 파일에서 관리합니다. 콘텐츠 수정 시 컴포넌트를 건드릴 필요가 없습니다.

```
src/
├── app/            # 라우트, 레이아웃, 메타데이터
├── components/     # 섹션별 컴포넌트 (hero, projects, services, ...)
└── lib/data.ts     # 모든 콘텐츠가 여기에
```

## 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

## 문의

프로젝트 의뢰는 [크몽](https://kmong.com/gig/780004)에서 받고 있습니다.
