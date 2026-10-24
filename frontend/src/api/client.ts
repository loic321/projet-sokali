const BASE_URL: string = import.meta.env.VITE_API_URL ?? '/api/v1'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

type Params = Record<string, string | number | undefined>

export async function apiGet<T>(path: string, params: Params = {}): Promise<T> {
  const url = new URL(BASE_URL + path, window.location.origin)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
  }

  const response = await fetch(url)
  if (!response.ok) {
    let message = response.statusText
    try {
      const body = await response.json()
      message = body?.error?.message ?? message
    } catch {
      // corps de réponse non JSON : on garde le statut HTTP
    }
    throw new ApiError(response.status, message)
  }
  return (await response.json()) as T
}
