import { Heart, MapPin, MessageCircle, Share2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ApiError } from '../api/client'
import { useListing } from '../api/queries'
import { BackButton } from '../components/BackButton'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { ListingRail } from '../components/ListingRail'
import { useFavorites } from '../lib/favorites'
import { conditionLabel, formatPrice, timeAgo } from '../lib/format'
import { toast } from '../lib/toast'
import { ghostButtonClass, mutedText, primaryButtonClass, priceText } from '../lib/ui'

export function ListingPage() {
  const { listingId = '' } = useParams()
  const { data: listing, isPending, error } = useListing(listingId)
  const { has, toggle } = useFavorites()

  if (isPending) {
    return <div className="skeleton aspect-4/3 rounded-3xl" aria-busy="true" />
  }

  if (error || !listing) {
    const notFound = error instanceof ApiError && error.status === 404
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl font-extrabold">{notFound ? 'Annonce introuvable' : 'Une erreur est survenue'}</h1>
        <p className={`mt-1 ${mutedText}`}>{notFound ? "Elle a peut-être été supprimée ou vendue." : 'Réessaie dans un instant.'}</p>
        <Link to="/" className={`${primaryButtonClass} mt-5`}>Retour aux annonces</Link>
      </div>
    )
  }

  const favorite = has(listing.id)
  const contact = () => toast("La messagerie arrive bientôt : elle dépend de l'authentification.")
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${listing.title} · ${formatPrice(listing.priceXaf)} ${window.location.href}`)}`
  const memberSince = new Date(listing.seller.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

  const specs: [string, string][] = [
    ['Catégorie', listing.category.name],
    ['État', conditionLabel[listing.condition]],
    ['Ville', listing.city],
    ['Publiée', timeAgo(listing.createdAt)],
  ]

  return (
    <>
      <BackButton fallback={`/search?category=${listing.category.id}`} label="Retour aux annonces" />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="aspect-4/3 overflow-hidden rounded-3xl">
            {listing.images[0] ? (
              <img src={listing.images[0].url} alt={listing.title} className="h-full w-full object-cover" />
            ) : (
              <ImagePlaceholder label={listing.category.name} slug={listing.category.slug} />
            )}
          </div>

          <h1 className="mt-6 font-display text-2xl font-extrabold sm:text-3xl">{listing.title}</h1>
          <p className={`mt-2 font-mono text-3xl font-extrabold ${priceText}`}>{formatPrice(listing.priceXaf)}</p>
          <p className={`mt-2 flex items-center gap-1 text-sm ${mutedText}`}>
            <MapPin className="size-4" aria-hidden="true" /> {listing.city} · {timeAgo(listing.createdAt)}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={favorite}
              onClick={() => {
                toggle(listing.id)
                toast(favorite ? 'Retiré des favoris' : 'Ajouté aux favoris')
              }}
              className={ghostButtonClass}
            >
              <Heart className={`size-4 ${favorite ? 'fill-red-600 text-red-600' : ''}`} aria-hidden="true" />
              {favorite ? 'Dans mes favoris' : 'Ajouter aux favoris'}
            </button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={ghostButtonClass}>
              <Share2 className="size-4" aria-hidden="true" /> Partager sur WhatsApp
            </a>
          </div>

          <h2 className="mt-8 font-display text-lg font-extrabold">Description</h2>
          {/* React échappe le texte : jamais de dangerouslySetInnerHTML avec du contenu utilisateur. */}
          <p className="mt-2 whitespace-pre-line text-slate-700 dark:text-slate-300">{listing.description}</p>

          <dl className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-4 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {specs.map(([label, value]) => (
              <div key={label} className="flex justify-between py-3 text-sm">
                <dt className={mutedText}>{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:block dark:border-slate-800 dark:bg-slate-900">
            <p className={`font-mono text-2xl font-extrabold ${priceText}`}>{formatPrice(listing.priceXaf)}</p>
            <button type="button" onClick={contact} className={`${primaryButtonClass} mt-4 w-full`}>
              <MessageCircle className="size-4" aria-hidden="true" /> Contacter le vendeur
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Vendeur</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-brand-500 font-display text-lg font-extrabold text-slate-950" aria-hidden="true">
                {listing.seller.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{listing.seller.name}</p>
                <p className={`text-xs ${mutedText}`}>
                  {listing.seller.city ?? 'Cameroun'} · membre depuis {memberSince}
                </p>
              </div>
            </div>
            <p className={`mt-3 text-sm ${mutedText}`}>{listing.seller.listingsCount ?? 0} annonce(s) publiée(s)</p>
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <ListingRail title="Annonces similaires" filters={{ categoryId: listing.category.id }} excludeId={listing.id} href={`/search?category=${listing.category.id}`} />
      </div>

      {/* Barre d'action mobile, dans la zone du pouce. */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-slate-200 bg-white/95 px-4 pt-3 backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/95"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <p className={`font-mono text-lg font-extrabold ${priceText}`}>{formatPrice(listing.priceXaf)}</p>
        <button type="button" onClick={contact} className={primaryButtonClass}>
          <MessageCircle className="size-4" aria-hidden="true" /> Contacter
        </button>
      </div>
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </>
  )
}
