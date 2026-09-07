import { achievements } from '../../data/achievements'
import { Section } from '../layout/Section'

export function Achievements() {
  if (!achievements || achievements.length === 0) return null

  return (
    <Section id="achievements" title="Awards & certifications">
      <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
        {achievements.map((a) => (
          <li key={a.title} className="border-t border-line pt-4">
            <h3 className="text-base font-medium">{a.title}</h3>
            <p className="mt-1 text-small text-muted">
              {a.issuer}
              {a.year ? ` — ${a.year}` : ''}
            </p>
            {a.detail && <p className="mt-1.5 text-small text-muted">{a.detail}</p>}
            {a.link && (
              <a
                href={a.link}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-block border-b border-line pb-px text-micro hover:border-accent hover:text-accent"
              >
                Certificate
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
