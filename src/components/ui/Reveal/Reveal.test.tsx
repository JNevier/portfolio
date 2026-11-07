import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  installIntersectionObserverMock,
  triggerIntersection,
} from '../../../test/mockIntersectionObserver'
import Reveal from './Reveal'

describe('Reveal', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('with IntersectionObserver', () => {
    beforeEach(() => {
      installIntersectionObserverMock()
    })

    it('waits off-screen, then reveals its children once in view', () => {
      render(
        <Reveal>
          <p>Hello</p>
        </Reveal>,
      )
      const wrapper = screen.getByText('Hello').parentElement as HTMLElement

      expect(wrapper).toHaveClass('reveal', 'reveal--hidden')

      act(() => triggerIntersection(wrapper, true))
      expect(wrapper).toHaveClass('reveal--visible')
      expect(wrapper).not.toHaveClass('reveal--hidden')
    })

    it('stays revealed after scrolling away again (only animates once)', () => {
      const instances = installIntersectionObserverMock()
      render(
        <Reveal>
          <p>Hello</p>
        </Reveal>,
      )
      const wrapper = screen.getByText('Hello').parentElement as HTMLElement

      act(() => triggerIntersection(wrapper, true))
      act(() => triggerIntersection(wrapper, false))

      expect(wrapper).toHaveClass('reveal--visible')
      expect(instances[0].disconnect).toHaveBeenCalled()
    })
  })

  it('shows its children straight away when IntersectionObserver is missing', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    render(
      <Reveal>
        <p>Hello</p>
      </Reveal>,
    )

    expect(screen.getByText('Hello').parentElement).toHaveClass('reveal--visible')
  })
})
