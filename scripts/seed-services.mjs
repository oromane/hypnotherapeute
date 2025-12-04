import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-02-02',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

const services = [
    {
        title: "Accompagnement durant la grossesse",
        slug: "accompagnement-grossesse",
        category: "Accompagnement personnel",
        excerpt: "Préparez sereinement votre accouchement avec l'hypnose et la sophrologie.",
        content: "L'accompagnement durant la grossesse permet de vivre cette période de transformation avec sérénité. Grâce à l'hypnose et la sophrologie, vous apprenez à gérer les inconforts, à communiquer avec votre bébé et à préparer votre accouchement en toute confiance."
    },
    {
        title: "Addictions",
        slug: "addictions",
        category: "Bien-être émotionnel",
        excerpt: "Libérez-vous des dépendances avec des méthodes éprouvées et bienveillantes.",
        content: "Les addictions peuvent prendre de nombreuses formes. Mon approche bienveillante vous aide à comprendre les mécanismes sous-jacents et à vous libérer durablement des dépendances pour retrouver votre liberté."
    },
    {
        title: "Arrêt du tabac",
        slug: "arret-du-tabac",
        category: "Bien-être physique",
        excerpt: "Stoppez la cigarette durablement avec l'hypnose Ericksonienne.",
        content: "L'arrêt du tabac est l'une des applications les plus connues de l'hypnose. En une ou plusieurs séances, nous travaillons sur les déclencheurs et les habitudes pour vous permettre de devenir non-fumeur sans stress ni prise de poids."
    },
    {
        title: "Ateliers d'hypnose",
        slug: "ateliers-hypnose",
        category: "Développement collectif",
        excerpt: "Participez à des ateliers collectifs d'hypnose et sophrologie pour particuliers et entreprises.",
        content: "Les ateliers collectifs sont une excellente occasion de découvrir l'hypnose et la sophrologie dans un cadre convivial. Thématiques variées : gestion du stress, confiance en soi, sommeil..."
    },
    {
        title: "Confiance en soi",
        slug: "confiance-en-soi",
        category: "Développement personnel",
        excerpt: "Développez une confiance authentique et durable en vous-même.",
        content: "La confiance en soi est la clé de l'épanouissement. Nous travaillons ensemble pour identifier vos ressources intérieures, dépasser vos croyances limitantes et affirmer votre personnalité."
    },
    {
        title: "Dépression et burn out",
        slug: "depression-burn-out",
        category: "Bien-être mental",
        excerpt: "Retrouvez l'équilibre et l'énergie face à la dépression ou l'épuisement professionnel.",
        content: "Le burn-out et la dépression nécessitent un accompagnement doux et progressif. Je vous aide à reconstruire votre énergie, à retrouver du sens et à mettre en place des stratégies pour un équilibre de vie durable."
    },
    {
        title: "Gestion des angoisses",
        slug: "gestion-des-angoisses",
        category: "Bien-être émotionnel",
        excerpt: "Apprenez à maîtriser vos angoisses et retrouver la sérénité.",
        content: "Les angoisses et l'anxiété peuvent être paralysantes. Apprenez des techniques concrètes pour les apaiser rapidement et travaillez sur leurs causes profondes pour retrouver une vie sereine."
    },
    {
        title: "Hypnose et douleurs",
        slug: "hypnose-douleurs",
        category: "Bien-être physique",
        excerpt: "Diminuez la perception de la douleur avec l'hypnose thérapeutique.",
        content: "L'hypnose est un outil puissant pour la gestion de la douleur chronique ou aiguë. Elle permet de modifier la perception de la douleur et d'activer les mécanismes naturels de soulagement du corps."
    },
    {
        title: "Hypnose pour les enfants et adolescents",
        slug: "hypnose-enfants-ados",
        category: "Accompagnement familial",
        excerpt: "Accompagnez vos enfants avec une hypnose adaptée à leur âge.",
        content: "Les enfants et adolescents sont très réceptifs à l'hypnose. J'utilise des méthodes ludiques et adaptées pour les aider à surmonter leurs difficultés : énurésie, troubles du sommeil, anxiété scolaire, confiance..."
    },
    {
        title: "Préparation à un événement important",
        slug: "preparation-evenement",
        category: "Performance personnelle",
        excerpt: "Préparez-vous mentalement à un entretien, examen ou événement stressant.",
        content: "Que ce soit pour un examen, un entretien d'embauche, une compétition sportive ou une prise de parole en public, la préparation mentale vous permet d'arriver le jour J en pleine possession de vos moyens."
    },
    {
        title: "Troubles alimentaires",
        slug: "troubles-alimentaires",
        category: "Bien-être holistique",
        excerpt: "Réconciliez-vous avec la nourriture et votre rapport au corps.",
        content: "Les troubles alimentaires sont souvent liés à des émotions enfouies. Nous travaillons sur le rapport à la nourriture et à l'image de soi pour retrouver un équilibre sain et apaisé."
    }
]

async function seedServices() {
    console.log('🚀 Démarrage de l\'importation des prestations...')

    if (!process.env.SANITY_API_TOKEN) {
        console.error('❌ Erreur: SANITY_API_TOKEN est requis dans .env.local')
        process.exit(1)
    }

    const transaction = sanity.transaction()

    for (const s of services) {
        const doc = {
            _type: 'service',
            title: s.title,
            slug: { _type: 'slug', current: s.slug },
            category: s.category,
            excerpt: s.excerpt,
            content: [
                {
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: s.content }],
                    markDefs: []
                }
            ]
        }
        // Utilise createOrReplace avec un ID déterministe basé sur le slug pour éviter les doublons
        transaction.createOrReplace({
            _id: `service-${s.slug}`,
            ...doc
        })
    }

    try {
        const result = await transaction.commit()
        console.log(`✅ Succès ! ${result.results.length} prestations importées.`)
    } catch (error) {
        console.error('❌ Erreur durant l\'importation:', error)
    }
}

seedServices()
