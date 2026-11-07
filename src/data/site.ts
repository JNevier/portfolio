/*
  Identity, contact links and the short bio text.
  Edit this file to change the name, email or links shown across the whole site.

  Anything set to `null` is treated as "not available yet" and the components
  simply leave it out, so the site never renders a dead link.
*/

export const site = {
  name: 'Reiven O. Jasa',
  initials: 'RJ',
  title: 'Full-Stack Developer & Computer Science Student',
  location: 'Batangas, Philippines',
  email: 'reiven.jasa.dev@gmail.com',

  // Shown in the Contact section only. Never add it to the hero, footer,
  // About, metadata, or the README.
  phone: '0977 420 1347',
  // The same number in international format, for the tel: link.
  phoneHref: 'tel:+639774201347',

  // One sentence for the hero, directly under the name.
  tagline:
    'Fourth-year BS Computer Science student building full-stack web apps and embedded systems, looking for a developer internship or OJT role.',

  // Longer version used in the About section.
  bio: [
    'I am a fourth-year BS Computer Science student at De La Salle Lipa with experience in full-stack web development, embedded systems, and software testing.',
    'I have contributed to a point-of-sale web application and an IoT-based assistive device, with hands-on experience in React, TypeScript, Node.js, and C++. I am a regional champion in the DICT Philippine Startup Challenge XI, and I have a strong interest in developing practical technology solutions and continuously expanding my technical skills.',
  ],

  lookingFor:
    'I am currently looking for a Developer Internship or OJT placement where I can contribute to real products, work alongside an experienced team, and keep growing as a full-stack developer.',

  links: {
    github: 'https://github.com/JNevier',
    // Set to null to hide the LinkedIn link.
    linkedin: 'https://www.linkedin.com/in/reivenjasa/' as string | null,
  },

  // The file lives in public/Reiven-Jasa-Resume.pdf. Visitors download it
  // under this name, so keep it as Firstname-Lastname-Resume.pdf.
  resumePath: '/Reiven-Jasa-Resume.pdf',

  // The file lives in public/profile.jpg. Set to null to show the "RJ" initials instead.
  photo: '/profile.jpg' as string | null,
}

export const education = {
  school: 'De La Salle Lipa',
  location: 'Lipa, Batangas',
  degree: 'BS Computer Science',
  period: '2023 – Expected 2027',
  gpa: 'Cumulative GPA: 3.30 / 4.00',
  // The school logo shown in the About section. The file lives in public/.
  logo: '/de_la_salle_lipa_logo.jpg',
}
