const KEY = 'ava:recent-searches'

export function getRecentSearches(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(value) ? value.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function saveRecentSearch(term: string) {
  const list = [term, ...getRecentSearches().filter((x) => x.toLowerCase() !== term.toLowerCase())]
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 5)))
  } catch {
    // ignoré
  }
}
