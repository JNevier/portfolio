import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Accomplishments from './Accomplishments'

describe('Accomplishments', () => {
  it('shows the stat above the text, and spans the row without a stat', () => {
    render(
      <Accomplishments
        items={[
          { text: 'An award' },
          { stat: '42', text: 'tests passed' },
        ]}
      />,
    )

    const [award, stat] = screen.getAllByRole('listitem')
    expect(award).toHaveClass('accomplishments__item--wide')
    expect(award).toHaveTextContent(/^An award$/)

    expect(stat).not.toHaveClass('accomplishments__item--wide')
    const [number, text] = stat.querySelectorAll('p')
    expect(number).toHaveTextContent('42')
    expect(number).toHaveClass('accomplishments__stat')
    expect(text).toHaveTextContent('tests passed')
  })

  it('renders nothing when there are no items', () => {
    const { container, rerender } = render(<Accomplishments items={[]} />)
    expect(container).toBeEmptyDOMElement()

    rerender(<Accomplishments />)
    expect(container).toBeEmptyDOMElement()
  })
})
