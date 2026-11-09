import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { projects } from '../../data/projects'
import CaseStudy from './CaseStudy'

function renderCaseStudy(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/projects/${slug}`]}>
      <Routes>
        <Route path="/projects/:slug" element={<CaseStudy />} />
      </Routes>
    </MemoryRouter>,
  )
}

/* The h2 block titles, top to bottom. */
function blockTitles() {
  return screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
}

const secondVision = projects.find((p) => p.slug === 'second-vision')!

describe('CaseStudy', () => {
  afterEach(() => {
    // Tests below add a gallery to a project; undo it so other tests are unaffected.
    delete secondVision.gallery
  })

  it('shows the six Second Vision accomplishments with the exact text', () => {
    renderCaseStudy('second-vision')

    const block = screen.getByRole('heading', { level: 2, name: 'Project Accomplishments' })
      .parentElement as HTMLElement
    const items = within(block).getAllByRole('listitem')
    expect(items.map((item) => item.textContent)).toEqual([
      'Regional Champion, DICT Philippine Startup Challenge XI (Region IV-A CALABARZON), October 2026',
      'Top 3 of 10 Finalists, BAYANI Lab, October 2026',
      '108unit, integration, system, and alpha test cases, all passed',
      '29.6 FPSsustained with both AI models running',
      '3.64+ hoursof battery life',
      '25legally blind participants evaluated the device (mean System Usability Scale score: 59.1)',
    ])
  })

  it('shows no Project Accomplishments block on the other projects', () => {
    for (const slug of ['sobre-pos', 'little-lemon']) {
      const { unmount } = renderCaseStudy(slug)
      expect(screen.queryByRole('heading', { name: 'Project Accomplishments' })).toBeNull()
      unmount()
    }
  })

  it('puts the blocks in order, without Gallery while there are no photos', () => {
    renderCaseStudy('second-vision')

    expect(blockTitles()).toEqual([
      'Overview',
      'Project Accomplishments',
      'My role',
      'What I worked on',
      'Tech stack',
      'Links',
    ])
  })

  it('adds the Gallery block before Links once photos exist', () => {
    secondVision.gallery = [
      { src: '/projects/second-vision/demo.jpg', alt: 'Demo photo', caption: 'A caption' },
    ]
    renderCaseStudy('second-vision')

    expect(blockTitles()).toEqual([
      'Overview',
      'Project Accomplishments',
      'My role',
      'What I worked on',
      'Tech stack',
      'Gallery',
      'Links',
    ])
    expect(screen.getByRole('img', { name: 'Demo photo' })).toBeInTheDocument()
    expect(screen.getByText('A caption').tagName).toBe('FIGCAPTION')
  })

  it('shows the team line in My role', () => {
    renderCaseStudy('second-vision')

    expect(
      screen.getByText('Capstone / thesis project by Team Innovision (4 members)'),
    ).toBeInTheDocument()
  })

  it('shows the Little Lemon overview', () => {
    renderCaseStudy('little-lemon')

    expect(screen.getByRole('heading', { level: 2, name: 'Overview' })).toBeInTheDocument()
    expect(
      screen.getByText(
        'Little Lemon is a reserve-a-table web app for a fictional restaurant, built as the capstone of the Meta Front-End Developer Professional Certificate.',
      ),
    ).toBeInTheDocument()
  })

  it('shows the logo of the linked site next to each link', () => {
    for (const project of projects) {
      const { unmount } = renderCaseStudy(project.slug)
      for (const link of project.links) {
        const anchor = screen.getByRole('link', { name: new RegExp(link.label) })
        expect(anchor.querySelector('svg[aria-hidden="true"]')).toHaveAttribute(
          'data-icon',
          'github.com',
        )
      }
      unmount()
    }
  })
})
