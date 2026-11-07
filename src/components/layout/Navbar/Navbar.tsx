import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../../../data/site'
import { useActiveSection } from '../../../hooks/useActiveSection'
import ThemeToggle from '../../ui/ThemeToggle'

const navLinks = [
  { to: '/#projects', label: 'Projects' },
  { to: '/#about', label: 'About' },
  { to: '/#skills', label: 'Skills' },
  { to: '/#contact', label: 'Contact' },
]

// The section ids the links point at: '/#projects' -> 'projects'.
const sectionIds = navLinks.map((link) => link.to.replace('/#', ''))

/*
  The section links include the "/" so they also work from other pages,
  for example from a case study back to /#projects.

  Sticky navigation. On phones the links collapse into a menu toggled by the
  button; `isOpen` tracks whether that menu is showing.
*/
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Scroll spy: which section is on screen. Only on the home page.
  const { pathname } = useLocation()
  const activeId = useActiveSection(sectionIds, pathname === '/')

  // aria-current tells screen readers which link matches the visible section.
  function linkState(to: string) {
    const isActive = activeId !== null && to === `/#${activeId}`
    return { isActive, ariaCurrent: isActive ? ('true' as const) : undefined }
  }

  // Keyboard users can close the open mobile menu with the Escape key.
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    // Clean up the listener when the menu closes or the component unmounts.
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <header className="border-line bg-surface/95 sticky top-0 z-40 border-b backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6"
      >
        {/* NavLink adds aria-current="page" automatically while on the home page. */}
        <NavLink to="/" end className="font-bold tracking-tight">
          {site.name}
        </NavLink>

        <div className="flex items-center gap-3 md:gap-6">
          {/* Desktop links */}
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const { isActive, ariaCurrent } = linkState(link.to)
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    aria-current={ariaCurrent}
                    className={`hover:text-brand-700 text-sm font-medium ${isActive ? 'text-brand-700' : 'text-muted'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <a
                href={site.resumePath}
                download
                className="bg-brand-700 hover:bg-brand-800 rounded-md px-3 py-2 text-sm font-semibold text-on-brand"
              >
                Resume
              </a>
            </li>
          </ul>

          {/* Visible on every screen size, next to the menu button on phones. */}
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="border-line text-muted rounded-md border p-2 md:hidden"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile links: tapping one closes the menu again. */}
      {isOpen && (
        <ul
          id="mobile-menu"
          className="border-line space-y-1 border-t px-4 py-3 md:hidden"
        >
          {navLinks.map((link) => {
            const { isActive, ariaCurrent } = linkState(link.to)
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={ariaCurrent}
                  onClick={() => setIsOpen(false)}
                  className={`hover:bg-surface-muted block rounded-md px-2 py-2 font-medium ${isActive ? 'text-brand-700' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li>
            <a
              href={site.resumePath}
              download
              onClick={() => setIsOpen(false)}
              className="bg-brand-700 mt-1 block rounded-md px-3 py-2 text-center font-semibold text-on-brand"
            >
              Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
