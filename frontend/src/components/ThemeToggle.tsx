import { useEffect, useState } from 'react'

function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
  } catch {
    // stockage indisponible : on suit la préférence du système
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeToggle() {
  const [dark, setDark] = useState(getInitialDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      // ignoré
    }
  }, [dark])

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className="flex h-10 w-10 items-center justify-center rounded-full text-lg hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {dark ? '☀' : '☾'}
    </button>
  )
}
