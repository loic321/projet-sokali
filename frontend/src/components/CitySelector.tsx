import { Check, ChevronDown, MapPin, X } from 'lucide-react'
import { useState } from 'react'
import { CITIES, useCity } from '../lib/city'
import { iconButtonClass, sheetClass } from '../lib/ui'
import { Dialog } from './Dialog'

export function CitySelector({ onDark = false }: { onDark?: boolean }) {
  const { city, setCity } = useCity()
  const [open, setOpen] = useState(false)

  const choose = (value: string | null) => {
    setCity(value)
    setOpen(false)
  }

  const triggerClass = onDark
    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
    : 'border-slate-200 bg-white text-slate-800 hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'
  const optionClass = (active: boolean) =>
    `flex min-h-12 w-full items-center justify-between rounded-2xl px-4 text-left text-base font-semibold transition ${
      active ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-brand-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
    }`

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold backdrop-blur-md transition ${triggerClass}`}
      >
        <MapPin className="size-4" aria-hidden="true" />
        {city ?? 'Tout le Cameroun'}
        <ChevronDown className="size-4" aria-hidden="true" />
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} label="Choisir une ville" className={sheetClass}>
        <div className="max-h-[85dvh] overflow-y-auto p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-extrabold">Où cherchez-vous ?</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className={iconButtonClass}>
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <ul>
            <li>
              <button type="button" onClick={() => choose(null)} className={optionClass(city === null)}>
                Tout le Cameroun {city === null && <Check className="size-5" aria-hidden="true" />}
              </button>
            </li>
            {CITIES.map((c) => (
              <li key={c}>
                <button type="button" onClick={() => choose(c)} className={optionClass(city === c)}>
                  {c} {city === c && <Check className="size-5" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Dialog>
    </>
  )
}
