import { brand } from '../config/brand'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800">
      <p>
        © 2026 {brand.name} · Projet de démonstration : les annonces affichées sont des données
        fictives.
      </p>
    </footer>
  )
}
