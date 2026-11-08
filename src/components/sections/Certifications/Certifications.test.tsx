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
    const DESCRIPTION = [
      'Participated in technical seminars on Machine Learning, Artificial Intelligence, and Computer Vision for Quality Inspection.',
      'Engaged in a Design Thinking Workshop and academic exchange activities with international students.',
    ]

    it('shows the title and subtitle', () => {
      render(<Certifications />)

      expect(
        screen.getByText(
          'Universiti Teknologi PETRONAS (UTP) – International Academic Immersion Program',
        ),
      ).toBeInTheDocument()
      expect(screen.getByText('Malaysia · 1 Week · 2026')).toBeInTheDocument()
    })

    it('links both posts in a new tab, without tracking parameters', () => {
      render(<Certifications certifications={[]} />)

      const first = screen.getByRole('link', { name: /view post 1/i })
      const second = screen.getByRole('link', { name: /view post 2/i })
      expect(first).toHaveAttribute('href', 'https://www.instagram.com/p/DYHvTMqkZ4g/')
      expect(second).toHaveAttribute('href', 'https://www.instagram.com/p/DYHvF6XEa7U/')
      for (const link of [first, second]) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        expect(link).toHaveTextContent('opens in a new tab')
      }
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
    })

    it('shows no links at all when there are no posts and no credential', () => {
      const plain: Training[] = [{ ...utp, posts: undefined }]
      render(<Certifications certifications={[]} trainings={plain} />)

      expect(screen.queryByRole('link')).not.toBeInTheDocument()
      expect(screen.queryByText('0')).not.toBeInTheDocument()
    })

    it('lists the description as bullets inside the collapsed View Activities dropdown', async () => {
      const user = userEvent.setup()
      render(<Certifications certifications={[]} />)

      const summary = screen.getByText('View Activities')
      const details = summary.closest('details') as HTMLDetailsElement
      expect(details.open).toBe(false)

      const items = within(details)
        .getAllByRole('listitem')
        .map((item) => item.textContent)
      expect(items).toEqual(DESCRIPTION)

      await user.click(summary)
      expect(details.open).toBe(true)
      expect(screen.getByText(DESCRIPTION[0])).toBeVisible()
    })
  })
})
