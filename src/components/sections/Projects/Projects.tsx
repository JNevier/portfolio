import { Link } from 'react-router-dom'
import { FEATURED_COUNT, projects } from '../../../data/projects'
import ProjectCard from '../../projects/ProjectCard'
import ProjectGrid from '../../projects/ProjectGrid'
import Section from '../../ui/Section'

/*
  The Projects section on the home page: only the first FEATURED_COUNT
  projects in src/data/projects.ts. When there are more, a link opens the
  All projects page (/projects).
*/
export default function Projects() {
  const featured = projects.slice(0, FEATURED_COUNT)

  return (
    <Section
      id="projects"
      title="Projects"
      intro="Selected projects I have built or contributed to, with my role on each."
      muted
    >
      <ProjectGrid>
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ProjectGrid>

      {projects.length > FEATURED_COUNT && (
        <div className="mt-8 text-center">
          <Link
            to="/projects"
            className="border-line text-brand-700 hover:bg-surface inline-block rounded-md border px-4 py-2 font-semibold"
          >
            View all projects ({projects.length})
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      )}
    </Section>
  )
}
