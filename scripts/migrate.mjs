import { createClient } from '@sanity/client'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// Configuration Firebase (reprise de lib/firebase.ts)
const firebaseConfig = {
    apiKey: "AIzaSyCnO03nK-r3a8M5H_BvNBpjjrGOS19qNMM",
    authDomain: "hypnotherapeute-3bc55.firebaseapp.com",
    projectId: "hypnotherapeute-3bc55",
    storageBucket: "hypnotherapeute-3bc55.firebasestorage.app",
    messagingSenderId: "823674319261",
    appId: "1:823674319261:web:b1782b1f921876886f7f74",
    measurementId: "G-0EZC6VKJ9R"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialisation Sanity
const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-02-02',
    token: process.env.SANITY_API_TOKEN, // Token avec droits d'écriture nécessaire !
    useCdn: false,
})

async function migrate() {
    console.log('🚀 Démarrage de la migration...')

    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
        console.error('❌ Erreur: NEXT_PUBLIC_SANITY_PROJECT_ID et SANITY_API_TOKEN sont requis dans .env.local')
        process.exit(1)
    }

    try {
        // 1. Récupérer les articles Firebase
        console.log('📥 Lecture des articles depuis Firebase...')
        const articlesRef = collection(db, 'articles')
        const snapshot = await getDocs(articlesRef)
        const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        console.log(`✅ ${articles.length} articles trouvés.`)

        // 2. Transformer et Importer dans Sanity
        console.log('📤 Importation vers Sanity...')

        const transaction = sanity.transaction()

        for (const article of articles) {
            // Transformation du contenu string en Portable Text simple
            const contentBlocks = article.content
                ? article.content.split('\n\n').map(para => ({
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: para.trim() }],
                    markDefs: []
                }))
                : []

            const sanityArticle = {
                _type: 'post',
                _id: `imported-${article.id}`, // On garde une trace de l'ID original
                title: article.title,
                slug: { _type: 'slug', current: article.slug },
                category: article.category,
                date: article.date, // String conservé pour affichage
                publishedAt: article.timestamp ? new Date(article.timestamp.seconds * 1000).toISOString() : new Date().toISOString(),
                author: article.author || 'Elisabeth DUCHESNE',
                isPublished: article.published || false,
                isFeatured: article.featured || false,
                excerpt: article.excerpt,
                content: contentBlocks
            }

            transaction.createOrReplace(sanityArticle)
        }

        const result = await transaction.commit()
        console.log(`🎉 Migration terminée ! ${result.results.length} documents traités.`)

    } catch (error) {
        console.error('❌ Erreur durant la migration:', error)
    }
}

migrate()
