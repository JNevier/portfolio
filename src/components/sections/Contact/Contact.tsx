import type { IconType } from 'react-icons'
import { FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'
import { site } from '../../../data/site'
import Section from '../../ui/Section'
import './Contact.css'

type ContactLink = {
  label: string
  value: string
  href: string
  Icon: IconType
  /** Profiles open in a new tab; email and phone open the visitor's own app. */
  external?: boolean
}

/* "https://github.com/JNevier" -> "JNevier" (the handle at the end of a profile URL). */
function handleFrom(url: string) {
  return url.replace(/\/+$/, '').split('/').pop() ?? url
}

/*
  Lets a long email address wrap before the "@" instead of in the middle of a
  word. <wbr> is an invisible "you may break here" hint for the browser.
*/
function BreakBeforeAt({ text }: { text: string }) {
  const at = text.indexOf('@')
  if (at === -1) return text

  return (
    <>
      {text.slice(0, at)}
      <wbr />
      {text.slice(at)}
    </>
  )
}

/* The cards, in order. LinkedIn is left out while its URL is null. */
function getContactLinks(): ContactLink[] {
  const links: ContactLink[] = [
    {
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
      Icon: SiGmail,
    },
    {
      label: 'Phone',
      value: site.phone,
      href: site.phoneHref,
      Icon: FaPhone,
    },
    {
      label: 'GitHub',
      value: handleFrom(site.links.github),
      href: site.links.github,
      Icon: FaGithub,
      external: true,
    },
  ]

  if (site.links.linkedin) {
    links.push({
      label: 'LinkedIn',
      value: handleFrom(site.links.linkedin),
      href: site.links.linkedin,
      Icon: FaLinkedin,
      external: true,
    })
  }

  return links
}

/*
  Contact section: one link card per way to reach me.
  There is no backend and no form.
*/
export default function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      intro={site.contactIntro}
      muted
    >
      <ul className="contact__grid">
        {getContactLinks().map(({ label, value, href, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              className="contact-card"
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {/* Decorative: the visible label already says what the card is. */}
              <Icon aria-hidden="true" focusable="false" className="contact-card__icon" />
              <span className="contact-card__text">
                <span className="contact-card__label">{label}</span>
                <span className="contact-card__value">
                  <BreakBeforeAt text={value} />
                </span>
              </span>
              {external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>

      <p className="text-muted mt-6 text-sm">Based in {site.location}.</p>
    </Section>
  )
}
