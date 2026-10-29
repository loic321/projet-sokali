import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const arrowClass =
  'inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-500 hover:text-brand-700 disabled:opacity-30 max-md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'

// Rail horizontal : accroche sur chaque carte (scroll-snap), flèches sur tablette et ordinateur,
// carte suivante qui dépasse pour signaler qu'on peut défiler.
export function Rail({ title, href, children, busy = false }: { title: string; href?: string; children: ReactNode; busy?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const start = el.scrollLeft <= 4
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    setEdge((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update, children])

  const scrollBy = (direction: 1 | -1) =>
    ref.current?.scrollBy({ left: direction * ref.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section aria-label={title} aria-busy={busy} className="mb-10 md:mb-12">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-xl font-extrabold sm:text-2xl">
          <span aria-hidden="true" className="h-6 w-1.5 rounded-full bg-brand-500" />
          {title}
        </h2>
        <div className="flex items-center gap-1.5">
          {href && (
            <Link
              to={href}
              className="mr-1 inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50 dark:text-brand-500 dark:hover:bg-slate-800"
            >
              Voir tout <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          )}
          <button type="button" aria-label="Défiler vers la gauche" disabled={edge.start} onClick={() => scrollBy(-1)} className={arrowClass}>
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Défiler vers la droite" disabled={edge.end} onClick={() => scrollBy(1)} className={arrowClass}>
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        onScroll={update}
        tabIndex={0}
        role="group"
        aria-label={`${title}, liste défilante`}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto scroll-smooth px-4 pb-4 pt-1 md:gap-4"
      >
        {children}
      </div>
    </section>
  )
}

export const railItemClass = 'w-[46vw] max-w-60 shrink-0 snap-start sm:w-56 lg:w-60'
