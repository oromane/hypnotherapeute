import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import { JSDOM } from 'jsdom'

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

const SOURCE_DIR = path.resolve(__dirname, '../actualite_a_ajouter')

function generateKey() {
    return Math.random().toString(36).substring(2, 15)
}

// Helper to convert HTML content to Portable Text blocks (simplified for text only)
function htmlToBlocks(htmlContent) {
    const dom = new JSDOM(htmlContent)
    const doc = dom.window.document
    const blocks = []

    // Helper to process nodes recursively
    function processNode(node) {
        if (node.nodeType === 3) { // Text node
            const text = node.textContent.trim()
            if (text) return { _key: generateKey(), _type: 'span', text }
            return null
        }

        if (node.nodeType === 1) { // Element node
            const tagName = node.tagName.toLowerCase()

            // Skip images and scripts
            if (['img', 'script', 'style', 'iframe', 'noscript'].includes(tagName)) return null

            // Headings
            if (['h2', 'h3', 'h4'].includes(tagName)) {
                const text = node.textContent.trim()
                if (text) {
                    blocks.push({
                        _key: generateKey(),
                        _type: 'block',
                        style: tagName,
                        children: [{ _key: generateKey(), _type: 'span', text }]
                    })
                }
                return null
            }

            // Paragraphs and Divs (treated as paragraphs if they contain text)
            if (['p', 'div', 'ul', 'ol', 'li', 'blockquote'].includes(tagName)) {
                // For simple text migration, we'll flatten lists and blockquotes into paragraphs or handle them simply
                // Let's try to capture children text
                const children = []
                node.childNodes.forEach(child => {
                    const span = processNode(child)
                    if (span && span._type === 'span') children.push(span)
                    // If child pushed a block (e.g. nested div), we ignore it here as we want flat blocks mostly
                })

                if (children.length > 0) {
                    blocks.push({
                        _key: generateKey(),
                        _type: 'block',
                        style: tagName === 'blockquote' ? 'blockquote' : 'normal',
                        children
                    })
                }
                return null
            }

            // Formatting (b, strong, i, em, a) - simplified: just get text
            // Ideally we would preserve marks, but for "text only" request, plain text is safest.
            // However, let's try to preserve the text content of these inline elements.
            let text = ""
            node.childNodes.forEach(child => {
                text += child.textContent
            })
            text = text.trim()
            if (text) return { _key: generateKey(), _type: 'span', text }
        }
        return null
    }

    // Process top-level children of the content container
    // We assume htmlContent is the innerHTML of the main content area
    const body = doc.body
    body.childNodes.forEach(node => processNode(node))

    return blocks
}

async function fetchArticleContent(url) {
    try {
        // console.log(`Fetching ${url}...`)
        const response = await fetch(url)
        const html = await response.text()
        const dom = new JSDOM(html)
        const doc = dom.window.document

        const h1 = doc.querySelector('h1')
        if (!h1) {
            console.log(`[DEBUG] No H1 found for ${url}`)
            return null
        }

        const title = h1.textContent.trim()

        let contentContainer = doc.querySelector('.colonne_centre')
        if (!contentContainer) {
            // console.log(`[DEBUG] .colonne_centre not found for ${url}, trying .content`)
            contentContainer = doc.querySelector('.content')
        }
        if (!contentContainer) {
            // console.log(`[DEBUG] .content not found for ${url}, using body`)
            contentContainer = doc.body
        }

        // Remove elements we don't want from the container before processing
        const toRemove = contentContainer.querySelectorAll('.recherche_actu, .all_cat_actu, #fil_ariane, .bouton2, .partage_sociaux, script, style, .paginationControl')
        toRemove.forEach(el => el.remove())

        // Also remove the h1 from content as we map it to title
        const h1InContainer = contentContainer.querySelector('h1')
        if (h1InContainer) h1InContainer.remove()

        // CLEANUP LOGIC: Recursive function to find and remove footer content
        function cleanDOM(node) {
            const children = Array.from(node.childNodes)
            let foundStop = false

            for (const child of children) {
                if (foundStop) {
                    child.remove()
                    continue
                }

                const text = child.textContent?.trim() || ''

                // Exact match or start match for headers
                if (text === 'Autres actualités' || text === 'Voir toutes les actualités' || text.startsWith('Autres actualités') || text.startsWith('Voir toutes les actualités')) {
                    child.remove()
                    foundStop = true
                    continue
                }

                // Check specific link text
                if (child.nodeType === 1 && child.tagName === 'A' && (text.includes('Voir toutes les actualités') || text.includes('Autres actualités'))) {
                    child.remove()
                    foundStop = true
                    continue
                }

                // If child contains the marker but is a container, recurse
                if (child.nodeType === 1 && (text.includes('Autres actualités') || text.includes('Voir toutes les actualités'))) {
                    const childStopped = cleanDOM(child)
                    if (childStopped) {
                        foundStop = true
                    }
                }
            }
            return foundStop
        }

        cleanDOM(contentContainer)

        // Convert to blocks
        const content = htmlToBlocks(contentContainer.innerHTML)

        if (content.length === 0) {
            console.log(`[DEBUG] No blocks generated for ${url}`)
        }

        return { title, content }
    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error)
        return null
    }
}

async function migrate() {
    try {
        const files = await fs.readdir(SOURCE_DIR)
        const htmlFiles = files.filter(f => f.endsWith('.html') || f.endsWith('.htm'))

        console.log(`Found ${htmlFiles.length} listing files.`)

        const articlesToMigrate = new Map() // Map to deduplicate by URL

        // 1. Parse listing pages to get URLs and Metadata
        for (const file of htmlFiles) {
            const filePath = path.join(SOURCE_DIR, file)
            const html = await fs.readFile(filePath, 'utf-8')
            const dom = new JSDOM(html)
            const doc = dom.window.document

            const articles = doc.querySelectorAll('.bloc_listing_actu')

            articles.forEach(article => {
                const titleEl = article.querySelector('.actualitesListingTitre')
                const dateEl = article.querySelector('.actualitesListingDate')
                const resumeEl = article.querySelector('.actualitesListingResume')

                if (titleEl && dateEl) {
                    let url = titleEl.href
                    // Fix relative URLs
                    if (url && !url.startsWith('http')) {
                        if (url.startsWith('/')) {
                            url = `https://www.hypnotherapeute-duchesne.com${url}`
                        } else {
                            url = `https://www.hypnotherapeute-duchesne.com/${url}`
                        }
                    }

                    const title = titleEl.textContent.trim()
                    const dateStr = dateEl.textContent.replace('Le ', '').trim()
                    const excerpt = resumeEl ? resumeEl.textContent.trim() : ''

                    // Convert French date to ISO
                    const months = {
                        'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04', 'mai': '05', 'juin': '06',
                        'juillet': '07', 'août': '08', 'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
                    }
                    const [day, monthName, year] = dateStr.split(' ')
                    const month = months[monthName.toLowerCase()] || '01'
                    const isoDate = `${year}-${month}-${day.padStart(2, '0')}`

                    articlesToMigrate.set(url, {
                        title,
                        url,
                        publishedAt: new Date(isoDate).toISOString(),
                        excerpt
                    })
                }
            })
        }

        console.log(`Found ${articlesToMigrate.size} unique articles to migrate.`)

        // 2. Fetch content and Upload
        for (const [url, meta] of articlesToMigrate) {
            const articleData = await fetchArticleContent(url)

            if (articleData && articleData.content.length > 0) {
                const doc = {
                    _type: 'post',
                    title: meta.title,
                    slug: {
                        current: meta.title
                            .toLowerCase()
                            .normalize('NFD') // Split accented characters into base char + diacritic
                            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
                            .replace(/[^a-z0-9]+/g, '-') // Replace non-chars with hyphen
                            .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
                            .slice(0, 96)
                    },
                    publishedAt: meta.publishedAt,
                    excerpt: meta.excerpt,
                    content: articleData.content,
                    author: 'Elisabeth DUCHESNE',
                    isPublished: true,
                    category: {
                        _type: 'reference',
                        _ref: 'category-gestion-du-stress-anxiete'
                    }
                }

                const id = `imported-post-${doc.slug.current}`

                await client.createOrReplace({ ...doc, _id: id })
                console.log(`Migrated: ${meta.title}`)
            } else {
                console.warn(`Skipping ${meta.title} (no content found)`)
            }

            // Be nice to the server
            await new Promise(resolve => setTimeout(resolve, 500))
        }

        console.log('Migration complete!')

    } catch (error) {
        console.error('Migration failed:', error)
    }
}

migrate()
