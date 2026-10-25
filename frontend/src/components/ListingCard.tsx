import { Heart, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Listing } from '../api/types'
import { useFavorites } from '../lib/favorites'
import { formatPrice, isNew, timeAgo } from '../lib/format'
import { toast } from '../lib/toast'
import { mutedText, priceText } from '../lib/ui'
import { ImagePlaceholder } from './ImagePlaceholder'

export function ListingCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  const { has, toggle } = useFavorites()
  const favorite = has(listing.id)
  const image = listing.images[0]

  return (
    <article className="group reveal-up relative" style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}>
      <Link
        to={`/listings/${listing.id}`}
        className="block overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,.28)] dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="relative aspect-square overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={listing.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full transition duration-500 group-hover:scale-105">
              <ImagePlaceholder label={listing.category.name} slug={listing.category.slug} />
            </div>
          )}
          {isNew(listing.createdAt) && (
            <span className="absolute left-2 top-2 rounded-full bg-emerald-800 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
              Nouveau
            </span>
          )}
        </div>
        <div className="p-3">
          <p className={`font-mono text-lg font-extrabold ${priceText}`}>{formatPrice(listing.priceXaf)}</p>
          <h3 className="line-clamp-2 min-h-10 text-sm font-medium text-slate-700 dark:text-slate-300">{listing.title}</h3>
          <p className={`mt-1 flex items-center gap-1 truncate text-xs ${mutedText}`}>
            <MapPin className="size-3 shrink-0" aria-hidden="true" />
            {listing.city} · {timeAgo(listing.createdAt)}
          </p>
        </div>
      </Link>

      {/* Bouton hors du lien (HTML valide) : zone tactile de 44 px, pastille visible de 36 px. */}
      <button
        type="button"
        aria-pressed={favorite}
        aria-label={favorite ? `Retirer « ${listing.title} » des favoris` : `Ajouter « ${listing.title} » aux favoris`}
        onClick={() => {
          toggle(listing.id)
          toast(favorite ? 'Retiré des favoris' : 'Ajouté aux favoris')
        }}
        className="absolute right-1 top-1 inline-flex size-11 items-center justify-center"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition group-hover:scale-105">
          <Heart
            className={`size-5 ${favorite ? 'like-pop fill-red-600 text-red-600' : 'text-slate-600'}`}
            aria-hidden="true"
          />
        </span>
      </button>
    </article>
  )
}
