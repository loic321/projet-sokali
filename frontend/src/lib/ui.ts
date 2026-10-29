// Classes partagées. Cibles tactiles de 44 à 48 px (loi de Fitts).
export const iconButtonClass =
  'relative inline-flex size-11 shrink-0 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 active:scale-95 dark:text-slate-200 dark:hover:bg-slate-800'

// Texte sombre sur orange : environ 6:1 de contraste (le blanc n'atteint que 3:1).
export const primaryButtonClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-bold text-slate-950 shadow-[0_2px_12px_rgba(242,101,34,.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff7a3d] hover:shadow-[0_8px_30px_rgba(242,101,34,.35)] active:translate-y-0 active:scale-[.97] disabled:pointer-events-none disabled:opacity-50'

export const ghostButtonClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-slate-300 bg-transparent px-5 text-sm font-semibold text-slate-800 transition duration-200 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 active:scale-[.97] dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-brand-500'

// Bouton « verre » pour les fonds sombres (hero).
export const glassButtonClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:scale-[.97]'

export const pillClass = (active: boolean) =>
  `inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition duration-200 active:scale-[.97] ${
    active
      ? 'border-slate-900 bg-slate-900 text-white shadow-md dark:border-brand-500 dark:bg-brand-500 dark:text-slate-950'
      : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-px hover:border-brand-500 hover:text-brand-700 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-brand-500'
  }`

// Texte secondaire : slate-500 passe le contraste AA (le slate-400 du v5 échouait).
export const mutedText = 'text-slate-500 dark:text-slate-400'
export const priceText = 'text-brand-700 dark:text-brand-500'

const sheetBase =
  'sheet fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none overflow-hidden rounded-t-3xl border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 dark:bg-slate-900 dark:text-slate-100'

export const sheetClass = `${sheetBase} max-h-[85dvh] md:inset-0 md:m-auto md:h-fit md:max-h-[80dvh] md:w-[min(440px,92vw)] md:rounded-3xl`

export const drawerClass = `${sheetBase} drawer-md max-h-[88dvh] md:inset-y-0 md:left-auto md:right-0 md:h-dvh md:max-h-none md:w-[380px] md:rounded-none`

export const whatsappButtonClass =
  'inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 active:scale-[.97]'

// Menu : tiroir à droite, visible seulement sous lg (1024 px).
export const menuDrawerClass =
  'menu-drawer fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-[min(340px,88vw)] max-w-none overflow-hidden rounded-l-3xl border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm lg:hidden dark:bg-slate-900 dark:text-slate-100'
