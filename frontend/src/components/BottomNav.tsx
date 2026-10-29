import { Heart, House, MessageCircle, Plus, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { soon } from '../lib/toast'

// Barre d'onglets flottante (téléphone uniquement, < 768 px) : bords arrondis, cinq destinations de
// même largeur, libellés toujours visibles, pastille sur l'onglet actif, bouton Publier en relief.
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
      className="fixed inset-x-3 z-40 mx-auto max-w-md md:hidden"
      style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <ul className="grid h-16 grid-cols-5 rounded-3xl border border-slate-200 bg-white/90 shadow-[0_20px_46px_-12px_rgba(15,23,42,.35)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90">
        <li><LinkTab to="/" label="Accueil" icon={House} end /></li>
        <li><LinkTab to="/favorites" label="Favoris" icon={Heart} /></li>
        <li>
          <button type="button" onClick={() => soon('La publication')} className="flex h-full w-full flex-col items-center justify-end gap-0.5 pb-2 text-xs font-bold text-slate-900 dark:text-slate-100">
            <span className="-mt-7 flex size-14 items-center justify-center rounded-full bg-brand-500 text-slate-950 shadow-[0_8px_24px_rgba(242,101,34,.45)] ring-4 ring-white transition active:scale-95 dark:ring-slate-900">
              <Plus className="size-7" aria-hidden="true" />
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
