import { categoryIcons, fallbackCategoryIcon } from '../lib/categoryIcons'

// Tant que l'envoi de photos n'existe pas, on affiche l'icône de la catégorie.
export function ImagePlaceholder({ label, slug }: { label: string; slug: string }) {
  const Icon = categoryIcons[slug] ?? fallbackCategoryIcon
  return (
    <div
      role="img"
      aria-label={label}
      className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand-100 via-brand-50 to-brand-300 text-brand-700/70 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700 dark:text-brand-500/70"
    >
      <Icon className="size-1/3" strokeWidth={1.5} aria-hidden="true" />
    </div>
  )
}
