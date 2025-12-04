import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './sanity'

const builder = createImageUrlBuilder(client)

import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export function urlFor(source: SanityImageSource) {
    return builder.image(source)
}
