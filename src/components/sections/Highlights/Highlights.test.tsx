import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { highlights } from '../../../data/highlights'
import Highlights from './Highlights'

describe('Highlights', () => {
  it('links the DICT item to its proof image in a new tab', () => {
    render(<Highlights />)
    const dict = highlights.find((item) => item.label.includes('DICT'))

    const link = screen.getByRole('link', { name: /view plaque of recognition/i })
    expect(link).toHaveAttribute('href', dict?.proof?.src)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(within(link).getByRole('img')).toHaveAttribute('alt', dict?.proof?.alt)
  })

  it('renders no link for an item without proof', () => {
    render(
      <Highlights
        highlights={[
          { label: 'Plain result', detail: 'Somewhere', period: '2026' },
        ]}
      />,
    )

    expect(screen.getByText('Plain result')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
