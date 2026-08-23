# AayusX — 3D Physics Portfolio

Interactive portfolio of **Aayush Bhandari (AayusX)** — full-stack developer & AI engineer from Kathmandu, Nepal. Project cubes you can grab, drag and throw around a physics world.

**Live:** https://aayusx.dev

## Stack

- React 18 + TypeScript + Vite
- Three.js via @react-three/fiber
- Rapier physics via @react-three/rapier
- drei helpers (Environment, Text, ContactShadows)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
npm run preview  # preview the production build
```

## Deploy

Pushes to `main` build automatically and deploy to GitHub Pages with the custom domain `aayusx.dev` (see `.github/workflows/static.yml` and `public/CNAME`).

## SEO / AEO / GEO notes

- Full meta + canonical set in `index.html`, JSON-LD schemas (`ProfilePage` → `Person`, `WebSite`, `FAQPage`)
- Static crawlable content ships inside `#root` so non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) read the full profile, project list and FAQ
- `public/robots.txt` explicitly allows AI crawlers; `public/llms.txt` gives answer engines structured facts
- Keep `index.html` static content in sync with `src/projectsData.ts`

## Contact

- Email: technology457t@gmail.com
- WhatsApp: +977 9746944429
- GitHub: https://github.com/AayusX
