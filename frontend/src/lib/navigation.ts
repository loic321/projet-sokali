import { useLocation, useNavigate } from 'react-router-dom'

// Retour fidèle à l'historique : même effet que le bouton du navigateur ou le geste du téléphone.
// Si la page a été ouverte directement (location.key === 'default'), on va vers un repli logique
// au lieu de faire quitter le site.
export function useGoBack(fallback: string) {
  const navigate = useNavigate()
  const location = useLocation()
  return () => (location.key !== 'default' ? navigate(-1) : navigate(fallback, { replace: true }))
}
