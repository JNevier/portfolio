/*
  Runs before every test file.
  - Adds DOM matchers such as toBeInTheDocument() to expect().
  - Unmounts rendered components after each test so tests stay independent.
  - jsdom cannot scroll, so the scroll functions are replaced with no-op fakes.
*/
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
Element.prototype.scrollIntoView = vi.fn()

afterEach(() => {
  cleanup()
})
