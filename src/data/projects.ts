/*
  Featured projects, shown as cards in the Projects section.

  To add or change a project, edit this list. The layout code reads every
  field from here, so no component needs to change.
*/

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  /** One line under the title. */
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
}

export const projects: Project[] = [
  {
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
    // TODO: add a photo or screenshot to public/projects/second-vision.png, then set this to '/projects/second-vision.png'.
    screenshot: null,
    screenshotAlt: 'The Second Vision smart glasses prototype',
  },
  {
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
    // TODO: add a screenshot to public/projects/sobre-pos.png, then set this to '/projects/sobre-pos.png'.
    screenshot: null,
    screenshotAlt: 'The Sobre POS checkout screen',
  },

  /*
    Little Lemon is hidden until I confirm it. Remove the comment markers
    around this entry to show it on the site.

  {
    title: 'Little Lemon',
    summary: 'A reserve-a-table web app from the Meta Front-End Capstone.',
    role: 'Front-End Developer',
    period: '2026',
    status: 'Completed',
    stack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    bullets: [
      'Built a table reservation flow for a restaurant as the Meta Front-End Developer capstone project.',
    ],
    links: [
      { label: 'Code', href: 'https://github.com/JNevier/little-lemon' },
    ],
    screenshot: null,
    screenshotAlt: 'The Little Lemon reservation page',
  },
  */
]
