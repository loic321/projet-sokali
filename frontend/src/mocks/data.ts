// Données de DÉMONSTRATION : elles ne représentent pas de vraies annonces.
import type { Category, Condition, Listing } from '../api/types'

const uuid = (group: number, n: number) =>
  `${String(group).padStart(8, '0')}-0000-4000-8000-${String(n).padStart(12, '0')}`

const hoursAgo = (h: number) => new Date(Date.now() - h * 3_600_000).toISOString()

export const categories: Category[] = [
  ['Électronique', 'electronique'],
  ['Véhicules', 'vehicules'],
  ['Immobilier', 'immobilier'],
  ['Mode', 'mode'],
  ['Maison', 'maison'],
  ['Services', 'services'],
  ['Loisirs', 'loisirs'],
].map(([name, slug], i) => ({ id: uuid(1, i + 1), name, slug }))

const sellers = [
  { id: uuid(2, 1), name: 'Jean-Kevin M.', city: 'Douala', createdAt: hoursAgo(9000), listingsCount: 3 },
  { id: uuid(2, 2), name: 'Amadou M.', city: 'Yaoundé', createdAt: hoursAgo(12000), listingsCount: 1 },
  { id: uuid(2, 3), name: 'Sophie K.', city: 'Douala', createdAt: hoursAgo(7000), listingsCount: 2 },
  { id: uuid(2, 4), name: 'Patrick N.', city: 'Yaoundé', createdAt: hoursAgo(15000), listingsCount: 2 },
]

const make = (
  n: number,
  title: string,
  priceXaf: number,
  category: number,
  condition: Condition,
  city: string,
  seller: number,
  hours: number,
  description: string,
): Listing => ({
  id: uuid(3, n),
  title,
  description,
  priceXaf,
  condition,
  city,
  status: 'ACTIVE',
  category: categories[category],
  seller: sellers[seller],
  images: [],
  createdAt: hoursAgo(hours),
})

export const listings: Listing[] = [
  make(1, 'iPhone 14 Pro Max 256 Go', 185000, 0, 'VERY_GOOD', 'Douala, Akwa', 0, 2,
    "Excellent état, batterie à 97 %. Boîte d'origine et chargeur rapide inclus."),
  make(2, 'Toyota Corolla 2019 automatique', 6500000, 1, 'VERY_GOOD', 'Yaoundé, Bastos', 1, 26,
    "38 000 km, entretien suivi. Aucun accident, pneus neufs."),
  make(3, 'Appartement F3 meublé', 120000, 2, 'GOOD', 'Douala, Bonanjo', 2, 50,
    "F3 meublé et climatisé, résidence gardée, parking sécurisé. Loyer mensuel."),
  make(4, 'MacBook Pro M2 16 Go / 512 Go', 650000, 0, 'NEW', 'Yaoundé, Nlongkak', 3, 1,
    "État neuf, chargeur MagSafe inclus. Facture disponible."),
  make(5, 'VTT Trek Marlin 7 taille M', 95000, 6, 'VERY_GOOD', 'Douala, Kotto', 2, 72,
    "Très bon état, peu utilisé. Freins hydrauliques, 8 vitesses."),
  make(6, "Canapé d'angle en cuir 6 places", 180000, 4, 'GOOD', 'Douala, Deido', 0, 120,
    "Cuir marron, très confortable. Dimensions : 270 × 180 cm."),
  make(7, 'Enceinte JBL Flip 6 étanche', 60000, 0, 'VERY_GOOD', 'Douala, Akwa', 0, 144,
    "Étanche IPX7, 12 h d'autonomie. Deux semaines d'utilisation."),
  make(8, 'PlayStation 5 + 2 manettes', 520000, 6, 'VERY_GOOD', 'Douala, Bonamoussadi', 3, 3,
    "PS5 avec lecteur, deux manettes DualSense et trois jeux inclus."),
]
