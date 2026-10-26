import { useListingRail } from '../api/queries'
import type { ListingFilters } from '../api/queries'
import { ListingCard } from './ListingCard'
import { Rail, railItemClass } from './Rail'

export function ListingRail({
  title,
  filters,
  href,
  excludeId,
}: {
  title: string
  filters: ListingFilters
  href?: string
  excludeId?: string
}) {
  const rail = useListingRail(filters)

  if (rail.isPending) {
    return (
      <Rail title={title} busy>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={`${railItemClass} skeleton aspect-3/4 rounded-2xl`} />
        ))}
      </Rail>
    )
  }

  const items = (rail.data ?? []).filter((l) => l.id !== excludeId)
  if (rail.isError || items.length === 0) return null

  return (
    <Rail title={title} href={href}>
      {items.map((listing, index) => (
        <div key={listing.id} className={railItemClass}>
          <ListingCard listing={listing} index={index} />
        </div>
      ))}
    </Rail>
  )
}
