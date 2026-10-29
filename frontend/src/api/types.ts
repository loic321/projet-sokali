// Types dérivés du contrat OpenAPI (voir `npm run gen:api`).
import type { components } from './schema'

export type Listing = components['schemas']['Listing']
export type ListingPage = components['schemas']['ListingPage']
export type Category = components['schemas']['Category']
export type Condition = components['schemas']['Condition']
export type ApiErrorBody = components['schemas']['Error']
export type ContactInfo = components['schemas']['ContactInfo']
