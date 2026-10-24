import { Link } from 'react-router-dom'
import type { Listing } from '../api/types'
import { formatPrice, timeAgo } from '../lib/format'
import { ImagePlaceholder } from './ImagePlaceholder'

export function ListingCard({ listing }: { listing: Listing }) {
  const image = listing.images[0]
  return (
    <Link
      to={`/listings/${listing.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="aspect-square overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder label={listing.category.name} />
        )}
      </div>
      <div className="p-3">
        <p className="font-mono text-lg font-extrabold text-brand-500">
          {formatPrice(listing.priceXaf)}
        </p>
        <h3 className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
          {listing.title}
        </h3>
        <p className="mt-1 truncate text-xs text-slate-400">
          {listing.city} · {timeAgo(listing.createdAt)}
        </p>
      </div>
    </Link>
  )
}
