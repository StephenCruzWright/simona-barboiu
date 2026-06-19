# Simona Barboiu Portfolio
<p align="center">
  <img src="https://github.com/StephenCruzWright/simona-barboiu/blob/main/public/LogoOffWhite.png" alt="Portfolio Website">
</p>

<p align="center">
  <a href="https://github.com/StephenCruzWright/simona-barboiu/actions/workflows?branch=main">
    <img src="https://img.shields.io/github/actions/workflow/status/StephenCruzWright/simona-barboiu/npm-publish-github-packages.yml?branch=main&style=for-the-badge" alt="CI status">
  </a>
  <a href="https://github.com/StephenCruzWright/simona-barboiu/releases"><img alt="GitHub deployments" src="https://img.shields.io/github/deployments/StephenCruzWright/simona-barboiu/Production?branch=main&style=for-the-badge"></a>
  <a href=""><img src="https://img.shields.io/github/created-at/StephenCruzWright/simona-barboiu?label=Creation&logo=github&logoColor=white&color=5865F2&style=for-the-badge" alt="GitHub Created At"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/StephenCruzWright/simona-barboiu?branch=main&style=for-the-badge" alt="License"></a>
  <a href=""><img src="https://img.shields.io/github/commit-activity/w/StephenCruzWright/simona-barboiu?branch=main&style=for-the-badge" alt="GitHub commit activity"></a>
</p>

## About

This is the portfolio website made for Simona Barboiu, a multifaceted 3D/2D artist/designer, actively hosted with Vercel on [simonabarboiu.com](https://simonabarboiu.com).

Built with **Next.js 16** (App Router) + **React 19**, **Tailwind CSS v4** (CSS-first `@theme`), **TypeScript** (strict), and a motion stack of **GSAP + ScrollTrigger**, **Lenis** (smooth scroll), and **Split-Type**, plus **Three.js** for the WebGL hero. Bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Documentation

- [CLAUDE.md](CLAUDE.md) — project context, brand, conventions, and the redesign roadmap (current status of every phase).
- [docs/design-research.md](docs/design-research.md) — the verified research synthesis (best-in-class web design patterns) driving the redesign.

## Preview

This project is actively hosted with vercel on [simonabarboiu.com](https://simonabarboiu.com)

## Background
This project's workflow is managed via the github Kanban board project, and it roughly goes like this:

``` 
              Figma
                │
                ▼
┌────────────────────────────────┐
│ Task creation on GitHub Kanban │
└───────────────┬────────────────┘
                │
                ├─ Infrastructure creation
                ├─ Routing
                ├─ Component creation
                ├─ Optimisation
                └─ Final Product
```


## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit files (start with `app/page.tsx`).

### Scripts

| Script | What it does |
| --- | --- |
| `pnpm run dev` | Start the Next.js dev server (HMR) at http://localhost:3000 |
| `pnpm run build` | Production build |
| `pnpm run start` | Serve the production build |
| `pnpm run lint` | ESLint (run with `npx tsc --noEmit` before committing) |
| `pnpm run test:media` | Validate media references after adding/moving files in `public/` |
