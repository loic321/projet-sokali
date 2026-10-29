import { CITIES } from './city'

type CityName = (typeof CITIES)[number]

// Coordonnées approximatives (latitude, longitude) du centre de chaque ville.
const COORDS: Record<CityName, [number, number]> = {
  Douala: [4.0511, 9.7679],
  Yaoundé: [3.848, 11.5021],
  Bafoussam: [5.4737, 10.4179],
  Garoua: [9.3265, 13.3939],
  Bamenda: [5.9597, 10.146],
  Maroua: [10.5953, 14.3157],
  Kribi: [2.9373, 9.9073],
}

// Au-delà de cette distance, on considère qu'aucune de nos villes n'est « autour de vous ».
export const MAX_DISTANCE_KM = 120

const rad = (deg: number) => (deg * Math.PI) / 180

// Distance à vol d'oiseau (formule de haversine).
function distanceKm([lat1, lng1]: [number, number], [lat2, lng2]: [number, number]) {
  const dLat = rad(lat2 - lat1)
  const dLng = rad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(a))
}

export function nearestCity(lat: number, lng: number): { city: CityName; km: number } {
  let best = { city: CITIES[0] as CityName, km: Infinity }
  for (const city of CITIES) {
    const km = distanceKm([lat, lng], COORDS[city])
    if (km < best.km) best = { city, km }
  }
  return best
}
