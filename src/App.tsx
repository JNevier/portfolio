import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import { site } from './data/site'

const currentYear = new Date().getFullYear()

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="bg-brand-700 sr-only rounded-md px-4 py-2 font-medium text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Highlights />
        <Projects />
      </main>

      <footer className="border-line border-t">
        <div className="text-muted mx-auto max-w-5xl px-4 py-8 text-sm sm:px-6">
          © {currentYear} {site.name}
        </div>
      </footer>
    </>
  )
}
