import { defineField, defineType } from 'sanity'

export const quote = defineType({
    name: 'quote',
    title: 'Citation',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Texte',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'author',
            title: 'Auteur',
            type: 'string',
        }),
    ],
    preview: {
        select: {
            title: 'text',
            subtitle: 'author',
        },
    },
})
