import { useEffect, useState } from 'react'

/**
 * Tracks which numbered figure is currently closest to the middle of the
 * viewport. This drives the margin rail -- the site's signature element.
 *
 * Figures opt in by rendering `data-figure="<key>"` on their wrapper, which
 * components/diagrams/Figure.jsx does automatically.
 */
export function useActiveFigure() {
  const [activeKey, setActiveKey] = useState(null)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-figure]'))
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Of everything currently on screen, pick the highest one.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveKey(visible[0].target.dataset.figure)
        }
      },
      { rootMargin: '-25% 0px -45% 0px', threshold: 0 },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  })

  return activeKey
}
