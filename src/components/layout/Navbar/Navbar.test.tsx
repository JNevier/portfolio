import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ThemeProvider from '../../../context/ThemeProvider'
import Navbar from './Navbar'

function renderNavbarAt(path: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <Navbar />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('Navbar', () => {
  it('points the section links at the home page sections, from any route', () => {
    renderNavbarAt('/projects/sobre-pos')
    const nav = screen.getByRole('navigation', { name: 'Main' })

    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/#projects',
    )
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/#about',
    )
    expect(within(nav).getByRole('link', { name: 'Skills' })).toHaveAttribute(
      'href',
      '/#skills',
    )
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '/#contact',
    )
  })

  it('marks the home link as the current page on the home route', () => {
    renderNavbarAt('/')

    expect(screen.getByRole('link', { name: /reiven o\. jasa/i })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('does not mark the home link as current on other routes', () => {
    renderNavbarAt('/projects/sobre-pos')

    expect(
      screen.getByRole('link', { name: /reiven o\. jasa/i }),
    ).not.toHaveAttribute('aria-current')
  })
})
