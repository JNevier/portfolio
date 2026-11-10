import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App, { AppRoutes } from './App'
import ThemeProvider from './context/ThemeProvider'
import { projects } from './data/projects'
import { site } from './data/site'

// Renders the routes at a given URL, without a real browser address bar.
function renderAt(path: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('App', () => {
  it('shows my name as the only h1 on the page', () => {
    render(<App />)

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent(site.name)
  })

  it('has exactly one resume link on the home page, in the navbar', () => {
    render(<App />)

    const resumeLinks = document.querySelectorAll(
      `a[href="${site.resumePath}"]`,
    )
    expect(resumeLinks).toHaveLength(1)
    expect(
      within(screen.getByRole('navigation', { name: 'Main' })).getByRole(
        'link',
        { name: 'Resume' },
      ),
    ).toBe(resumeLinks[0])
  })
})

describe('routes', () => {
  it('renders the case study for a known project slug', () => {
    const project = projects[0]
    renderAt(`/projects/${project.slug}`)

    expect(
      screen.getByRole('heading', { level: 1, name: project.title }),
    ).toBeInTheDocument()
    expect(document.title).toContain(project.title)
  })

  it('links every project card to its case study', () => {
    // Every project has a card on the All projects page.
    renderAt('/projects')

    for (const project of projects) {
      expect(
        screen.getByRole('link', {
          name: new RegExp(`case study.*${project.title}`, 'i'),
        }),
      ).toHaveAttribute('href', `/projects/${project.slug}`)
    }
  })

  it('shows the not-found page for an unknown project slug', () => {
    renderAt('/projects/does-not-exist')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
  })

  it('shows the not-found page for an unknown path', () => {
    renderAt('/nothing-here')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
  })
})
