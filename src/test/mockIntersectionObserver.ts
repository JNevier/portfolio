import { vi } from 'vitest'

/*
  jsdom has no IntersectionObserver, so tests install this fake one.
  `triggerIntersection` lets a test pretend an element scrolled into view.
*/
type Callback = (entries: IntersectionObserverEntry[]) => void

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = []
  callback: Callback
  elements = new Set<Element>()
  disconnect = vi.fn(() => this.elements.clear())

  constructor(callback: Callback) {
    this.callback = callback
    FakeIntersectionObserver.instances.push(this)
  }

  observe(element: Element) {
    this.elements.add(element)
  }

  unobserve(element: Element) {
    this.elements.delete(element)
  }

  takeRecords() {
    return []
  }
}

export function installIntersectionObserverMock() {
  FakeIntersectionObserver.instances = []
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
  return FakeIntersectionObserver.instances
}

export function triggerIntersection(element: Element, isIntersecting: boolean) {
  for (const observer of FakeIntersectionObserver.instances) {
    if (observer.elements.has(element)) {
      observer.callback([
        { target: element, isIntersecting } as IntersectionObserverEntry,
      ])
    }
  }
}
