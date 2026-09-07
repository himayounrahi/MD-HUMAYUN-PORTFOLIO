import { useMemo, useState } from 'react'

/**
 * Filter state for the projects section.
 * `discipline` is a single choice ('all' or e.g. 'ML').
 * `tech` is a single choice too -- multi-select filters read as clever and
 * behave badly on mobile, so this stays deliberately simple.
 */
export function useProjectFilter(projects) {
  const [discipline, setDiscipline] = useState('all')
  const [tech, setTech] = useState('all')

  const techOptions = useMemo(() => {
    const counts = new Map()
    projects.forEach((p) =>
      (p.tech || []).forEach((t) => {
        if (t.startsWith('[FILL IN')) return
        counts.set(t, (counts.get(t) || 0) + 1)
      }),
    )
    // Only offer a tech chip if more than one project uses it -- otherwise
    // the filter bar becomes longer than the list it filters.
    return [...counts.entries()]
      .filter(([, count]) => count > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name]) => name)
  }, [projects])

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const okDiscipline = discipline === 'all' || p.discipline === discipline
        const okTech = tech === 'all' || (p.tech || []).includes(tech)
        return okDiscipline && okTech
      }),
    [projects, discipline, tech],
  )

  const reset = () => {
    setDiscipline('all')
    setTech('all')
  }

  return { discipline, setDiscipline, tech, setTech, techOptions, filtered, reset }
}
