import { createClient } from 'next-sanity'

import { env } from './env'

export const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: false, // Disable CDN for fresh data, or make it configurable
})
