import { useSearchParams } from 'react-router-dom'
import { useCategories, useListings } from '../api/queries'
import type { ListingFilters, SortOption } from '../api/queries'
import { ListingCard } from '../components/ListingCard'
import { brand } from '../config/brand'

const pill = (active: boolean) =>
  `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
    active
      ? 'border-slate-900 bg-slate-900 text-white dark:border-brand-500 dark:bg-brand-500'
      : 'border-slate-200 bg-white text-slate-600 hover:border-brand-500 hover:text-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
  }`

export function HomePage() {
  const [params, setParams] = useSearchParams()
  const sortParam = params.get('sort')
  const sort: SortOption =
    sortParam === 'price_asc' || sortParam === 'price_desc' ? sortParam : 'recent'
  const filters: ListingFilters = {
    q: params.get('q') ?? undefined,
    categoryId: params.get('category') ?? undefined,
    sort,
  }

  const categories = useCategories()
  const listings = useListings(filters)
  const items = listings.data?.pages.flatMap((page) => page.items) ?? []

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  return (
    <>
      <section className="mb-6 rounded-3xl bg-slate-900 px-6 py-8 text-white">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
          Achète. Vends. <span className="text-brand-500">Près de chez toi.</span>
        </h1>
        <p className="mt-2 max-w-xl text-slate-300">{brand.tagline}</p>
      </section>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1" role="list" aria-label="Catégories">
        <button type="button" className={pill(!filters.categoryId)} onClick={() => setParam('category', '')}>
          Tout
        </button>
        {categories.data?.map((c) => (
          <button
            key={c.id}
            type="button"
            className={pill(filters.categoryId === c.id)}
            onClick={() => setParam('category', c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-extrabold">
          {filters.q ? `Résultats pour « ${filters.q} »` : 'Annonces à la une'}
        </h2>
        <label className="text-sm text-slate-500">
          <span className="sr-only">Trier par</span>
          <select
            value={sort}
            onChange={(e) => setParam('sort', e.target.value === 'recent' ? '' : e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="recent">Plus récentes</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
          </select>
        </label>
      </div>

      {listings.isPending && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4" aria-busy="true">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="aspect-3/4 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      )}

      {listings.isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          <p>Impossible de charger les annonces.</p>
          <button type="button" onClick={() => listings.refetch()} className="mt-3 font-semibold underline">
            Réessayer
          </button>
        </div>
      )}

      {listings.isSuccess && items.length === 0 && (
        <p className="py-12 text-center text-slate-500">Aucune annonce ne correspond.</p>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {items.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {listings.hasNextPage && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => listings.fetchNextPage()}
            disabled={listings.isFetchingNextPage}
            className="rounded-full bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-600 disabled:opacity-50"
          >
            {listings.isFetchingNextPage ? 'Chargement…' : 'Voir plus'}
          </button>
        </div>
      )}
    </>
  )
}
