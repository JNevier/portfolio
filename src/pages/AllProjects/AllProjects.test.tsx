import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../App'
import ThemeProvider from '../../context/ThemeProvider'
import { projects } from '../../data/projects'

function renderAt(path: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('AllProjects', () => {
  it('has one h1 and one card per project at /projects', () => {
    renderAt('/projects')

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('All projects')

    for (const project of projects) {
      expect(
        screen.getByRole('heading', { level: 3, name: project.title }),
      ).toBeInTheDocument()
    }
    expect(screen.getAllByRole('article')).toHaveLength(projects.length)
  })

  it('links back to the home Projects section', () => {
    renderAt('/projects')

    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute(
      'href',
      '/#projects',
    )
  })

  it('still shows the not-found page for an unknown project slug', () => {
    renderAt('/projects/not-a-project')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
  })

  it('ends the list with one "More projects on the way" box', () => {
    renderAt('/projects')

    expect(screen.getAllByText('More projects on the way')).toHaveLength(1)
  })

  it('does not show the box on the home page', () => {
    renderAt('/')

    expect(screen.queryByText('More projects on the way')).not.toBeInTheDocument()
  })
})
