import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

/* Read the current theme and the toggle function from any component. */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error('useTheme must be used inside <ThemeProvider>')
  }
  return context
}
