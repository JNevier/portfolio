import { Link } from 'react-router-dom'
import ComingSoonCard from '../../components/projects/ComingSoonCard'
import ProjectCard from '../../components/projects/ProjectCard'
import ProjectGrid from '../../components/projects/ProjectGrid'
import { projects } from '../../data/projects'
import { site } from '../../data/site'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

/*
  /projects — every project, including the three shown on the home page,
  in the same order as src/data/projects.ts.
*/
export default function AllProjects() {
  useDocumentTitle('All projects — ' + site.name)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        to="/#projects"
        className="text-brand-700 hover:text-brand-800 text-sm font-semibold"
      >
        <span aria-hidden="true">← </span>Back to home
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        All projects
      </h1>
      <p className="text-muted mt-3 max-w-2xl">
        Everything I have built or contributed to, with my role on each.
      </p>

      <div className="mt-10">
        <ProjectGrid>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          <ComingSoonCard
            title="More projects on the way"
            text="New projects will appear here as I finish them."
          />
        </ProjectGrid>
      </div>
    </div>
  )
}
