import { useToasts } from '../lib/toast'

export function Toaster() {
  const toasts = useToasts()
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-24 z-100 flex flex-col items-center gap-2 lg:bottom-6"
    >
      {toasts.map((t) => (
        <p
          key={t.id}
          className="pointer-events-auto max-w-md rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl dark:bg-slate-100 dark:text-slate-900"
        >
          {t.message}
        </p>
      ))}
    </div>
  )
}
