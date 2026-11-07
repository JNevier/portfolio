import { useEffect, useState } from 'react'

/*
  Scroll spy: returns the id of the section in the middle of the screen,
  so the navbar can highlight the matching link.

  The rootMargin shrinks the "viewport" to a thin band around the middle of
  the screen, so only one section counts as active at a time.
  Pass `enabled = false` to switch it off (for example on other pages).
*/
export function useActiveSection(ids: string[], enabled = true) {
  const [activeId, setActiveId] = useState<string | null>(null)
  // Joining the ids into one string keeps the effect from re-running when a
  // new array with the same ids is passed on every render.
  const idList = ids.join(',')

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    for (const id of idList.split(',')) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }

    // Cleanup: stop observing when the page changes or the navbar unmounts.
    return () => observer.disconnect()
  }, [idList, enabled])

  // When switched off, nothing is active (even if a section was before).
  return enabled ? activeId : null
}
