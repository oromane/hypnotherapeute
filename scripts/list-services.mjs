import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-02-02',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

async function listServices() {
    const services = await client.fetch(`*[_type == "service"]{_id, title, "slug": slug.current}`)
    console.log(services)
}

listServices()
