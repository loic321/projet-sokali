import { useSyncExternalStore } from 'react'

const KEY = 'theme'
const listeners = new Set<() => void>()

function readInitial(): boolean {
  try {
    const stored = localStorage.getItem(KEY)
    if (stored) return stored === 'dark'
  } catch {
    // stockage indisponible : on suit la préférence du système
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

let dark = readInitial()
document.documentElement.classList.toggle('dark', dark)

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function toggleTheme() {
  dark = !dark
  document.documentElement.classList.toggle('dark', dark)
  try {
    localStorage.setItem(KEY, dark ? 'dark' : 'light')
  } catch {
    // ignoré
  }
  listeners.forEach((l) => l())
}

export const useTheme = () => ({ dark: useSyncExternalStore(subscribe, () => dark), toggle: toggleTheme })
