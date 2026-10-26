import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { BackToTop } from './BackToTop'
import { BottomNav } from './BottomNav'
import { Footer } from './Footer'
import { Header } from './Header'
import { Toaster } from './Toaster'

export function Layout() {
  const { pathname } = useLocation()
  // L'accueil gère lui-même ses largeurs (le hero est plein écran) ; les autres pages sont centrées.
  const contained = pathname !== '/'

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-brand-500 focus:px-4 focus:py-2 focus:font-bold focus:text-slate-950"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="main" key={pathname} className={`page-enter ${contained ? 'mx-auto max-w-7xl px-4 pt-2' : ''}`}>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <BackToTop />
      <Toaster />
      <ScrollRestoration />
    </>
  )
}
