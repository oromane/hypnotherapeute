import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

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

const CATEGORIES = [
    { title: 'Gestion du Stress & Anxiété', slug: 'gestion-du-stress-anxiete', description: 'Techniques et conseils pour apaiser le mental et retrouver la sérénité.' },
    { title: 'Arrêt du Tabac', slug: 'arret-du-tabac', description: 'Accompagnement pour se libérer de la cigarette durablement.' },
    { title: 'Sommeil & Récupération', slug: 'sommeil-recuperation', description: 'Retrouver des nuits paisibles et un sommeil réparateur.' },
    { title: 'Enfants & Adolescents', slug: 'enfants-adolescents', description: 'Hypnose adaptée pour les plus jeunes : émotions, école, confiance.' },
    { title: 'Confiance & Estime de Soi', slug: 'confiance-estime-de-soi', description: 'Renforcer la confiance en soi et l\'image de soi.' },
    { title: 'Perte de Poids & Nutrition', slug: 'perte-de-poids-nutrition', description: 'Gestion du poids, anneau gastrique virtuel et rapport à l\'alimentation.' },
]

async function seedCategories() {
    try {
        console.log('Seeding categories...')

        for (const cat of CATEGORIES) {
            const doc = {
                _type: 'category',
                _id: `category-${cat.slug}`, // Deterministic ID
                title: cat.title,
                slug: { current: cat.slug },
                description: cat.description,
            }

            await client.createOrReplace(doc)
            console.log(`Created/Updated category: ${cat.title}`)
        }

        console.log('Categories seeded successfully.')
    } catch (error) {
        console.error('Seeding failed:', error)
    }
}

seedCategories()
