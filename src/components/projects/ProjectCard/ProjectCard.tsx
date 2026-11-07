import { Link } from 'react-router-dom'
import type { Project } from '../../../data/projects'
import ProjectMedia from '../ProjectMedia'
import './ProjectCard.css'

type ProjectCardProps = {
  project: Project
}

/*
  One project card: a quick overview only. In order: image, title with
  status, short description, role, tech stack, and a link to the case study.
  The bullets, period, team credit and repo links live on the case-study page.
  Every piece of text comes from one entry in src/data/projects.ts.
*/
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card border-line bg-surface flex flex-col overflow-hidden rounded-lg border">
      <ProjectMedia project={project} lazy className="border-line border-b" />

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

        {/* mt-auto pushes the link to the bottom so cards in a row line up. */}
        <div className="mt-auto pt-5">
          <Link
            to={`/projects/${project.slug}`}
            className="project-card__link text-brand-700 hover:text-brand-800 text-sm font-semibold underline-offset-4 hover:underline"
          >
            Read case study
            <span className="sr-only"> about {project.title}</span>
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
