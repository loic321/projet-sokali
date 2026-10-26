import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { apiGet } from './client'
import type { Category, Condition, Listing, ListingPage } from './types'

// Petite taille de page pour voir la pagination avec les annonces de démonstration.
const PAGE_SIZE = 6

export type SortOption = 'recent' | 'price_asc' | 'price_desc'

export type ListingFilters = {
  q?: string
  categoryId?: string
  sort?: SortOption
  minPrice?: number
  maxPrice?: number
  condition?: Condition
  city?: string
}

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => apiGet<Category[]>('/categories'),
    staleTime: 5 * 60_000,
  })

export const useListings = (filters: ListingFilters) =>
  useInfiniteQuery({
    queryKey: ['listings', filters],
    queryFn: ({ pageParam }) =>
      apiGet<ListingPage>('/listings', { ...filters, limit: PAGE_SIZE, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  })

// Une seule page d'annonces pour un rail horizontal.
export const useListingRail = (filters: ListingFilters) =>
  useQuery({
    queryKey: ['rail', filters],
    queryFn: () => apiGet<ListingPage>('/listings', { ...filters, limit: 10 }),
    select: (page) => page.items,
  })

export const useListing = (id: string) =>
  useQuery({
    queryKey: ['listing', id],
    queryFn: () => apiGet<Listing>(`/listings/${id}`),
  })
