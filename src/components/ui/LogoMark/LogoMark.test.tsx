import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { site } from '../../../data/site'
import LogoMark from './LogoMark'

describe('LogoMark', () => {
  it('draws my initials', () => {
    const { container } = render(<LogoMark />)

    expect(container.querySelector('text')).toHaveTextContent(site.initials)
  })

  it('is hidden from screen readers because it is decorative', () => {
    const { container } = render(<LogoMark />)

    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })
})
