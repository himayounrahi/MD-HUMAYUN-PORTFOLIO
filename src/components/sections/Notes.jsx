import { notes } from '../../data/notes'
import { Section } from '../layout/Section'
import { Tag } from '../ui/Tag'

/**
 * Problem write-ups. Deliberately structured rather than free-form: the same
 * four beats every time (naive approach, why it fails, what worked, cost) so
 * a reader can skim five of them and still follow each one.
 */
export function Notes() {
  if (!notes || notes.length === 0) return null

  return (
    <Section
      id="notes"
      title="Engineering notes"
      lead="Problems where the obvious solution was the wrong one. Written up the way I would explain them at a whiteboard."
    >
      <div className="space-y-14">
        {notes.map((n) => (
          <article key={n.title} className="border-t border-line pt-6">
            <h3 className="max-w-prose font-display text-h4 font-semibold">{n.title}</h3>

            {n.tags && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {n.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 max-w-prose space-y-5">
              <Beat label="The obvious approach">{n.naive}</Beat>
              <Beat label="Why it breaks">{n.whyItFails}</Beat>
              <Beat label="What worked">{n.approach}</Beat>
            </div>

            {n.complexity && (
              <dl className="nums mt-6 flex gap-10 border-y border-line py-4">
                <div>
                  <dd className="font-display text-lead font-semibold">{n.complexity.time}</dd>
                  <dt className="mt-1 text-micro text-muted">Time</dt>
                </div>
                <div>
                  <dd className="font-display text-lead font-semibold">{n.complexity.space}</dd>
                  <dt className="mt-1 text-micro text-muted">Space</dt>
                </div>
              </dl>
            )}

            {n.code && (
              <pre className="mt-6 overflow-x-auto border border-line bg-surface p-4 text-micro leading-relaxed">
                <code>{n.code}</code>
              </pre>
            )}

            {n.link && (
              <a
                href={n.link}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-block border-b border-line pb-px text-small transition-colors hover:border-accent hover:text-accent"
              >
                The problem
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}

function Beat({ label, children }) {
  return (
    <div>
      <h4 className="text-micro text-muted">{label}</h4>
      <p className="mt-1.5 text-base">{children}</p>
    </div>
  )
}
