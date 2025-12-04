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

const mentionsLegalesText = `
## 1. Informations Légales de l’Éditeur du Site

**Nom et Prénom** : Elisabeth DUCHESNE
**Dénomination Sociale** : Elisabeth DUCHESNE
**Statut Juridique** : Entrepreneur Individuel
**Activité (Code APE/NAF)** : 8690F Activités de santé humaine non classées ailleurs
**Numéro de SIRET** : [Votre Numéro SIRET]
**Adresse du Siège Social** : [Votre adresse complète]
**Téléphone** : 01 86 65 29 44
**Adresse de Courriel** : [Votre email]
**Directeur de la Publication** : Elisabeth DUCHESNE

## 2. Informations Relatives à l'Hébergeur du Site

**Nom de l'Hébergeur** : Vercel Inc.
**Adresse de l'Hébergeur** : 340 S Lemon Ave #4133 Walnut, CA 91789, USA

## 3. Propriété Intellectuelle

L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.

La reproduction de tout ou partie de ce site sur un support quel qu'il soit est formellement interdite sauf autorisation expresse du Directeur de la publication.

**Crédits photos/illustrations** : Les photos présentes sur ce site sont la propriété d'Elisabeth DUCHESNE ou proviennent de banques d'images libres de droits.

## 4. Limites de Responsabilité

Elisabeth DUCHESNE est **Hypnothérapeute et Sophrologue** et ne saurait être considérée comme médecin. Les prestations proposées par ce site ne s'apparentent à aucune prise en charge ou pratique médicale. Elles s'inscrivent dans une démarche de bien-être et de développement personnel.

En aucun cas, l'Hypnothérapie et/ou la Sophrologie ne peuvent se substituer à un traitement, un avis ou un diagnostic médical. Seul un médecin ou un professionnel de santé habilité peut poser des diagnostics et prescrire des traitements.

L'utilisateur du site reconnaît utiliser les informations et contenus du site sous sa seule responsabilité.

## 5. Médiation de la Consommation

Conformément à l'article L. 612-1 du Code de la consommation, vous avez la possibilité de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable du litige qui vous opposerait à l'éditeur du site.

Le nom et les coordonnées de l'entité de médiation sont : [À compléter, ex: CNPM Médiation Consommation].

## 6. Loi Applicable et Attribution de Juridiction

Le présent site est régi par les lois françaises. Tout litige relatif au site sera soumis à la compétence exclusive des tribunaux français.
`

const politiqueConfidentialiteText = `
## 1. Introduction et Identité du Responsable du Traitement

**Objet de la Politique :** La présente Politique de Confidentialité a pour objectif de vous informer sur la manière dont Elisabeth DUCHESNE (ci-après "Le Responsable du Traitement") collecte, utilise, protège et conserve les données à caractère personnel que vous transmettez lors de votre navigation sur le site.

**Responsable du Traitement :**
* Nom : Elisabeth DUCHESNE
* Adresse : [Votre Adresse]
* Contact : [Votre Email]

## 2. Principes Fondamentaux du RGPD

**Engagement de Transparence :** Le Responsable du Traitement s'engage à respecter les dispositions de la loi n°78-17 du 6 janvier 1978 modifiée relative à l'informatique, aux fichiers et aux libertés, ainsi que le Règlement Général sur la Protection des Données (RGPD) n°2016/679 du 27 avril 2016.

## 3. Collecte des Données à Caractère Personnel

Nous collectons les données par différentes voies, principalement via le formulaire de contact et la navigation.

### 3.1 Données Collectées via le Formulaire de Contact

*   **Données** : Nom, Prénom, E-mail, Téléphone.
*   **Finalité** : Répondre à votre demande, prendre rendez-vous, et assurer le suivi de votre consultation.
*   **Durée de Conservation** : Durée de la relation contractuelle, augmentée des délais légaux de prescription.

### 3.2 Données Collectées Automatiquement (Cookies et Traces)

*   **Cookies strictement nécessaires** : Assurer le bon fonctionnement du site.
*   **Données de navigation** : Mesurer l'audience du site pour améliorer l'expérience utilisateur (avec votre consentement).

## 4. Vos Droits (Conformité RGPD)

Conformément au RGPD, vous disposez des droits suivants sur vos données :

*   **Droit d'accès (Art. 15 RGPD)**
*   **Droit de rectification (Art. 16 RGPD)**
*   **Droit à l'effacement / Droit à l'oubli (Art. 17 RGPD)**
*   **Droit à la limitation du traitement (Art. 18 RGPD)**
*   **Droit d'opposition (Art. 21 RGPD)**
*   **Droit à la portabilité (Art. 20 RGPD)**

Pour exercer ces droits, vous pouvez contacter le Responsable du Traitement par email.

## 5. Transmission des Données

Les données collectées sont strictement destinées à Elisabeth DUCHESNE. Elles peuvent être transmises à des sous-traitants uniquement si cela est nécessaire (ex: hébergeur).

## 6. Sécurité des Données

Le site utilise le protocole de sécurité **HTTPS/SSL** pour garantir que la connexion est sécurisée et que les informations échangées sont chiffrées.

## 7. Droit d'introduire une Réclamation

Si vous estimez que vos droits ne sont pas respectés, vous avez la possibilité d'introduire une réclamation auprès de la **CNIL**.
`

const cguText = `
## 1. Mentions Légales et Objet

**Objet :** Les présentes Conditions Générales d'Utilisation (CGU) encadrent l'accès et l'utilisation du site web Elisabeth DUCHESNE (ci-après le "Site"), ainsi que les services qui y sont proposés.

**Acceptation :** L'accès et l'utilisation du Site impliquent l'acceptation sans réserve des présentes CGU par l'utilisateur.

**Éditeur du Site :** Elisabeth DUCHESNE

## 2. Accès et Utilisation du Site

**Accès Gratuit :** L'accès au Site est gratuit et ouvert à tout public.

**Responsabilité de l'Utilisateur :** L'utilisateur s'engage à faire un usage licite et conforme aux lois et règlements en vigueur.

## 3. Propriété Intellectuelle

**Droits d'Auteur :** L'ensemble des éléments composant le Site (structure, textes, images, vidéos, graphismes, logos, icônes, code...) sont la propriété exclusive d'Elisabeth DUCHESNE, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.

**Interdiction de Reproduction :** Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Site est formellement interdite, sauf autorisation écrite préalable.

## 4. Liens Hypertextes et Sources Externes

**Liens Sortants :** Le Site peut contenir des liens hypertextes vers d'autres ressources. L'Éditeur décline toute responsabilité quant à leur contenu.

**Lien vers Medoucine :** L'accès au service de réservation Medoucine est régi par les conditions générales de Medoucine.

## 5. Nature des Services et Limitation de Responsabilité

**Nature des Prestations :** Les services d'Hypnothérapie et de Sophrologie proposés sur ce Site sont des techniques d'accompagnement au bien-être, non médicales. Ils ne visent en aucun cas à remplacer un traitement, un diagnostic ou un suivi médical.

**Exclusion de Garantie :** L'Éditeur du Site ne garantit pas que les informations contenues sur le Site sont complètes, précises ou à jour.

**Responsabilité Technique :** L'Éditeur du Site n'est pas responsable des interruptions de service ou bugs.

## 6. Modifications des CGU et Droit Applicable

**Modification :** L'Éditeur du Site se réserve le droit de modifier les présentes CGU à tout moment.

**Droit Applicable :** Les présentes CGU sont régies par le droit français.
`

function generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function markdownToBlocks(text) {
    return text.split('\n\n').map(para => {
        if (para.startsWith('## ')) {
            return {
                _key: generateKey(),
                _type: 'block',
                style: 'h2',
                children: [{ _key: generateKey(), _type: 'span', text: para.replace('## ', '') }]
            }
        }
        if (para.startsWith('### ')) {
            return {
                _key: generateKey(),
                _type: 'block',
                style: 'h3',
                children: [{ _key: generateKey(), _type: 'span', text: para.replace('### ', '') }]
            }
        }
        return {
            _key: generateKey(),
            _type: 'block',
            style: 'normal',
            children: [{ _key: generateKey(), _type: 'span', text: para }]
        }
    })
}

async function seedLegalPages() {
    try {
        console.log('Seeding Legal Pages with FULL content...')

        const doc = {
            _id: 'legalPages',
            _type: 'legalPages',
            mentionsLegales: markdownToBlocks(mentionsLegalesText),
            politiqueConfidentialite: markdownToBlocks(politiqueConfidentialiteText),
            cgu: markdownToBlocks(cguText),
        }

        await client.createOrReplace(doc)
        console.log('Legal Pages seeded successfully!')
    } catch (error) {
        console.error('Error seeding legal pages:', error)
    }
}

seedLegalPages()
