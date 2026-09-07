import { useActiveFigure } from '../../hooks/useActiveFigure'
import { cn } from '../../lib/cn'

/**
 * THE SIGNATURE ELEMENT.
 *
 * A margin rail that lists every numbered figure on the page and highlights
 * the one you are currently beside, the way a printed paper's figure index
 * would. It is deliberately the only ambient motion on the site.
 *
 * Hidden below 1280px, where there is no margin to put it in -- the figures
 * themselves stay numbered, so nothing is lost on mobile.
 */
export function FigureRail({ figures }) {
  const active = useActiveFigure()
  if (!figures || figures.length === 0) return null

  return (
    <aside
      aria-label="Figure index"
      className="no-print pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ol className="space-y-[6px]">
        {figures.map((f) => {
          const isActive = active === f.key
          return (
            <li key={f.key} className="pointer-events-auto">
              <a
                href={`#fig-${f.key}`}
                className="group flex items-center gap-2"
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  aria-hidden
                  className={cn(
                    'block h-px transition-all duration-300 ease-out',
                    isActive ? 'w-6 bg-accent' : 'w-3 bg-line group-hover:w-5 group-hover:bg-muted',
                  )}
                />
                <span
                  className={cn(
                    'nums text-micro transition-colors duration-300',
                    isActive ? 'text-accent' : 'text-transparent group-hover:text-muted',
                  )}
                >
                  {f.number}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
