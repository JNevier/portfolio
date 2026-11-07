/*
  Certifications and seminars / trainings.
  `credentialUrl` is optional, on a certificate and on each course: leave it
  out until the link exists, and the site shows the name without a link.
*/

/** One course inside a certificate. Add `credentialUrl` once the link exists. */
export type Course = {
  name: string
  credentialUrl?: string
}

export type Certification = {
  name: string
  issuer: string
  year: string
  credentialUrl?: string
  /** Optional: the courses inside the certificate, listed in order. */
  courses?: Course[]
}

export type Training = {
  program: string
  year: string
  sessions: string[]
}

export const certifications: Certification[] = [
  {
    name: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Coursera',
    year: '2026',
    credentialUrl: 'https://coursera.org/share/08e90ef9701ae512bd1643f9aa7936aa',
    // Add each course's link later as `credentialUrl: '...'`.
    courses: [
      { name: 'Introduction to Front-End Development' },
      { name: 'Version Control' },
      { name: 'HTML and CSS in Depth' },
      { name: 'Programming with JavaScript' },
      { name: 'React Basics' },
      { name: 'Advanced React' },
      { name: 'Principles of UX/UI Design' },
      { name: 'Front-End Developer Capstone' },
      { name: 'Coding Interview Preparation' },
    ],
  },
]

export const trainings: Training[] = [
  {
    program: 'Universiti Teknologi PETRONAS (UTP) Immersion Program',
    year: '2026',
    sessions: [
      'Machine Learning and AI Seminar',
      'Design Thinking Workshop (UResearch Case Study)',
      'Quality Inspection with Computer Vision Seminar',
    ],
  },
]
