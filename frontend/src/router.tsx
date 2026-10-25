import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { FavoritesPage } from './pages/FavoritesPage'
import { HomePage } from './pages/HomePage'
import { ListingPage } from './pages/ListingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SearchPage } from './pages/SearchPage'

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/search', element: <SearchPage /> },
        { path: '/favorites', element: <FavoritesPage /> },
        { path: '/listings/:listingId', element: <ListingPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  // BASE_URL vaut "/projet-sokali/" : le routeur attend "/projet-sokali" (sans slash final).
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') },
)
