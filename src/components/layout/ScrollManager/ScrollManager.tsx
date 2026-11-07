import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
  A single-page app does not scroll by itself when the route changes,
  so this component does it:
  - a URL with a #hash (e.g. /#projects) scrolls to that section,
  - any other new page starts at the top.
  It renders nothing; it only reacts to location changes.
*/
export default function ScrollManager() {
  // `key` changes on every navigation, even when clicking the same link twice.
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])

  return null
}
