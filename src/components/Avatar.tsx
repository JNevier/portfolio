import { site } from '../data/site'

type AvatarProps = {
  /** Tailwind size classes, e.g. "h-40 w-40". */
  className?: string
}

/*
  Shows the profile photo when one is available, and a clean initials circle
  until then. Set `photo` in src/data/site.ts to switch over.
*/
export default function Avatar({ className = 'h-40 w-40' }: AvatarProps) {
  if (site.photo) {
    return (
      <img
        src={site.photo}
        alt={`Portrait of ${site.name}`}
        className={`border-line rounded-full border object-cover ${className}`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`${site.name} initials`}
      className={`bg-brand-700 flex items-center justify-center rounded-full text-3xl font-bold tracking-wide text-white select-none ${className}`}
    >
      {site.initials}
    </div>
  )
}
