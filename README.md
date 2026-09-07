# MD Humayun — Portfolio

A single-page portfolio built as a technical journal: every diagram is a
numbered figure, and three projects carry an interactive demo.

**Live:** https://mdhumayun7.github.io/MD-HUMAYUN-PORTFOLIO/

## Stack

| Tool | Why |
| --- | --- |
| React 18 + Vite | fast dev server, tiny production build, no framework lock-in |
| Tailwind CSS | design tokens as CSS variables, so dark mode needs no duplicate classes |
| Framer Motion | the hero settle, diagram draw-in, and expand animations |
| lucide-react | icons |

No backend, no CMS, no state library. Content is plain JavaScript files.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Node 18 or newer.

## Where things live

```
src/
  config/site.js        section order, on/off switches, theme, feature flags
  data/                 ALL content. Edit these, not the components.
    profile.js          name, pitch, bio, contact, quick facts
    projects.js         the project array (and their diagram definitions)
    skills.js  experience.js  publications.js  achievements.js
  components/
    layout/             header, footer, section wrapper, figure rail
    sections/           one file per page section
    project/            project entry and its parts
    diagrams/           the SVG engine that renders architecture + workflow figures
    simulations/        the three interactive demos + their registry
  hooks/                theme, reduced motion, active figure, project filter
  lib/                  figure numbering, class-name helper
```

**Adding a project means adding one object to `src/data/projects.js`.**
Nothing else. See `CONTENT_GUIDE.md`.

## Accessibility and motion

- Semantic landmarks, one `h1`, skip link, visible focus rings
- All interactive controls reachable and operable by keyboard
- `prefers-reduced-motion` respected in CSS and in every animated component
- Contrast: accent `#0E5A5B` on `#F4F4F1` is 6.9:1; `#45B3AA` on `#0F1113` is 8.1:1

## Deployment

Pushing to `main` deploys automatically via `.github/workflows/deploy.yml`.
Set repo **Settings → Pages → Source: GitHub Actions** once, and that is it.

If you move off GitHub Pages, change `base` in `vite.config.js` to `'/'`.
