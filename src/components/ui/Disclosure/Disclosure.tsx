import type { ReactNode } from 'react'
import './Disclosure.css'

type DisclosureProps = {
  /** The always-visible text a visitor clicks to open or close it. */
  label: string
  /** What is shown once it is open. */
  children: ReactNode
  /** Extra classes for spacing, e.g. "mt-4". */
  className?: string
}

/*
  A show/hide dropdown built on the native <details> and <summary> elements.
  The browser handles opening, closing and the keyboard (Enter and Space on
  the summary), and screen readers announce it as expanded or collapsed.
  Used by the certificate card (courses) and the training card (activities).
*/
export default function Disclosure({ label, children, className = '' }: DisclosureProps) {
  return (
    <details className={`disclosure ${className}`.trim()}>
      <summary className="disclosure__summary text-sm font-semibold">{label}</summary>
      {children}
    </details>
  )
}
