import { RotateCcw } from 'lucide-react'

/**
 * Shared frame for every interactive demo: title, honesty note, controls slot,
 * and a reset button. Keeping this in one place means a new simulation only
 * has to supply its own body.
 *
 * `note` is not optional by convention: each demo states plainly what is
 * measured and what is illustrative, so nothing on the page overclaims.
 */
export function SimShell({ title, note, onReset, children, controls }) {
  return (
    <div className="my-8 border border-line">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <h4 className="text-small font-medium">{title}</h4>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-micro text-muted transition-colors hover:text-accent"
          >
            <RotateCcw size={13} aria-hidden />
            Reset
          </button>
        )}
      </div>

      <div className="px-4 py-5">{children}</div>

      {controls && <div className="border-t border-line px-4 py-4">{controls}</div>}

      {note && (
        <p className="border-t border-line px-4 py-3 text-micro text-muted">{note}</p>
      )}
    </div>
  )
}

/** Labelled range input, styled consistently across demos. */
export function SimSlider({ id, label, value, min, max, step = 1, onChange, display }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-micro">
        <span className="text-muted">{label}</span>
        <span className="nums text-accent">{display}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1 w-full cursor-pointer appearance-none rounded bg-line accent-[var(--c-accent)]"
      />
    </div>
  )
}
