import { LinkRow } from './LinkRow'
import { TechChips } from './TechChips'

/**
 * Compact rendering for earlier work: title, one line, stack, links.
 * No diagrams, no deep dive, no metrics block. These projects are evidence of
 * range, not the argument for hiring you -- so they get a row, not an essay.
 *
 * A project opts in with `secondary: true` in src/data/projects.js.
 */
export function SecondaryEntry({ project }) {
  return (
    <li id={project.id} className="scroll-mt-24 border-t border-line py-6">
      <div className="grid gap-x-10 gap-y-3 md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <h3 className="font-display text-lead font-semibold">{project.title}</h3>
          <p className="mt-1 max-w-prose text-small text-muted">{project.tagline}</p>
          {project.metrics && project.metrics.length > 0 && (
            <p className="nums mt-2 text-small">
              {project.metrics.map((m, i) => (
                <span key={m.label}>
                  {i > 0 && <span className="text-line"> / </span>}
                  <span className="text-accent">{m.value}</span>{' '}
                  <span className="text-muted">{m.label.toLowerCase()}</span>
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="space-y-3">
          <p className="nums text-micro text-muted">{project.period}</p>
          {project.tech && <TechChips items={project.tech} />}
          {project.links && <LinkRow links={project.links} title={project.title} />}
        </div>
      </div>
    </li>
  )
}
