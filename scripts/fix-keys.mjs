import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-02-02',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

async function fixKeys() {
    console.log('🚀 Fixing missing keys in services...')

    const services = await client.fetch(`*[_type == "service"]`)
    const transaction = client.transaction()
    let updatedCount = 0

    for (const service of services) {
        let hasChanges = false
        const newContent = (service.content || []).map(block => {
            if (!block._key) {
                hasChanges = true
                return { ...block, _key: uuidv4() }
            }
            // Also check children for spans
            if (block.children) {
                block.children = block.children.map(child => {
                    if (!child._key) {
                        hasChanges = true
                        return { ...child, _key: uuidv4() }
                    }
                    return child
                })
            }
            return block
        })

        if (hasChanges) {
            console.log(`🔧 Fixing keys for: ${service.title}`)
            transaction.patch(service._id, p => p.set({ content: newContent }))
            updatedCount++
        }
    }

    if (updatedCount > 0) {
        console.log(`Committing fixes for ${updatedCount} documents...`)
        try {
            await transaction.commit()
            console.log('✅ Keys fixed successfully.')
        } catch (err) {
            console.error('❌ Error fixing keys:', err)
        }
    } else {
        console.log('✅ No missing keys found.')
    }
}

fixKeys()
