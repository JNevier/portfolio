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
    // TODO: add your LinkedIn profile URL here to show a LinkedIn link.
    linkedin: null as string | null,
  },

  // TODO: add your resume PDF to public/resume.pdf for this button to work.
  resumePath: '/resume.pdf',

  /*
    TODO: add a square photo to public/profile.jpg to replace the initials avatar.
    Leave this as null and the site shows a clean "RJ" circle instead.
  */
  photo: null as string | null,
}

export const education = {
  school: 'De La Salle Lipa',
  location: 'Lipa, Batangas',
  degree: 'BS Computer Science',
  period: '2023 – Expected 2027',
  gpa: 'Cumulative GPA: 3.30 / 4.00',
}
