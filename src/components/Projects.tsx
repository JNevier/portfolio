import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Section from './Section'

/* The Projects section: one card per entry in src/data/projects.ts. */
export default function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      intro="Selected work from school and team projects, with my role on each."
      muted
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  )
}
