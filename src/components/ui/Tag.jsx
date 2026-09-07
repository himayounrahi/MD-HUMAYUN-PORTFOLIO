import { cn } from '../../lib/cn'

/** Small inline label used for tech chips and status markers. */
export function Tag({ children, tone = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-block border px-2 py-[2px] text-micro leading-none',
        tone === 'accent'
          ? 'border-accent/40 text-accent'
          : 'border-line text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
