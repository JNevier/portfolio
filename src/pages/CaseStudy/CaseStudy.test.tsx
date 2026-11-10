import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { projects } from '../../data/projects'
import CaseStudy from './CaseStudy'

function renderCaseStudy(slug: string, state?: unknown) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: `/projects/${slug}`, state }]}>
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
    for (const slug of ['sobre-pos', 'studyspot-ph', 'little-lemon']) {
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
        const expected = link.live ? 'vercel.app' : 'github.com'
        expect(anchor.querySelector('svg[aria-hidden="true"]')).toHaveAttribute(
          'data-icon',
          expected,
        )
      }
      unmount()
    }
  })

  it('lists the StudySpot live demo before the code, with its note and the image credit', () => {
    renderCaseStudy('studyspot-ph')

    const linksBlock = screen
      .getByRole('heading', { level: 2, name: 'Links' })
      .closest('section')!
    const links = within(linksBlock).getAllByRole('link')
    expect(links.map((a) => a.textContent)).toEqual([
      'Live demo (opens in a new tab) ↗',
      'Code (opens in a new tab) ↗',
    ])
    expect(links[0]).toHaveAttribute('href', 'https://studyspot-ph.vercel.app')
    expect(
      within(linksBlock).getByText(
        'Log in with any name and email to try it. The login is simulated and all data stays in your browser.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Photos in the app are sample images and belong to their respective owners.',
      ),
    ).toBeInTheDocument()
  })

  it('shows the Little Lemon live demo link', () => {
    renderCaseStudy('little-lemon')

    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute(
      'href',
      'https://littlelemon-chicago.vercel.app/',
    )
  })

  it('goes back to the home Projects section by default', () => {
    renderCaseStudy('studyspot-ph')

    expect(screen.getByRole('link', { name: /back to projects/i })).toHaveAttribute(
      'href',
      '/#projects',
    )
  })

  it('goes back to the All projects page with its filter when it came from there', () => {
    renderCaseStudy('studyspot-ph', { from: '/projects?type=front-end' })

    expect(
      screen.getByRole('link', { name: /back to all projects/i }),
    ).toHaveAttribute('href', '/projects?type=front-end')
  })

  it('ignores a "from" value that points to another website', () => {
    renderCaseStudy('studyspot-ph', { from: '//example.com' })

    expect(screen.getByRole('link', { name: /back to projects/i })).toHaveAttribute(
      'href',
      '/#projects',
    )
  })
})
