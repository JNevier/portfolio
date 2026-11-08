import type { GalleryImage } from '../../../data/projects'
import ProjectMedia from '../ProjectMedia'
import './Gallery.css'

type GalleryProps = {
  images?: GalleryImage[]
}

/*
  Project photos on the case-study page, each in a <figure> with an optional
  caption. Photos are shown whole (never cropped) and load lazily.
  With no images it renders nothing at all, so the block only appears once
  photos are added to `gallery` in src/data/projects.ts.
*/
export default function Gallery({ images }: GalleryProps) {
  if (!images || images.length === 0) return null

  return (
    <ul className="gallery">
      {images.map((image) => (
        <li key={image.src}>
          <figure className="gallery__figure">
            <ProjectMedia
              src={image.src}
              alt={image.alt}
              lazy
              className="border-line rounded-lg border"
            />
            {image.caption && (
              <figcaption className="gallery__caption">{image.caption}</figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  )
}
