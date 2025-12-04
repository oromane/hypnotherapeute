import { JSDOM } from 'jsdom'

function generateKey() {
    return Math.random().toString(36).substring(2, 15)
}

function htmlToBlocks(htmlContent) {
    const dom = new JSDOM(htmlContent)
    const doc = dom.window.document
    const blocks = []

    function processNode(node) {
        if (node.nodeType === 3) {
            const text = node.textContent.trim()
            if (text) return { _key: generateKey(), _type: 'span', text }
            return null
        }
        if (node.nodeType === 1) {
            const tagName = node.tagName.toLowerCase()
            if (['img', 'script', 'style', 'iframe', 'noscript'].includes(tagName)) return null
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
            if (['p', 'div', 'ul', 'ol', 'li', 'blockquote'].includes(tagName)) {
                const children = []
                node.childNodes.forEach(child => {
                    const span = processNode(child)
                    if (span && span._type === 'span') children.push(span)
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
            let text = ""
            node.childNodes.forEach(child => {
                text += child.textContent
            })
            text = text.trim()
            if (text) return { _key: generateKey(), _type: 'span', text }
        }
        return null
    }

    const body = doc.body
    body.childNodes.forEach(node => processNode(node))
    return blocks
}

async function fetchArticleContent(url) {
    try {
        console.log(`Fetching ${url}...`)
        const response = await fetch(url)
        const html = await response.text()
        const dom = new JSDOM(html)
        const doc = dom.window.document

        const h1 = doc.querySelector('h1')
        if (!h1) {
            console.log(`[DEBUG] No H1 found`)
            return null
        }
        console.log(`Title: ${h1.textContent.trim()}`)

        let contentContainer = doc.querySelector('.colonne_centre')
        if (!contentContainer) contentContainer = doc.querySelector('.content')
        if (!contentContainer) contentContainer = doc.body

        const toRemove = contentContainer.querySelectorAll('.recherche_actu, .all_cat_actu, #fil_ariane, .bouton2, .partage_sociaux, script, style, .paginationControl')
        toRemove.forEach(el => el.remove())

        const h1InContainer = contentContainer.querySelector('h1')
        if (h1InContainer) h1InContainer.remove()

        let stopProcessing = false
        const cleanChildren = []
        const children = Array.from(contentContainer.childNodes)

        for (const child of children) {
            if (stopProcessing) break
            const text = child.textContent?.trim() || ''
            const tagName = child.tagName || (child.nodeType === 3 ? 'TEXT' : 'OTHER')

            if (cleanChildren.length < 5) console.log(`[DEBUG] Child [${tagName}]: ${text.substring(0, 50)}`)

            if (text.includes('Autres actualités') || text.includes('Voir toutes les actualités')) {
                console.log(`[DEBUG] Stopping at child [${tagName}]. Full text length: ${text.length}`)
                console.log(`[DEBUG] Text start: ${text.substring(0, 100)}`)
                stopProcessing = true
                continue
            }
            if (child.nodeType === 1 && child.tagName === 'A' && text.includes('Voir toutes les actualités')) {
                stopProcessing = true
                continue
            }
            cleanChildren.push(child)
        }

        console.log(`Clean children count: ${cleanChildren.length}`)

        const cleanContainer = doc.createElement('div')
        cleanChildren.forEach(child => cleanContainer.appendChild(child.cloneNode(true)))

        const content = htmlToBlocks(cleanContainer.innerHTML)
        console.log(`Blocks generated: ${content.length}`)
        return { title: h1.textContent.trim(), content }
    } catch (error) {
        console.error(`Failed:`, error)
        return null
    }
}

fetchArticleContent('https://www.hypnotherapeute-duchesne.com/vaincre-les-angoisses-et-le-stress-grace-a-l-hypnotherapie_ad154.html')
