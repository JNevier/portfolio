import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import type { Project } from '../../../data/projects'
import Projects from './Projects'

/*
  vi.mock swaps the real data module for a small fake list in this file only,
  so the test can check what happens with 3 or fewer projects.
*/
vi.mock('../../../data/projects', () => {
  const make = (slug: string): Project => ({
    slug,
    title: slug,
    summary: 'Summary',
    role: 'Developer',
    period: '2026',
    status: 'Completed',
    types: ['front-end'],
    stack: ['React'],
    bullets: [],
    links: [],
    screenshot: null,
    screenshotAlt: '',
  })
  return {
    FEATURED_COUNT: 3,
    projects: [make('one'), make('two'), make('three')],
  }
})

describe('Projects (home page) with 3 or fewer projects', () => {
  it('does not show the "View all projects" link', () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>,
    )

    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(
      screen.queryByRole('link', { name: /view all projects/i }),
    ).not.toBeInTheDocument()
  })
})
