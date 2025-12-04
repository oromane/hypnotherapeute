import { defineField, defineType } from 'sanity'

export const customImage = defineType({
    name: 'customImage',
    title: 'Image Personnalisée',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'alt',
            title: 'Texte Alternatif',
            type: 'string',
        }),
        defineField({
            name: 'alignment',
            title: 'Alignement',
            type: 'string',
            options: {
                list: [
                    { title: 'Gauche', value: 'left' },
                    { title: 'Centre', value: 'center' },
                    { title: 'Droite', value: 'right' },
                ],
                layout: 'radio',
            },
            initialValue: 'center',
        }),
        defineField({
            name: 'rounded',
            title: 'Coins Arrondis',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'shadow',
            title: 'Ombre',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'alt',
            media: 'image',
        },
        prepare({ title, media }) {
            return {
                title: title || 'Image sans description',
                subtitle: 'Image Personnalisée',
                media,
            }
        },
    },
})
