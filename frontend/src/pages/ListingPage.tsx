import { ArrowLeft, Flag, Heart, MapPin, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../api/client'
import { useListing } from '../api/queries'
import { Breadcrumb } from '../components/Breadcrumb'
import { ContactActions } from '../components/ContactActions'
import { Gallery } from '../components/Gallery'
import { ListingRail } from '../components/ListingRail'
import { ReportDialog } from '../components/ReportDialog'
import { SafetyTips } from '../components/SafetyTips'
import { useFavorites } from '../lib/favorites'
import { conditionLabel, formatPrice, timeAgo } from '../lib/format'
import { toast } from '../lib/toast'
import { ghostButtonClass, mutedText, primaryButtonClass, priceText } from '../lib/ui'

// Boutons ronds flottants sur la photo (mobile) : 44 px, fond clair, lisibles sur n'importe quelle image.
const floatButton =
  'flex size-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur transition active:scale-95'

export function ListingPage() {
  const { listingId = '' } = useParams()
  const { data: listing, isPending, error } = useListing(listingId)
  const { has, toggle } = useFavorites()
  const navigate = useNavigate()
  const [reportOpen, setReportOpen] = useState(false)

  // Titre de l'onglet : utile pour l'historique, les favoris du navigateur et le partage.
  useEffect(() => {
    if (!listing) return
    const previous = document.title
    document.title = `${listing.title} · AVA Market`
    return () => {
      document.title = previous
    }
  }, [listing])

  if (isPending) {
    return <div className="skeleton -mx-4 aspect-4/3 md:mx-0 md:rounded-3xl" aria-busy="true" />
  }

  if (error || !listing) {
    const notFound = error instanceof ApiError && error.status === 404
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl font-extrabold">{notFound ? 'Annonce introuvable' : 'Une erreur est survenue'}</h1>
        <p className={`mt-1 ${mutedText}`}>{notFound ? 'Elle a peut-être été supprimée ou vendue.' : 'Réessayez dans un instant.'}</p>
        <Link to="/" className={`${primaryButtonClass} mt-5`}>Retour aux annonces</Link>
      </div>
    )
  }

  // Retour : revient à la page précédente si elle appartient à l'app, sinon à la catégorie.
  const goBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx
    if (typeof idx === 'number' && idx > 0) navigate(-1)
    else navigate(`/search?category=${listing.category.id}`)
  }

  const favorite = has(listing.id)
  const toggleFavorite = () => {
    toggle(listing.id)
    toast(favorite ? 'Retiré des favoris' : 'Ajouté aux favoris')
  }
  const shareText = `${listing.title} · ${formatPrice(listing.priceXaf)}`
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${window.location.href}`)}`
  const share = async () => {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: listing.title, text: shareText, url: window.location.href })
      } catch {
        // partage annulé par l'utilisateur
      }
    } else {
      window.open(whatsappShare, '_blank', 'noopener,noreferrer')
    }
  }

  const memberSince = new Date(listing.seller.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  const specs: [string, string][] = [
    ['Catégorie', listing.category.name],
    ['État', conditionLabel[listing.condition]],
    ['Ville', listing.city],
    ['Publiée', timeAgo(listing.createdAt)],
  ]

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Accueil', to: '/' },
          { label: listing.category.name, to: `/search?category=${listing.category.id}` },
          { label: listing.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          {/* Mobile : la photo occupe le haut de l'écran, avec retour, partage et favori flottants. */}
          <div className="relative -mx-4 -mt-2 md:mx-0 md:mt-0">
            <Gallery listing={listing} />
            <div className="absolute inset-x-3 top-3 flex items-center justify-between md:hidden">
              <button type="button" onClick={goBack} aria-label="Retour" className={floatButton}>
                <ArrowLeft className="size-6" aria-hidden="true" />
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={share} aria-label="Partager l'annonce" className={floatButton}>
                  <Share2 className="size-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={toggleFavorite} aria-pressed={favorite} aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'} className={floatButton}>
                  <Heart className={`size-5 ${favorite ? 'fill-red-600 text-red-600' : ''}`} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <h1 className="mt-6 font-display text-2xl font-extrabold sm:text-3xl">{listing.title}</h1>
          <p className={`mt-2 font-mono text-3xl font-extrabold ${priceText}`}>{formatPrice(listing.priceXaf)}</p>
          <p className={`mt-2 flex items-center gap-1 text-sm ${mutedText}`}>
            <MapPin className="size-4" aria-hidden="true" /> {listing.city} · {timeAgo(listing.createdAt)}
          </p>

          <div className="mt-5 hidden flex-wrap gap-2 md:flex">
            <button type="button" aria-pressed={favorite} onClick={toggleFavorite} className={ghostButtonClass}>
              <Heart className={`size-4 ${favorite ? 'fill-red-600 text-red-600' : ''}`} aria-hidden="true" />
              {favorite ? 'Dans mes favoris' : 'Ajouter aux favoris'}
            </button>
            <button type="button" onClick={share} className={ghostButtonClass}>
              <Share2 className="size-4" aria-hidden="true" /> Partager
            </button>
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
            <div className="mt-4">
              <ContactActions listingId={listing.id} title={listing.title} />
            </div>
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

          <SafetyTips />

          <button type="button" onClick={() => setReportOpen(true)} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-600 underline-offset-4 hover:text-red-700 hover:underline dark:text-slate-400">
            <Flag className="size-4" aria-hidden="true" /> Signaler cette annonce
          </button>
        </aside>
      </div>

      <div className="mt-10">
        <ListingRail title="Annonces similaires" filters={{ categoryId: listing.category.id }} excludeId={listing.id} href={`/search?category=${listing.category.id}`} ignoreCity />
      </div>

      {/* Barre d'action fixe en bas (zone du pouce) sur mobile et tablette. */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-4 pt-3 backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/95"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <p className={`font-mono text-lg font-extrabold ${priceText}`}>{formatPrice(listing.priceXaf)}</p>
        <div className="w-auto min-w-44">
          <ContactActions listingId={listing.id} title={listing.title} layout="row" />
        </div>
      </div>
      <div className="h-24 lg:hidden" aria-hidden="true" />

      <ReportDialog listingId={listing.id} open={reportOpen} onClose={() => setReportOpen(false)} />
    </>
  )
}
