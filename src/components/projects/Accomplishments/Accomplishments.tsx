import type { CaseStudy } from '../../../data/projects'
import './Accomplishments.css'

type AccomplishmentsProps = {
  items?: CaseStudy['accomplishments']
}

/*
  Results of a project, shown as a grid of small cards on the case-study page.
  An item with a `stat` shows the number large above its text; an item
  without one (e.g. an award) spans the whole row instead.
  Renders nothing when there are no items.
*/
export default function Accomplishments({ items }: AccomplishmentsProps) {
  if (!items || items.length === 0) return null

  return (
    <ul className="accomplishments">
      {items.map((item) => (
        <li
          key={item.text}
          className={
            item.stat
              ? 'accomplishments__item'
              : 'accomplishments__item accomplishments__item--wide'
          }
        >
          {item.stat && <p className="accomplishments__stat">{item.stat}</p>}
          <p className="accomplishments__text">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}
