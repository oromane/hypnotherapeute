import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function deleteAllPosts() {
    try {
        console.log('Fetching posts to delete...')
        const posts = await client.fetch(`*[_type == "post"]._id`)

        if (posts.length === 0) {
            console.log('No posts found to delete.')
            return
        }

        console.log(`Found ${posts.length} posts. Deleting...`)

        // Delete in batches
        const batchSize = 50
        for (let i = 0; i < posts.length; i += batchSize) {
            const batch = posts.slice(i, i + batchSize)
            const transaction = client.transaction()
            batch.forEach(id => transaction.delete(id))
            await transaction.commit()
            console.log(`Deleted batch ${i / batchSize + 1}`)
        }

        console.log('All posts deleted.')
    } catch (error) {
        console.error('Delete failed:', error)
    }
}

deleteAllPosts()
