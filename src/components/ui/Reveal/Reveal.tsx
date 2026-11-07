import type { ReactNode } from 'react'
import { useInView } from '../../../hooks/useInView'
import './Reveal.css'

type RevealProps = {
  children: ReactNode
}

/*
  Fades and slides its children in the first time they scroll into view.
  The hiding only happens inside a prefers-reduced-motion check in Reveal.css,
  so visitors who turn motion off always see the content straight away.
*/
export default function Reveal({ children }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true })

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'reveal--visible' : 'reveal--hidden'}`}
    >
      {children}
    </div>
  )
}
