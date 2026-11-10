import type { ReactNode } from 'react'
import './ProjectGrid.css'

type ProjectGridProps = {
  /** The cards (and anything else) to lay out in the grid. */
  children: ReactNode
}

/* The responsive grid that holds the project cards. */
export default function ProjectGrid({ children }: ProjectGridProps) {
  return <div className="project-grid">{children}</div>
}
