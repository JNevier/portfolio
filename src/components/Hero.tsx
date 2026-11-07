import { site } from '../data/site'
import Avatar from './Avatar'

/*
  Top of the page: who I am in one screen, with the three actions a recruiter
  is most likely to want. This holds the page's only <h1>.
*/
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 md:flex-row md:justify-between">
        <div className="max-w-2xl text-center md:text-left">
          <p className="text-brand-700 text-sm font-semibold">
            {site.location}
          </p>

          <h1
            id="hero-heading"
            className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {site.name}
          </h1>

          <p className="mt-3 text-lg font-medium sm:text-xl">{site.title}</p>

          <p className="text-muted mt-4 text-base sm:text-lg">{site.tagline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#projects"
              className="bg-brand-700 hover:bg-brand-800 rounded-md px-5 py-3 text-center font-semibold text-white"
            >
              View Projects
            </a>
            <a
              href={site.resumePath}
              download
              className="border-line hover:bg-surface-muted rounded-md border px-5 py-3 text-center font-semibold"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="border-line hover:bg-surface-muted rounded-md border px-5 py-3 text-center font-semibold"
            >
              Contact Me
            </a>
          </div>
        </div>

        <Avatar className="h-32 w-32 shrink-0 sm:h-44 sm:w-44" />
      </div>
    </section>
  )
}
