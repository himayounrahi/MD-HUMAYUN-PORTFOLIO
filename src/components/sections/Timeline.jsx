import { experience } from '../../data/experience'
import { Section } from '../layout/Section'
import { Tag } from '../ui/Tag'

/**
 * Work and education in one chronological column. The marker is filled for
 * work and hollow for education, which is the only distinction that needs
 * making -- a second timeline would just add scrolling.
 */
export function Timeline() {
  return (
    <Section id="experience" title="Experience & education">
      <ol className="relative border-l border-line pl-6 md:pl-8">
        {experience.map((item) => (
          <li key={`${item.role}-${item.period}`} className="relative pb-12 last:pb-0">
            <span
              aria-hidden
              className={`absolute -left-[calc(1.5rem+4.5px)] top-[7px] block h-[9px] w-[9px] rounded-full border
                          md:-left-[calc(2rem+4.5px)] ${
                            item.type === 'work'
                              ? 'border-accent bg-accent'
                              : 'border-muted bg-bg'
                          }`}
            />

            <p className="nums text-micro text-muted">
              {item.period}
              {item.location ? ` — ${item.location}` : ''}
            </p>

            <h3 className="mt-1 font-display text-h4 font-semibold">{item.role}</h3>
            <p className="mt-1 text-small text-muted">{item.org}</p>
            {item.guide && <p className="mt-0.5 text-small text-muted">Guide: {item.guide}</p>}

            {item.bullets && (
              <ul className="mt-4 max-w-prose space-y-2">
                {item.bullets.map((b) => (
                  <li key={b.slice(0, 30)} className="text-base">
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {item.tech && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}
