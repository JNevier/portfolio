import { projects } from '../../../data/projects'
import ProjectCard from '../../projects/ProjectCard'
import Section from '../../ui/Section'
import './Projects.css'

/* The Projects section: one card per entry in src/data/projects.ts. */
export default function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      intro="Selected projects I have built or contributed to, with my role on each."
      muted
    >
      <div className="projects__grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  )
}
