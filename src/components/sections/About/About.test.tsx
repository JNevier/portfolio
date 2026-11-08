import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { education } from '../../../data/site'
import About from './About'

describe('About', () => {
  it('shows the school seal from education.logo as a decorative image', () => {
    const { container } = render(<About />)
    const logo = container.querySelector(`img[src="${education.logo}"]`)

    expect(logo).toBeInTheDocument()
    // alt="" because the school name is written right next to the logo.
    expect(logo).toHaveAttribute('alt', '')
    expect(logo).toHaveAttribute('width', '48')
    expect(logo).toHaveAttribute('height', '64')
    expect(education.logo).toBe('/de_la_salle_lipa_seal.png')
  })
})
