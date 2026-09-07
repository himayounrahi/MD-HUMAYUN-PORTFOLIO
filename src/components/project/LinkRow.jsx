import { ExternalLink, FileText, Github, PlayCircle } from 'lucide-react'

const LINK_META = {
  repo: { label: 'Repository', Icon: Github },
  demo: { label: 'Live demo', Icon: ExternalLink },
  paper: { label: 'Paper', Icon: FileText },
  video: { label: 'Demo video', Icon: PlayCircle },
}

/**
 * Renders only the links a project actually has. A project with no demo does
 * not get a dead button -- the whole row disappears if there are no links.
 */
export function LinkRow({ links, title }) {
  if (!links) return null
  const entries = Object.entries(links).filter(([key, href]) => href && LINK_META[key])
  if (entries.length === 0) return null

  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {entries.map(([key, href]) => {
        const { label, Icon } = LINK_META[key]
        return (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 border-b border-transparent pb-px
                         text-small text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <Icon size={14} aria-hidden />
              {label}
              <span className="sr-only"> for {title}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
