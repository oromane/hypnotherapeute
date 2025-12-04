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

async function checkService() {
    const slug = 'arret-du-tabac'
    console.log(`Checking for service with slug: ${slug}`)
    const service = await client.fetch(
        `*[_type == "service" && slug.current == $slug][0]`,
        { slug }
    )
    console.log('Result:', JSON.stringify(service, null, 2))
}

checkService()
