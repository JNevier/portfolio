# Reiven O. Jasa — Portfolio

My personal developer portfolio: a single-page site with my projects, skills,
certifications, and contact details.

Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## Run it locally

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # type-check and build for production into dist/
npm run lint     # check the code with oxlint
npm run preview  # preview the production build
```

## Project structure

```
public/            static files (favicon, preview image, resume, photos)
src/
  components/      one component per page section (Navbar, Hero, Projects, ...)
  data/            all the text content of the site
  index.css        colours and fonts (Tailwind theme)
  App.tsx          puts the sections together in order
```

## Updating content

All content lives in `src/data/`, so the layout code does not need to change:

| File | What it holds |
|---|---|
| `site.ts` | Name, title, bio, email, GitHub/LinkedIn links, photo, resume path, education |
| `highlights.ts` | Competition results shown under the hero |
| `projects.ts` | Project cards (Little Lemon is commented out until it is ready) |
| `skills.ts` | Skill groups |
| `certifications.ts` | Certifications and seminars |

Colours are defined once in `src/index.css` under `@theme`.

## Files to add

| File | Then |
|---|---|
| `public/resume.pdf` | Nothing else; the Resume buttons already point to it |
| `public/profile.jpg` | Set `photo: '/profile.jpg'` in `src/data/site.ts` |
| `public/projects/sobre-pos.png` | Set `screenshot` for Sobre POS in `src/data/projects.ts` |
| `public/projects/second-vision.png` | Set `screenshot` for Second Vision in `src/data/projects.ts` |

## Deploy

The site is a static Vite build and deploys to Vercel with the default
settings (build command `npm run build`, output directory `dist`).
