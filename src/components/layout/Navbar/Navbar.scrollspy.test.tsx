import { act, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ThemeProvider from '../../../context/ThemeProvider'
import {
  installIntersectionObserverMock,
  triggerIntersection,
} from '../../../test/mockIntersectionObserver'
import Navbar from './Navbar'

const SECTION_IDS = ['projects', 'about', 'skills', 'contact']

// Navbar rendered on a route, with empty stand-in sections to observe.
function renderWithSections(path: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <Navbar />
        {SECTION_IDS.map((id) => (
          <section key={id} id={id} />
        ))}
      </MemoryRouter>
    </ThemeProvider>,
  )
}

function navLink(name: string) {
  const nav = screen.getByRole('navigation', { name: 'Main' })
  return within(nav).getByRole('link', { name })
}

describe('Navbar scroll spy', () => {
  beforeEach(() => {
    installIntersectionObserverMock()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('marks the section currently on screen as current', () => {
    renderWithSections('/')

    act(() =>
      triggerIntersection(document.getElementById('about') as HTMLElement, true),
    )

    expect(navLink('About')).toHaveAttribute('aria-current', 'true')
    expect(navLink('Projects')).not.toHaveAttribute('aria-current')
  })

  it('moves the highlight when another section scrolls into view', () => {
    renderWithSections('/')

    act(() =>
      triggerIntersection(document.getElementById('about') as HTMLElement, true),
    )
    act(() =>
      triggerIntersection(document.getElementById('skills') as HTMLElement, true),
    )

    expect(navLink('Skills')).toHaveAttribute('aria-current', 'true')
    expect(navLink('About')).not.toHaveAttribute('aria-current')
  })

  it('does not highlight section links away from the home page', () => {
    renderWithSections('/projects/sobre-pos')

    act(() =>
      triggerIntersection(document.getElementById('about') as HTMLElement, true),
    )

    expect(navLink('About')).not.toHaveAttribute('aria-current')
  })
})
