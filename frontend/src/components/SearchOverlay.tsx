import { Clock, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../api/queries'
import { getRecentSearches, saveRecentSearch } from '../lib/recent'
import { iconButtonClass, mutedText, pillClass } from '../lib/ui'
import { Dialog } from './Dialog'

function SearchContent({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const categories = useCategories()
  // Ce composant est monté à chaque ouverture : l'initialisation lit donc la liste à jour.
  const [recent] = useState(getRecentSearches)

  function go(term: string) {
    const q = term.trim()
    if (!q) return
    saveRecentSearch(q)
    onClose()
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="p-4">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          go(String(new FormData(e.currentTarget).get('q') ?? ''))
        }}
        className="flex items-center gap-2"
      >
        <label className="flex h-12 flex-1 items-center gap-3 rounded-2xl border border-slate-200 px-4 focus-within:border-brand-500 dark:border-slate-700">
          <Search className="size-5 text-brand-700 dark:text-brand-500" aria-hidden="true" />
          <input
            autoFocus
            name="q"
            type="search"
            autoComplete="off"
            placeholder="Rechercher une annonce, une ville…"
            aria-label="Rechercher une annonce"
            className="w-full bg-transparent text-base outline-none"
          />
        </label>
        <button type="button" onClick={onClose} aria-label="Fermer la recherche" className={iconButtonClass}>
          <X className="size-5" aria-hidden="true" />
        </button>
      </form>

      <h3 className={`mb-2 mt-5 text-xs font-bold uppercase tracking-wider ${mutedText}`}>Recherches récentes</h3>
      {recent.length === 0 ? (
        <p className={`text-sm ${mutedText}`}>Aucune recherche pour le moment.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {recent.map((term) => (
            <button key={term} type="button" onClick={() => go(term)} className={pillClass(false)}>
              <Clock className="size-4" aria-hidden="true" /> {term}
            </button>
          ))}
        </div>
      )}

      <h3 className={`mb-2 mt-5 text-xs font-bold uppercase tracking-wider ${mutedText}`}>Catégories populaires</h3>
      <div className="flex flex-wrap gap-2">
        {categories.data?.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              onClose()
              navigate(`/search?category=${c.id}`)
            }}
            className={pillClass(false)}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      label="Rechercher"
      className="mx-auto mb-auto mt-[10vh] max-h-[80dvh] w-[min(640px,92vw)] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
    >
      <SearchContent onClose={onClose} />
    </Dialog>
  )
}
