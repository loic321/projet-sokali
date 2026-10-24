import { http, HttpResponse } from 'msw'
import { categories, listings } from './data'

// Chaque handler = une route de ton contrat OpenAPI.
// Quand TON backend implémente une route, SUPPRIME son handler ici :
// la requête passera alors au vrai serveur (voir onUnhandledRequest dans main.tsx).
const API = '*/api/v1'

export const handlers = [
  http.get(`${API}/health`, () => HttpResponse.json({ status: 'ok' })),

  http.get(`${API}/categories`, () => HttpResponse.json(categories)),

  http.get(`${API}/listings`, ({ request }) => {
    const p = new URL(request.url).searchParams
    const q = p.get('q')?.toLowerCase()
    const categoryId = p.get('categoryId')
    const city = p.get('city')?.toLowerCase()
    const minPrice = p.get('minPrice')
    const maxPrice = p.get('maxPrice')
    const condition = p.get('condition')

    let items = listings.filter(
      (l) =>
        (!q || l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)) &&
        (!categoryId || l.category.id === categoryId) &&
        (!city || l.city.toLowerCase().includes(city)) &&
        (!minPrice || l.priceXaf >= Number(minPrice)) &&
        (!maxPrice || l.priceXaf <= Number(maxPrice)) &&
        (!condition || l.condition === condition),
    )

    const sort = p.get('sort') ?? 'recent'
    items = [...items].sort(
      sort === 'price_asc'
        ? (a, b) => a.priceXaf - b.priceXaf
        : sort === 'price_desc'
          ? (a, b) => b.priceXaf - a.priceXaf
          : (a, b) => b.createdAt.localeCompare(a.createdAt),
    )

    // Pagination par curseur : ici le curseur est simplement la position de départ.
    const limit = Math.min(Number(p.get('limit')) || 20, 50)
    const offset = Number(p.get('cursor')) || 0
    return HttpResponse.json({
      items: items.slice(offset, offset + limit),
      nextCursor: offset + limit < items.length ? String(offset + limit) : null,
    })
  }),

  http.get(`${API}/listings/:listingId`, ({ params }) => {
    const listing = listings.find((l) => l.id === params.listingId)
    return listing
      ? HttpResponse.json(listing)
      : HttpResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Annonce introuvable' } },
          { status: 404 },
        )
  }),
]
