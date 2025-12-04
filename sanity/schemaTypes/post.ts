import { defineField, defineType } from 'sanity'

export const post = defineType({
    name: 'post',
    title: 'Article',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Extrait',
            type: 'text',
            rows: 3,
            description: 'Court résumé pour les cartes et le SEO',
        }),
        defineField({
            name: 'category',
            title: 'Catégorie',
            type: 'reference',
            to: [{ type: 'category' }],
            description: 'Catégorie principale de l\'article',
        }),
        defineField({
            name: 'date',
            title: 'Date de publication (Affichage)',
            type: 'string',
            description: 'Format texte ex: "15 Octobre 2024" (pour compatibilité existante)',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Date de publication (Tri)',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'author',
            title: 'Auteur',
            type: 'string',
            initialValue: 'Elisabeth DUCHESNE',
        }),
        defineField({
            name: 'isPublished',
            title: 'Publié',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'isFeatured',
            title: 'En Vedette',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'content',
            title: 'Contenu',
            type: 'blockContent',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'content.0.image', // Tente d'utiliser la première image du contenu comme miniature
        },
    },
})
