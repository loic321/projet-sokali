import { Heart, House, LayoutGrid, MessageCircle, Moon, Plus, Sun, User, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCategories } from '../api/queries'
import { brand } from '../config/brand'
import { categoryIcons, fallbackCategoryIcon } from '../lib/categoryIcons'
import { CITIES, useCity } from '../lib/city'
import { useFavorites } from '../lib/favorites'
import { useTheme } from '../lib/theme'
import { soon } from '../lib/toast'
import { ghostButtonClass, glassButtonClass, iconButtonClass, menuDrawerClass, mutedText, pillClass, primaryButtonClass } from '../lib/ui'
import { Dialog } from './Dialog'
import { Logo } from './Logo'

const linkClass =
  'flex min-h-12 w-full items-center gap-3 rounded-2xl px-3 text-left text-base font-semibold transition hover:bg-slate-100 dark:hover:bg-slate-800'
const iconClass = 'size-5 text-brand-700 dark:text-brand-500'
const sectionTitle = `mb-2 px-3 text-xs font-bold uppercase tracking-wider ${mutedText}`

function MenuContent({ onClose }: { onClose: () => void }) {
  const categories = useCategories()
  const { city, setCity } = useCity()
  const { ids } = useFavorites()
  const { dark, toggle } = useTheme()
  const later = (feature: string) => {
    onClose()
    soon(feature)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 py-2 pl-4 pr-2 dark:border-slate-800">
        <Logo />
        <button type="button" onClick={onClose} aria-label="Fermer le menu" className={iconButtonClass}>
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
        <div className="rounded-3xl bg-slate-950 p-5 text-white">
          <p className="font-display text-base font-extrabold">Bienvenue sur {brand.name}</p>
          <p className="mt-1 text-sm text-slate-300">Connectez-vous pour publier, garder vos favoris et contacter les vendeurs.</p>
          <div className="mt-4 grid gap-2">
            <button type="button" onClick={() => later('La connexion')} className={primaryButtonClass}>
              <User className="size-4" aria-hidden="true" /> Se connecter
            </button>
            <button type="button" onClick={() => later('La création de compte')} className={glassButtonClass}>
              Créer un compte
            </button>
          </div>
        </div>

        <button type="button" onClick={() => later('La publication')} className={`${ghostButtonClass} w-full`}>
          <Plus className="size-4" aria-hidden="true" /> Publier une annonce
        </button>

        <nav aria-label="Menu principal">
          <ul>
            <li>
              <Link to="/" onClick={onClose} className={linkClass}>
                <House className={iconClass} aria-hidden="true" /> Accueil
              </Link>
            </li>
            <li>
              <Link to="/search" onClick={onClose} className={linkClass}>
                <LayoutGrid className={iconClass} aria-hidden="true" /> Toutes les annonces
              </Link>
            </li>
            <li>
              <Link to="/favorites" onClick={onClose} className={linkClass}>
                <Heart className={iconClass} aria-hidden="true" /> Mes favoris
                {ids.length > 0 && <span className="ml-auto rounded-full bg-brand-500 px-2 py-0.5 text-xs font-bold text-slate-950">{ids.length}</span>}
              </Link>
            </li>
            <li>
              <button type="button" onClick={() => later('La messagerie')} className={linkClass}>
                <MessageCircle className={iconClass} aria-hidden="true" /> Messages
              </button>
            </li>
          </ul>
        </nav>

        <section aria-labelledby="menu-categories">
          <h2 id="menu-categories" className={sectionTitle}>Catégories</h2>
          <ul>
            {categories.data?.map((c) => {
              const Icon = categoryIcons[c.slug] ?? fallbackCategoryIcon
              return (
                <li key={c.id}>
                  <Link to={`/search?category=${c.id}`} onClick={onClose} className={linkClass}>
                    <Icon className={iconClass} aria-hidden="true" /> {c.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-labelledby="menu-city">
          <h2 id="menu-city" className={sectionTitle}>Ville</h2>
          <div className="flex flex-wrap gap-2 px-1">
            <button type="button" aria-pressed={city === null} onClick={() => setCity(null)} className={pillClass(city === null)}>
              Tout le Cameroun
            </button>
            {CITIES.map((c) => (
              <button key={c} type="button" aria-pressed={city === c} onClick={() => setCity(c)} className={pillClass(city === c)}>
                {c}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="shrink-0 border-t border-slate-200 p-3 dark:border-slate-800">
        <button type="button" role="switch" aria-checked={dark} onClick={toggle} className={`${linkClass} justify-between`}>
          <span className="flex items-center gap-3">
            {dark ? <Moon className="size-5" aria-hidden="true" /> : <Sun className="size-5" aria-hidden="true" />} Mode sombre
          </span>
          <span aria-hidden="true" className={`flex h-7 w-12 items-center rounded-full p-1 transition ${dark ? 'bg-brand-500' : 'bg-slate-300'}`}>
            <span className={`size-5 rounded-full bg-white shadow transition ${dark ? 'translate-x-5' : ''}`} />
          </span>
        </button>
      </div>
    </div>
  )
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} label="Menu" className={menuDrawerClass}>
      <MenuContent onClose={onClose} />
    </Dialog>
  )
}
