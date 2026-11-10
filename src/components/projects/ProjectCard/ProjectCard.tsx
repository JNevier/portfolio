import { Link, useLocation } from 'react-router-dom'
import type { Project } from '../../../data/projects'
import ProjectMedia from '../ProjectMedia'
import './ProjectCard.css'

type ProjectCardProps = {
  project: Project
}

/*
  One project card: a quick overview only. In order: image, title with
  status, short description, role, tech stack, and a link to the case study.
  The bullets, period, team credit and repo links live on the case-study page;
  the card only adds a "Live demo" link when the project has one.
  Every piece of text comes from one entry in src/data/projects.ts.
*/
export default function ProjectCard({ project }: ProjectCardProps) {
  // Tell the case-study page where the visitor came from, so its "Back" link
  // can return there: the home Projects section, or the All projects page
  // with its filter (the ?type=... part of the URL) kept.
  const { pathname, search } = useLocation()
  const from = pathname === '/' ? '/#projects' : pathname + search
  // The first live demo link, if the project has one.
  const live = project.links.find((link) => link.live)

  return (
    <article className="project-card border-line bg-surface flex flex-col overflow-hidden rounded-lg border">
      <ProjectMedia
        src={project.screenshot}
        alt={project.screenshotAlt}
        fit={project.imageFit}
        placeholder={project.title}
        lazy
        className="border-line border-b"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <span className="bg-surface-muted border-line text-muted rounded-full border px-2.5 py-0.5 text-xs font-medium">
            {project.status}
          </span>
        </div>

        <p className="text-muted mt-1">{project.summary}</p>

        <p className="mt-3 text-sm">
          <span className="font-semibold">Role:</span> {project.role}
        </p>

        <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <li
              key={tag}
              className="bg-brand-50 text-brand-800 rounded-md px-2 py-1 text-xs font-medium"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* mt-auto pushes the links to the bottom so cards in a row line up. */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-5">
          <Link
            to={`/projects/${project.slug}`}
            state={{ from }}
            className="project-card__link text-brand-700 hover:text-brand-800 text-sm font-semibold underline-offset-4 hover:underline"
          >
            Read case study
            <span className="sr-only"> about {project.title}</span>
            <span aria-hidden="true"> →</span>
          </Link>

          {live && (
            <a
              href={live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link text-brand-700 hover:text-brand-800 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Live demo
              <span className="sr-only">
                {' '}
                of {project.title} (opens in a new tab)
              </span>
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
