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

async function removeDuplicates() {
    console.log('🚀 Checking for duplicate services...')

    // Fetch all services
    const services = await client.fetch(`*[_type == "service"]{_id, title, "slug": slug.current}`)

    // Group by slug
    const grouped = {}
    services.forEach(s => {
        if (!grouped[s.slug]) {
            grouped[s.slug] = []
        }
        grouped[s.slug].push(s)
    })

    const transaction = client.transaction()
    let deletedCount = 0

    for (const slug in grouped) {
        const docs = grouped[slug]
        if (docs.length > 1) {
            console.log(`⚠️ Found ${docs.length} duplicates for slug: ${slug}`)

            // Sort by ID or creation time if available (here just picking the first one to keep)
            // We'll keep the one with the deterministic ID 'service-slug' if it exists, otherwise the first one
            const deterministicId = `service-${slug}`
            let keepIndex = docs.findIndex(d => d._id === deterministicId)

            if (keepIndex === -1) {
                keepIndex = 0 // Keep the first one if no deterministic ID found
            }

            const keepDoc = docs[keepIndex]
            console.log(`   ✅ Keeping: ${keepDoc._id} (${keepDoc.title})`)

            // Delete others
            for (let i = 0; i < docs.length; i++) {
                if (i !== keepIndex) {
                    console.log(`   ❌ Deleting: ${docs[i]._id}`)
                    transaction.delete(docs[i]._id)
                    deletedCount++
                }
            }
        }
    }

    if (deletedCount > 0) {
        console.log(`Committing deletion of ${deletedCount} documents...`)
        try {
            await transaction.commit()
            console.log('✅ Duplicates removed successfully.')
        } catch (err) {
            console.error('❌ Error deleting duplicates:', err)
        }
    } else {
        console.log('✅ No duplicates found.')
    }
}

removeDuplicates()
