# Variables de Déploiement (Vercel)

Pour que le site fonctionne correctement en production, vous devez configurer les variables d'environnement suivantes dans les paramètres de votre projet Vercel (Settings > Environment Variables).

## Application
- `NEXT_PUBLIC_SITE_URL`: L'URL de votre site en production (ex: `https://votre-site.vercel.app`)
- `ADMIN_PASSWORD`: Mot de passe pour accéder à l'interface d'administration (`/admin`).
- `RESEND_API_KEY`: Clé API Resend pour le formulaire de contact.

## Sanity CMS
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: ID du projet Sanity.
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset Sanity (généralement `production`).
- `NEXT_PUBLIC_SANITY_API_VERSION`: Version de l'API (ex: `2024-01-01`).
- `SANITY_API_TOKEN`: Token API Sanity (avec droits d'écriture pour les logs système). **Attention: Ne pas préfixer par NEXT_PUBLIC**.

## Firebase (Authentification & Analytics)
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Clé API Firebase.
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Domaine d'authentification.
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: ID du projet Firebase.
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Bucket de stockage.
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: ID de l'expéditeur.
- `NEXT_PUBLIC_FIREBASE_APP_ID`: ID de l'application.
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`: ID de mesure (Analytics).

> [!IMPORTANT]
> Assurez-vous de redéployer votre application après avoir ajouté ou modifié ces variables.
