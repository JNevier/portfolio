import { highlights } from '../data/highlights'

/*
  Slim proof strip right under the hero, so a visitor sees the competition
  results within the first few seconds. Content comes from data/highlights.ts.
*/
export default function Highlights() {
  return (
    <section
      aria-label="Competitions and recognition"
      className="bg-brand-50 border-line border-y"
    >
      <ul className="mx-auto grid max-w-5xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-2">
        {highlights.map((item) => (
          <li key={item.label} className="flex gap-3">
            <svg
              aria-hidden="true"
              className="text-brand-700 mt-0.5 h-5 w-5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
            </svg>
            <div>
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-muted text-sm">
                {item.detail} · {item.period}
              </p>
              {item.status && (
                <p className="text-muted mt-1 text-xs">{item.status}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
