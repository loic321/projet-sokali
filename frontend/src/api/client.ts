const BASE_URL: string = import.meta.env.VITE_API_URL ?? '/api/v1'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

type Params = Record<string, string | number | undefined>

function buildUrl(path: string, params: Params = {}) {
  const url = new URL(BASE_URL + path, window.location.origin)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
  }
  return url
}

async function toApiError(response: Response): Promise<ApiError> {
  let message = response.statusText
  try {
    const body = await response.json()
    message = body?.error?.message ?? message
  } catch {
    // corps de réponse non JSON : on garde le statut HTTP
  }
  return new ApiError(response.status, message)
}

export async function apiGet<T>(path: string, params: Params = {}): Promise<T> {
  const response = await fetch(buildUrl(path, params))
  if (!response.ok) throw await toApiError(response)
  return (await response.json()) as T
}

export async function apiPost(path: string, body: unknown): Promise<void> {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw await toApiError(response)
}
