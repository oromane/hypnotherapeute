import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // Filter out singleton types from the default list
            ...S.documentTypeListItems().filter(
                (listItem) => !['seoSettings', 'legalPages'].includes(listItem.getId() as string)
            ),
            S.divider(),
            S.listItem()
                .title('SEO Général')
                .child(
                    S.document()
                        .schemaType('seoSettings')
                        .documentId('seoSettings')
                ),
            S.listItem()
                .title('Pages Légales')
                .child(
                    S.document()
                        .schemaType('legalPages')
                        .documentId('legalPages')
                ),
        ])
