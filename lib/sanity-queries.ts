import { groq } from 'next-sanity'
import { client } from './sanity'

export async function getPosts() {
  return client.fetch(
    groq`*[_type == "post" && isPublished == true] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "category": category->title,
      "categoryImage": category->image,
      date,
      publishedAt,
      isFeatured,
      author,
      content
    }`
  )
}

export async function getAllPostsForSearch() {
  return client.fetch(
    groq`*[_type == "post" && isPublished == true] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "category": category->title,
      "categoryImage": category->image,
      date,
      publishedAt,
      isFeatured,
      author,
      content
    }`
  )
}

export async function getPost(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "category": category->title,
      "categoryImage": category->image,
      date,
      publishedAt,
      author,
      content
    }`,
    { slug }
  )
}

export async function getFeaturedPosts() {
  return client.fetch(
    groq`*[_type == "post" && isPublished == true && isFeatured == true] | order(publishedAt desc)[0...10] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "category": category->title,
      "categoryImage": category->image,
      date,
      publishedAt,
      author
    }`
  )
}

export async function getPaginatedPosts(page: number = 1, limit: number = 15, category: string = "Tous", search: string = "") {
  const start = (page - 1) * limit
  const end = start + limit

  // Construction du filtre avec score
  let filter = `_type == "post" && isPublished == true`
  let order = `publishedAt desc`

  if (category !== "Tous") {
    filter += ` && category->title == "${category}"`
  }

  if (search) {
    // Smart Search: Split by spaces to allow multi-term matching (AND logic)
    const terms = search.trim().split(/\s+/).filter(Boolean)

    if (terms.length > 0) {
      const termFilters = terms.map(term =>
        `(title match "*${term}*" || excerpt match "*${term}*" || pt::text(content) match "*${term}*")`
      ).join(" && ")

      filter += ` && (${termFilters})`
    }
  }

  // Requête pour les posts
  const postsQuery = groq`*[${filter}] | order(${order}) [${start}...${end}] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        "category": category->title,
        "categoryImage": category->image,
        date,
        publishedAt,
        isFeatured,
        author
    }`

  // Requête pour le total (pour la pagination)
  const totalQuery = groq`count(*[${filter}])`

  const [posts, total] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(totalQuery)
  ])

  return { posts, total }
}

export async function getCategories() {
  return client.fetch(
    groq`*[_type == "category"] | order(title asc) {
      title,
      "slug": slug.current,
      image
    }`
  )
}

export async function getService(slug: string) {
  console.log("getService called with slug:", slug)
  if (!slug) return null
  const result = await client.fetch(
    groq`*[_type == "service" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            "category": category->title,
            content,
            seo
        }`,
    { slug }
  )
  console.log("getService result:", result ? "Found" : "Null")
  return result
}

export async function getServices() {
  return client.fetch(
    groq`*[_type == "service"] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            "category": category->title
        }`
  )
}

export async function getSeoSettings() {
  return client.fetch(
    groq`*[_type == "seoSettings"][0]`
  )
}

export async function getLegalPages() {
  return client.fetch(
    groq`*[_type == "legalPages"][0]`
  )
}
