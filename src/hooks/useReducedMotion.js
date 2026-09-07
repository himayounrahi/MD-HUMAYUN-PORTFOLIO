import { useEffect, useState } from 'react'

/**
 * True when the visitor has asked their OS to reduce motion.
 * Every animated component in this site checks this and renders its
 * end state immediately instead of animating.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (e) => setReduced(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}
