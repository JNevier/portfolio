import About from '../../components/sections/About'
import Certifications from '../../components/sections/Certifications'
import Contact from '../../components/sections/Contact'
import Hero from '../../components/sections/Hero'
import Highlights from '../../components/sections/Highlights'
import Projects from '../../components/sections/Projects'
import Skills from '../../components/sections/Skills'
import { site } from '../../data/site'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

/* The home page: every section, top to bottom. */
export default function Home() {
  useDocumentTitle(`${site.name} — Full-Stack Developer`)

  return (
    <>
      <Hero />
      <Highlights />
      <Projects />
      <About />
      <Skills />
      <Certifications />
      <Contact />
    </>
  )
}
