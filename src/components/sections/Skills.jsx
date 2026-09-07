import { skills } from '../../data/skills'
import { Section } from '../layout/Section'
import { Tag } from '../ui/Tag'

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      lead="Grouped by what they are used for. No proficiency percentages — the projects above are the evidence."
    >
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="font-display text-lead font-semibold">{group.category}</h3>
            {group.note && <p className="mt-1 text-micro text-muted">{group.note}</p>}
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
