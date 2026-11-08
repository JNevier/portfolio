import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Gallery from './Gallery'

describe('Gallery', () => {
  it('renders nothing when there are no images', () => {
    const { container, rerender } = render(<Gallery images={[]} />)
    expect(container).toBeEmptyDOMElement()

    rerender(<Gallery />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a lazy, uncropped figure per image, with a caption when given', () => {
    const { container } = render(
      <Gallery
        images={[
          { src: '/projects/demo/one.jpg', alt: 'First photo', caption: 'The first one' },
          { src: '/projects/demo/two.jpg', alt: 'Second photo' },
        ]}
      />,
    )

    const figures = container.querySelectorAll('figure')
    expect(figures).toHaveLength(2)

    const first = screen.getByRole('img', { name: 'First photo' })
    expect(first).toHaveAttribute('loading', 'lazy')
    expect(first).toHaveClass('project-media__img--contain')
    expect(figures[0].querySelector('figcaption')).toHaveTextContent('The first one')

    expect(screen.getByRole('img', { name: 'Second photo' })).toBeInTheDocument()
    expect(figures[1].querySelector('figcaption')).toBeNull()
  })
})
