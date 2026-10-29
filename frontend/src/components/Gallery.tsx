import { useRef, useState } from 'react'
import type { Listing } from '../api/types'
import { ImagePlaceholder } from './ImagePlaceholder'

// Galerie à balayage (scroll-snap) avec compteur ; miniatures cliquables sur ordinateur.
export function Gallery({ listing }: { listing: Listing }) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const { images, title, category } = listing

  if (images.length === 0) {
    return (
      <div className="aspect-4/3 overflow-hidden md:rounded-3xl">
        <ImagePlaceholder label={category.name} slug={category.slug} />
      </div>
    )
  }

  const goTo = (i: number) => ref.current?.scrollTo({ left: i * ref.current.clientWidth, behavior: 'smooth' })

  return (
    <div>
      <div className="relative">
        <div
          ref={ref}
          onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          tabIndex={0}
          role="group"
          aria-label="Photos de l'annonce, faites défiler"
          className="flex aspect-4/3 snap-x snap-mandatory overflow-x-auto bg-slate-200 [scrollbar-width:none] md:rounded-3xl dark:bg-slate-800 [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => (
            <img
              key={image.id}
              src={image.url}
              alt={`${title}, photo ${i + 1} sur ${images.length}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="h-full w-full shrink-0 snap-center object-cover"
            />
          ))}
        </div>
        {images.length > 1 && (
          <p aria-hidden="true" className="absolute bottom-3 right-3 rounded-full bg-slate-900/75 px-3 py-1 text-xs font-bold text-white">
            {index + 1}/{images.length}
          </p>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 hidden gap-2 md:flex">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Voir la photo ${i + 1}`}
              aria-current={i === index}
              className={`size-16 overflow-hidden rounded-xl border-2 transition ${i === index ? 'border-brand-500' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <img src={image.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
