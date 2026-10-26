import { Heart } from 'lucide-react'
import { useQueries } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { apiGet } from '../api/client'
import type { Listing } from '../api/types'
import { Breadcrumb } from '../components/Breadcrumb'
import { ListingCard } from '../components/ListingCard'
import { PageTitle } from '../components/PageTitle'
import { useFavorites } from '../lib/favorites'
import { mutedText, primaryButtonClass } from '../lib/ui'

export function FavoritesPage() {
  const { ids } = useFavorites()
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['listing', id],
      queryFn: () => apiGet<Listing>(`/listings/${id}`),
      retry: false,
    })),
  })
  const items = results.flatMap((r) => (r.data ? [r.data] : []))

  return (
    <>
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Mes favoris' }]} />
      <PageTitle title="Mes favoris" fallback="/" />
      <p className={`-mt-2 mb-6 text-sm ${mutedText}`}>Enregistrés sur cet appareil.</p>

      {ids.length === 0 ? (
        <div className="py-16 text-center">
          <Heart className="mx-auto size-10 text-slate-400" aria-hidden="true" />
          <p className="mt-3 text-xl font-extrabold">Aucun favori pour le moment</p>
          <p className={`mt-1 ${mutedText}`}>Touchez le cœur d'une annonce pour la retrouver ici.</p>
          <Link to="/" className={`${primaryButtonClass} mt-5`}>Découvrir les annonces</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} index={index} />
          ))}
        </div>
      )}
    </>
  )
}
