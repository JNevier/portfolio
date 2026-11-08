# Reiven O. Jasa — Portfolio

[![CI](https://github.com/JNevier/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/JNevier/portfolio/actions/workflows/ci.yml)

Live site: [reiven-jasa.vercel.app](https://reiven-jasa.vercel.app)

My personal developer portfolio: my projects, skills, certifications, and
contact details, with a page per project and a light and dark theme.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**,
**React Router**, and **react-icons**. Tested with **Vitest** and
**React Testing Library**.

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
public/                       static files: favicon, preview image, resume, photos,
                              projects/ (project images), recognition/ (proof images)
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
      ProjectCard/            one card in the Projects grid
      ProjectMedia/           the 16:9 image frame, used by cards, case studies, and the gallery
      Accomplishments/        result cards on a case study (stat above text)
      Gallery/                optional project photos on a case study
    ui/                       small reusable pieces that know nothing about the page
      Section/  Avatar/  ThemeToggle/  Reveal/
      LogoMark/               the "RJ" mark in the navbar
      Disclosure/             a <details> show/hide dropdown (courses, activities)
  pages/                      one folder per route
    Home/  CaseStudy/  NotFound/
  context/                    ThemeContext.ts, ThemeProvider.tsx
  hooks/                      useTheme, useDocumentTitle, useActiveSection, useInView
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
There are 63 tests in 17 files.

- **Components** are tested the way a visitor uses them: find elements by
  role and label, click with `user-event`, then check what is on screen (for
  example, that the course list opens, or that the training's activities
  appear after opening its dropdown).
- **Components that read a data file** accept the same data as an optional
  prop, so a test can pass its own small list (see `Certifications` and
  `Highlights`).
- **Routes** are tested with `MemoryRouter`, which lets a test start at any URL.
- **Browser APIs jsdom lacks** are replaced with fakes: `matchMedia`,
  `IntersectionObserver` (`src/test/mockIntersectionObserver.ts`),
  and scrolling (`src/test/setup.ts`).

## Where things go

Adding a component? Ask: does it know about this site's content?

| Category | Use for | Example |
|---|---|---|
| `components/layout/` | The page frame around every page | `Navbar` |
| `components/sections/` | A section of the home page | `Skills` |
| `components/projects/` | Pieces that belong to projects | `ProjectCard` |
| `components/ui/` | Reusable, knows nothing about the page | `Reveal` |
| `pages/` | A whole route | `CaseStudy` |
| `hooks/`, `context/` | Hooks and React context (never inside a component folder) | `useTheme` |
| `lib/` (create it when needed) | Pure helper functions | — |

**When to add a `.css` file:** only when Tailwind classes cannot express it
cleanly: `::before` / `::after`, `@keyframes` or multi-step transitions,
`grid-template-areas`, a hand-written `@media` query, many states on one
element, or a theme-specific tweak. Otherwise use Tailwind classes and add no
CSS file.

**CSS rules:**
- BEM class names prefixed with the component: `.navbar`, `.navbar__link`,
  `.navbar__link--active`. No global element selectors in component CSS.
- Colours and fonts only from the tokens, e.g. `var(--color-brand-700)`.
  Never hex values, so the dark theme works automatically. The one constant
  token is `--color-media`: the always-white panel behind project logos and
  illustrations, which is not changed in the dark theme.
- Plain CSS, no `@apply`. Motion goes inside
  `@media (prefers-reduced-motion: no-preference)`.
- Global styles live only in `src/index.css`.

## Card grids: how many columns

Card grids choose their column count from the **smallest comfortable card
width**, not from the device: `columns = floor(container width / minimum card width)`.
The grid works this out by itself:

```css
grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
gap: 1.5rem;
```

- Minimum widths: about `17rem` for text cards with tech tags (Projects),
  `16rem` for case-study photos (Gallery), `14rem` for short link cards
  (Contact), `12rem` for small stat cards (Accomplishments), `10rem` for
  image tiles.
- `min(100%, …)` prevents overflow on very narrow phones.
- `auto-fill` keeps one or two cards at a normal size; `auto-fit` would
  stretch them across the row.
- With the 64rem content width, Projects shows 1 column on phones, 2 on small
  tablets, and 3 from about 912px wide.
- Use `@media` breakpoints only for whole-section layouts like the About
  grid, never for card grids.

## How to update this portfolio later

Most updates are data edits in `src/data/`. Layout code should not need to change.

| To change | Edit | Fields worth knowing |
|---|---|---|
| Name, bio, email, links, photo, resume | `site.ts` | `phone` and `phoneHref` (shown in Contact only), `links.linkedin` (`null` hides the card) |
| Contact intro | `site.ts` | `contactIntro`: the text under the Contact heading |
| Education | `site.ts` (`education`) | `logo`: the school seal next to the school name |
| Competition results | `highlights.ts` | `proof`: an optional thumbnail link to a proof image; `link`: an optional text link (`href`, `label`), e.g. an announcement post |
| Projects and their case studies | `projects.ts` | `slug`, `summary` (shown on the card), `team` (shown under My role), `imageFit`, `gallery` (optional photos), `caseStudy` (`subtitle`, `overview`, `accomplishments`) |
| Skills | `skills.ts` | Keep it matching the resume |
| Certifications | `certifications.ts` | `courses`: the course list inside a certificate |
| Seminars and trainings | `certifications.ts` (`trainings`) | `program`, `subtitle` (place, length, year), `description` (sentences on the card), `activities` (the dropdown), `credentialUrl` (optional) |

To hide a project, wrap its entry in `projects.ts` in `/* ... */`. Each
project's `slug` gives it a case study page at `/projects/<slug>`.

### Add a course credential link

In `certifications.ts`, add `credentialUrl` to the course:

```ts
{ name: 'React Basics', credentialUrl: 'https://coursera.org/share/...' },
```

A "View credential" link appears next to that course only. Courses without a
URL keep showing the name alone. A training works the same way: add
`credentialUrl` to its entry in `trainings` and the card shows the link.

### Add a project

1. Put its image in `public/projects/`, e.g. `public/projects/my-app.png`.
2. Add an entry to `projects.ts` with a unique `slug`, a short `summary`,
   `role`, `period`, `status`, `stack`, `bullets`, and `links`.
3. Set `screenshot: '/projects/my-app.png'` and a `screenshotAlt` that
   describes what the image really shows.
4. Logos and illustrations: leave `imageFit` out (it defaults to `'contain'`,
   no cropping). Real screenshots or photos: `imageFit: 'cover'` fills the frame.

The card shows the image, title, status, summary, role, and stack. The
bullets, period, team credit, accomplishments, photos, and links appear on the
case-study page.

On the case-study page the blocks appear in this order, each only when it has
content: Overview, Project Accomplishments, My role, What I worked on, Tech stack,
Gallery, Links.

### Add accomplishments to a case study

In `projects.ts`, inside `caseStudy`, add a list. `stat` is optional: with it,
the number is shown large above the text; without it, the text spans the
whole row (good for an award).

```ts
accomplishments: [
  { text: 'An award, with the event and date' },
  { stat: '42', text: 'what the number counts' },
],
```

### How to add project photos

1. Put the photos in a folder named after the project's slug:
   `public/projects/<slug>/`, e.g. `public/projects/second-vision/demo.jpg`.
2. In `projects.ts`, add a `gallery` list to that project:

```ts
gallery: [
  {
    src: '/projects/second-vision/demo.jpg',
    alt: 'What the photo really shows, in one sentence',
    caption: 'Optional line under the photo',
  },
],
```

3. Write meaningful `alt` text for every photo. Do not use photos that
   identify people without their consent.

The Gallery block appears on the case-study page by itself once the list has
at least one photo. With no `gallery` (or an empty one), nothing is shown.
Photos are shown whole, never cropped, and load lazily.

### Add a proof image to a highlight

1. Put the image in `public/recognition/`. A 16:9 image fits the thumbnail best.
2. In `highlights.ts`, add to that entry:

```ts
proof: {
  src: '/recognition/my-award.jpg',
  alt: 'What the image shows, in one sentence',
  label: 'View certificate',
},
```

The thumbnail opens the full image in a new tab.

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
| `public/Reiven-Jasa-Resume.pdf` | The navbar Resume button (`resumePath` in `site.ts`). To update it, replace the file and keep the name |
| `public/profile.jpg` | The photo in the Hero and About sections (`photo` in `site.ts`) |
| `public/de_la_salle_lipa_seal.png` | The official school seal in the Education card (`education.logo` in `site.ts`), shown on a small white tile in both themes |
| `public/projects/*.png`, `public/projects/sobre-pos.webp` | Each project's `screenshot` in `projects.ts`. Sobre POS uses a resized WebP copy of its screenshot to keep the page light |
| `public/projects/<slug>/` | Optional case-study photos (`gallery` in `projects.ts`) |
| `public/recognition/*.jpg` | Proof thumbnails (`proof.src` in `highlights.ts`) |

To replace a file, keep the same name, or update the path in `src/data`. Paths
start with `/` so they work on every page, including `/projects/...`.

## Deploy (Vercel)

1. Import the GitHub repository in Vercel. It detects Vite: build command
   `npm run build`, output directory `dist`.
2. `vercel.json` rewrites every path to `/index.html`. Without it, refreshing
   a page like `/projects/sobre-pos` would return a 404, because that file does
   not exist on the server; React Router handles the URL in the browser instead.
3. Every push to `main` redeploys the site. The `og:image` and `og:url` tags
   in `index.html` use the full live URL, because link previews need absolute
   URLs. Update both if the domain changes.

## Development workflow

- One branch per feature, named by type: `feat/...`, `fix/...`, `chore/...`,
  `docs/...`, `refactor/...`.
- Commit messages follow Conventional Commits: `feat(contact): add the contact cards`.
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
git push origin main
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
- There is no backend. The Email card opens the visitor's own email app with a
  `mailto:` link, which does nothing if they have no email app set up. The
  address stays visible on the card, so it can still be copied by hand.
