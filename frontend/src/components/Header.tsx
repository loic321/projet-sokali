import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { brand } from '../config/brand'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const current = params.get('q') ?? ''

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
          {brand.parts[0]} <span className="text-brand-500">{brand.parts[1]}</span>
        </Link>

        <form
          role="search"
          className="mx-auto max-w-md flex-1"
          onSubmit={(e) => {
            e.preventDefault()
            const q = String(new FormData(e.currentTarget).get('q') ?? '').trim()
            navigate(q ? `/?q=${encodeURIComponent(q)}` : '/')
          }}
        >
          <input
            key={current}
            name="q"
            type="search"
            defaultValue={current}
            placeholder="Rechercher une annonce…"
            aria-label="Rechercher une annonce"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </form>

        <button
          type="button"
          disabled
          title="Disponible après la mise en place de l'authentification"
          className="hidden rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white opacity-50 sm:block"
        >
          Publier · bientôt
        </button>
        <ThemeToggle />
      </div>
    </header>
  )
}
