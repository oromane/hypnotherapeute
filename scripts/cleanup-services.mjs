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

const VALID_SLUGS = [
    "accompagnement-grossesse",
    "addictions",
    "arret-du-tabac",
    "ateliers-hypnose",
    "confiance-en-soi",
    "depression-burn-out",
    "gestion-des-angoisses",
    "hypnose-douleurs",
    "hypnose-enfants-ados",
    "preparation-evenement",
    "troubles-alimentaires"
]

async function cleanupServices() {
    console.log('🚀 Cleaning up services...')

    const services = await client.fetch(`*[_type == "service"]{_id, title, "slug": slug.current}`)
    const transaction = client.transaction()
    let deletedCount = 0

    for (const service of services) {
        if (!VALID_SLUGS.includes(service.slug)) {
            console.log(`❌ Deleting invalid service: ${service.slug} (${service.title})`)
            transaction.delete(service._id)
            deletedCount++
        } else {
            console.log(`✅ Keeping valid service: ${service.slug}`)
        }
    }

    if (deletedCount > 0) {
        console.log(`Committing deletion of ${deletedCount} documents...`)
        try {
            await transaction.commit()
            console.log('✅ Cleanup successful.')
        } catch (err) {
            console.error('❌ Error deleting documents:', err)
        }
    } else {
        console.log('✅ No invalid services found.')
    }
}

cleanupServices()
