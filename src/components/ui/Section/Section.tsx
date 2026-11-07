import type { ReactNode } from 'react'
import Reveal from '../Reveal'

type SectionProps = {
  /** Used as the anchor target for the navbar links, e.g. #projects */
  id: string
  title: string
  /** Optional one-line description shown under the heading. */
  intro?: string
  /** Set to true for a light grey background, to separate neighbouring sections. */
  muted?: boolean
  children: ReactNode
}

/*
  The shared shell for every content section: a semantic <section>, a centred
  container with consistent padding, and an <h2> heading. Only the hero uses
  the page's single <h1>.
*/
export default function Section({
  id,
  title,
  intro,
  muted = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={muted ? 'bg-surface-muted' : 'bg-surface'}
    >
      {/* The content fades in the first time it scrolls into view. */}
      <Reveal>
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h2
            id={`${id}-heading`}
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {title}
          </h2>
          {intro && <p className="text-muted mt-3 max-w-2xl">{intro}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </Reveal>
    </section>
  )
}
