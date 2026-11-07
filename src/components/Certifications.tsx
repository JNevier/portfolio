import { certifications, trainings } from '../data/certifications'
import Section from './Section'

/* Certifications & Training: certificates first, then seminars. */
export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications & Training">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-brand-700 text-sm font-semibold uppercase tracking-wide">
            Certifications
          </h3>
          <ul className="mt-3 space-y-3">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="border-line rounded-lg border p-5"
              >
                <p className="font-semibold">{cert.name}</p>
                <p className="text-muted text-sm">
                  {cert.issuer} · {cert.year}
                </p>
                {/* Only shown once a credential link is added in the data file. */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 mt-2 inline-block text-sm font-semibold hover:underline"
                  >
                    View credential
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-brand-700 text-sm font-semibold uppercase tracking-wide">
            Seminars & Trainings
          </h3>
          <ul className="mt-3 space-y-3">
            {trainings.map((training) => (
              <li
                key={training.program}
                className="border-line rounded-lg border p-5"
              >
                <p className="font-semibold">{training.program}</p>
                <p className="text-muted text-sm">{training.year}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {training.sessions.map((session) => (
                    <li key={session}>{session}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
