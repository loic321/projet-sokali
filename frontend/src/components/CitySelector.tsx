import { Check, ChevronDown, LocateFixed, MapPin, X } from 'lucide-react'
import { useState } from 'react'
import { CITIES, useCity } from '../lib/city'
import { MAX_DISTANCE_KM, nearestCity } from '../lib/geo'
import { toast } from '../lib/toast'
import { iconButtonClass, mutedText, sheetClass } from '../lib/ui'
import { Dialog } from './Dialog'

type GeoState = 'idle' | 'loading' | 'denied' | 'far' | 'error'

const geoMessages: Record<Exclude<GeoState, 'idle' | 'loading'>, string> = {
  denied: 'Position refusée. Choisissez votre ville dans la liste.',
  far: "Aucune de nos villes n'est proche de vous. Choisissez dans la liste.",
  error: 'Position indisponible. Choisissez votre ville dans la liste.',
}

// Monté à chaque ouverture : l'état de la détection repart toujours de zéro.
function CityList({ onClose }: { onClose: () => void }) {
  const { city, setCity } = useCity()
  const [geo, setGeo] = useState<GeoState>('idle')

  const choose = (value: string | null) => {
    setCity(value)
    onClose()
  }

  // La position n'est demandée qu'au clic, utilisée une seule fois et jamais enregistrée.
  function locate() {
    if (!('geolocation' in navigator)) {
      setGeo('error')
      return
    }
    setGeo('loading')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { city: nearest, km } = nearestCity(position.coords.latitude, position.coords.longitude)
        if (km <= MAX_DISTANCE_KM) {
          choose(nearest)
          toast(`Ville détectée : ${nearest}`)
        } else {
          setGeo('far')
        }
      },
      (error) => setGeo(error.code === error.PERMISSION_DENIED ? 'denied' : 'error'),
      { timeout: 8000, maximumAge: 600_000 },
    )
  }

  const optionClass = (active: boolean) =>
    `flex min-h-12 w-full items-center justify-between rounded-2xl px-4 text-left text-base font-semibold transition ${
      active ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-brand-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
    }`

  return (
    <div className="max-h-[85dvh] overflow-y-auto p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-extrabold">Où cherchez-vous ?</h2>
        <button type="button" onClick={onClose} aria-label="Fermer" className={iconButtonClass}>
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={locate}
        disabled={geo === 'loading'}
        className="flex w-full items-center gap-3 rounded-2xl border border-brand-500/40 bg-brand-50 p-4 text-left transition hover:border-brand-500 disabled:opacity-70 dark:bg-slate-800"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-slate-950">
          <LocateFixed className="size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block font-bold">{geo === 'loading' ? 'Recherche de votre position…' : 'Autour de moi'}</span>
          <span className={`block text-sm ${mutedText}`}>
            Trouve la ville la plus proche. Votre position sert une seule fois et n'est pas enregistrée.
          </span>
        </span>
      </button>
      {geo !== 'idle' && geo !== 'loading' && (
        <p role="status" className="mt-2 px-1 text-sm text-slate-700 dark:text-slate-300">{geoMessages[geo]}</p>
      )}

      <ul className="mt-3">
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
  )
}

export function CitySelector({ onDark = false }: { onDark?: boolean }) {
  const { city } = useCity()
  const [open, setOpen] = useState(false)

  const triggerClass = onDark
    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
    : 'border-slate-200 bg-white text-slate-800 hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold backdrop-blur-md transition ${triggerClass}`}
      >
        <MapPin className="size-4" aria-hidden="true" />
        {city ?? 'Tout le Cameroun'}
        <ChevronDown className="size-4" aria-hidden="true" />
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} label="Choisir une ville" className={sheetClass}>
        <CityList onClose={() => setOpen(false)} />
      </Dialog>
    </>
  )
}
