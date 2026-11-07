import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../../App'
import ThemeProvider from '../../../context/ThemeProvider'
import { site } from '../../../data/site'
import Contact from './Contact'

function renderHome() {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('Contact', () => {
  it('links each card to the right place', () => {
    render(<Contact />)

    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      `mailto:${site.email}`,
    )
    expect(screen.getByRole('link', { name: /phone/i })).toHaveAttribute(
      'href',
      site.phoneHref,
    )

    const github = screen.getByRole('link', { name: /github/i })
    expect(github).toHaveAttribute('href', site.links.github)
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')

    const linkedin = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedin).toHaveAttribute('href', site.links.linkedin)
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has no form fields', () => {
    render(<Contact />)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(document.querySelector('form, input, textarea')).toBeNull()
  })

  it('shows the phone number exactly once on the home page, only in Contact', () => {
    renderHome()

    const matches = screen.getAllByText(site.phone)
    expect(matches).toHaveLength(1)
    expect(matches[0].closest('section')).toHaveAttribute('id', 'contact')

    // None of the other page areas mention it.
    const hero = screen.getByRole('region', { name: site.name })
    const about = screen.getByRole('region', { name: 'About' })
    for (const area of [
      hero,
      about,
      screen.getByRole('banner'),
      screen.getByRole('contentinfo'),
    ]) {
      expect(within(area).queryByText(site.phone)).not.toBeInTheDocument()
      expect(area.innerHTML).not.toContain(site.phoneHref)
    }
  })
})
