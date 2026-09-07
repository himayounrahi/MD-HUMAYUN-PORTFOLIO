/**
 * Metrics as a definition list -- the value large, the label small underneath.
 * Renders nothing at all when a project has no metrics, rather than showing
 * an empty frame.
 */
export function MetricList({ metrics }) {
  if (!metrics || metrics.length === 0) return null

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5 sm:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label}>
          <dd className="nums font-display text-h4 font-semibold leading-none">{m.value}</dd>
          <dt className="mt-1.5 text-micro text-muted">{m.label}</dt>
        </div>
      ))}
    </dl>
  )
}
