import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-display text-3xl font-extrabold">Page introuvable</h1>
      <Link to="/" className="mt-4 inline-block font-semibold text-brand-500 underline">
        Retour à l'accueil
      </Link>
    </div>
  )
}
