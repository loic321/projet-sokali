import { Heart, MessageCircle, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../lib/favorites'
import { soon } from '../lib/toast'
import { iconButtonClass, primaryButtonClass } from '../lib/ui'
import { Logo } from './Logo'
import { SearchOverlay } from './SearchOverlay'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { ids } = useFavorites()

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <Link to="/" aria-label="AVA Market, accueil" className="shrink-0">
            <Logo />
          </Link>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-haspopup="dialog"
            className="mx-auto hidden h-11 w-full max-w-md items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 text-left text-sm text-slate-500 transition hover:border-brand-500 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
          >
            <Search className="size-4" aria-hidden="true" />
            Rechercher une annonce, une ville…
          </button>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Rechercher" className={`${iconButtonClass} md:hidden`}>
              <Search className="size-5" aria-hidden="true" />
            </button>
            <ThemeToggle />
            <Link to="/favorites" aria-label={`Mes favoris (${ids.length})`} className={`${iconButtonClass} hidden md:inline-flex`}>
              <Heart className="size-5" aria-hidden="true" />
              {ids.length > 0 && <span className="absolute right-2 top-2 size-2.5 rounded-full bg-brand-500 ring-2 ring-white dark:ring-slate-950" />}
            </Link>
            <button type="button" onClick={() => soon('La messagerie')} aria-label="Messages" className={`${iconButtonClass} hidden md:inline-flex`}>
              <MessageCircle className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => soon('La publication')} className={`${primaryButtonClass} ml-2 hidden md:inline-flex`}>
              <Plus className="size-4" aria-hidden="true" /> Publier
            </button>
          </div>
        </div>
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
