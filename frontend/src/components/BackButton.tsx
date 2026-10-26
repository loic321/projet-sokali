import { ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

// Bouton Retour ergonomique :
// - grande cible (48 px) avec libellé explicite, pas une simple flèche ;
// - collé sous l'en-tête sur mobile : toujours atteignable en défilant ;
// - revient à la page réellement visitée avant ; si la page a été ouverte directement
//   (location.key === 'default'), il va vers un repli logique au lieu de sortir du site.
export function BackButton({ fallback = '/', label = 'Retour' }: { fallback?: string; label?: string }) {
  const navigate = useNavigate()
  const location = useLocation()
  const goBack = () => (location.key !== 'default' ? navigate(-1) : navigate(fallback))

  return (
    <div className="sticky top-16 z-30 -mx-4 mb-3 bg-stone-50/90 px-4 py-2 backdrop-blur-xl md:static md:mx-0 md:bg-transparent md:px-0 md:py-3 md:backdrop-blur-none dark:bg-slate-950/90 md:dark:bg-transparent">
      <button
        type="button"
        onClick={goBack}
        className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-5 text-sm font-bold text-slate-900 shadow-sm transition duration-200 hover:-translate-x-0.5 hover:border-brand-500 hover:shadow-md active:scale-[.97] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-brand-500 text-slate-950 transition group-hover:bg-brand-300">
          <ArrowLeft className="size-5" aria-hidden="true" />
        </span>
        {label}
      </button>
    </div>
  )
}
