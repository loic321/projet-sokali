import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const arrowClass =
  'hidden size-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-brand-500 disabled:opacity-30 md:inline-flex dark:border-slate-700 dark:text-slate-200'

// Rail horizontal : accroche sur chaque carte (scroll-snap), flèches sur ordinateur,
// carte suivante qui dépasse pour signaler qu'on peut défiler.
export function Rail({
  title,
  href,
  children,
  busy = false,
}: {
  title: string
  href?: string
  children: ReactNode
  busy?: boolean
}) {
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
    <section aria-label={title} aria-busy={busy} className="mb-10">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-extrabold">{title}</h2>
        <div className="flex items-center gap-1">
          {href && (
            <Link
              to={href}
              className="mr-2 inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:underline dark:text-brand-500"
            >
              Voir tout
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
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto scroll-smooth px-4 pb-2"
      >
        {children}
      </div>
    </section>
  )
}

export const railItemClass = 'w-[44vw] max-w-56 shrink-0 snap-start sm:w-52 lg:w-56'
