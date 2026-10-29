import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Fil d'Ariane : sur ordinateur uniquement. Sur mobile, on utilise une flèche de retour.
export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-4 mt-2 hidden md:block">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, i) => (
          <li key={item.label} className="flex min-w-0 items-center gap-1">
            {i > 0 && <ChevronRight className="size-4 shrink-0" aria-hidden="true" />}
            {item.to ? (
              <Link to={item.to} className="inline-flex min-h-11 items-center rounded px-1 font-medium hover:text-brand-700 hover:underline dark:hover:text-brand-500">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="line-clamp-1 px-1 font-semibold text-slate-900 dark:text-slate-100">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
