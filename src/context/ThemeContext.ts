import { createContext } from 'react'

/*
  The theme "channel" that any component can read with the useTheme() hook.
  The context object lives in its own file (not with the provider) so that
  component files only export components, which keeps fast refresh working.
*/

export type Theme = 'light' | 'dark'

export type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

/** The localStorage key. index.html reads the same key before React loads. */
export const THEME_STORAGE_KEY = 'theme'

export const ThemeContext = createContext<ThemeContextValue | null>(null)

/*
  Works out which theme to start with:
  1. a choice the visitor saved earlier, otherwise
  2. their operating system setting (prefers-color-scheme).
  Reading storage can throw (private mode, blocked cookies), hence try/catch.
*/
export function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Storage unavailable: fall through to the system setting.
  }

  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  return prefersDark ? 'dark' : 'light'
}
