import { Link, useSearchParams } from 'react-router-dom'
import ComingSoonCard from '../../components/projects/ComingSoonCard'
import FilterChips from '../../components/projects/FilterChips'
import ProjectCard from '../../components/projects/ProjectCard'
import ProjectGrid from '../../components/projects/ProjectGrid'
import { projectTypes } from '../../data/projectTypes'
import { projects } from '../../data/projects'
import { site } from '../../data/site'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

/*
  /projects — every project, including the three shown on the home page,
  in the same order as src/data/projects.ts.

  The filter chips keep their choice in the URL (?type=front-end), so a
  filtered list can be shared, survives a refresh, and the case-study
  "Back" link can return to it.
*/
export default function AllProjects() {
  useDocumentTitle('All projects — ' + site.name)

  // useSearchParams reads and writes the ?type=... part of the URL.
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('type')
  const activeType = projectTypes.find((type) => type.id === requested)
  // An unknown or missing value means "all".
  const value = activeType ? activeType.id : 'all'

  const options = [
    { id: 'all', label: 'All', count: projects.length },
    ...projectTypes.map((type) => ({
      id: type.id,
      label: type.label,
      count: projects.filter((project) =>
        (project.types as string[]).includes(type.id),
      ).length,
    })),
  ]

  const shown = activeType
    ? projects.filter((project) =>
        (project.types as string[]).includes(activeType.id),
      )
    : projects

  function handleChange(id: string) {
    // replace: true swaps the current history entry, so the Back button
    // does not have to step through every chip that was clicked.
    setSearchParams(id === 'all' ? {} : { type: id }, { replace: true })
  }

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

      <div className="mt-8">
        <FilterChips options={options} value={value} onChange={handleChange} />
        {/* role="status" makes screen readers announce the new count. */}
        <p role="status" className="text-muted mt-4 text-sm">
          Showing {shown.length} of {projects.length} projects
        </p>
      </div>

      <div className="mt-6">
        <ProjectGrid>
          {shown.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}

          {/* The All view ends with one dashed box. */}
          {!activeType && (
            <ComingSoonCard
              title="More projects on the way"
              text="New projects will appear here as I finish them."
            />
          )}

          {/* A filter with no projects shows only the dashed box. */}
          {activeType && shown.length === 0 && (
            <ComingSoonCard
              title={`No ${activeType.label} projects yet`}
              text="This is where they will go when I build one."
            />
          )}
        </ProjectGrid>
      </div>
    </div>
  )
}
