import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/*
  A single-page app does not scroll by itself when the route changes,
  so this component does it:
  - a URL with a #hash (e.g. /#projects) scrolls to that section,
  - when only the query string changes (a filter chip on /projects sets
    ?type=...), the page stays where it is,
  - any other new page starts at the top.
  It renders nothing; it only reacts to location changes.
*/
export default function ScrollManager() {
  // `key` changes on every navigation, even when clicking the same link twice.
  const { pathname, search, hash, key } = useLocation()
  // The previous location, remembered between renders without re-rendering.
  const previous = useRef({ pathname, search })

  useEffect(() => {
    const onlySearchChanged =
      previous.current.pathname === pathname &&
      previous.current.search !== search &&
      !hash
    previous.current = { pathname, search }
    if (onlySearchChanged) return

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, search, hash, key])

  return null
}
