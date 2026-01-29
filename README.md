# Elisabeth DUCHESNE - Hypnothérapeute & Sophrologue

Site web professionnel moderne pour le cabinet d'hypnothérapie et de sophrologie d'Elisabeth Duchesne.
Conçu pour offrir une expérience utilisateur apaisante, fluide et hautement performante.

## 🛠️ Stack Technique

- **Framework** : [Next.js 16](https://nextjs.org/)
- **Langage** : TypeScript / React 19
- **Styling** : Tailwind CSS v4
- **UI Components** : [Shadcn UI](https://ui.shadcn.com/)
- **CMS Headless** : [Sanity.io](https://www.sanity.io/)
- **Animations** : Framer Motion
- **3D** : React Three Fiber / Three.js
- **Forms** : React Hook Form + Zod
- **Emails** : Resend
- **Icônes** : Lucide React

## ✨ Fonctionnalités Clés

### 🎨 Design & UX
- **Palette "Sober Calm Green"** : Une identité visuelle profonde et rassurante (`oklch(0.40 0.10 145)`).
- **Glassmorphism** : Effets de transparence et de flou pour une interface moderne.
- **Expérience 3D** : Hero section immersive avec éléments organiques flottants.
- **Animations Fluides** : Transitions de page et micro-interactions soignées.

### 🔍 Recherche Intelligente
- **Moteur Client-Side** : Recherche instantanée sur les pages *Prestations* et *Actualités*.
- **Tolérance aux fautes** :
    - **Insensible aux accents** ("arret" trouve "Arrêt").
    - **Multi-termes** ("hypnose tabac" trouve "Arrêt du tabac par l'hypnose").
    - **Insensible à la casse**.
- **Performance** : Chargement optimisé sans bloquer l'interface.

### 📝 Gestion de Contenu (Sanity CMS)
- **Actualités** : Blog complet avec catégories, images à la une, et mise en avant.
- **Prestations** : Gestion dynamique des services offerts.
- **Pages Légales** : Mentions légales, CGU, et Politique de confidentialité éditables.
- **SEO Global** : Paramètres de référencement gérés directement depuis le CMS.

### 🛡️ Sécurité & Performance
- **Middleware de Sécurité** :
    - Content Security Policy (CSP) stricte.
    - Rate Limiting pour prévenir les abus.
    - En-têtes de sécurité (HSTS, X-Frame-Options, etc.).
- **Protection Client** : Désactivation du clic droit et des raccourcis développeur pour protéger le contenu.
- **SEO Avancé** : Métadonnées dynamiques, Sitemap XML généré automatiquement, Balisage JSON-LD.

### ⚙️ Administration
- **Dashboard Personnalisé** (`/admin`) : Vue d'ensemble rapide des articles et messages.
- **Sanity Studio** (`/studio`) : Interface complète pour l'édition de contenu.

> 📘 **Documentation Technique** : Pour savoir comment changer le mot de passe admin, l'email de contact ou gérer le déploiement, consultez le [Guide Technique](./GUIDE_TECHNIQUE.md).

## 🚀 Installation

### Prérequis
- Node.js 18+
- Compte Sanity.io

### Configuration
1. Cloner le dépôt :
   ```bash
   git clone <repository-url>
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Configurer les variables d'environnement (`.env.local`) :
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   SANITY_API_TOKEN=votre_token_prive_sanity
   RESEND_API_KEY=votre_cle_api_resend
   ```

4. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📂 Structure du Projet

```
├── app/
│   ├── actualites/          # Blog & Recherche
│   ├── admin/               # Dashboard Admin Custom
│   ├── prestations/         # Catalogue Services & Recherche
│   ├── studio/              # Sanity Studio intégré
│   ├── layout.tsx           # Layout racine (Polices, Analytics)
│   └── globals.css          # Variables CSS & Thème
├── components/
│   ├── sanity/              # Composants PortableText
│   ├── ui/                  # Composants réutilisables
│   ├── Hero3D.tsx           # Scène 3D
│   └── ServicesSection.tsx  # Grille services animée
├── lib/
│   ├── sanity.ts            # Client Sanity
│   ├── sanity-queries.ts    # Requêtes GROQ
│   └── logger.ts            # Système de logs serveur
├── sanity/
│   └── schemaTypes/         # Définitions de schéma CMS
└── middleware.ts            # Sécurité & Headers
```

## 📄 Licence

Projet développé pour Elisabeth Duchesne. Tous droits réservés.
Développé par [Oromane](https://github.com/oromane).
