# Guide Technique - Elisabeth Duchesne

Ce document récapitule les points techniques essentiels pour la gestion et la maintenance du site.

## 1. Sécurité & Accès Admin

### Changer le mot de passe Admin
Le mot de passe pour accéder à `/admin` est défini dans les variables d'environnement.
1.  Ouvrez le fichier `.env.local` (ou configurez les variables sur votre hébergeur Vercel/Netlify).
2.  Modifiez la variable `ADMIN_PASSWORD` :
    ```env
    ADMIN_PASSWORD="VotreNouveauMotDePasseTresSecurise"
    ```
3.  Si la variable n'existe pas, le mot de passe par défaut est utilisé (voir `app/api/admin/login/route.ts`), mais il est **fortement recommandé** de définir cette variable.

### Changer l'adresse E-mail de contact
Le formulaire de contact utilise l'API **Resend**.
1.  Pour changer l'adresse de réception des messages, ouvrez `app/api/contact/route.ts`.
2.  Modifiez la constante `ADMIN_EMAIL` :
    ```typescript
    const ADMIN_EMAIL = "votre.email@exemple.com"
    ```
3.  **Important** : En mode "Sandbox" (gratuit/test) de Resend, vous ne pouvez envoyer des e-mails qu'à l'adresse qui a servi à créer le compte Resend. Pour envoyer à n'importe qui, vous devez vérifier votre nom de domaine sur Resend.

## 2. Gestion de Contenu (Sanity CMS)

### Accès au Studio
Le CMS est accessible via l'URL `/studio` (ex: `https://votre-site.com/studio`).
Vous devez vous connecter avec le compte Sanity associé au projet.

### Ajouter un administrateur Sanity
1.  Allez sur [sanity.io/manage](https://www.sanity.io/manage).
2.  Sélectionnez votre projet.
3.  Allez dans l'onglet **Members**.
4.  Invitez un nouveau membre avec le rôle "Administrator" ou "Editor".

## 3. Déploiement (Mise en ligne)

### Checklist avant mise en ligne
- [ ] **Variables d'environnement** : Assurez-vous que toutes les variables de `.env.local` sont configurées sur la plateforme d'hébergement (Vercel, Netlify).
    - `NEXT_PUBLIC_SANITY_PROJECT_ID`
    - `NEXT_PUBLIC_SANITY_DATASET`
    - `NEXT_PUBLIC_SITE_URL`
    - `SANITY_API_TOKEN`
    - `RESEND_API_KEY`
    - `ADMIN_PASSWORD`
- [ ] **Domaine Resend** : Vérifiez votre domaine sur Resend pour permettre l'envoi d'e-mails professionnels (et éviter le dossier Spam).
- [ ] **Google Analytics** : Vérifiez que l'ID `G-XXXX` dans `app/layout.tsx` est bien le vôtre.

### Mise à jour du site
Le site est connecté à votre dépôt Git. Chaque "push" sur la branche `main` déclenchera automatiquement un nouveau déploiement si vous utilisez Vercel ou Netlify.

## 4. Maintenance

### Logs Système
Les logs importants (erreurs critiques, tentatives de connexion admin) sont enregistrés dans Sanity (type `systemLog`).
Vous pouvez les consulter sur la page `/admin/logs`.

### Nettoyage
Pensez à supprimer périodiquement les vieux logs via le script de maintenance (à automatiser si besoin) ou manuellement depuis le Studio.
