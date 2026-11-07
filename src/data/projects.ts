/*
  Featured projects, shown as cards in the Projects section.

  To add or change a project, edit this list. The layout code reads every
  field from here, so no component needs to change.
*/

export type ProjectLink = {
  label: string
  href: string
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
  stack: string[]
  /** Two to three short bullets. */
  bullets: string[]
  /** Only real links. Leave a link out instead of adding a dead one. */
  links: ProjectLink[]
  /**
   * Path to a screenshot in public/, e.g. '/projects/sobre-pos.png'.
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
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: 'second-vision',
    title: 'Second Vision',
    summary: 'Smart glasses that help visually impaired users detect hazards.',
    role: 'IoT & QA Engineer',
    period: '2026 – Present',
    team: 'Capstone / thesis team project',
    status: 'In progress',
    stack: ['C++', 'ESP32-C3', 'Raspberry Pi 5', 'UART', 'I2C', 'PWM', 'BMI160'],
    bullets: [
      'Co-developed an offline wearable assistive device that detects hazards and delivers audio and vibration alerts; developed C++ firmware for ESP32-C3 PWM motor control via UART from a Raspberry Pi 5 and BMI160-based turn detection via I2C.',
      'Owned the technical test plan covering 108 unit, integration, system, and alpha test cases, all passed; collaborated through GitHub feature branches and refined the prototype using feedback from four visually impaired reviewers.',
      'The device sustained 29.6 FPS with both AI models running and 3.64+ hours of battery life, evaluated by 25 legally blind participants (mean SUS: 59.1).',
    ],
    links: [],
    // Replace with a real screenshot or photo later
    screenshot: '/projects/second-vision.png',
    screenshotAlt: 'Team Innovision logo, the team behind Second Vision',
    caseStudy: {
      subtitle: 'Smart Glasses for the Visually Impaired',
      overview: [
        'Second Vision is an offline wearable assistive device for visually impaired users. It detects hazards and delivers audio and vibration alerts.',
        'It is my capstone/thesis, built as a team project. My role was IoT & QA Engineer: the C++ firmware for motor control and turn detection, and the technical test plan.',
      ],
    },
  },
  {
    slug: 'sobre-pos',
    title: 'Sobre POS',
    summary: 'A point-of-sale web application for in-store sales and inventory.',
    role: 'Full-Stack Developer',
    period: '2026',
    status: 'Completed',
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Supabase (PostgreSQL)',
    ],
    bullets: [
      'Built the POS screen, shopping cart, checkout flow, and mobile cart drawer using React, TypeScript, and Tailwind CSS; implemented QR/barcode scanning with cooldown logic to prevent duplicate item entries.',
      'Built Express API endpoints for sales processing and inventory QR code scanning, and implemented a Supabase (PostgreSQL) database function for automatic invoice number generation.',
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
    // Replace with a real screenshot or photo later
    screenshot: '/projects/sobre-pos.png',
    screenshotAlt:
      'Illustration of a checklist and stacked boxes, representing sales and inventory',
    caseStudy: {
      subtitle: 'Point-of-Sale Web Application',
      overview: [
        'Sobre POS is a point-of-sale web application. As a Full-Stack Developer, I worked on both sides: the POS screen, cart, and checkout in React, and the Express API endpoints and Supabase database function behind them.',
      ],
    },
  },

  {
    slug: 'little-lemon',
    title: 'Little Lemon',
    summary: 'A reserve-a-table web app from the Meta Front-End Capstone.',
    role: 'Front-End Developer',
    period: '2026',
    status: 'In progress',
    stack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    bullets: [
      'Built a table reservation flow for a restaurant as the Meta Front-End Developer capstone project.',
    ],
    links: [
      { label: 'Code', href: 'https://github.com/JNevier/little-lemon' },
    ],
    screenshot: '/projects/logo-yellow-lemon-box.png',
    screenshotAlt: 'The Little Lemon restaurant logo',
  },
]
