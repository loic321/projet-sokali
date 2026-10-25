import { Heart, House, MessageCircle, Plus, User } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { soon } from '../lib/toast'

const item = 'flex min-h-11 min-w-12 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold'
const tone = (active: boolean) => (active ? 'text-brand-700 dark:text-brand-500' : 'text-slate-600 dark:text-slate-400')

// Navigation dans la zone du pouce. Masquée sur la fiche d'annonce, qui a sa propre barre d'action.
export function BottomNav() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/listings/')) return null

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-3 bottom-3 z-40 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex h-16 items-center justify-around rounded-3xl border border-slate-200 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
        <li>
          <NavLink to="/" end className={({ isActive }) => `${item} ${tone(isActive)}`}>
            <House className="size-5" aria-hidden="true" /> Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className={({ isActive }) => `${item} ${tone(isActive)}`}>
            <Heart className="size-5" aria-hidden="true" /> Favoris
          </NavLink>
        </li>
        <li className="-mt-7">
          <button
            type="button"
            onClick={() => soon('La publication')}
            aria-label="Publier une annonce"
            className="flex size-14 items-center justify-center rounded-full bg-brand-500 text-slate-950 shadow-lg ring-4 ring-stone-50 dark:ring-slate-950"
          >
            <Plus className="size-6" aria-hidden="true" />
          </button>
        </li>
        <li>
          <button type="button" onClick={() => soon('La messagerie')} className={`${item} ${tone(false)}`}>
            <MessageCircle className="size-5" aria-hidden="true" /> Messages
          </button>
        </li>
        <li>
          <button type="button" onClick={() => soon('Le profil')} className={`${item} ${tone(false)}`}>
            <User className="size-5" aria-hidden="true" /> Profil
          </button>
        </li>
      </ul>
    </nav>
  )
}
