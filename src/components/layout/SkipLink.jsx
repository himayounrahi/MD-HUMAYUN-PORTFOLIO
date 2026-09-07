/** First thing in the tab order: lets keyboard users jump past the nav. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50
                 focus:border focus:border-accent focus:bg-bg focus:px-4 focus:py-2 focus:text-small"
    >
      Skip to content
    </a>
  )
}
