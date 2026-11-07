/*
  Runs before every test file.
  - Adds DOM matchers such as toBeInTheDocument() to expect().
  - Unmounts rendered components after each test so tests stay independent.
*/
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
