import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Project } from '../../../data/projects'
import ProjectMedia from './ProjectMedia'

const baseProject: Project = {
  slug: 'demo',
  title: 'Demo',
  summary: 'A demo project.',
  role: 'Developer',
  period: '2026',
  status: 'Completed',
  stack: [],
  bullets: [],
  links: [],
  screenshot: '/projects/demo.png',
  screenshotAlt: 'Demo logo',
}

describe('ProjectMedia', () => {
  it('shows the whole image (contain) when imageFit is not set', () => {
    render(<ProjectMedia project={baseProject} />)

    expect(screen.getByRole('img', { name: 'Demo logo' })).toHaveClass(
      'project-media__img--contain',
    )
  })

  it('respects imageFit: cover', () => {
    render(<ProjectMedia project={{ ...baseProject, imageFit: 'cover' }} />)

    expect(screen.getByRole('img', { name: 'Demo logo' })).toHaveClass(
      'project-media__img--cover',
    )
  })

  it('lazy-loads only when asked to', () => {
    const { rerender } = render(<ProjectMedia project={baseProject} lazy />)
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy')

    rerender(<ProjectMedia project={baseProject} />)
    expect(screen.getByRole('img')).not.toHaveAttribute('loading')
  })

  it('shows a placeholder with no image when there is no screenshot', () => {
    render(<ProjectMedia project={{ ...baseProject, screenshot: null }} />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('Demo')).toBeInTheDocument()
  })
})
