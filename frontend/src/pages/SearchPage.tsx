import { SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCategories, useListings } from '../api/queries'
import type { ListingFilters, SortOption } from '../api/queries'
import type { Condition } from '../api/types'
import { BackButton } from '../components/BackButton'
import { FiltersPanel } from '../components/FiltersPanel'
import type { FilterValues } from '../components/FiltersPanel'
import { ListingCard } from '../components/ListingCard'
import { conditionLabel, formatPrice } from '../lib/format'
import { ghostButtonClass, mutedText, pillClass, primaryButtonClass } from '../lib/ui'

const toNumber = (v: string | null) => {
  const n = Number(v)
  return v !== null && v !== '' && Number.isFinite(n) && n >= 0 ? n : undefined
}

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const categories = useCategories()

  const sortParam = params.get('sort')
  const sort: SortOption = sortParam === 'price_asc' || sortParam === 'price_desc' ? sortParam : 'recent'
  const conditionParam = params.get('condition')
  const condition: Condition | undefined =
    conditionParam === 'NEW' || conditionParam === 'VERY_GOOD' || conditionParam === 'GOOD' ? conditionParam : undefined

  const filters: ListingFilters = {
    q: params.get('q') ?? undefined,
    categoryId: params.get('category') ?? undefined,
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

  // Filtres actifs affichés en pastilles supprimables (reconnaissance plutôt que mémoire).
  const active: { label: string; clear: Record<string, undefined> }[] = []
  if (filters.q) active.push({ label: `« ${filters.q} »`, clear: { q: undefined } })
  if (category) active.push({ label: category.name, clear: { category: undefined } })
  if (sort !== 'recent') active.push({ label: sort === 'price_asc' ? 'Prix croissant' : 'Prix décroissant', clear: { sort: undefined } })
  if (filters.minPrice !== undefined) active.push({ label: `Min ${formatPrice(filters.minPrice)}`, clear: { minPrice: undefined } })
  if (filters.maxPrice !== undefined) active.push({ label: `Max ${formatPrice(filters.maxPrice)}`, clear: { maxPrice: undefined } })
  if (condition) active.push({ label: conditionLabel[condition], clear: { condition: undefined } })

  const filterCount = [sort !== 'recent', filters.minPrice !== undefined, filters.maxPrice !== undefined, !!condition].filter(Boolean).length

  return (
    <>
      <BackButton fallback="/" label="Retour" />

      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold">{filters.q ? `Résultats pour « ${filters.q} »` : (category?.name ?? 'Toutes les annonces')}</h1>
        <button type="button" onClick={() => setFiltersOpen(true)} className={ghostButtonClass}>
          <SlidersHorizontal className="size-4" aria-hidden="true" /> Filtres
          {filterCount > 0 && <span className="rounded-full bg-brand-500 px-2 text-xs font-bold text-slate-950">{filterCount}</span>}
        </button>
      </div>

      {active.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2" aria-label="Filtres actifs">
          {active.map((a) => (
            <li key={a.label}>
              <button type="button" onClick={() => update(a.clear)} aria-label={`Retirer le filtre ${a.label}`} className={pillClass(false)}>
                {a.label} <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

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
          <p className={`mt-1 ${mutedText}`}>Essaie d'enlever un filtre ou de chercher autrement.</p>
          <Link to="/search" className={`${primaryButtonClass} mt-5`}>Voir toutes les annonces</Link>
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
