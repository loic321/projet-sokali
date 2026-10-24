export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand-100 to-brand-300 font-display text-4xl font-extrabold text-brand-600/60 dark:from-slate-800 dark:to-slate-700"
    >
      {label.charAt(0)}
    </div>
  )
}
