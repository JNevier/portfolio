import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../App'
import ThemeProvider from '../../context/ThemeProvider'
import { projects } from '../../data/projects'

/* Shows the current query string so tests can check the URL. */
function SearchProbe() {
  return <span data-testid="search">{useLocation().search}</span>
}

function renderAt(path: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
        <SearchProbe />
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

  it('counts the projects for each chip', () => {
    renderAt('/projects')

    const group = screen.getByRole('group', { name: 'Filter projects by type' })
    expect(within(group).getAllByRole('button').map((b) => b.textContent)).toEqual([
      'All 4',
      'Full-Stack 1',
      'Front-End 2',
      'Back-End 0',
      'IoT 1',
      'Thesis 1',
    ])
  })

  it('shows only the Front-End projects and puts the filter in the URL', async () => {
    renderAt('/projects')

    await userEvent.click(screen.getByRole('button', { name: /^Front-End/ }))

    expect(
      screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent),
    ).toEqual(['StudySpot PH', 'Little Lemon'])
    expect(screen.getByTestId('search')).toHaveTextContent('?type=front-end')
    expect(screen.getByRole('status')).toHaveTextContent('Showing 2 of 4 projects')
    expect(screen.queryByText('More projects on the way')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Front-End/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: /^All/ })).toHaveAttribute(
      'aria-pressed',
      'false',
    )

    // Back to All removes ?type from the URL.
    await userEvent.click(screen.getByRole('button', { name: /^All/ }))
    expect(screen.getByTestId('search')).toBeEmptyDOMElement()
    expect(screen.getAllByRole('article')).toHaveLength(4)
  })

  it('shows only the empty dashed box for Back-End', () => {
    renderAt('/projects?type=back-end')

    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(screen.getByText('No Back-End projects yet')).toBeInTheDocument()
    expect(
      screen.getByText('This is where they will go when I build one.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Showing 0 of 4 projects')
  })

  it('shows every project for an unknown ?type value', () => {
    renderAt('/projects?type=not-a-type')

    expect(screen.getAllByRole('article')).toHaveLength(4)
    expect(screen.getByRole('button', { name: /^All/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('lets the chips be used with the keyboard', async () => {
    const user = userEvent.setup()
    renderAt('/projects')

    screen.getByRole('button', { name: /^All/ }).focus()
    await user.tab()
    await user.tab()
    expect(screen.getByRole('button', { name: /^Front-End/ })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByTestId('search')).toHaveTextContent('?type=front-end')
  })

  it('sends the filtered page to the case study as the "Back" target', async () => {
    renderAt('/projects?type=front-end')

    await userEvent.click(
      screen.getByRole('link', { name: /read case study.*studyspot ph/i }),
    )
    expect(
      screen.getByRole('link', { name: /back to all projects/i }),
    ).toHaveAttribute('href', '/projects?type=front-end')
  })
})
