import { Link } from 'react-router-dom'
import { brand } from '../config/brand'
import { soon } from '../lib/toast'
import { Logo } from './Logo'

const linkClass =
  'inline-flex min-h-11 items-center text-sm text-slate-300 transition hover:translate-x-1 hover:text-brand-500'
const titleClass = 'mb-2 text-xs font-bold uppercase tracking-wider text-slate-400'

export function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 pb-28 pt-14 text-slate-300 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-sm text-slate-400">
            {brand.tagline} Une marketplace pensée pour les particuliers camerounais.
          </p>
        </div>
        <nav aria-label="Explorer">
          <h2 className={titleClass}>Explorer</h2>
          <ul>
            <li><Link to="/" className={linkClass}>Accueil</Link></li>
            <li><Link to="/search" className={linkClass}>Toutes les annonces</Link></li>
            <li><Link to="/favorites" className={linkClass}>Mes favoris</Link></li>
          </ul>
        </nav>
        <nav aria-label="Mon espace">
          <h2 className={titleClass}>Mon espace</h2>
          <ul>
            <li><button type="button" onClick={() => soon('La connexion')} className={linkClass}>Se connecter</button></li>
            <li><button type="button" onClick={() => soon('La publication')} className={linkClass}>Publier une annonce</button></li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-slate-400">
        © 2026 {brand.name} · Projet de démonstration : les annonces affichées sont des données fictives.
      </div>
    </footer>
  )
}
