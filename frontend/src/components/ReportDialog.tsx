import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { useState } from 'react'
import { ApiError, apiPost } from '../api/client'
import { toast } from '../lib/toast'
import { ghostButtonClass, iconButtonClass, mutedText, pillClass, primaryButtonClass, sheetClass } from '../lib/ui'
import { Dialog } from './Dialog'

const reasons = [
  ['SCAM', 'Arnaque ou fraude suspectée'],
  ['PROHIBITED', 'Article interdit'],
  ['WRONG_CATEGORY', 'Mauvaise catégorie'],
  ['OTHER', 'Autre motif'],
] as const
type Reason = (typeof reasons)[number][0]

function ReportForm({ listingId, onClose }: { listingId: string; onClose: () => void }) {
  const [reason, setReason] = useState<Reason>('SCAM')
  const [details, setDetails] = useState('')

  const report = useMutation({
    mutationFn: () => apiPost(`/listings/${listingId}/reports`, { reason, details: details.trim() || undefined }),
    onSuccess: () => {
      toast('Merci, votre signalement a bien été envoyé.')
      onClose()
    },
    onError: (error) =>
      toast(
        error instanceof ApiError && error.status === 401
          ? 'Connectez-vous pour signaler une annonce.'
          : "Le signalement n'a pas pu être envoyé. Réessayez.",
      ),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        report.mutate()
      }}
      className="max-h-[85dvh] space-y-5 overflow-y-auto p-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold">Signaler cette annonce</h2>
        <button type="button" onClick={onClose} aria-label="Fermer" className={iconButtonClass}>
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <fieldset>
        <legend className={`mb-3 text-xs font-bold uppercase tracking-wider ${mutedText}`}>Motif</legend>
        <div className="flex flex-wrap gap-2">
          {reasons.map(([value, label]) => (
            <button key={value} type="button" aria-pressed={reason === value} onClick={() => setReason(value)} className={pillClass(reason === value)}>
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className={`mb-2 block text-xs font-bold uppercase tracking-wider ${mutedText}`}>Précisions (facultatif)</span>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          maxLength={500}
          rows={3}
          className="w-full rounded-2xl border border-slate-200 bg-transparent p-3 text-base outline-none focus:border-brand-500 dark:border-slate-700"
        />
      </label>

      <div className="flex gap-3">
        <button type="button" onClick={onClose} className={`${ghostButtonClass} flex-1`}>Annuler</button>
        <button type="submit" disabled={report.isPending} className={`${primaryButtonClass} flex-1`}>
          {report.isPending ? 'Envoi…' : 'Envoyer'}
        </button>
      </div>
    </form>
  )
}

export function ReportDialog({ listingId, open, onClose }: { listingId: string; open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} label="Signaler cette annonce" className={sheetClass}>
      <ReportForm listingId={listingId} onClose={onClose} />
    </Dialog>
  )
}
