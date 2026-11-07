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
    // Each course links to its own Coursera credential.
    courses: [
      { name: 'Introduction to Front-End Development', credentialUrl: 'https://coursera.org/share/b4d0b4d7cdaa5a59d11896af55af4ba5' },
      { name: 'Programming with JavaScript', credentialUrl: 'https://coursera.org/share/5de04465c9a22387a4f8195058dad5c7' },
      { name: 'Version Control', credentialUrl: 'https://coursera.org/share/8bdd7f626e65e7d94ff462f2eec01422' },
      { name: 'HTML and CSS in Depth', credentialUrl: 'https://coursera.org/share/063845ad01914968cbf39f5197f49a3a' },
      { name: 'React Basics', credentialUrl: 'https://coursera.org/share/0de258bc3388462daedcf98626704b39' },
      { name: 'Advanced React', credentialUrl: 'https://coursera.org/share/767d8a39db800d04cdb801b596e1cb06' },
      { name: 'Principles of UX/UI Design', credentialUrl: 'https://coursera.org/share/8eeac8da2bbf54a06683325833f1965a' },
      { name: 'Front-End Developer Capstone', credentialUrl: 'https://coursera.org/share/0c1663bc6f55750127db3ead8c7047ef' },
      { name: 'Coding Interview Preparation', credentialUrl: 'https://coursera.org/share/8e9cb1231254ff5d60139b80fbaa325a' },
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
