import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

/* Shown for any URL that does not match a page, including unknown projects. */
export default function NotFound() {
  useDocumentTitle(`Page not found — ${site.name}`)

  return (
    <section
      aria-labelledby="not-found-heading"
      className="mx-auto max-w-5xl px-4 py-24 sm:px-6"
    >
      <p className="text-brand-700 text-sm font-semibold">404</p>
      <h1
        id="not-found-heading"
        className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Page not found
      </h1>
      <p className="text-muted mt-4 max-w-xl">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="bg-brand-700 hover:bg-brand-800 text-on-brand rounded-md px-5 py-3 text-center font-semibold"
        >
          Go to the home page
        </Link>
        <Link
          to="/#projects"
          className="border-line hover:bg-surface-muted rounded-md border px-5 py-3 text-center font-semibold"
        >
          See my projects
        </Link>
      </div>
    </section>
  )
}
