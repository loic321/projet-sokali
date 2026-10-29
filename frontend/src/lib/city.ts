import { useSyncExternalStore } from 'react'

export const CITIES = ['Douala', 'Yaoundé', 'Bafoussam', 'Garoua', 'Bamenda', 'Maroua', 'Kribi'] as const

// Ville choisie : stockée sur l'appareil, partagée par toute l'application.
const KEY = 'ava:city'
const listeners = new Set<() => void>()

function read(): string | null {
  try {
    const value = localStorage.getItem(KEY)
    return value && (CITIES as readonly string[]).includes(value) ? value : null
  } catch {
    return null
  }
}

let current = read()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function setCity(city: string | null) {
  current = city
  try {
    if (city) localStorage.setItem(KEY, city)
    else localStorage.removeItem(KEY)
  } catch {
    // stockage indisponible : le choix reste valable pour la session
  }
  listeners.forEach((l) => l())
}

export const useCity = () => ({ city: useSyncExternalStore(subscribe, () => current), setCity })
