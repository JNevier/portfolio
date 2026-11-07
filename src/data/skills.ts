/*
  Technical skills, grouped exactly as on my resume.
  No proficiency bars or percentages on purpose: just clear lists.
*/

export type SkillGroup = {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    items: [
      'JavaScript (ES6+)',
      'TypeScript',
      'Python',
      'C++',
      'SQL',
      'HTML5',
      'CSS3',
    ],
  },
  {
    title: 'Web Development',
    items: [
      'React (Hooks, Context API, React Router)',
      'Tailwind CSS',
      'Bootstrap',
      'Node.js',
      'Express',
      'REST APIs',
      'Responsive Design',
    ],
  },
  {
    title: 'Databases & Tools',
    items: [
      'Supabase (PostgreSQL)',
      'MongoDB',
      'Git',
      'GitHub',
      'VS Code',
      'Vite',
      'npm',
      'Figma',
      'Linux Command Line',
    ],
  },
  {
    title: 'Embedded Systems & Testing',
    items: [
      'Raspberry Pi 5',
      'ESP32',
      'UART',
      'I2C',
      'PWM',
      'Unit, Integration and System Testing',
    ],
  },
]
