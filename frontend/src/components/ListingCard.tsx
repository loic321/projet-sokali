import { Camera, Heart, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Listing } from '../api/types'
import { useFavorites } from '../lib/favorites'
import { conditionLabel, formatPrice, isNew, timeAgo } from '../lib/format'
import { toast } from '../lib/toast'
import { mutedText, priceText } from '../lib/ui'
import { ImagePlaceholder } from './ImagePlaceholder'

export function ListingCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  const { has, toggle } = useFavorites()
  const favorite = has(listing.id)
  const image = listing.images[0]

  return (
    <article className="group reveal-up relative h-full" style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}>
      <Link
        to={`/listings/${listing.id}`}
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_22px_44px_-18px_rgba(15,23,42,.4)] dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="relative aspect-4/3 overflow-hidden">
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
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-slate-950/40 to-transparent" />
          {isNew(listing.createdAt) && (
            <span className="absolute left-3 top-3 rounded-full bg-emerald-800 px-2.5 py-1 text-xs font-bold text-white shadow-md">Nouveau</span>
          )}
          {listing.images.length > 1 && (
            <span className="absolute bottom-2.5 right-3 inline-flex items-center gap-1 rounded-full bg-slate-950/60 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur">
              <Camera className="size-3.5" aria-hidden="true" /> {listing.images.length}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-3.5">
          <p className={`font-mono text-lg font-extrabold leading-none ${priceText}`}>{formatPrice(listing.priceXaf)}</p>
          <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-800 dark:text-slate-200">{listing.title}</h3>
          <p className={`mt-auto flex min-w-0 items-center gap-1 pt-1 text-xs ${mutedText}`}>
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{listing.city}</span>
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {conditionLabel[listing.condition]}
            </span>
            <span className={`shrink-0 text-xs ${mutedText}`}>{timeAgo(listing.createdAt)}</span>
          </div>
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
        className="absolute right-1.5 top-1.5 inline-flex size-11 items-center justify-center"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition group-hover:scale-105">
          <Heart className={`size-5 ${favorite ? 'like-pop fill-red-600 text-red-600' : 'text-slate-600'}`} aria-hidden="true" />
        </span>
      </button>
    </article>
  )
}
