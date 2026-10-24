// Classes partagées. Toutes les cibles tactiles font au moins 44 px (loi de Fitts).
export const iconButtonClass =
  'relative inline-flex size-11 shrink-0 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'

// Texte sombre sur orange : contraste d'environ 6:1 (le blanc n'atteint que 3:1).
export const primaryButtonClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-500 px-5 text-sm font-bold text-slate-950 transition hover:bg-brand-300 active:scale-[.98] disabled:opacity-50'

export const ghostButtonClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-800 transition hover:border-brand-500 hover:text-brand-700 dark:border-slate-700 dark:text-slate-100 dark:hover:text-brand-500'

export const pillClass = (active: boolean) =>
  `inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
    active
      ? 'border-slate-900 bg-slate-900 text-white dark:border-brand-500 dark:bg-brand-500 dark:text-slate-950'
      : 'border-slate-200 bg-white text-slate-700 hover:border-brand-500 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-brand-500'
  }`

// Texte secondaire : slate-500 passe le contraste AA (le slate-400 du v5 échouait).
export const mutedText = 'text-slate-500 dark:text-slate-400'
export const priceText = 'text-brand-700 dark:text-brand-500'
