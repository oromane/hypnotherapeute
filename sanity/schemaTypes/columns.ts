import { defineField, defineType } from 'sanity'

export const columns = defineType({
    name: 'columns',
    title: 'Colonnes',
    type: 'object',
    fields: [
        defineField({
            name: 'columns',
            title: 'Colonnes',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'content',
                            title: 'Contenu',
                            type: 'blockContent',
                        }),
                    ],
                },
            ],
            validation: (Rule) => Rule.min(2).max(3),
        }),
    ],
    preview: {
        select: {
            columns: 'columns',
        },
        prepare({ columns }) {
            return {
                title: `${columns?.length || 0} Colonnes`,
                subtitle: 'Mise en page',
            }
        },
    },
})
