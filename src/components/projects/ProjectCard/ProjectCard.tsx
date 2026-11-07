import { Link } from 'react-router-dom'
import type { Project } from '../../../data/projects'

type ProjectCardProps = {
  project: Project
}

/*
  One project card. Every piece of text comes from the `project` prop,
  which is one entry from src/data/projects.ts.
*/
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="border-line bg-surface flex flex-col overflow-hidden rounded-lg border">
      {project.screenshot ? (
        <img
          src={project.screenshot}
          alt={project.screenshotAlt}
          loading="lazy"
          className="border-line aspect-video w-full border-b object-cover"
        />
      ) : (
        // Placeholder box until a real screenshot is added.
        <div
          aria-hidden="true"
          className="border-line bg-brand-50 text-brand-700 flex aspect-video w-full items-center justify-center border-b text-2xl font-bold"
        >
          {project.title}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <span className="bg-surface-muted border-line text-muted rounded-full border px-2.5 py-0.5 text-xs font-medium">
            {project.status}
          </span>
        </div>

        <p className="text-muted mt-1">{project.summary}</p>

        <p className="mt-3 text-sm">
          <span className="font-semibold">Role:</span> {project.role} ·{' '}
          {project.period}
        </p>
        {project.team && (
          <p className="text-muted mt-1 text-sm">{project.team}</p>
        )}

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <li
              key={tag}
              className="bg-brand-50 text-brand-800 rounded-md px-2 py-1 text-xs font-medium"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* mt-auto pushes the links to the bottom so cards line up. */}
        <div className="mt-auto flex flex-wrap gap-4 pt-5">
          <Link
            to={`/projects/${project.slug}`}
            className="text-brand-700 hover:text-brand-800 text-sm font-semibold underline-offset-4 hover:underline"
          >
            Read case study
            <span className="sr-only"> about {project.title}</span>
            <span aria-hidden="true"> →</span>
          </Link>
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 hover:text-brand-800 text-sm font-semibold underline-offset-4 hover:underline"
            >
              {link.label}
              <span className="sr-only"> for {project.title} (opens in a new tab)</span>
              <span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
