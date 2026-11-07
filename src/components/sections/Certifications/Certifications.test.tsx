import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { certifications } from '../../../data/certifications'
import type { Certification } from '../../../data/certifications'
import Certifications from './Certifications'

const SUMMARY_TEXT = 'View the 9 courses in this certificate'

describe('Certifications', () => {
  it('shows the course toggle, collapsed by default', () => {
    render(<Certifications />)

    const summary = screen.getByText(SUMMARY_TEXT)
    expect(summary.tagName).toBe('SUMMARY')
    expect(summary.closest('details')).not.toHaveAttribute('open')
  })

  it('lists the 9 courses in order after opening', async () => {
    const user = userEvent.setup()
    render(<Certifications />)

    const summary = screen.getByText(SUMMARY_TEXT)
    await user.click(summary)

    const details = summary.closest('details') as HTMLDetailsElement
    expect(details.open).toBe(true)

    const names = within(details)
      .getAllByRole('listitem')
      .map((item) => item.textContent)
    expect(names).toEqual(certifications[0].courses?.map((course) => course.name))
    expect(names).toHaveLength(9)
  })

  it('adds a credential link only to courses that have a URL', () => {
    const testCertifications: Certification[] = [
      {
        name: 'Test Certificate',
        issuer: 'Test Issuer',
        year: '2026',
        courses: [
          { name: 'Course With Link', credentialUrl: 'https://example.com/one' },
          { name: 'Course Without Link' },
        ],
      },
    ]
    render(<Certifications certifications={testCertifications} trainings={[]} />)

    const details = screen
      .getByText('View the 2 courses in this certificate')
      .closest('details') as HTMLElement
    const [withLink, withoutLink] = within(details).getAllByRole('listitem')

    const link = within(withLink).getByRole('link', { name: /view credential/i })
    expect(link).toHaveAttribute('href', 'https://example.com/one')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveTextContent('opens in a new tab')

    expect(within(withoutLink).queryByRole('link')).not.toBeInTheDocument()
    expect(withoutLink).toHaveTextContent(/^Course Without Link$/)
  })
})
