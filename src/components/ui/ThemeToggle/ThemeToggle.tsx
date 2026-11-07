import { useTheme } from '../../../hooks/useTheme'
import './ThemeToggle.css'

/*
  Switches between the light and dark theme.
  The label says what a click will DO, so screen-reader users hear
  "Switch to dark theme" while the page is light, and the other way round.
*/
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className="theme-toggle"
    >
      {/* `key` remounts the icon on each switch, which replays its CSS animation. */}
      <svg
        key={theme}
        aria-hidden="true"
        className="theme-toggle__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {theme === 'dark' ? (
          // Sun: shown in dark mode, clicking goes back to light.
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          // Moon: shown in light mode, clicking switches to dark.
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  )
}
