import { MapPin, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCategories, useListings } from '../api/queries'
import type { ListingFilters, SortOption } from '../api/queries'
import type { Condition } from '../api/types'
import { BackButton } from '../components/BackButton'
import { FiltersPanel } from '../components/FiltersPanel'
import type { FilterValues } from '../components/FiltersPanel'
import { ListingCard } from '../components/ListingCard'
import { useCity } from '../lib/city'
import { conditionLabel, formatPrice } from '../lib/format'
import { ghostButtonClass, mutedText, pillClass, primaryButtonClass } from '../lib/ui'

const sortLabels: Record<SortOption, string> = {
  recent: 'Plus récentes',
  price_asc: 'Prix croissant',
  price_desc: 'Prix décroissant',
}
const conditions: Condition[] = ['NEW', 'VERY_GOOD', 'GOOD']

const toNumber = (v: string | null) => {
  const n = Number(v)
  return v !== null && v !== '' && Number.isFinite(n) && n >= 0 ? n : undefined
}

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const categories = useCategories()
  // La ville est un choix global (même sélecteur que l'en-tête) : la recherche la respecte.
  const { city, setCity } = useCity()

  const sortParam = params.get('sort')
  const sort: SortOption = sortParam === 'price_asc' || sortParam === 'price_desc' ? sortParam : 'recent'
  const condition = conditions.find((c) => c === params.get('condition'))

  const filters: ListingFilters = {
    q: params.get('q') ?? undefined,
    categoryId: params.get('category') ?? undefined,
    city: city ?? undefined,
    sort,
    minPrice: toNumber(params.get('minPrice')),
    maxPrice: toNumber(params.get('maxPrice')),
    condition,
  }

  const listings = useListings(filters)
  const items = listings.data?.pages.flatMap((page) => page.items) ?? []
  const category = categories.data?.find((c) => c.id === filters.categoryId)

  function update(patch: Record<string, string | undefined>) {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setParams(next, { replace: true })
  }

  function applyFilters(v: FilterValues) {
    update({
      sort: v.sort === 'recent' ? undefined : v.sort,
      minPrice: v.minPrice?.toString(),
      maxPrice: v.maxPrice?.toString(),
      condition: v.condition,
    })
    setFiltersOpen(false)
  }

  const clearRefinements = () =>
    update({ category: undefined, sort: undefined, minPrice: undefined, maxPrice: undefined, condition: undefined })

  // Filtres actifs affichés en pastilles supprimables (reconnaissance plutôt que mémoire).
  const active: { label: string; clear: () => void }[] = []
  if (filters.q) active.push({ label: `« ${filters.q} »`, clear: () => update({ q: undefined }) })
  if (category) active.push({ label: category.name, clear: () => update({ category: undefined }) })
  if (city) active.push({ label: city, clear: () => setCity(null) })
  if (filters.minPrice !== undefined) active.push({ label: `Min ${formatPrice(filters.minPrice)}`, clear: () => update({ minPrice: undefined }) })
  if (filters.maxPrice !== undefined) active.push({ label: `Max ${formatPrice(filters.maxPrice)}`, clear: () => update({ maxPrice: undefined }) })
  if (condition) active.push({ label: conditionLabel[condition], clear: () => update({ condition: undefined }) })

  const hasRefinements = !!category || filters.minPrice !== undefined || filters.maxPrice !== undefined || !!condition || sort !== 'recent'
  const filterCount = [sort !== 'recent', filters.minPrice !== undefined, filters.maxPrice !== undefined, !!condition].filter(Boolean).length

  // Pas de total côté API (pagination par curseur) : on ajoute « + » tant qu'il reste des pages.
  const countText = listings.isSuccess
    ? `${items.length}${listings.hasNextPage ? '+' : ''} annonce${items.length > 1 ? 's' : ''}`
    : '\u00a0'

  return (
    <>
      <BackButton fallback="/" label="Retour" />

      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold">
          {filters.q ? `Résultats pour « ${filters.q} »` : (category?.name ?? 'Toutes les annonces')}
        </h1>
        <button type="button" onClick={() => setFiltersOpen(true)} className={ghostButtonClass}>
          <SlidersHorizontal className="size-4" aria-hidden="true" /> Filtres
          {filterCount > 0 && <span className="rounded-full bg-brand-500 px-2 text-xs font-bold text-slate-950">{filterCount}</span>}
        </button>
      </div>

      {categories.data && (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Catégories">
          <button type="button" aria-pressed={!category} onClick={() => update({ category: undefined })} className={`${pillClass(!category)} shrink-0`}>
            Toutes
          </button>
          {categories.data.map((c) => (
            <button key={c.id} type="button" aria-pressed={category?.id === c.id} onClick={() => update({ category: c.id })} className={`${pillClass(category?.id === c.id)} shrink-0`}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      {active.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2" aria-label="Filtres actifs">
          {active.map((a) => (
            <li key={a.label}>
              <button type="button" onClick={a.clear} aria-label={`Retirer le filtre ${a.label}`} className={pillClass(false)}>
                {a.label === city && <MapPin className="size-4" aria-hidden="true" />}
                {a.label} <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mb-4 flex items-center justify-between gap-3">
        <p aria-live="polite" className={`text-sm ${mutedText}`}>{countText}</p>
        <label className="flex items-center gap-2 text-sm">
          <span className={mutedText}>Trier</span>
          <select
            value={sort}
            onChange={(e) => update({ sort: e.target.value === 'recent' ? undefined : e.target.value })}
            className="h-10 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          >
            {(Object.keys(sortLabels) as SortOption[]).map((value) => (
              <option key={value} value={value}>{sortLabels[value]}</option>
            ))}
          </select>
        </label>
      </div>

      {listings.isPending && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" aria-busy="true">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="skeleton aspect-3/4 rounded-2xl" />
          ))}
        </div>
      )}

      {listings.isError && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          <p>Impossible de charger les annonces.</p>
          <button type="button" onClick={() => listings.refetch()} className={`${ghostButtonClass} mt-3`}>Réessayer</button>
        </div>
      )}

      {listings.isSuccess && items.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-display text-xl font-extrabold">Aucune annonce ne correspond</p>
          <p className={`mt-1 ${mutedText}`}>
            {city ? `Rien à ${city} pour le moment. Élargis la recherche ou retire un filtre.` : "Essaie d'enlever un filtre ou de chercher autrement."}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {city && <button type="button" onClick={() => setCity(null)} className={primaryButtonClass}>Voir toutes les villes</button>}
            {hasRefinements && <button type="button" onClick={clearRefinements} className={city ? ghostButtonClass : primaryButtonClass}>Effacer les filtres</button>}
            <Link to="/search" className={ghostButtonClass}>Voir toutes les annonces</Link>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} index={index} />
          ))}
        </div>
      )}

      {listings.hasNextPage && (
        <div className="mt-8 text-center">
          <button type="button" onClick={() => listings.fetchNextPage()} disabled={listings.isFetchingNextPage} className={primaryButtonClass}>
            {listings.isFetchingNextPage ? 'Chargement…' : 'Voir plus'}
          </button>
        </div>
      )}

      <FiltersPanel
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        values={{ sort, minPrice: filters.minPrice, maxPrice: filters.maxPrice, condition }}
        onApply={applyFilters}
      />
    </>
  )
}
