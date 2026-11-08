import {
  certifications as defaultCertifications,
  trainings as defaultTrainings,
} from '../../../data/certifications'
import type { Certification, Training } from '../../../data/certifications'
import Disclosure from '../../ui/Disclosure'
import Section from '../../ui/Section'

type CertificationsProps = {
  /** Defaults to the data file. Tests pass their own lists. */
  certifications?: Certification[]
  trainings?: Training[]
}

/* Opens in a new tab, and says so to screen-reader users. */
function CredentialLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand-700 text-sm font-semibold hover:underline"
    >
      View credential
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

/*
  Certifications & Training: certificates first, then seminars.
  A certificate's courses and a training's activities sit in a Disclosure
  (a native <details> toggle), so the lists stay out of the way until a
  visitor asks for them.
*/
export default function Certifications({
  certifications = defaultCertifications,
  trainings = defaultTrainings,
}: CertificationsProps) {
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
                  <p className="mt-2">
                    <CredentialLink href={cert.credentialUrl} />
                  </p>
                )}

                {cert.courses && cert.courses.length > 0 && (
                  <Disclosure
                    label={`View the ${cert.courses.length} courses in this certificate`}
                    className="mt-4"
                  >
                    <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm">
                      {cert.courses.map((course) => (
                        <li key={course.name}>
                          {course.name}
                          {/* No URL yet: show the name only, never an empty link. */}
                          {course.credentialUrl && (
                            <>
                              {' · '}
                              <CredentialLink href={course.credentialUrl} />
                            </>
                          )}
                        </li>
                      ))}
                    </ol>
                  </Disclosure>
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
                <p className="text-muted text-sm">{training.subtitle}</p>
                <div className="mt-2 space-y-2 text-sm">
                  {training.description.map((sentence) => (
                    <p key={sentence}>{sentence}</p>
                  ))}
                </div>
                {/* Only shown once a credential link is added in the data file. */}
                {training.credentialUrl && (
                  <p className="mt-2">
                    <CredentialLink href={training.credentialUrl} />
                  </p>
                )}

                {training.activities.length > 0 && (
                  <Disclosure label="View the activities attended" className="mt-4">
                    <ul className="mt-3 list-disc space-y-2 pl-6 text-sm">
                      {training.activities.map((activity) => (
                        <li key={activity}>{activity}</li>
                      ))}
                    </ul>
                  </Disclosure>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
