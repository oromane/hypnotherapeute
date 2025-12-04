import { type SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { customImage } from './customImage'
import { columns } from './columns'
import { quote } from './quote'
import { post } from './post'
import { service } from './service'

import { seoSettings } from './seoSettings'
import { legalPages } from './legalPages'

import { category } from './category'

import { systemLog } from './systemLog'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [post, blockContent, customImage, columns, quote, service, seoSettings, legalPages, category, systemLog],
}
