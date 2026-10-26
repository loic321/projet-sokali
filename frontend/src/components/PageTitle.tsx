import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { useGoBack } from '../lib/navigation'
import { iconButtonClass } from '../lib/ui'

// Barre de titre : flèche de retour à gauche sur mobile (convention), titre, actions à droite.
export function PageTitle({ title, fallback = '/', children }: { title: string; fallback?: string; children?: ReactNode }) {
  const goBack = useGoBack(fallback)
  return (
    <div className="mb-4 flex items-center gap-1 md:gap-3">
      <button type="button" onClick={goBack} aria-label="Retour" className={`${iconButtonClass} -ml-2 md:hidden`}>
        <ArrowLeft className="size-6" aria-hidden="true" />
      </button>
      <h1 className="min-w-0 flex-1 text-2xl font-extrabold">{title}</h1>
      {children}
    </div>
  )
}
