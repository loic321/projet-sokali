import { X } from 'lucide-react'
import { useState } from 'react'
import type { Condition } from '../api/types'
import type { SortOption } from '../api/queries'
import { conditionLabel } from '../lib/format'
import { ghostButtonClass, iconButtonClass, mutedText, pillClass, primaryButtonClass } from '../lib/ui'
import { Dialog } from './Dialog'

export type FilterValues = {
  sort: SortOption
  minPrice?: number
  maxPrice?: number
  condition?: Condition
}

const sorts: [SortOption, string][] = [
  ['recent', 'Plus récentes'],
  ['price_asc', 'Prix croissant'],
  ['price_desc', 'Prix décroissant'],
]

const toNumber = (v: string) => {
  const n = Number(v)
  return v !== '' && Number.isFinite(n) && n >= 0 ? n : undefined
}

function FiltersForm({
  values,
  onApply,
  onClose,
}: {
  values: FilterValues
  onApply: (v: FilterValues) => void
  onClose: () => void
}) {
  // Monté à chaque ouverture : l'état local repart toujours des filtres réellement appliqués.
  const [sort, setSort] = useState(values.sort)
  const [condition, setCondition] = useState(values.condition)
  const [min, setMin] = useState(values.minPrice?.toString() ?? '')
  const [max, setMax] = useState(values.maxPrice?.toString() ?? '')

  const inputClass =
    'h-12 w-full rounded-2xl border border-slate-200 bg-transparent px-4 text-base outline-none focus:border-brand-500 dark:border-slate-700'

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 dark:border-slate-800">
        <h2 className="font-display text-lg font-extrabold">Filtrer et trier</h2>
        <button type="button" onClick={onClose} aria-label="Fermer les filtres" className={iconButtonClass}>
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        <fieldset>
          <legend className={`mb-3 text-xs font-bold uppercase tracking-wider ${mutedText}`}>Trier par</legend>
          <div className="flex flex-wrap gap-2">
            {sorts.map(([value, label]) => (
              <button key={value} type="button" aria-pressed={sort === value} onClick={() => setSort(value)} className={pillClass(sort === value)}>
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={`mb-3 text-xs font-bold uppercase tracking-wider ${mutedText}`}>Prix (FCFA)</legend>
          <div className="flex items-center gap-3">
            <input inputMode="numeric" aria-label="Prix minimum" placeholder="Min" value={min} onChange={(e) => setMin(e.target.value)} className={inputClass} />
            <span aria-hidden="true">—</span>
            <input inputMode="numeric" aria-label="Prix maximum" placeholder="Max" value={max} onChange={(e) => setMax(e.target.value)} className={inputClass} />
          </div>
        </fieldset>

        <fieldset>
          <legend className={`mb-3 text-xs font-bold uppercase tracking-wider ${mutedText}`}>État de l'article</legend>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={!condition} onClick={() => setCondition(undefined)} className={pillClass(!condition)}>
              Tous
            </button>
            {(Object.keys(conditionLabel) as Condition[]).map((c) => (
              <button key={c} type="button" aria-pressed={condition === c} onClick={() => setCondition(c)} className={pillClass(condition === c)}>
                {conditionLabel[c]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex gap-3 border-t border-slate-200 p-4 dark:border-slate-800">
        <button type="button" onClick={() => onApply({ sort: 'recent' })} className={`${ghostButtonClass} flex-1`}>
          Réinitialiser
        </button>
        <button
          type="button"
          onClick={() => onApply({ sort, condition, minPrice: toNumber(min), maxPrice: toNumber(max) })}
          className={`${primaryButtonClass} flex-1`}
        >
          Appliquer
        </button>
      </div>
    </div>
  )
}

export function FiltersPanel({
  open,
  onClose,
  values,
  onApply,
}: {
  open: boolean
  onClose: () => void
  values: FilterValues
  onApply: (v: FilterValues) => void
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      label="Filtres et tri"
      className="panel-right fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-[min(380px,92vw)] max-w-none bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 dark:bg-slate-900 dark:text-slate-100"
    >
      <FiltersForm values={values} onApply={onApply} onClose={onClose} />
    </Dialog>
  )
}
