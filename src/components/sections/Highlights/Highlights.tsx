import { highlights as defaultHighlights } from '../../../data/highlights'
import type { Highlight } from '../../../data/highlights'
import './Highlights.css'

type HighlightsProps = {
  /** Defaults to the data file. Tests pass their own list. */
  highlights?: Highlight[]
}

/*
  Slim proof strip right under the hero, so a visitor sees the competition
  results within the first few seconds. Content comes from data/highlights.ts.
  An item with `proof` also shows a small thumbnail that opens the full image
  in a new tab.
*/
export default function Highlights({
  highlights = defaultHighlights,
}: HighlightsProps) {
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

            {/* With proof: thumbnail under the text on phones, beside it on wider screens. */}
            <div className={item.proof ? 'highlights__body' : undefined}>
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-muted text-sm">
                  {item.detail} · {item.period}
                </p>
                {item.status && (
                  <p className="text-muted mt-1 text-xs">{item.status}</p>
                )}
              </div>

              {item.proof && (
                <a
                  href={item.proof.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlights__proof"
                >
                  <img
                    src={item.proof.src}
                    alt={item.proof.alt}
                    width={112}
                    height={63}
                    loading="lazy"
                    className="highlights__thumb"
                  />
                  <span className="highlights__proof-label">
                    {item.proof.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
