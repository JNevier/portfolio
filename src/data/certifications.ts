/*
  Certifications and seminars / trainings.
  `credentialUrl` is optional: leave it out until the link exists, and the
  site shows the certificate without a link.
*/

export type Certification = {
  name: string
  issuer: string
  year: string
  credentialUrl?: string
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
