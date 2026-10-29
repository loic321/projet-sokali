import { useMutation } from '@tanstack/react-query'
import { MessageCircle, Phone } from 'lucide-react'
import { ApiError, apiGet } from '../api/client'
import type { ContactInfo } from '../api/types'
import { ghostButtonClass, primaryButtonClass, whatsappButtonClass } from '../lib/ui'

// Le numéro n'est jamais dans la page : il est demandé à l'API au clic, et l'API le réserve
// aux utilisateurs connectés (anti-aspiration de numéros).
export function ContactActions({ listingId, title, layout = 'stack' }: { listingId: string; title: string; layout?: 'stack' | 'row' }) {
  const contact = useMutation({ mutationFn: () => apiGet<ContactInfo>(`/listings/${listingId}/contact`) })
  const wrap = layout === 'row' ? 'flex items-center gap-2' : 'grid gap-2'

  if (contact.data) {
    const phone = contact.data.phone
    const message = encodeURIComponent(`Bonjour, votre annonce « ${title} » sur AVA Market est-elle toujours disponible ?`)
    return (
      <div className={wrap}>
        <a href={`https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`} target="_blank" rel="noopener noreferrer" className={whatsappButtonClass}>
          <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
        </a>
        <a href={`tel:${phone}`} className={ghostButtonClass}>
          <Phone className="size-4" aria-hidden="true" /> Appeler
        </a>
      </div>
    )
  }

  return (
    <div className="grid gap-2">
      <button type="button" onClick={() => contact.mutate()} disabled={contact.isPending} className={`${primaryButtonClass} w-full`}>
        <Phone className="size-4" aria-hidden="true" />
        {contact.isPending ? 'Chargement…' : 'Voir le contact'}
      </button>
      {contact.isError && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-300">
          {contact.error instanceof ApiError && contact.error.status === 401
            ? 'Connectez-vous pour voir le contact du vendeur.'
            : 'Contact indisponible. Réessayez dans un instant.'}
        </p>
      )}
    </div>
  )
}
