import { LayoutGrid, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCategories, useListingRail } from '../api/queries'
import { CitySelector } from '../components/CitySelector'
import { ListingRail } from '../components/ListingRail'
import { brand } from '../config/brand'
import { useCity } from '../lib/city'
import { categoryIcons, fallbackCategoryIcon } from '../lib/categoryIcons'
import { ghostButtonClass, primaryButtonClass } from '../lib/ui'

const tileCircle =
  'flex size-14 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-700 shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:border-brand-500 group-hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-brand-500'
const tileLabel = 'text-center text-xs font-semibold leading-tight text-slate-700 dark:text-slate-300'

export function HomePage() {
  const navigate = useNavigate()
  const categories = useCategories()
  const { city, setCity } = useCity()
  const latest = useListingRail({ sort: 'recent', city: city ?? undefined })
  const emptyCity = latest.isSuccess && (latest.data?.length ?? 0) === 0

  return (
    <>
      {/* Hero compact : la recherche est immédiatement visible et les annonces apparaissent vite. */}
      <section className="relative isolate overflow-hidden bg-slate-950 px-4 pb-8 pt-8 text-center text-white sm:pb-12 sm:pt-12">
        <div aria-hidden="true" className="orb-drift pointer-events-none absolute -right-24 -top-32 -z-10 size-96 rounded-full bg-brand-500/30 blur-[90px]" />
        <div aria-hidden="true" className="orb-drift pointer-events-none absolute -bottom-40 -left-24 -z-10 size-96 rounded-full bg-amber-400/20 blur-[90px] [animation-delay:-7s]" />

        <div className="mx-auto max-w-2xl">
          <h1 className="reveal-up text-3xl font-extrabold leading-tight sm:text-5xl">
            Achetez. Vendez.{' '}
            <span className="bg-linear-to-r from-brand-500 to-amber-300 bg-clip-text text-transparent">Près de chez vous.</span>
          </h1>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              const q = String(new FormData(e.currentTarget).get('q') ?? '').trim()
              navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
            }}
            className="reveal-up mt-6 flex items-center gap-2 rounded-full bg-white p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,.5)] [animation-delay:120ms]"
          >
            <label className="flex h-12 flex-1 items-center gap-3 pl-4 text-slate-900">
              <Search className="size-5 shrink-0 text-slate-500" aria-hidden="true" />
              <input
                name="q"
                type="search"
                placeholder="Que recherchez-vous ?"
                aria-label="Que recherchez-vous ?"
                className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-slate-500"
              />
            </label>
            <button type="submit" className={primaryButtonClass}>Rechercher</button>
          </form>

          <div className="reveal-up mt-4 flex justify-center [animation-delay:220ms]">
            <CitySelector onDark />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        {/* Catégories : grosses cibles, repérage immédiat. */}
        <nav aria-label="Catégories" className="no-scrollbar -mx-4 overflow-x-auto px-4 py-6 md:mx-0 md:px-0">
          <ul className="flex w-max gap-4 md:w-full md:justify-between md:gap-2">
            <li>
              <Link to="/search" className="group flex w-18 flex-col items-center gap-2">
                <span className={tileCircle}><LayoutGrid className="size-6" aria-hidden="true" /></span>
                <span className={tileLabel}>Tout</span>
              </Link>
            </li>
            {categories.data?.map((c) => {
              const Icon = categoryIcons[c.slug] ?? fallbackCategoryIcon
              return (
                <li key={c.id}>
                  <Link to={`/search?category=${c.id}`} className="group flex w-18 flex-col items-center gap-2">
                    <span className={tileCircle}><Icon className="size-6" aria-hidden="true" /></span>
                    <span className={tileLabel}>{c.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {emptyCity && (
          <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xl font-extrabold">Aucune annonce à {city} pour le moment</p>
            <p className="mt-1 text-slate-500 dark:text-slate-400">{brand.name} se remplit chaque jour. Découvrez ce qui est proposé ailleurs.</p>
            <button type="button" onClick={() => setCity(null)} className={`${ghostButtonClass} mt-4`}>
              Voir tout le Cameroun
            </button>
          </div>
        )}

        <ListingRail title="Nouveautés" filters={{ sort: 'recent' }} href="/search" />
        {categories.data?.map((c) => (
          <ListingRail key={c.id} title={c.name} filters={{ categoryId: c.id }} href={`/search?category=${c.id}`} />
        ))}
      </div>
    </>
  )
}
