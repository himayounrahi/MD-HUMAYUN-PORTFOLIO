import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Collapsed extra detail, so the project list stays scannable but the depth
 * is one click away. Motion here answers a click -- that is the kind of
 * animation worth having.
 */
export function DeepDive({ sections, label = 'Read the detail' }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const panelId = `dive-${useId().replace(/:/g, '')}`

  if (!sections || sections.length === 0) return null

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex items-center gap-2 border-b border-line pb-1 text-small
                   text-muted transition-colors hover:border-accent hover:text-accent"
      >
        {open ? 'Hide the detail' : label}
        <ChevronDown
          size={15}
          aria-hidden
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pt-6">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h4 className="font-display text-lead font-semibold">{s.heading}</h4>
                  <p className="mt-2 max-w-prose text-base text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
