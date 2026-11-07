import { site } from '../data/site'
import Section from './Section'

/*
  Contact section. There is no backend, so the email button opens the
  visitor's own mail app with a `mailto:` link.
*/
export default function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      intro="I am open to Developer Internship and OJT opportunities. The fastest way to reach me is by email."
      muted
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={`mailto:${site.email}`}
          className="bg-brand-700 hover:bg-brand-800 rounded-md px-5 py-3 text-center font-semibold text-white"
        >
          Email me
        </a>
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="border-line bg-surface hover:bg-surface-muted rounded-md border px-5 py-3 text-center font-semibold"
        >
          GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        {/* LinkedIn only appears once a URL is added in src/data/site.ts. */}
        {site.links.linkedin && (
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border-line bg-surface hover:bg-surface-muted rounded-md border px-5 py-3 text-center font-semibold"
          >
            LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        <a
          href={site.resumePath}
          download
          className="border-line bg-surface hover:bg-surface-muted rounded-md border px-5 py-3 text-center font-semibold"
        >
          Download Resume
        </a>
      </div>

      <p className="text-muted mt-6 text-sm">
        Or write to{' '}
        <a
          href={`mailto:${site.email}`}
          className="text-brand-700 font-medium underline underline-offset-4"
        >
          {site.email}
        </a>
        . Based in {site.location}.
      </p>
    </Section>
  )
}
