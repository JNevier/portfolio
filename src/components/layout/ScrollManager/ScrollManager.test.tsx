import { act, render } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import ScrollManager from './ScrollManager'

// Lets each test navigate like a click on a link would.
let navigate: NavigateFunction
function GrabNavigate() {
  navigate = useNavigate()
  return null
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ScrollManager />
      <GrabNavigate />
      <section id="projects">Projects</section>
    </MemoryRouter>,
  )
}

describe('ScrollManager', () => {
  let scrollTo: MockInstance
  let scrollIntoView: MockInstance<() => void>

  beforeEach(() => {
    scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    // jsdom has no scrollIntoView, so give elements a fake one.
    const fakeScrollIntoView = vi.fn<() => void>()
    Element.prototype.scrollIntoView = fakeScrollIntoView
    scrollIntoView = fakeScrollIntoView
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('scrolls a new page to the top', () => {
    renderAt('/')
    scrollTo.mockClear()

    act(() => navigate('/projects'))
    expect(scrollTo).toHaveBeenCalledWith(0, 0)
  })

  it('does not scroll when only the query string changes', () => {
    renderAt('/projects')
    scrollTo.mockClear()

    act(() => navigate('/projects?type=front-end', { replace: true }))
    act(() => navigate('/projects', { replace: true }))
    expect(scrollTo).not.toHaveBeenCalled()
    expect(scrollIntoView).not.toHaveBeenCalled()
  })

  it('scrolls to the #hash section', () => {
    renderAt('/projects')

    act(() => navigate('/#projects'))
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })

  it('scrolls to the top again when the same link is clicked twice', () => {
    renderAt('/projects')
    scrollTo.mockClear()

    act(() => navigate('/projects'))
    expect(scrollTo).toHaveBeenCalledTimes(1)
  })
})
