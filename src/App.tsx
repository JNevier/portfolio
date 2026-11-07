import { site } from './data/site'

const currentYear = new Date().getFullYear()

/*
  Base page layout. The sections (hero, projects, about, skills, contact)
  are added on top of this shell.
*/
export default function App() {
  return (
    <>
      <a
        href="#main"
        className="bg-brand-700 focus:ring-brand-200 sr-only rounded-md px-4 py-2 font-medium text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>

      <main id="main">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight">{site.name}</h1>
          <p className="text-muted mt-3">{site.title}</p>
        </div>
      </main>

      <footer className="border-line border-t">
        <div className="text-muted mx-auto max-w-5xl px-4 py-8 text-sm sm:px-6">
          © {currentYear} {site.name}
        </div>
      </footer>
    </>
  )
}
