import { LayoutGrid } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useCategories } from '../api/queries'
import { categoryIcons, fallbackCategoryIcon } from '../lib/categoryIcons'

const itemClass = (active: boolean) =>
  `inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition ${
    active
      ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-brand-500'
      : 'text-slate-700 hover:bg-slate-100 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-500'
  }`

// Navigation par catégories toujours visible sur tablette et ordinateur, sous la barre du haut.
// Hauteur réservée d'avance pour éviter un saut de mise en page au chargement.
export function CategoryBar() {
  const categories = useCategories()
  const { pathname, search } = useLocation()
  const activeId = pathname === '/search' ? new URLSearchParams(search).get('category') : null
  const allActive = pathname === '/search' && !activeId

  return (
    <nav aria-label="Catégories" className="h-14 border-t border-slate-100 max-md:hidden dark:border-slate-800/70">
      <ul className="no-scrollbar mx-auto flex h-full max-w-7xl items-center gap-1 overflow-x-auto px-3 md:px-4">
        <li className="shrink-0">
          <Link to="/search" aria-current={allActive ? 'page' : undefined} className={itemClass(allActive)}>
            <LayoutGrid className="size-4" aria-hidden="true" /> Toutes les annonces
          </Link>
        </li>
        {categories.data?.map((c) => {
          const Icon = categoryIcons[c.slug] ?? fallbackCategoryIcon
          const active = activeId === c.id
          return (
            <li key={c.id} className="shrink-0">
              <Link to={`/search?category=${c.id}`} aria-current={active ? 'page' : undefined} className={itemClass(active)}>
                <Icon className="size-4" aria-hidden="true" /> {c.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
