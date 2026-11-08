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
            {/* Seal beside the text; it never shrinks, the text wraps instead. */}
            <div className="about__school mt-3">
              {/* The seal PNG is transparent, so it sits straight on the card. */}
              <div className="about__seal-tile">
                {/* Decorative: the school name is written right next to it.
                    width/height match the seal's 274×364 shape at 64px tall,
                    so the browser reserves the space before it loads. */}
                <img
                  src={education.logo}
                  alt=""
                  width={48}
                  height={64}
                  className="about__seal"
                />
              </div>
              <div className="about__school-text">
                <p className="font-semibold">{education.degree}</p>
                <p>
                  {education.school}, {education.location}
                </p>
                <p className="text-muted mt-1 text-sm">{education.period}</p>
                <p className="text-muted text-sm">{education.gpa}</p>
              </div>
            </div>
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
