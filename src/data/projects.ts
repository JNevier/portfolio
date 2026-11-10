/*
  Every project on the site: the cards, the All projects page (/projects) and
  each case-study page (/projects/<slug>) read from this list.

  To add a project:
  1. Add an entry to the list below. The layout code reads every field from
     here, so no component needs to change.
  2. Set `types` to one or more ids from src/data/projectTypes.ts. They decide
     which filter chips on the All projects page show the project.
  3. Put it in the right place: the order matters. The first FEATURED_COUNT
     projects are the ones shown on the home page.
*/

import type { ProjectTypeId } from './projectTypes'

/**
 * The first FEATURED_COUNT projects in the list are the ones shown on the
 * home page, so the order of the list decides the top 3.
 */
export const FEATURED_COUNT = 3

export type ProjectLink = {
  label: string
  href: string
  /** Marks the live demo. The card shows the first link with `live: true`. */
  live?: boolean
  /** Optional short muted line shown under the link on the case-study page. */
  note?: string
}

/**
 * Extra text for the project's own page (/projects/<slug>).
 * Every block is optional: the page only shows the blocks that are filled in.
 * Only use facts that are already on the resume.
 */
export type CaseStudy = {
  /** Longer name shown under the title, e.g. "Point-of-Sale Web Application". */
  subtitle?: string
  /** One or more short paragraphs that introduce the project. */
  overview?: string[]
  /**
   * Results shown as cards under the overview. `stat` (optional) is shown
   * large above the text; without it, the text spans the whole row.
   */
  accomplishments?: { stat?: string; text: string }[]
}

/** One photo on the case-study page. Files go in public/projects/<slug>/. */
export type GalleryImage = {
  src: string
  /** Describes what the photo shows, for screen-reader users. */
  alt: string
  /** Optional line shown under the photo. */
  caption?: string
}

export type Project = {
  /** Used in the page URL: /projects/<slug>. Lowercase words joined by dashes. */
  slug: string
  title: string
  /** One line under the title, shown on the card and kept short. */
  summary: string
  /** My role on the project. */
  role: string
  period: string
  /** Optional: who built it with me, so team work is credited clearly. */
  team?: string
  status: string
  /** One or more project types, used by the filter chips. */
  types: ProjectTypeId[]
  stack: string[]
  /** Short bullets for the "What I worked on" block. */
  bullets: string[]
  /** Only real links. Leave a link out instead of adding a dead one. */
  links: ProjectLink[]
  /**
   * Path to a screenshot in public/, e.g. '/projects/sobre-pos.webp'.
   * Leave as null to show a plain placeholder box instead.
   */
  screenshot: string | null
  /** Describes the screenshot for screen-reader users. */
  screenshotAlt: string
  /**
   * How the image fills its 16:9 frame. 'contain' (the default) shows the
   * whole image with no cropping, which suits logos and illustrations.
   * 'cover' fills the frame and may crop the edges, which suits photos.
   */
  imageFit?: 'contain' | 'cover'
  /** Optional small muted line under the main image, on the case-study page only. */
  imageCredit?: string
  /**
   * Optional photos for the case-study page. The Gallery block only appears
   * once this list has at least one image.
   */
  gallery?: GalleryImage[]
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: 'second-vision',
    title: 'Second Vision',
    summary: 'Smart glasses that help visually impaired users detect hazards.',
    role: 'IoT & QA Engineer',
    period: '2026 – Present',
    team: 'Capstone / thesis project by Team Innovision (4 members)',
    status: 'In progress',
    types: ['iot', 'thesis'],
    stack: ['C++', 'ESP32-C3', 'Raspberry Pi 5', 'UART', 'I2C', 'PWM', 'BMI160'],
    bullets: [
      'Co-developed an offline wearable assistive device that detects hazards and delivers audio and vibration alerts.',
      'Developed C++ firmware for ESP32-C3 PWM motor control, driven over UART from a Raspberry Pi 5.',
      'Implemented BMI160-based turn detection over I2C.',
      'Owned the technical test plan covering 108 unit, integration, system, and alpha test cases, all passed.',
      'Collaborated through GitHub feature branches and refined the prototype using feedback from four visually impaired reviewers.',
    ],
    // The team's repository, opened on its main branch.
    links: [
      {
        label: 'Code',
        href: 'https://github.com/KRMeeag/second-vision/tree/main',
      },
    ],
    // Replace with a real screenshot or photo later
    screenshot: '/projects/second-vision.png',
    screenshotAlt: 'Team Innovision logo, the team behind Second Vision',
    caseStudy: {
      subtitle: 'Smart Glasses for the Visually Impaired',
      overview: [
        'Second Vision is an offline wearable assistive device for visually impaired users. It detects hazards around the wearer and signals them through audio and vibration, so they can move with more awareness of their surroundings.',
        'The device runs an object-detection model and a depth-estimation model on a Raspberry Pi 5, with no internet connection needed. Detected hazards are announced through audio cues, and vibration motors controlled by an ESP32 microcontroller signal how close an obstacle is.',
        'It is my capstone/thesis, built by Team Innovision as a team project. My role was IoT & QA Engineer: the C++ firmware for motor control and turn detection, and the technical test plan.',
      ],
      // Shown exactly as written: do not round or reword the numbers.
      accomplishments: [
        { text: 'Regional Champion, DICT Philippine Startup Challenge XI (Region IV-A CALABARZON), October 2026' },
        { text: 'Top 3 of 10 Finalists, BAYANI Lab, October 2026' },
        { stat: '108', text: 'unit, integration, system, and alpha test cases, all passed' },
        { stat: '29.6 FPS', text: 'sustained with both AI models running' },
        { stat: '3.64+ hours', text: 'of battery life' },
        { stat: '25', text: 'legally blind participants evaluated the device (mean System Usability Scale score: 59.1)' },
      ],
    },
  },
  {
    slug: 'sobre-pos',
    title: 'Sobre POS',
    summary: 'A point-of-sale web application for in-store sales and inventory.',
    role: 'Full-Stack Developer',
    period: '2026',
    team: 'Team project',
    status: 'Completed',
    types: ['full-stack'],
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Supabase (PostgreSQL)',
    ],
    bullets: [
      'Built the POS screen, shopping cart, checkout flow, and mobile cart drawer using React, TypeScript, and Tailwind CSS.',
      'Implemented QR/barcode scanning with cooldown logic to prevent duplicate item entries.',
      'Built Express API endpoints for sales processing and inventory QR code scanning.',
      'Implemented a Supabase (PostgreSQL) database function for automatic invoice number generation.',
    ],
    links: [
      {
        label: 'Frontend code',
        href: 'https://github.com/JNevier/sobre-project-frontend',
      },
      {
        label: 'Backend code',
        href: 'https://github.com/JNevier/sobre-project-backend',
      },
    ],
    // A real screenshot. 'contain' (the default) shows it whole, without cropping.
    screenshot: '/projects/sobre-pos.webp',
    screenshotAlt: 'The Sobre POS log-in screen',
    caseStudy: {
      subtitle: 'Point-of-Sale Web Application',
      overview: [
        'Sobre is a point-of-sale web application for shops, built around the idea of "Sell, Observe, Restock".',
        'As a Full-Stack Developer on a team project, I worked on both sides: the POS screen, cart, and checkout in React, and the Express API endpoints and Supabase database function behind them.',
      ],
    },
  },

  {
    slug: 'little-lemon',
    title: 'Little Lemon',
    summary: 'A reserve-a-table web app from the Meta Front-End Capstone.',
    role: 'Front-End Developer',
    period: '2026',
    status: 'Completed',
    types: ['front-end'],
    stack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    bullets: [
      'Built a table reservation flow for a restaurant as the capstone project of the Meta Front-End Developer Professional Certificate.',
      'Developed the interface with React, JavaScript, HTML5, and CSS3.',
    ],
    links: [
      { label: 'Code', href: 'https://github.com/JNevier/little-lemon' },
    ],
    screenshot: '/projects/logo-yellow-lemon-box.png',
    screenshotAlt: 'The Little Lemon restaurant logo',
    caseStudy: {
      overview: [
        'Little Lemon is a reserve-a-table web app for a fictional restaurant, built as the capstone of the Meta Front-End Developer Professional Certificate.',
      ],
    },
  },
]
