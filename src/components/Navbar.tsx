import { useState } from 'react'
import { site } from '../data/site'

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

/*
  Sticky navigation. On phones the links collapse into a menu toggled by the
  button; `isOpen` tracks whether that menu is showing.
*/
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-line bg-surface/95 sticky top-0 z-40 border-b backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <a href="#top" className="font-bold tracking-tight">
          {site.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted hover:text-brand-700 text-sm font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.resumePath}
              download
              className="bg-brand-700 hover:bg-brand-800 rounded-md px-3 py-2 text-sm font-semibold text-white"
            >
              Resume
            </a>
          </li>
        </ul>

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
      </nav>

      {/* Mobile links: tapping one closes the menu again. */}
      {isOpen && (
        <ul
          id="mobile-menu"
          className="border-line space-y-1 border-t px-4 py-3 md:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:bg-surface-muted block rounded-md px-2 py-2 font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.resumePath}
              download
              onClick={() => setIsOpen(false)}
              className="bg-brand-700 mt-1 block rounded-md px-3 py-2 text-center font-semibold text-white"
            >
              Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
