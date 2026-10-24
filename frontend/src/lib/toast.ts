import { useSyncExternalStore } from 'react'

export type Toast = { id: number; message: string }

let toasts: Toast[] = []
let nextId = 1
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function toast(message: string) {
  const id = nextId++
  toasts = [...toasts, { id, message }]
  emit()
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    emit()
  }, 3200)
}

export const useToasts = () => useSyncExternalStore(subscribe, () => toasts)

export const soon = (feature: string) =>
  toast(`${feature} : bientôt disponible, il dépend de l'authentification.`)
