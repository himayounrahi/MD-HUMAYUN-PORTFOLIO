/** A hairline rule. Structural, not decorative: it separates entries. */
export function Rule({ className = '' }) {
  return <hr className={`border-0 border-t border-line ${className}`} />
}
