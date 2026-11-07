# Reiven O. Jasa — Portfolio

<!-- CI badge: uncomment once the workflow has run on GitHub.
[![CI](https://github.com/JNevier/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/JNevier/portfolio/actions/workflows/ci.yml)
-->

My personal developer portfolio: my projects, skills, certifications, and
contact details, with a page per project, a light and dark theme, and a
contact form.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and
**React Router**. Tested with **Vitest** and **React Testing Library**.

## Scripts

```bash
npm install         # install dependencies
npm run dev         # start the dev server at http://localhost:5173
npm test            # run all tests once
npm run test:watch  # re-run tests while you edit
npm run lint        # check the code with oxlint
npm run build       # type-check and build for production into dist/
npm run preview     # preview the production build
```

## Routes

| URL | Page | File |
|---|---|---|
| `/` | Home page with every section (`/#projects`, `/#about`, `/#skills`, `/#contact`) | `src/pages/Home` |
| `/projects/:slug` | Case study for one project, e.g. `/projects/sobre-pos` | `src/pages/CaseStudy` |
| anything else | Page not found | `src/pages/NotFound` |

An unknown project slug also shows the not-found page.

## Folder structure

```
public/                       static files (favicon, preview image, resume, photos)
src/
  main.tsx                    starts React
  App.tsx                     providers and routes only
  index.css                   global CSS: colour tokens, dark theme, base styles, focus
  components/
    layout/                   the page frame
      Layout/                 skip link + Navbar + page + Footer
      Navbar/  Footer/
      ScrollManager/          scrolls to the top or to #section on navigation
    sections/                 one per home page section
      Hero/  Highlights/  Projects/  About/  Skills/  Certifications/  Contact/
    projects/
      ProjectCard/
    forms/
      ContactForm/  FormField/
    ui/                       small reusable pieces that know nothing about the page
      Section/  Avatar/  ThemeToggle/  Reveal/
  pages/                      one folder per route
    Home/  CaseStudy/  NotFound/
  context/                    ThemeContext.ts, ThemeProvider.tsx
  hooks/                      useTheme, useDocumentTitle, useActiveSection, useInView
  lib/                        pure helpers: validateContact, buildMailto
  data/                       all the text content of the site
  test/                       test setup and the IntersectionObserver mock
.github/workflows/ci.yml      lint, test, and build on every push to main
vercel.json                   sends every URL to index.html (see Deploy)
```

Each component folder holds `Name.tsx`, `index.ts` (so imports can say
`'../ui/Section'`), and only if needed `Name.css` and `Name.test.tsx`.

## Testing

Tests sit next to the code they test (`Section.test.tsx` beside `Section.tsx`)
and use Vitest's `describe` / `it` / `expect` with React Testing Library.

- **Pure helpers** (`src/lib`) are tested with plain inputs and outputs.
- **Components** are tested the way a visitor uses them: find elements by
  role and label, click and type with `user-event`, then check what is on
  screen (for example, that the first invalid form field gets focus).
- **Routes** are tested with `MemoryRouter`, which lets a test start at any URL.
- **Browser APIs jsdom lacks** are replaced with fakes: `matchMedia`,
  `IntersectionObserver` (`src/test/mockIntersectionObserver.ts`), and
  scrolling (`src/test/setup.ts`).

## Where things go

Adding a component? Ask: does it know about this site's content?

| Category | Use for | Example |
|---|---|---|
| `components/layout/` | The page frame around every page | `Navbar` |
| `components/sections/` | A section of the home page | `Skills` |
| `components/projects/` | Pieces that belong to projects | `ProjectCard` |
| `components/forms/` | Form pieces | `FormField` |
| `components/ui/` | Reusable, knows nothing about the page | `Reveal` |
| `pages/` | A whole route | `CaseStudy` |
| `hooks/`, `context/`, `lib/` | Hooks, React context, pure functions (never inside a component folder) | `useTheme` |

**When to add a `.css` file:** only when Tailwind classes cannot express it
cleanly: `::before` / `::after`, `@keyframes` or multi-step transitions,
`grid-template-areas`, a hand-written `@media` query, many states on one
element, or a theme-specific tweak. Otherwise use Tailwind classes and add no
CSS file.

**CSS rules:**
- BEM class names prefixed with the component: `.navbar`, `.navbar__link`,
  `.navbar__link--active`. No global element selectors in component CSS.
- Colours and fonts only from the tokens, e.g. `var(--color-brand-700)`.
  Never hex values, so the dark theme works automatically.
- Plain CSS, no `@apply`. Motion goes inside
  `@media (prefers-reduced-motion: no-preference)`.
- Global styles live only in `src/index.css`.

## How to update this portfolio later

Most updates are data edits in `src/data/`. Layout code should not need to change.

| To change | Edit |
|---|---|
| Name, bio, email, links, photo, resume, education | `site.ts` |
| Competition results | `highlights.ts` |
| Projects and their case studies | `projects.ts` (add `slug`, and optionally `caseStudy` with `subtitle` and `overview`) |
| Skills | `skills.ts` (keep it matching the resume) |
| Certifications and seminars | `certifications.ts` |

To hide a project, wrap its entry in `projects.ts` in `/* ... */`. Each
project's `slug` gives it a case study page at `/projects/<slug>`.

**New feature from a course:** create a `feat/...` branch, put the component in
the right category folder, add a `.css` file only if it meets the rules above,
add a test next to it, and merge once lint, tests, and build pass.

**Ideas parked for later**, to pick up when a course or the resume justifies them:
calling a public API, data-fetching hooks, filtering the project list, video
or audio media, Sass, higher-order components and render props, and a
practice page for data structures and algorithms.

## Images and files

| File | Used by |
|---|---|
| `public/resume.pdf` | The Resume buttons (`resumePath` in `site.ts`) |
| `public/profile.jpg` | The photo in the Hero and About sections (`photo` in `site.ts`) |
| `public/projects/*.png` | Each project's `screenshot` in `projects.ts` |

To replace a file, keep the same name, or update the path in `src/data`. Paths
start with `/` so they work on every page, including `/projects/...`.

## Deploy (Vercel)

1. Import the GitHub repository in Vercel. It detects Vite: build command
   `npm run build`, output directory `dist`.
2. `vercel.json` rewrites every path to `/index.html`. Without it, refreshing
   a page like `/projects/sobre-pos` would return a 404, because that file does
   not exist on the server; React Router handles the URL in the browser instead.
3. After the first deploy, open `index.html` and replace `/og-image.png` in the
   `og:image` tag with the full URL (e.g. `https://<your-site>.vercel.app/og-image.png`),
   and add an `og:url` tag. Link previews need absolute URLs.

## Development workflow

- One branch per feature, named by type: `feat/...`, `fix/...`, `chore/...`,
  `docs/...`, `refactor/...`.
- Commit messages follow Conventional Commits: `feat(contact): add accessible contact form`.
- Tests are committed before or with the code they test.
- Before merging: `npm run lint`, `npm test`, and `npm run build` must pass.
- Merge with `--no-ff` so each feature stays visible as a merge in the history,
  and keep the branch.

```bash
git switch main
git switch -c feat/my-feature
# ...edit, then check...
npm run lint && npm test && npm run build
git add src/components/ui/MyThing
git commit -m "feat(ui): add my thing"
git switch main
git merge --no-ff feat/my-feature -m "feat: merge my feature"
```

## Code style

- Components use PascalCase (`ProjectCard`); hooks start with `use` (`useTheme`).
- One component per folder, with an `index.ts` re-export.
- Tests live next to the file they test.
- Content lives in `src/data`, never hard-coded in components.
- Colours only from the tokens in `src/index.css`.
- Comments explain *why* when it is not obvious.

## Known limitations

- The site is rendered in the browser by React. Search engines and link
  previews see the static `index.html` first, so every page shares the same
  title, description, and preview image until JavaScript runs. A static or
  server-rendered site would do better for SEO and per-page previews.
- The contact form has no backend. It opens the visitor's own email app with a
  `mailto:` link, so it does nothing if they have no email app set up. The
  plain email address stays visible as a fallback.
