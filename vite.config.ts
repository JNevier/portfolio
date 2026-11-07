import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
// vitest/config re-exports Vite's defineConfig and adds the `test` options.
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // jsdom gives the tests a browser-like `document` to render into.
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
