import { site } from '../../../data/site'
import './LogoMark.css'

/*
  The "RJ" logo mark used in the navbar: a rounded square with my initials,
  drawn the same way as public/favicon.svg.
  It is decorative (aria-hidden), so the link around it must carry the
  accessible name.
*/
export default function LogoMark() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="logo-mark"
      viewBox="0 0 64 64"
      width="36"
      height="36"
    >
      <rect className="logo-mark__tile" width="64" height="64" rx="14" />
      <text
        className="logo-mark__text"
        x="50%"
        y="50%"
        dy="0.35em"
        textAnchor="middle"
      >
        {site.initials}
      </text>
    </svg>
  )
}
