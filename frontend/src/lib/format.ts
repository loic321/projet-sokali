import type { Condition } from '../api/types'

const numberFormat = new Intl.NumberFormat('fr-FR')

export const formatPrice = (amount: number) => `${numberFormat.format(amount)} FCFA`

export function timeAgo(iso: string): string {
  const hours = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000)
  if (hours < 1) return "À l'instant"
  if (hours < 24) return `Il y a ${hours} h`
  return `Il y a ${Math.floor(hours / 24)} j`
}

export const conditionLabel: Record<Condition, string> = {
  NEW: 'Neuf',
  VERY_GOOD: 'Très bon état',
  GOOD: 'Bon état',
}
