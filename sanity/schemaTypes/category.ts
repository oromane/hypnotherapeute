import { defineField, defineType } from 'sanity'

export const category = defineType({
    name: 'category',
    title: 'Catégorie',
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
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Image par défaut',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: "Image utilisée pour les articles de cette catégorie qui n'ont pas d'image propre.",
        }),
    ],
})
