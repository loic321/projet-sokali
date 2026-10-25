import { Link } from 'react-router-dom'
import { brand } from '../config/brand'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pb-28 pt-10 md:pb-10 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{brand.tagline}</p>
        </div>
        <nav aria-label="Pied de page" className="flex flex-col gap-1 text-sm font-medium">
          <Link to="/" className="inline-flex min-h-11 items-center hover:text-brand-700 dark:hover:text-brand-500">Accueil</Link>
          <Link to="/search" className="inline-flex min-h-11 items-center hover:text-brand-700 dark:hover:text-brand-500">Toutes les annonces</Link>
          <Link to="/favorites" className="inline-flex min-h-11 items-center hover:text-brand-700 dark:hover:text-brand-500">Mes favoris</Link>
        </nav>
      </div>
      <p className="mx-auto mt-6 max-w-7xl px-4 text-xs text-slate-500 dark:text-slate-400">
        © 2026 {brand.name} · Projet de démonstration : les annonces affichées sont des données fictives.
      </p>
    </footer>
  )
}
