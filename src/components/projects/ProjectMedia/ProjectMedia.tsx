import type { Project } from '../../../data/projects'
import './ProjectMedia.css'

type ProjectMediaProps = {
  project: Project
  /** Cards lazy-load their images; the case-study page loads its image right away. */
  lazy?: boolean
  className?: string
}

/*
  A project's image inside a fixed 16:9 frame, used by both the project card
  and the case-study page.
  - The frame keeps its shape before the image loads, so the layout never jumps.
  - The frame is always white (--color-media), because the current images are
    logos and illustrations with white or transparent backgrounds.
  - `imageFit` decides whether the image is shown whole ('contain', the default,
    never cropped) or fills the frame ('cover', may crop).
*/
export default function ProjectMedia({
  project,
  lazy = false,
  className = '',
}: ProjectMediaProps) {
  const fit = project.imageFit ?? 'contain'

  // No image yet: a plain placeholder box with the project's name.
  if (!project.screenshot) {
    return (
      <div
        aria-hidden="true"
        className={`project-media project-media--placeholder ${className}`}
      >
        {project.title}
      </div>
    )
  }

  return (
    <div className={`project-media ${className}`}>
      <img
        src={project.screenshot}
        alt={project.screenshotAlt}
        loading={lazy ? 'lazy' : undefined}
        width={1600}
        height={900}
        className={`project-media__img project-media__img--${fit}`}
      />
    </div>
  )
}
