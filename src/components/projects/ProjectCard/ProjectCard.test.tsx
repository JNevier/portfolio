import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import type { Project } from '../../../data/projects'
import ProjectCard from './ProjectCard'

const project: Project = {
  slug: 'demo-app',
  title: 'Demo App',
  summary: 'A short description of the demo.',
  role: 'Front-End Developer',
  period: '2026 – Present',
  team: 'Team project',
  status: 'In progress',
  stack: ['React', 'TypeScript'],
  bullets: ['Built the first bullet point.'],
  links: [{ label: 'Code', href: 'https://github.com/example/demo' }],
  screenshot: '/projects/demo.png',
  screenshotAlt: 'Demo logo',
  imageFit: 'cover',
}

function renderCard(item: Project = project) {
  return render(
    <MemoryRouter>
      <ProjectCard project={item} />
    </MemoryRouter>,
  )
}

describe('ProjectCard', () => {
  it('shows the allowed content: image, title, status, summary, role and stack', () => {
    renderCard()
    const card = screen.getByRole('article')

    expect(within(card).getByRole('img', { name: 'Demo logo' })).toBeInTheDocument()
    expect(
      within(card).getByRole('heading', { level: 3, name: 'Demo App' }),
    ).toBeInTheDocument()
    expect(within(card).getByText('In progress')).toBeInTheDocument()
    expect(
      within(card).getByText('A short description of the demo.'),
    ).toBeInTheDocument()
    expect(within(card).getByText('Role:').parentElement).toHaveTextContent(
      /^Role: Front-End Developer$/,
    )

    const stack = within(card).getByRole('list', { name: 'Tech stack' })
    expect(within(stack).getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'React',
      'TypeScript',
    ])
  })

  it('leaves out the bullets, period, team line and repo links', () => {
    renderCard()
    const card = screen.getByRole('article')

    expect(within(card).queryByText(project.bullets[0])).not.toBeInTheDocument()
    expect(within(card).queryByText(/2026 – Present/)).not.toBeInTheDocument()
    expect(within(card).queryByText('Team project')).not.toBeInTheDocument()
    // The case-study link is the only link on the card.
    expect(within(card).getAllByRole('link')).toHaveLength(1)
  })

  it('links to the project case study', () => {
    renderCard()

    expect(
      screen.getByRole('link', { name: /read case study.*demo app/i }),
    ).toHaveAttribute('href', '/projects/demo-app')
  })

  it('passes imageFit through to the image and lazy-loads it', () => {
    renderCard()
    const image = screen.getByRole('img', { name: 'Demo logo' })

    expect(image).toHaveClass('project-media__img--cover')
    expect(image).toHaveAttribute('loading', 'lazy')
  })
})
