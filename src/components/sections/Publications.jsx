import { publications } from '../../data/publications'
import { Section } from '../layout/Section'

export function Publications() {
  if (!publications || publications.length === 0) return null

  return (
    <Section id="publications" title="Research">
      <ul className="space-y-8">
        {publications.map((p) => (
          <li key={p.title} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
            <h3 className="max-w-prose font-display text-h4 font-semibold">{p.title}</h3>
            <p className="mt-2 text-small text-muted">
              {p.venue} — {p.status}
              {p.id ? ` (${p.id})` : ''}
            </p>
            {p.authors && <p className="mt-1 text-small text-muted">{p.authors}</p>}
            {p.summary && <p className="mt-4 max-w-prose text-base">{p.summary}</p>}
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-block border-b border-line pb-px text-small transition-colors hover:border-accent hover:text-accent"
              >
                Read the paper
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
