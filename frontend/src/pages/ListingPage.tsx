import { Link, useParams } from 'react-router-dom'
import { useListing } from '../api/queries'
import { ApiError } from '../api/client'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { conditionLabel, formatPrice, timeAgo } from '../lib/format'

export function ListingPage() {
  const { listingId = '' } = useParams()
  const { data: listing, isPending, error } = useListing(listingId)

  if (isPending) {
    return <div className="aspect-4/3 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" aria-busy="true" />
  }

  if (error || !listing) {
    const notFound = error instanceof ApiError && error.status === 404
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl font-extrabold">
          {notFound ? 'Annonce introuvable' : 'Une erreur est survenue'}
        </h1>
        <Link to="/" className="mt-4 inline-block font-semibold text-brand-500 underline">
          Retour aux annonces
        </Link>
      </div>
    )
  }

  const specs: [string, string][] = [
    ['Catégorie', listing.category.name],
    ['État', conditionLabel[listing.condition]],
    ['Ville', listing.city],
    ['Publiée', timeAgo(listing.createdAt)],
  ]

  return (
    <>
      <Link to="/" className="mb-4 inline-block text-sm font-semibold text-slate-500 hover:text-brand-500">
        ← Toutes les annonces
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="aspect-4/3 overflow-hidden rounded-3xl">
            {listing.images[0] ? (
              <img src={listing.images[0].url} alt={listing.title} className="h-full w-full object-cover" />
            ) : (
              <ImagePlaceholder label={listing.category.name} />
            )}
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-wider text-brand-500">
            {listing.category.name}
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">{listing.title}</h1>
          <p className="mt-2 font-mono text-3xl font-extrabold text-brand-500">
            {formatPrice(listing.priceXaf)}
          </p>

          <h2 className="mt-8 font-display text-lg font-extrabold">Description</h2>
          {/* React échappe le texte : jamais de dangerouslySetInnerHTML avec du contenu utilisateur. */}
          <p className="mt-2 whitespace-pre-line text-slate-600 dark:text-slate-300">
            {listing.description}
          </p>

          <dl className="mt-8 divide-y divide-slate-200 rounded-2xl bg-white px-4 dark:divide-slate-800 dark:bg-slate-900">
            {specs.map(([label, value]) => (
              <div key={label} className="flex justify-between py-3 text-sm">
                <dt className="text-slate-500">{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="font-mono text-2xl font-extrabold text-brand-500">{formatPrice(listing.priceXaf)}</p>
            <button
              type="button"
              disabled
              title="Disponible après la mise en place de l'authentification"
              className="mt-4 w-full rounded-full bg-brand-500 px-4 py-3 font-semibold text-white opacity-50"
            >
              Contacter le vendeur · bientôt
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Vendeur</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 font-display font-extrabold text-white">
                {listing.seller.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{listing.seller.name}</p>
                <p className="text-xs text-slate-500">
                  {listing.seller.city ?? 'Cameroun'} · {listing.seller.listingsCount ?? 0} annonce(s)
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
