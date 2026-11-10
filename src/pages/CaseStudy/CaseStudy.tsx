import type { ReactNode } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Accomplishments from '../../components/projects/Accomplishments'
import Gallery from '../../components/projects/Gallery'
import ProjectMedia from '../../components/projects/ProjectMedia'
import LinkIcon from '../../components/ui/LinkIcon'
import { projects } from '../../data/projects'
import type { Project } from '../../data/projects'
import { site } from '../../data/site'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import NotFound from '../NotFound'

/*
  /projects/:slug — one page per project.
  `useParams` reads the slug from the URL. An unknown slug shows NotFound.
*/
export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) return <NotFound />

  return <CaseStudyArticle project={project} />
}

/*
  Where the "Back" link goes. The project card puts the page it was on in the
  router state (`from`). Only an in-site path is trusted: it must start with
  "/" but not "//" (that would point to another website). Otherwise, or when
  the page was opened directly, go back to the home Projects section.
*/
function backTarget(state: unknown) {
  const from = (state as { from?: unknown } | null)?.from
  const to =
    typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')
      ? from
      : '/#projects'
  const label = to.startsWith('/projects') ? 'Back to all projects' : 'Back to projects'
  return { to, label }
}

/* A titled block inside the case study. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-line border-t pt-8">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

/*
  The page itself. Only the blocks that have content are rendered,
  so a project with less information simply shows a shorter page.
  Block order: Overview, Project Accomplishments, My role, What I worked on,
  Tech stack, Gallery, Links.
*/
function CaseStudyArticle({ project }: { project: Project }) {
  useDocumentTitle(`${project.title} case study — ${site.name}`)

  const { caseStudy } = project
  const back = backTarget(useLocation().state)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        to={back.to}
        className="text-brand-700 hover:text-brand-800 text-sm font-semibold"
      >
        <span aria-hidden="true">← </span>
        {back.label}
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        {caseStudy?.subtitle && (
          <p className="text-muted mt-2 text-lg">{caseStudy.subtitle}</p>
        )}
        <p className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="bg-surface-muted border-line text-muted rounded-full border px-2.5 py-0.5 text-xs font-medium">
            {project.status}
          </span>
          <span className="text-muted">{project.period}</span>
        </p>
      </header>

      {project.screenshot && (
        <ProjectMedia
          src={project.screenshot}
          alt={project.screenshotAlt}
          fit={project.imageFit}
          placeholder={project.title}
          className="border-line mt-8 rounded-lg border"
        />
      )}

      <div className="mt-10 space-y-10">
        {caseStudy?.overview && caseStudy.overview.length > 0 && (
          <Block title="Overview">
            <div className="space-y-4 leading-relaxed">
              {caseStudy.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Block>
        )}

        {caseStudy?.accomplishments && caseStudy.accomplishments.length > 0 && (
          <Block title="Project Accomplishments">
            <Accomplishments items={caseStudy.accomplishments} />
          </Block>
        )}

        <Block title="My role">
          <p>
            <span className="font-semibold">{project.role}</span> ·{' '}
            {project.period}
          </p>
          {project.team && <p className="text-muted mt-1">{project.team}</p>}
        </Block>

        <Block title="What I worked on">
          <ul className="list-disc space-y-3 pl-5 leading-relaxed">
            {project.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </Block>

        <Block title="Tech stack">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <li
                key={tag}
                className="bg-brand-50 text-brand-800 rounded-md px-2 py-1 text-sm font-medium"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Block>

        {/* Appears by itself once photos are added to `gallery`. */}
        {project.gallery && project.gallery.length > 0 && (
          <Block title="Gallery">
            <Gallery images={project.gallery} />
          </Block>
        )}

        {project.links.length > 0 && (
          <Block title="Links">
            <ul className="flex flex-wrap gap-4">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
                  >
                    {/* The logo of the site the link goes to, e.g. GitHub. */}
                    <LinkIcon href={link.href} className="h-5 w-5 shrink-0" />
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Block>
        )}
      </div>
    </article>
  )
}
