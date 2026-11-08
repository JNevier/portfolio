import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { certifications, trainings } from '../../../data/certifications'
import type { Certification, Training } from '../../../data/certifications'
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
      // The first text in each item is the course name; a link may follow it.
      .map((item) => item.firstChild?.textContent)
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

  describe('training card', () => {
    const utp = trainings[0]
    const ACTIVITIES_TEXT = 'View the activities attended'

    it('shows the title, subtitle and both description sentences', () => {
      render(<Certifications />)

      expect(
        screen.getByText(
          'Universiti Teknologi PETRONAS (UTP) – International Academic Immersion Program',
        ),
      ).toBeInTheDocument()
      expect(screen.getByText('Malaysia · 1 Week · 2026')).toBeInTheDocument()
      expect(
        screen.getByText(
          'Participated in technical seminars on Machine Learning, Artificial Intelligence, and Computer Vision for Quality Inspection.',
        ),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'Engaged in a Design Thinking Workshop and academic exchange activities with international students.',
        ),
      ).toBeInTheDocument()
    })

    it('has no credential link without a URL', () => {
      render(<Certifications certifications={[]} />)

      expect(utp.credentialUrl).toBeUndefined()
      expect(screen.queryByRole('link', { name: /view credential/i })).not.toBeInTheDocument()
    })

    it('shows a credential link once a URL is set', () => {
      const withUrl: Training[] = [{ ...utp, credentialUrl: 'https://example.com/utp' }]
      render(<Certifications certifications={[]} trainings={withUrl} />)

      const link = screen.getByRole('link', { name: /view credential/i })
      expect(link).toHaveAttribute('href', 'https://example.com/utp')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link).toHaveTextContent('opens in a new tab')
    })

    it('lists the four activities after opening the collapsed dropdown', async () => {
      const user = userEvent.setup()
      render(<Certifications />)

      const summary = screen.getByText(ACTIVITIES_TEXT)
      const details = summary.closest('details') as HTMLDetailsElement
      expect(details.open).toBe(false)

      await user.click(summary)
      expect(details.open).toBe(true)

      const items = within(details)
        .getAllByRole('listitem')
        .map((item) => item.textContent)
      expect(items).toEqual([
        'Machine Learning and AI Seminar',
        'Design Thinking Workshop (UResearch Case Study)',
        'Quality Inspection with Computer Vision Seminar',
        'Academic exchange activities with international students',
      ])
    })
  })
})
