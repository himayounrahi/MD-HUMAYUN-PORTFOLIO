import { useCallback, useEffect, useState } from 'react'
import { site } from '../config/site'

/**
 * Dark/light theme with the choice persisted to localStorage.
 * The initial class is applied by an inline script in index.html so there is
 * no flash of the wrong theme on first paint; this hook keeps React in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    if (site.theme.defaultMode !== 'system') return site.theme.defaultMode
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
