import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  THEME_STORAGE_KEY,
  ThemeContext,
  getInitialTheme,
} from './ThemeContext'
import type { Theme } from './ThemeContext'

type ThemeProviderProps = {
  children: ReactNode
}

/*
  Holds the current theme in state and shares it with the whole app.
  Whenever the theme changes, it is written to <html data-theme="..."> (which
  switches the colour tokens in index.css) and saved for the next visit.
*/
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Saving failed (storage blocked). The theme still works for this visit.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  // useMemo keeps the same object between renders unless the theme changes,
  // so components using the context do not re-render for no reason.
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext value={value}>{children}</ThemeContext>
}
