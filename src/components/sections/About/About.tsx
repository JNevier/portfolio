import { education, site } from '../../../data/site'
import Avatar from '../../ui/Avatar'
import Section from '../../ui/Section'
import './About.css'

/* Short bio, photo, education, and what kind of role I am looking for. */
export default function About() {
  return (
    <Section id="about" title="About">
      {/* Layout uses named grid areas, see About.css. */}
      <div className="about">
        <div className="about__photo">
          <Avatar className="h-36 w-36" />
        </div>

        <div className="about__bio space-y-4 leading-relaxed">
          {site.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="about__facts grid gap-4 sm:grid-cols-2">
          <div className="border-line bg-surface-muted rounded-lg border p-5">
            <h3 className="text-brand-700 text-sm font-semibold uppercase tracking-wide">
              Education
            </h3>
            <p className="mt-2 font-semibold">{education.degree}</p>
            <p>
              {education.school}, {education.location}
            </p>
            <p className="text-muted mt-1 text-sm">{education.period}</p>
            <p className="text-muted text-sm">{education.gpa}</p>
          </div>

          <div className="border-line bg-surface-muted rounded-lg border p-5">
            <h3 className="text-brand-700 text-sm font-semibold uppercase tracking-wide">
              Looking for
            </h3>
            <p className="mt-2">{site.lookingFor}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
