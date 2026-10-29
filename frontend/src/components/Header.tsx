import { Heart, MessageCircle, Plus, Search, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFavorites } from '../lib/favorites'
import { soon } from '../lib/toast'
import { ghostButtonClass, iconButtonClass } from '../lib/ui'
import { useHideOnScroll } from '../lib/useHideOnScroll'
import { CategoryBar } from './CategoryBar'
import { CitySelector } from './CitySelector'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { SearchOverlay } from './SearchOverlay'
import { ThemeToggle } from './ThemeToggle'

// Bouton Publier : pastille « + » sur tablette, avec texte sur ordinateur.
const publishClass =
  'inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-brand-500 text-sm font-bold text-slate-950 shadow-[0_2px_12px_rgba(242,101,34,.25)] transition duration-200 hover:bg-[#ff7a3d] hover:shadow-[0_8px_30px_rgba(242,101,34,.35)] active:scale-[.97] max-md:hidden lg:px-5'

// Hamburger : trois traits dont celui du milieu s'allonge au survol.
function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label="Ouvrir le menu" aria-haspopup="dialog" className={`${iconButtonClass} group lg:hidden`}>
      <span className="flex w-5 flex-col items-end gap-1.25" aria-hidden="true">
        <span className="h-0.5 w-5 rounded-full bg-current" />
        <span className="h-0.5 w-3.5 rounded-full bg-current transition-all duration-200 group-hover:w-5" />
        <span className="h-0.5 w-5 rounded-full bg-current" />
      </span>
    </button>
  )
}

// Trois états de la barre du haut :
//   téléphone (< 768)  : logo, loupe, menu
//   tablette (768-1023): logo, champ de recherche, favoris, messages, publier, menu
//   ordinateur (≥ 1024): tout est visible, plus de menu
export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { ids } = useFavorites()
  const { pathname } = useLocation()
  const concealed = useHideOnScroll()
  // Sur téléphone, la fiche d'annonce n'a pas d'en-tête global : la photo prend toute la place.
  const onListing = pathname.startsWith('/listings/')

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/90 ${
          concealed ? '-translate-y-full' : ''
        } ${onListing ? 'hidden md:block' : ''}`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-1 px-3 md:h-16 md:gap-2 md:px-4">
          <Link to="/" aria-label="AVA Market, accueil" className="mr-1 inline-flex min-h-11 shrink-0 items-center md:mr-3">
            <Logo />
          </Link>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-haspopup="dialog"
            className="mr-1 hidden h-11 min-w-0 max-w-xl flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 text-left text-sm text-slate-500 transition hover:border-brand-500 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
          >
            <Search className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">Rechercher une annonce, une ville…</span>
          </button>

          <div className="ml-auto flex items-center gap-1 md:ml-auto">
            <div className="mr-1 hidden lg:block">
              <CitySelector />
            </div>

            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Rechercher" className={`${iconButtonClass} md:hidden`}>
              <Search className="size-5" aria-hidden="true" />
            </button>

            <Link to="/favorites" aria-label={`Mes favoris (${ids.length})`} className={`${iconButtonClass} max-md:hidden`}>
              <Heart className="size-5" aria-hidden="true" />
              {ids.length > 0 && <span className="absolute right-2 top-2 size-2.5 rounded-full bg-brand-500 ring-2 ring-white dark:ring-slate-950" />}
            </Link>
            <button type="button" onClick={() => soon('La messagerie')} aria-label="Messages" className={`${iconButtonClass} max-md:hidden`}>
              <MessageCircle className="size-5" aria-hidden="true" />
            </button>

            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <button type="button" onClick={() => soon('La connexion')} className={`${ghostButtonClass} !min-h-11 max-lg:hidden`}>
              <User className="size-4" aria-hidden="true" /> Se connecter
            </button>

            <button type="button" onClick={() => soon('La publication')} aria-label="Publier une annonce" className={`${publishClass} md:ml-1`}>
              <Plus className="size-5" aria-hidden="true" />
              <span className="hidden lg:inline">Publier</span>
            </button>

            <MenuButton onClick={() => setMenuOpen(true)} />
          </div>
        </div>
        <CategoryBar />
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
