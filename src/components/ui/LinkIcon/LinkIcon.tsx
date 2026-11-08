import type { IconType } from 'react-icons'
import { FaFacebook, FaGithub, FaGlobe, FaInstagram, FaLinkedin } from 'react-icons/fa6'

/* Known websites and their logos. Anything else gets a plain globe. */
const ICONS: Record<string, IconType> = {
  'github.com': FaGithub,
  'instagram.com': FaInstagram,
  'facebook.com': FaFacebook,
  'linkedin.com': FaLinkedin,
}

/** "https://www.github.com/x" -> "github.com". Returns '' for a bad URL. */
export function siteOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

type LinkIconProps = {
  href: string
  className?: string
}

/*
  The logo of the website a link goes to, e.g. the GitHub mark for a GitHub
  link. Decorative: the link text already says where it goes, so screen
  readers skip the icon.
*/
export default function LinkIcon({ href, className = '' }: LinkIconProps) {
  const site = siteOf(href)
  const Icon = ICONS[site] ?? FaGlobe
  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      // Which logo was picked; handy for tests and for checking in DevTools.
      data-icon={site in ICONS ? site : 'globe'}
      className={className}
    />
  )
}
