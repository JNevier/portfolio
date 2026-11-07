import About from './components/sections/About'
import Certifications from './components/sections/Certifications'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Highlights from './components/sections/Highlights'
import Navbar from './components/layout/Navbar'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'

/*
  The whole page, top to bottom. Each section is its own component, and the
  navbar links jump to them by their id (e.g. #projects).
*/
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
        <About />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
