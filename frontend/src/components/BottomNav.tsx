import { Heart, House, MessageCircle, Plus, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { soon } from '../lib/toast'

// Barre d'onglets du bas : téléphone uniquement (< 768 px). Cinq destinations de même largeur,
// libellés toujours visibles, pastille d'état actif derrière l'icône.
const tab = 'flex h-full w-full flex-col items-center justify-center gap-0.5 text-xs font-semibold transition-colors'
const tone = (active: boolean) => (active ? 'text-brand-700 dark:text-brand-500' : 'text-slate-600 dark:text-slate-400')
const pill = (active: boolean) =>
  `flex h-8 w-14 items-center justify-center rounded-full transition-colors ${active ? 'bg-brand-100 dark:bg-slate-800' : ''}`

function LinkTab({ to, label, icon: Icon, end = false }: { to: string; label: string; icon: LucideIcon; end?: boolean }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `${tab} ${tone(isActive)}`}>
      {({ isActive }: { isActive: boolean }): ReactNode => (
        <>
          <span className={pill(isActive)}>
            <Icon className="size-6" aria-hidden="true" />
          </span>
          {label}
        </>
      )}
    </NavLink>
  )
}

function ButtonTab({ onClick, label, icon: Icon }: { onClick: () => void; label: string; icon: LucideIcon }) {
  return (
    <button type="button" onClick={onClick} className={`${tab} ${tone(false)}`}>
      <span className={pill(false)}>
        <Icon className="size-6" aria-hidden="true" />
      </span>
      {label}
    </button>
  )
}

export function BottomNav() {
  const { pathname } = useLocation()
  // La fiche d'annonce a sa propre barre d'action.
  if (pathname.startsWith('/listings/')) return null

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl md:hidden dark:border-slate-800 dark:bg-slate-950/95"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto grid h-16 max-w-md grid-cols-5">
        <li><LinkTab to="/" label="Accueil" icon={House} end /></li>
        <li><LinkTab to="/favorites" label="Favoris" icon={Heart} /></li>
        <li>
          <button type="button" onClick={() => soon('La publication')} className={`${tab} font-bold text-slate-900 dark:text-slate-100`}>
            <span className="flex h-8 w-14 items-center justify-center rounded-full bg-brand-500 text-slate-950 shadow-[0_4px_14px_rgba(242,101,34,.4)] transition active:scale-95">
              <Plus className="size-6" aria-hidden="true" />
            </span>
            Publier
          </button>
        </li>
        <li><ButtonTab onClick={() => soon('La messagerie')} label="Messages" icon={MessageCircle} /></li>
        <li><ButtonTab onClick={() => soon('Le profil')} label="Compte" icon={User} /></li>
      </ul>
    </nav>
  )
}
