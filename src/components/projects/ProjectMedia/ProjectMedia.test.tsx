import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProjectMedia from './ProjectMedia'

describe('ProjectMedia', () => {
  it('shows the whole image (contain) when fit is not set', () => {
    render(<ProjectMedia src="/projects/demo.png" alt="Demo logo" />)

    expect(screen.getByRole('img', { name: 'Demo logo' })).toHaveClass(
      'project-media__img--contain',
    )
  })

  it('respects fit: cover', () => {
    render(<ProjectMedia src="/projects/demo.png" alt="Demo logo" fit="cover" />)

    expect(screen.getByRole('img', { name: 'Demo logo' })).toHaveClass(
      'project-media__img--cover',
    )
  })

  it('lazy-loads only when asked to', () => {
    const { rerender } = render(
      <ProjectMedia src="/projects/demo.png" alt="Demo logo" lazy />,
    )
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy')

    rerender(<ProjectMedia src="/projects/demo.png" alt="Demo logo" />)
    expect(screen.getByRole('img')).not.toHaveAttribute('loading')
  })

  it('shows a placeholder with no image when there is no src', () => {
    render(<ProjectMedia src={null} alt="" placeholder="Demo" />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('Demo')).toBeInTheDocument()
  })
})
