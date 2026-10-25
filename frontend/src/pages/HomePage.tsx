import { MapPin, Search, Smartphone, Zap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCategories } from '../api/queries'
import { ListingRail } from '../components/ListingRail'
import { brand } from '../config/brand'
import { categoryIcons, fallbackCategoryIcon } from '../lib/categoryIcons'
import { soon } from '../lib/toast'
import { pillClass, primaryButtonClass } from '../lib/ui'

const trust = [
  { icon: MapPin, text: 'Annonces locales' },
  { icon: Zap, text: 'Publication gratuite' },
  { icon: Smartphone, text: 'Pensé pour le mobile' },
]

export function HomePage() {
  const navigate = useNavigate()
  const categories = useCategories()

  return (
    <>
      <section className="relative mb-6 overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10 sm:py-14">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 size-80 rounded-full bg-brand-500/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
            <span className="size-1.5 rounded-full bg-amber-300" aria-hidden="true" /> Marketplace locale
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Achète. Vends.{' '}
            <span className="bg-linear-to-r from-brand-500 to-amber-300 bg-clip-text text-transparent">Près de chez toi.</span>
          </h1>
          <p className="mt-3 max-w-xl text-slate-300">{brand.tagline} Trouve le bon deal ou publie ton annonce en quelques minutes.</p>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              const q = String(new FormData(e.currentTarget).get('q') ?? '').trim()
              navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
            }}
            className="mt-6 flex max-w-xl items-center gap-2 rounded-full bg-white p-1.5 shadow-xl"
          >
            <label className="flex h-11 flex-1 items-center gap-2 pl-4 text-slate-900">
              <Search className="size-5 text-slate-500" aria-hidden="true" />
              <input
                name="q"
                type="search"
                placeholder="Que cherches-tu ?"
                aria-label="Que cherches-tu ?"
                className="w-full bg-transparent text-base outline-none placeholder:text-slate-500"
              />
            </label>
            <button type="submit" className={primaryButtonClass}>Rechercher</button>
          </form>

          <button type="button" onClick={() => soon('La publication')} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline-offset-4 hover:underline">
            Tu as quelque chose à vendre ? Publier une annonce
          </button>
        </div>
      </section>

      <ul className="mb-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
        {trust.map(({ icon: Icon, text }) => (
          <li key={text} className="flex min-h-8 items-center gap-2">
            <Icon className="size-4 text-brand-700 dark:text-brand-500" aria-hidden="true" /> {text}
          </li>
        ))}
      </ul>

      <nav aria-label="Catégories" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {categories.data?.map((c) => {
          const Icon = categoryIcons[c.slug] ?? fallbackCategoryIcon
          return (
            <Link key={c.id} to={`/search?category=${c.id}`} className={pillClass(false)}>
              <Icon className="size-4" aria-hidden="true" /> {c.name}
            </Link>
          )
        })}
      </nav>

      <ListingRail title="Nouveautés" filters={{ sort: 'recent' }} href="/search" />
      {categories.data?.map((c) => (
        <ListingRail key={c.id} title={c.name} filters={{ categoryId: c.id }} href={`/search?category=${c.id}`} />
      ))}
    </>
  )
}
