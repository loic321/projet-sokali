import { ShieldCheck } from 'lucide-react'

const tips = [
  'Rencontrez le vendeur dans un lieu public et fréquenté.',
  "Vérifiez l'article avant de payer.",
  "N'envoyez jamais d'argent à l'avance.",
  'Ne communiquez jamais un code reçu par SMS, ni votre code Mobile Money.',
]

export function SafetyTips() {
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
      <p className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200">
        <ShieldCheck className="size-5" aria-hidden="true" /> Conseils de sécurité
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900 dark:text-emerald-200">
        {tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  )
}
