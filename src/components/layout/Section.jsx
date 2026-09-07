import { cn } from '../../lib/cn'

/**
 * Every major section on the page. Handles the anchor id, the vertical
 * rhythm, and the section heading treatment in one place -- so spacing stays
 * consistent and no section can quietly drift out of the scale.
 */
export function Section({ id, title, lead, children, className, headingLevel = 'h2' }) {
  const Heading = headingLevel

  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={cn('scroll-mt-24 py-section-sm md:py-section', className)}
    >
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8">
        {title && (
          <div className="mb-10 md:mb-14">
            <Heading
              id={`${id}-heading`}
              className="font-display text-h3 font-semibold md:text-h2"
            >
              {title}
            </Heading>
            {lead && <p className="mt-3 max-w-prose text-base text-muted">{lead}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
