import { skillGroups } from '../data/skills'
import Section from './Section'

/* Skills & Tools: one card per group from src/data/skills.ts. */
export default function Skills() {
  return (
    <Section id="skills" title="Skills & Tools" muted>
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="border-line bg-surface rounded-lg border p-5"
          >
            <h3 className="font-semibold">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="bg-brand-50 text-brand-800 rounded-md px-2 py-1 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
