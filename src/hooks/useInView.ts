import { useEffect, useRef, useState } from 'react'

/*
  Tells you whether an element has scrolled into view.
  Attach the returned `ref` to the element. With `once: true` it stops
  watching after the first time, so the element stays "in view".

  If the browser has no IntersectionObserver, everything counts as in view,
  so content is never left hidden.
*/
export function useInView<T extends Element>({ once = false } = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      }
    })

    observer.observe(element)
    // Cleanup: stop watching when the component unmounts.
    return () => observer.disconnect()
  }, [once])

  return { ref, inView }
}
