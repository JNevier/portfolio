import './ProjectMedia.css'

type ProjectMediaProps = {
  /** Path to the image in public/. null shows a plain placeholder box instead. */
  src: string | null
  /** Describes the image for screen-reader users. */
  alt: string
  /**
   * 'contain' (the default) shows the whole image, never cropped.
   * 'cover' fills the frame and may crop the edges.
   */
  fit?: 'contain' | 'cover'
  /** Text shown in the placeholder box, e.g. the project's name. */
  placeholder?: string
  /** Lazy-load images further down the page (cards, gallery photos). */
  lazy?: boolean
  className?: string
}

/*
  An image inside a fixed 16:9 frame, used by the project card, the
  case-study page, and the case-study gallery.
  - The frame keeps its shape before the image loads, so the layout never jumps.
  - The frame is always white (--color-media), because the current images are
    logos and illustrations with white or transparent backgrounds.
*/
export default function ProjectMedia({
  src,
  alt,
  fit = 'contain',
  placeholder = '',
  lazy = false,
  className = '',
}: ProjectMediaProps) {
  // No image yet: a plain placeholder box with the project's name.
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className={`project-media project-media--placeholder ${className}`}
      >
        {placeholder}
      </div>
    )
  }

  return (
    <div className={`project-media ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        width={1600}
        height={900}
        className={`project-media__img project-media__img--${fit}`}
      />
    </div>
  )
}
