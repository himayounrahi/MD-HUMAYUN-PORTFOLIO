import { cn } from '../../lib/cn'

/**
 * One button, two weights. Renders an <a> when `href` is given, a <button>
 * otherwise, so keyboard and screen-reader behaviour is always correct.
 */
export function Button({
  as,
  href,
  variant = 'primary',
  className,
  children,
  external,
  ...rest
}) {
  const Comp = as || (href ? 'a' : 'button')

  const styles = {
    primary:
      'bg-accent text-bg border-accent hover:opacity-90',
    secondary:
      'bg-transparent text-fg border-line hover:border-accent hover:text-accent',
  }

  return (
    <Comp
      href={href}
      className={cn(
        'inline-flex items-center gap-2 border px-4 py-2 text-small font-medium',
        'transition-colors duration-150',
        styles[variant],
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
      {...rest}
    >
      {children}
    </Comp>
  )
}
