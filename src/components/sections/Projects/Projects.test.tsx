import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Projects from './Projects'

function renderProjects() {
  return render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>,
  )
}

describe('Projects (home page)', () => {
  it('shows only the top three projects', () => {
    renderProjects()

    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(
      screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent),
    ).toEqual(['Second Vision', 'Sobre POS', 'StudySpot PH'])
  })

  it('links to the All projects page with the total count', () => {
    renderProjects()

    expect(
      screen.getByRole('link', { name: 'View all projects (4)' }),
    ).toHaveAttribute('href', '/projects')
  })
})
