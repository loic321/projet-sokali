import { Compass, MapPin, Plus, Search, Smartphone, Zap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCategories } from '../api/queries'
import { ListingRail } from '../components/ListingRail'
import { brand } from '../config/brand'
import { categoryIcons, fallbackCategoryIcon } from '../lib/categoryIcons'
import { soon } from '../lib/toast'
import { glassButtonClass, pillClass, primaryButtonClass } from '../lib/ui'

const container = 'mx-auto max-w-7xl px-4'

const trust = [
  { icon: MapPin, text: 'Annonces locales' },
  { icon: Zap, text: 'Publication gratuite' },
  { icon: Search, text: 'Recherche rapide' },
  { icon: Smartphone, text: 'Pensé pour le mobile' },
]

export function HomePage() {
  const navigate = useNavigate()
  const categories = useCategories()

  return (
    <>
      {/* ---------- Hero plein écran ---------- */}
      <section className="relative isolate overflow-hidden bg-slate-950 px-4 pb-16 pt-14 text-center text-white sm:pb-24 sm:pt-20">
        <div aria-hidden="true" className="orb-drift pointer-events-none absolute -right-24 -top-32 -z-10 size-112 rounded-full bg-brand-500/30 blur-[90px]" />
        <div aria-hidden="true" className="orb-drift pointer-events-none absolute -bottom-40 -left-24 -z-10 size-112 rounded-full bg-amber-400/20 blur-[90px] [animation-delay:-7s]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-64 -translate-x-1/2 rounded-full bg-emerald-600/20 blur-[80px]" />

        <div className="mx-auto max-w-3xl">
          <p className="reveal-up mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <span className="pulse-dot size-1.5 rounded-full bg-amber-300" aria-hidden="true" />
            Marketplace locale · Cameroun
          </p>

          <h1 className="reveal-up text-4xl font-extrabold leading-[1.1] [animation-delay:100ms] sm:text-6xl">
            Achète. Vends.{' '}
            <span className="bg-linear-to-r from-brand-500 to-amber-300 bg-clip-text text-transparent">
              Près de chez toi.
            </span>
          </h1>

          <p className="reveal-up mx-auto mt-5 max-w-xl text-base text-slate-300 [animation-delay:200ms] sm:text-lg">
            {brand.tagline} Trouve le bon deal ou publie ton annonce en quelques minutes.
          </p>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              const q = String(new FormData(e.currentTarget).get('q') ?? '').trim()
              navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
            }}
            className="reveal-up mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,.5)] [animation-delay:300ms]"
          >
            <label className="flex h-12 flex-1 items-center gap-3 pl-4 text-slate-900">
              <Search className="size-5 shrink-0 text-slate-500" aria-hidden="true" />
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

          <div className="reveal-up mt-6 flex flex-wrap justify-center gap-3 [animation-delay:400ms]">
            <button type="button" onClick={() => soon('La publication')} className={glassButtonClass}>
              <Plus className="size-4" aria-hidden="true" /> Publier une annonce
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('annonces')?.scrollIntoView({ behavior: 'smooth' })}
              className={glassButtonClass}
            >
              <Compass className="size-4" aria-hidden="true" /> Explorer
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Barre d'atouts (uniquement des promesses vraies) ---------- */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <ul className={`${container} flex flex-wrap justify-center gap-x-8 gap-y-1 py-3`}>
          {trust.map(({ icon: Icon, text }) => (
            <li key={text} className="flex min-h-8 items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Icon className="size-4 text-brand-700 dark:text-brand-500" aria-hidden="true" /> {text}
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Catégories collantes : centrées si la place suffit, défilantes sinon ---------- */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-stone-50/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <nav aria-label="Catégories" className="no-scrollbar overflow-x-auto px-4 py-3">
          <div className="mx-auto flex w-max gap-2">
            {categories.data?.map((c) => {
              const Icon = categoryIcons[c.slug] ?? fallbackCategoryIcon
              return (
                <Link key={c.id} to={`/search?category=${c.id}`} className={pillClass(false)}>
                  <Icon className="size-4" aria-hidden="true" /> {c.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      {/* ---------- Rails horizontaux ---------- */}
      <div id="annonces" className={`${container} scroll-mt-32 pt-8`}>
        <ListingRail title="Nouveautés" filters={{ sort: 'recent' }} href="/search" />
        {categories.data?.map((c) => (
          <ListingRail key={c.id} title={c.name} filters={{ categoryId: c.id }} href={`/search?category=${c.id}`} />
        ))}
      </div>
    </>
  )
}
