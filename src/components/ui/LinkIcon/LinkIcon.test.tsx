import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LinkIcon, { siteOf } from './LinkIcon'

describe('LinkIcon', () => {
  it('reads the website from a URL, without "www."', () => {
    expect(siteOf('https://github.com/JNevier')).toBe('github.com')
    expect(siteOf('https://www.instagram.com/p/abc/')).toBe('instagram.com')
    expect(siteOf('not a url')).toBe('')
  })

  it('renders a decorative icon for the link’s website', () => {
    const { container } = render(<LinkIcon href="https://github.com/JNevier/x" />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveAttribute('data-icon', 'github.com')
  })

  it('falls back to a globe for unknown websites', () => {
    const { container } = render(<LinkIcon href="https://my-app.vercel.app" />)

    expect(container.querySelector('svg')).toHaveAttribute('data-icon', 'globe')
  })
})
