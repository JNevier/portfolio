import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Section from './Section'

describe('Section', () => {
  it('renders its title as a level-2 heading', () => {
    render(
      <Section id="skills" title="Skills & Tools">
        <p>Child content</p>
      </Section>,
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Skills & Tools' }),
    ).toBeInTheDocument()
  })

  it('renders its children', () => {
    render(
      <Section id="skills" title="Skills & Tools">
        <p>Child content</p>
      </Section>,
    )

    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('is labelled by its heading so screen readers can find it', () => {
    render(
      <Section id="skills" title="Skills & Tools">
        <p>Child content</p>
      </Section>,
    )

    expect(
      screen.getByRole('region', { name: 'Skills & Tools' }),
    ).toHaveAttribute('id', 'skills')
  })
})
