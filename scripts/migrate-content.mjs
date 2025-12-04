import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-02-02',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

const BASE_DIR = 'prestation_a_ajouter'

const MAPPING = {
    "accompagnement-grossesse": "Hypnothérapeute femme enceinte Roinville – Hypnose PMA Paris 16.html",
    "addictions": "Hypnothérapie contre addiction Roinville – Hypnose alcool drogue Dourdan.html",
    "arret-du-tabac": "Hypnothérapeute arrêt du tabac Roinville – Hypnose arrêter de fumer.html",
    "ateliers-hypnose": "Atelier d’hypnose Roinville – Hypnose en entreprise Dourdan, Paris 16.html",
    "confiance-en-soi": "Hypnothérapeute confiance en soi Roinville – Retrouver estime de soi.html",
    "depression-burn-out": "Hypnose dépression Paris 16 – Hypnose burn-out, surmenage (91).html",
    "gestion-des-angoisses": "Hypnose angoisse Paris 16 – Gerer son anxiété par Hypnose (91).html",
    "hypnose-douleurs": "Hypnose gestion de douleur Roinville – Auto-hypnose Dourdan, Paris 16.html",
    "hypnose-enfants-ados": "Hypnose enfant, ado Roinville - Phobie scolaire Dourdan, Paris 16.html",
    "preparation-evenement": "Hypnose pour réussite Roinville – Préparation mentale sportif Paris 16.html",
    "troubles-alimentaires": "Hypnothérapeute troubles alimentaires Roinville – Hypnose boulimie.html"
}

async function uploadImage(imagePath) {
    try {
        if (!fs.existsSync(imagePath)) {
            console.warn(`⚠️ Image not found: ${imagePath}`)
            return null
        }
        const buffer = fs.readFileSync(imagePath)
        const asset = await client.assets.upload('image', buffer, {
            filename: path.basename(imagePath)
        })
        return asset
    } catch (error) {
        console.error(`❌ Error uploading image ${imagePath}:`, error)
        return null
    }
}

async function migrateContent() {
    console.log('🚀 Starting content migration...')

    for (const [slug, filename] of Object.entries(MAPPING)) {
        console.log(`\nProcessing ${slug} from ${filename}...`)

        const filePath = path.join(BASE_DIR, filename)
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${filePath}`)
            continue
        }

        const html = fs.readFileSync(filePath, 'utf-8')
        const dom = new JSDOM(html)
        const doc = dom.window.document

        // Extract content
        // Based on the HTML structure seen:
        // Title: h1
        // Intro: p.intro
        // Content: section.ac-doubleColonne (multiple sections)

        const contentBlocks = []

        // 1. Intro
        const intro = doc.querySelector('p.intro')
        if (intro) {
            contentBlocks.push({
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: intro.textContent.trim() }] // Simplified, losing bold/links for now to be safe, or could parse
            })
        }

        // 2. Main Sections
        const sections = doc.querySelectorAll('section.ac-doubleColonne section.ac-colonne')

        for (const section of sections) {
            // Handle headings
            const h2 = section.querySelector('h2')
            if (h2) {
                contentBlocks.push({
                    _type: 'block',
                    style: 'h2',
                    children: [{ _type: 'span', text: h2.textContent.trim() }]
                })
            }

            // Handle paragraphs
            const paragraphs = section.querySelectorAll('p')
            for (const p of paragraphs) {
                if (p.classList.contains('intro')) continue; // Skip if it's the main intro we already grabbed (though usually intro is outside)

                contentBlocks.push({
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: p.textContent.trim() }]
                })
            }

            // Handle images
            const img = section.querySelector('img')
            if (img) {
                const src = img.getAttribute('src')
                // src is like "./Hypnothérapeute arrêt du tabac Roinville – Hypnose arrêter de fumer_files/arret-du-tabac-1.jpg"
                // We need to resolve this relative to the HTML file
                const decodedSrc = decodeURIComponent(src)
                // The folder name usually matches the HTML filename + "_files"
                // But let's trust the src if it's relative
                const imagePath = path.join(BASE_DIR, decodedSrc)

                console.log(`   Uploading image: ${imagePath}`)
                const asset = await uploadImage(imagePath)

                if (asset) {
                    contentBlocks.push({
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id
                        },
                        alt: img.getAttribute('alt') || ''
                    })
                }
            }
        }

        // Update Sanity Document
        try {
            // Find the document ID by slug
            const service = await client.fetch(`*[_type == "service" && slug.current == $slug][0]`, { slug })

            if (service) {
                await client.patch(service._id)
                    .set({ content: contentBlocks })
                    .commit()
                console.log(`✅ Updated ${slug}`)
            } else {
                console.error(`❌ Service not found in Sanity: ${slug}`)
            }
        } catch (error) {
            console.error(`❌ Error updating ${slug}:`, error)
        }
    }

    console.log('✅ Migration complete.')
}

migrateContent()
