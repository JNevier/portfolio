import { render, screen } from '@testing-library/react'
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
  it('shows the intro from site.contactIntro', () => {
    render(<Contact />)

    expect(screen.getByText(site.contactIntro)).toBeInTheDocument()
  })

  it('has no "Copy email" button', () => {
    render(<Contact />)

    expect(screen.queryByRole('button', { name: /copy email/i })).not.toBeInTheDocument()
  })

  it('links each card to the right place', () => {
    render(<Contact />)

    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      `mailto:${site.email}`,
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

  it('shows no phone number anywhere on the home page', () => {
    renderHome()

    expect(screen.queryByText(/phone/i)).not.toBeInTheDocument()
    expect(document.querySelector('a[href^="tel:"]')).toBeNull()
  })
})
