import { useSyncExternalStore } from 'react'

// TEMPORAIRE : favoris stockés sur l'appareil. Ils seront synchronisés avec le
// backend (US-10, PUT /listings/{id}/favorite) quand l'authentification existera.
const KEY = 'ava:favorites'
const listeners = new Set<() => void>()

function read(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(value) ? value.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

let ids = read()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function toggleFavorite(id: string) {
  ids = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    // stockage indisponible : le favori reste valable pour la session
  }
  listeners.forEach((l) => l())
}

export function useFavorites() {
  const current = useSyncExternalStore(subscribe, () => ids)
  return { ids: current, has: (id: string) => current.includes(id), toggle: toggleFavorite }
}
